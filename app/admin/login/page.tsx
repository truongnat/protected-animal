'use client';

import { signIn } from '@/lib/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { signInAction } from './actions';

// This login page uses a dual approach for authentication:
// 1. Server Actions (primary method): Uses the new Next.js Server Actions for server-side authentication
// 2. Client-side fallback: If Server Actions fail, falls back to client-side authentication
export default function AdminLoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirectTo = searchParams.get('redirectTo') || '/admin/dashboard';

	// Client-side form submission as fallback
	async function handleClientSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			// Use client-side authentication
			await signIn(email, password);
			router.push(redirectTo);
		} catch (err: any) {
			setError(err.message || 'Failed to sign in');
			setLoading(false);
		}
	}

	// Server action form submission (primary method)
	async function handleServerAction(formData: FormData) {
		setError('');
		setLoading(true);

		try {
			// Add the redirectTo parameter to the form data
			formData.append('redirectTo', redirectTo);

			// Call the server action
			const result = await signInAction(formData);

			if (result?.error) {
				setError(result.error);
				setLoading(false);
			}
			// If successful, the server action will redirect
		} catch (err: any) {
			setError(err.message || 'Failed to sign in');
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
				<p className="mt-2 text-center text-sm text-gray-600">
					Sign in to access the Protected Animals CMS
				</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					{error && (
						<div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
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

					<form className="space-y-6" action={handleServerAction} onSubmit={handleClientSubmit}>
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								Email address
							</label>
							<div className="mt-1">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<div className="mt-1">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								disabled={loading}
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
							>
								{loading ? 'Signing in...' : 'Sign in'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
