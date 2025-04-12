'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

interface AdminUser {
	id: number;
	user_id: string;
	email: string;
	role: string;
	created_at: string;
}

export default function AdminUsersPage() {
	const [users, setUsers] = useState<AdminUser[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	useEffect(() => {
		fetchUsers();
	}, []);

	async function fetchUsers() {
		try {
			setLoading(true);
			const { data, error } = await supabase
				.from('admin_users')
				.select('*')
				.order('created_at', { ascending: false });

			if (error) throw error;
			setUsers(data || []);
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	}

	async function approveUser(userId: string) {
		try {
			setLoading(true);
			const { error } = await supabase
				.from('admin_users')
				.update({ role: 'admin' })
				.eq('user_id', userId);

			if (error) throw error;

			setSuccessMessage('User approved successfully');
			fetchUsers();
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	}

	async function removeUser(userId: string) {
		try {
			setLoading(true);
			const { error } = await supabase.from('admin_users').delete().eq('user_id', userId);

			if (error) throw error;

			setSuccessMessage('User removed successfully');
			fetchUsers();
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	}

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	}

	return (
		<div className="py-6">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-2xl font-semibold text-gray-900">Admin Users</h1>

				{error && (
					<div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
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
								<p className="text-sm text-red-700">{error}</p>
							</div>
						</div>
					</div>
				)}

				{successMessage && (
					<div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4">
						<div className="flex">
							<div className="flex-shrink-0">
								<svg
									className="h-5 w-5 text-green-400"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<div className="ml-3">
								<p className="text-sm text-green-700">{successMessage}</p>
							</div>
							<div className="ml-auto pl-3">
								<div className="-mx-1.5 -my-1.5">
									<button
										onClick={() => setSuccessMessage(null)}
										className="inline-flex rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
									>
										<span className="sr-only">Dismiss</span>
										<svg
											className="h-5 w-5"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
				)}

				<div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
					{loading ? (
						<div className="py-12 flex justify-center">
							<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500" />
						</div>
					) : users.length === 0 ? (
						<div className="py-12 text-center text-gray-500">No admin users found</div>
					) : (
						<ul className="divide-y divide-gray-200">
							{users.map((user) => (
								<li key={user.id}>
									<div className="px-4 py-4 sm:px-6">
										<div className="flex items-center justify-between">
											<div className="flex items-center">
												<div className="flex-shrink-0">
													<div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
														<span className="text-green-800 font-medium text-sm">
															{user.email.substring(0, 2).toUpperCase()}
														</span>
													</div>
												</div>
												<div className="ml-4">
													<div className="text-sm font-medium text-gray-900">{user.email}</div>
													<div className="text-sm text-gray-500">
														User ID: {user.user_id.substring(0, 8)}...
													</div>
												</div>
											</div>
											<div className="flex items-center">
												<div className="mr-4">
													<span
														className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
															user.role === 'admin'
																? 'bg-green-100 text-green-800'
																: user.role === 'superadmin'
																	? 'bg-purple-100 text-purple-800'
																	: 'bg-yellow-100 text-yellow-800'
														}`}
													>
														{user.role}
													</span>
												</div>
												<div className="text-sm text-gray-500">{formatDate(user.created_at)}</div>
											</div>
										</div>

										{user.role === 'pending' && (
											<div className="mt-4 flex justify-end space-x-3">
												<button
													onClick={() => approveUser(user.user_id)}
													className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
												>
													Approve
												</button>
												<button
													onClick={() => removeUser(user.user_id)}
													className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
												>
													Reject
												</button>
											</div>
										)}
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}
