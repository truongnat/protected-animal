'use client';

import UserInfo from '@/components/admin/UserInfo';
import { Toaster } from '@/components/ui/sonner';
import { getCurrentUser, isAuthenticated } from '@/lib/auth-utils';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const poppins = Poppins({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
});

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		function loadUser() {
			try {
				// Check if user is authenticated
				if (!isAuthenticated()) {
					// Redirect to login page
					router.push('/admin/login');
					return;
				}

				// Get current user from auth-utils
				const currentUser = getCurrentUser();
				setUser(currentUser);
			} catch (error) {
				console.error('Error loading user:', error);
				// Redirect to login page on error
				router.push('/admin/login');
			} finally {
				setLoading(false);
			}
		}

		loadUser();
	}, [router]);

	// If on auth pages, don't show the admin layout
	if (
		pathname === '/admin/login' ||
		pathname === '/admin/auth/login' ||
		pathname === '/admin/auth/signup' ||
		pathname === '/admin/auth/pending' ||
		pathname.startsWith('/admin/auth/callback')
	) {
		return (
			<html lang="en">
				<body className={poppins.className}>
					{children}
					<Toaster />
				</body>
			</html>
		);
	}

	if (loading) {
		return (
			<html lang="en">
				<body className={poppins.className}>
					<div className="min-h-screen flex items-center justify-center bg-gray-100">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
					</div>
					<Toaster />
				</body>
			</html>
		);
	}

	// User authentication is now handled in the useEffect

	return (
		<html lang="en">
			<body className={poppins.className}>
				<div className="min-h-screen bg-gray-100">
					{/* Mobile sidebar toggle */}
					<div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white shadow-md">
						<button
							onClick={() => setIsSidebarOpen(!isSidebarOpen)}
							className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
						>
							<svg
								className="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
						<div className="text-lg font-semibold text-green-700">Protected Animals CMS</div>
						<div className="w-6"></div> {/* Empty div for spacing */}
					</div>

					{/* Sidebar */}
					<div
						className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}
					>
						<div className="flex flex-col h-full">
							<div className="flex items-center justify-center h-16 px-4 bg-green-700 text-white">
								<h2 className="text-xl font-semibold">Admin Dashboard</h2>
							</div>
							<div className="flex-1 overflow-y-auto py-4 px-3">
								<nav className="space-y-1">
									<Link
										href="/admin/dashboard"
										className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
											pathname === '/admin/dashboard'
												? 'bg-green-100 text-green-700'
												: 'text-gray-700 hover:bg-gray-100'
										}`}
									>
										<svg
											className="mr-3 h-5 w-5"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
											/>
										</svg>
										Dashboard
									</Link>
									<Link
										href="/admin/species"
										className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
											pathname.startsWith('/admin/species')
												? 'bg-green-100 text-green-700'
												: 'text-gray-700 hover:bg-gray-100'
										}`}
									>
										<svg
											className="mr-3 h-5 w-5"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
											/>
										</svg>
										Species
									</Link>
									<Link
										href="/admin/blog"
										className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
											pathname.startsWith('/admin/blog')
												? 'bg-green-100 text-green-700'
												: 'text-gray-700 hover:bg-gray-100'
										}`}
									>
										<svg
											className="mr-3 h-5 w-5"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
											/>
										</svg>
										Blog Posts
									</Link>
									<Link
										href="/admin/users"
										className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
											pathname.startsWith('/admin/users')
												? 'bg-green-100 text-green-700'
												: 'text-gray-700 hover:bg-gray-100'
										}`}
									>
										<svg
											className="mr-3 h-5 w-5"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
											/>
										</svg>
										Admin Users
									</Link>
									<Link
										href="/admin/team"
										className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
											pathname.startsWith('/admin/team')
												? 'bg-green-100 text-green-700'
												: 'text-gray-700 hover:bg-gray-100'
										}`}
									>
										<svg
											className="mr-3 h-5 w-5"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
											/>
										</svg>
										Team Members
									</Link>
									<Link
										href="/admin/settings"
										className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
											pathname.startsWith('/admin/settings')
												? 'bg-green-100 text-green-700'
												: 'text-gray-700 hover:bg-gray-100'
										}`}
									>
										<svg
											className="mr-3 h-5 w-5"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
										</svg>
										Settings
									</Link>
								</nav>
							</div>
							<div className="p-4 border-t border-gray-200">
								<UserInfo />
							</div>
						</div>
					</div>

					{/* Main content */}
					<div className="lg:pl-64">
						<div className="pt-16 lg:pt-0">
							<main className="py-6 px-4 sm:px-6 lg:px-8">{children}</main>
						</div>
					</div>
				</div>
				<Toaster />
			</body>
		</html>
	);
}
