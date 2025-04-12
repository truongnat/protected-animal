'use client';

import { logoutAdmin } from '@/lib/auth-utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { signOutAction } from './actions';

export default function LogoutPage() {
	const router = useRouter();

	useEffect(() => {
		// Log out the user on the client side
		logoutAdmin();

		// Also call the server action to clear cookies on the server side
		try {
			signOutAction();
		} catch (error) {
			console.error('Error signing out:', error);
		}

		// Redirect to login page
		router.push('/admin/login');
	}, [router]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">Signing Out...</h1>
					<p className="text-gray-600 mb-6">You are being logged out of the admin panel.</p>
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto" />
				</div>
			</div>
		</div>
	);
}
