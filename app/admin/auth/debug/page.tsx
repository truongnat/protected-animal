'use client';

import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AuthDebugPage() {
	const [session, setSession] = useState<any>(null);
	const [adminUser, setAdminUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function checkAuth() {
			try {
				setLoading(true);

				// Get current session
				const {
					data: { session },
					error: sessionError,
				} = await supabase.auth.getSession();

				if (sessionError) {
					throw sessionError;
				}

				setSession(session);

				if (session) {
					// Check if user is in admin_users table
					const { data: adminData, error: adminError } = await supabase
						.from('admin_users')
						.select('*')
						.eq('user_id', session.user.id)
						.single();

					if (adminError && adminError.code !== 'PGRST116') {
						// PGRST116 is "no rows returned"
						throw adminError;
					}

					setAdminUser(adminData);
				}
			} catch (err: any) {
				console.error('Auth debug error:', err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}

		checkAuth();

		// Set up auth state change listener
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, newSession) => {
			console.log('Auth state changed:', event, newSession);
			setSession(newSession);

			// Check admin status when auth state changes
			if (newSession) {
				supabase
					.from('admin_users')
					.select('*')
					.eq('user_id', newSession.user.id)
					.single()
					.then(({ data }) => {
						setAdminUser(data);
					})
					.catch((err) => {
						if (err.code !== 'PGRST116') {
							// PGRST116 is "no rows returned"
							console.error('Error checking admin status:', err);
						}
					});
			} else {
				setAdminUser(null);
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	const handleSignOut = async () => {
		await supabase.auth.signOut();
	};

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<div className="bg-white shadow overflow-hidden sm:rounded-lg">
					<div className="px-4 py-5 sm:px-6">
						<h3 className="text-lg leading-6 font-medium text-gray-900">Authentication Debug</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							This page shows your current authentication state to help troubleshoot issues.
						</p>
					</div>

					{loading ? (
						<div className="px-4 py-5 sm:p-6 text-center">
							<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500 mx-auto"></div>
							<p className="mt-2 text-sm text-gray-500">Loading authentication data...</p>
						</div>
					) : error ? (
						<div className="px-4 py-5 sm:p-6">
							<div className="rounded-md bg-red-50 p-4">
								<div className="flex">
									<div className="flex-shrink-0">
										<svg
											className="h-5 w-5 text-red-400"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<div className="ml-3">
										<h3 className="text-sm font-medium text-red-800">
											Error loading authentication data
										</h3>
										<div className="mt-2 text-sm text-red-700">
											<p>{error}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="border-t border-gray-200">
							<dl>
								<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">Authentication Status</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										{session ? (
											<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
												Authenticated
											</span>
										) : (
											<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
												Not Authenticated
											</span>
										)}
									</dd>
								</div>

								{session && (
									<>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="text-sm font-medium text-gray-500">User ID</dt>
											<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												{session.user.id}
											</dd>
										</div>
										<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="text-sm font-medium text-gray-500">Email</dt>
											<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												{session.user.email}
											</dd>
										</div>
										<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="text-sm font-medium text-gray-500">Admin Status</dt>
											<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												{adminUser ? (
													<span
														className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
															adminUser.role === 'pending'
																? 'bg-yellow-100 text-yellow-800'
																: 'bg-green-100 text-green-800'
														}`}
													>
														{adminUser.role}
													</span>
												) : (
													<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
														Not an admin
													</span>
												)}
											</dd>
										</div>
										<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt className="text-sm font-medium text-gray-500">Session Expires</dt>
											<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												{new Date(session.expires_at * 1000).toLocaleString()}
											</dd>
										</div>
									</>
								)}
							</dl>
						</div>
					)}

					<div className="px-4 py-5 sm:px-6 border-t border-gray-200">
						<div className="flex flex-col sm:flex-row sm:space-x-4">
							{session ? (
								<button
									onClick={handleSignOut}
									className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
								>
									Sign Out
								</button>
							) : (
								<Link
									href="/admin/auth/login"
									className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
								>
									Sign In
								</Link>
							)}

							<Link
								href="/admin/dashboard"
								className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
							>
								Go to Dashboard
							</Link>

							<Link
								href="/"
								className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
							>
								Back to Home
							</Link>
						</div>
					</div>
				</div>

				{session && (
					<div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
						<div className="px-4 py-5 sm:px-6">
							<h3 className="text-lg leading-6 font-medium text-gray-900">Session Details</h3>
							<p className="mt-1 max-w-2xl text-sm text-gray-500">
								Raw session data for debugging purposes.
							</p>
						</div>
						<div className="border-t border-gray-200 px-4 py-5 sm:p-6">
							<pre className="bg-gray-50 p-4 rounded-md overflow-auto text-xs">
								{JSON.stringify(session, null, 2)}
							</pre>
						</div>
					</div>
				)}

				{adminUser && (
					<div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
						<div className="px-4 py-5 sm:px-6">
							<h3 className="text-lg leading-6 font-medium text-gray-900">Admin User Details</h3>
							<p className="mt-1 max-w-2xl text-sm text-gray-500">
								Raw admin user data for debugging purposes.
							</p>
						</div>
						<div className="border-t border-gray-200 px-4 py-5 sm:p-6">
							<pre className="bg-gray-50 p-4 rounded-md overflow-auto text-xs">
								{JSON.stringify(adminUser, null, 2)}
							</pre>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
