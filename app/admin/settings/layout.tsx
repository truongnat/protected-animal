'use client';

import { isAdmin } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SettingsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [loading, setLoading] = useState(true);
	const [authorized, setAuthorized] = useState(false);
	const router = useRouter();

	useEffect(() => {
		async function checkAuth() {
			try {
				const isUserAdmin = await isAdmin();

				if (!isUserAdmin) {
					router.push('/admin/login');
					return;
				}

				setAuthorized(true);
			} catch (error) {
				console.error('Error checking auth:', error);
				router.push('/admin/login');
			} finally {
				setLoading(false);
			}
		}

		checkAuth();
	}, [router]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500" />
			</div>
		);
	}

	return authorized ? <>{children}</> : null;
}
