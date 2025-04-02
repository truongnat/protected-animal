'use client';

import { getCurrentUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserInfo() {
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		async function loadUser() {
			try {
				const currentUser = await getCurrentUser();
				if (!currentUser) {
					router.push('/admin/login');
					return;
				}
				setUser(currentUser);
			} catch (error) {
				console.error('Error loading user:', error);
				router.push('/admin/login');
			} finally {
				setLoading(false);
			}
		}

		loadUser();
	}, [router]);

	if (loading) {
		return (
			<div className="flex items-center">
				<div className="h-8 w-8 rounded-full bg-gray-300 animate-pulse"></div>
				<div className="ml-3">
					<div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
					<div className="mt-1 h-3 w-16 bg-gray-300 rounded animate-pulse"></div>
				</div>
			</div>
		);
	}

	if (!user) {
		return null;
	}

	return (
		<div className="flex items-center">
			<div className="flex-shrink-0">
				<div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white">
					{user.email?.charAt(0).toUpperCase()}
				</div>
			</div>
			<div className="ml-3">
				<p className="text-sm font-medium text-gray-700">{user.email}</p>
				<button
					onClick={() => router.push('/admin/logout')}
					className="text-xs font-medium text-gray-500 hover:text-gray-700"
				>
					Sign out
				</button>
			</div>
		</div>
	);
}
