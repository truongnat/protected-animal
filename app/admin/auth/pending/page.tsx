'use client';

import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PendingApprovalPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [userEmail, setUserEmail] = useState('');

	useEffect(() => {
		// Check if user is logged in and pending approval
		const checkUser = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (!session) {
				// Not logged in, redirect to login
				router.push('/admin/auth/login');
				return;
			}

			// Set the user email for display
			setUserEmail(session.user.email || '');

			// Check if user is in admin_users table
			const { data: adminUser, error } = await supabase
				.from('admin_users')
				.select('*')
				.eq('user_id', session.user.id)
				.single();

			if (error || !adminUser) {
				// Not in admin_users table, redirect to login
				router.push('/admin/auth/login');
				return;
			}

			if (adminUser.role !== 'pending') {
				// Already approved, redirect to dashboard
				router.push('/admin/dashboard');
				return;
			}

			setLoading(false);
		};

		checkUser();
	}, [router]);

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		router.push('/admin/auth/login');
	};

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
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<div className="text-center">
						<svg
							className="mx-auto h-12 w-12 text-yellow-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
						<h3 className="mt-2 text-xl font-medium text-gray-900">Approval Pending</h3>
						<div className="mt-2">
							<p className="text-sm text-gray-500">
								Your account <span className="font-medium text-gray-900">{userEmail}</span> is
								pending approval from an administrator.
							</p>
						</div>
						<div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 text-left">
							<p className="text-sm">
								You will receive an email notification once your account has been approved. If you
								need immediate access, please contact the site administrator.
							</p>
						</div>
						<div className="mt-6">
							<button
								onClick={handleSignOut}
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
							>
								Sign Out
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
