'use client';

import { supabase } from '@/lib/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminSignupPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Check if user is already logged in
		const checkUser = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (session) {
				// Check if user is an admin
				const { data: adminUser, error } = await supabase
					.from('admin_users')
					.select('*')
					.eq('user_id', session.user.id)
					.single();

				if (adminUser) {
					// User is an admin, redirect to dashboard
					router.push('/admin/dashboard');
				}
			}

			setLoading(false);
		};

		checkUser();

		// Set up auth state change listener
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			console.log('Auth state changed:', event, session);

			if (event === 'SIGNED_IN' && session) {
				// Check if user is an admin
				const checkAdminStatus = async () => {
					const { data: adminUser, error } = await supabase
						.from('admin_users')
						.select('*')
						.eq('user_id', session.user.id)
						.single();

					if (adminUser && adminUser.role !== 'pending') {
						// User is an approved admin, redirect to dashboard
						router.push('/admin/dashboard');
					} else if (adminUser && adminUser.role === 'pending') {
						// User is pending approval
						router.push('/admin/auth/pending');
					} else {
						// New user, add to admin_users with pending status
						const { data, error } = await supabase.from('admin_users').insert([
							{
								user_id: session.user.id,
								email: session.user.email,
								role: 'pending',
							},
						]);

						if (error) {
							console.error('Error adding user to admin_users:', error);
						} else {
							router.push('/admin/auth/pending');
						}
					}
				};

				checkAdminStatus();
			}
		});

		// Clean up subscription
		return () => {
			subscription.unsubscribe();
		};
	}, [router]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Sign Up</h2>
				<p className="mt-2 text-center text-sm text-gray-600">
					Create an account to access the Protected Animals CMS
				</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<Auth
						supabaseClient={supabase}
						appearance={{
							theme: ThemeSupa,
							variables: {
								default: {
									colors: {
										brand: '#16a34a', // green-600
										brandAccent: '#15803d', // green-700
									},
								},
							},
						}}
						theme="light"
						providers={[]}
						redirectTo={`${window.location.origin}/admin/auth/callback`}
						onlyThirdPartyProviders={false}
						magicLink={false}
						showLinks={true}
						view="sign_up"
						onSuccess={(session) => {
							console.log('Auth success:', session);
							// We'll handle the redirect in the onAuthStateChange listener
						}}
					/>
					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">Already have an account?</span>
							</div>
						</div>
						<div className="mt-6 text-center">
							<Link href="/admin/auth/login" className="text-green-600 hover:text-green-500">
								Sign in to your account
							</Link>
						</div>
					</div>
					<div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
						<p className="text-sm">
							<strong>Note:</strong> After signing up, an administrator will need to approve your
							account before you can access the admin dashboard.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
