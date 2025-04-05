'use client';

import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { getCurrentUser, logoutAdmin } from '@/lib/auth-utils';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminDashboardPage() {
	const [stats, setStats] = useState({
		speciesCount: 0,
		blogPostsCount: 0,
		teamMembersCount: 0,
	});
	const [loading, setLoading] = useState(true);
	const [recentSpecies, setRecentSpecies] = useState<any[]>([]);
	const [recentPosts, setRecentPosts] = useState<any[]>([]);
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		// Get current user
		const currentUser = getCurrentUser();
		setUser(currentUser);

		async function fetchDashboardData() {
			setLoading(true);
			try {
				// Fetch species count
				const { count: speciesCount } = await supabase
					.from('species')
					.select('*', { count: 'exact', head: true });

				// Fetch blog posts count
				const { count: blogPostsCount } = await supabase
					.from('blog_posts')
					.select('*', { count: 'exact', head: true });

				// Fetch team members count (assuming you have a team_members table)
				const { count: teamMembersCount } = await supabase
					.from('team_members')
					.select('*', { count: 'exact', head: true });

				// Fetch recent species
				const { data: recentSpeciesData } = await supabase
					.from('species')
					.select('*')
					.order('created_at', { ascending: false })
					.limit(5);

				// Fetch recent blog posts
				const { data: recentPostsData } = await supabase
					.from('blog_posts')
					.select('*')
					.order('created_at', { ascending: false })
					.limit(5);

				setStats({
					speciesCount: speciesCount || 0,
					blogPostsCount: blogPostsCount || 0,
					teamMembersCount: teamMembersCount || 0,
				});

				setRecentSpecies(recentSpeciesData || []);
				setRecentPosts(recentPostsData || []);
			} catch (error) {
				console.error('Error fetching dashboard data:', error);
			} finally {
				setLoading(false);
			}
		}

		fetchDashboardData();
	}, []);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
			</div>
		);
	}

	const handleLogout = () => {
		logoutAdmin();
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

				<div className="flex items-center">
					{user && (
						<div className="mr-4 text-sm text-gray-600">
							Logged in as <span className="font-medium">{user.username}</span>
						</div>
					)}

					<button
						onClick={handleLogout}
						className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
					>
						<svg
							className="-ml-0.5 mr-2 h-4 w-4"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
							/>
						</svg>
						Log out
					</button>
				</div>
			</div>

			{/* Stats */}
			<div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
				<div className="bg-white overflow-hidden shadow rounded-lg">
					<div className="px-4 py-5 sm:p-6">
						<div className="flex items-center">
							<div className="flex-shrink-0 bg-green-100 rounded-md p-3">
								<svg
									className="h-6 w-6 text-green-600"
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
							</div>
							<div className="ml-5 w-0 flex-1">
								<dl>
									<dt className="text-sm font-medium text-gray-500 truncate">Total Species</dt>
									<dd>
										<div className="text-lg font-medium text-gray-900">{stats.speciesCount}</div>
									</dd>
								</dl>
							</div>
						</div>
					</div>
					<div className="bg-gray-50 px-4 py-4 sm:px-6">
						<div className="text-sm">
							<Link
								href="/admin/species"
								className="font-medium text-green-600 hover:text-green-500"
							>
								View all
							</Link>
						</div>
					</div>
				</div>

				<div className="bg-white overflow-hidden shadow rounded-lg">
					<div className="px-4 py-5 sm:p-6">
						<div className="flex items-center">
							<div className="flex-shrink-0 bg-green-100 rounded-md p-3">
								<svg
									className="h-6 w-6 text-green-600"
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
							</div>
							<div className="ml-5 w-0 flex-1">
								<dl>
									<dt className="text-sm font-medium text-gray-500 truncate">Blog Posts</dt>
									<dd>
										<div className="text-lg font-medium text-gray-900">{stats.blogPostsCount}</div>
									</dd>
								</dl>
							</div>
						</div>
					</div>
					<div className="bg-gray-50 px-4 py-4 sm:px-6">
						<div className="text-sm">
							<Link href="/admin/blog" className="font-medium text-green-600 hover:text-green-500">
								View all
							</Link>
						</div>
					</div>
				</div>

				<div className="bg-white overflow-hidden shadow rounded-lg">
					<div className="px-4 py-5 sm:p-6">
						<div className="flex items-center">
							<div className="flex-shrink-0 bg-green-100 rounded-md p-3">
								<svg
									className="h-6 w-6 text-green-600"
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
							</div>
							<div className="ml-5 w-0 flex-1">
								<dl>
									<dt className="text-sm font-medium text-gray-500 truncate">Team Members</dt>
									<dd>
										<div className="text-lg font-medium text-gray-900">
											{stats.teamMembersCount}
										</div>
									</dd>
								</dl>
							</div>
						</div>
					</div>
					<div className="bg-gray-50 px-4 py-4 sm:px-6">
						<div className="text-sm">
							<Link href="/admin/team" className="font-medium text-green-600 hover:text-green-500">
								View all
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Recent content */}
			<div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
				{/* Recent species */}
				<div className="bg-white shadow rounded-lg">
					<div className="px-4 py-5 border-b border-gray-200 sm:px-6">
						<h3 className="text-lg leading-6 font-medium text-gray-900">Recent Species</h3>
					</div>
					<ul className="divide-y divide-gray-200">
						{recentSpecies.length > 0 ? (
							recentSpecies.map((species) => (
								<li key={species.id} className="px-4 py-4 sm:px-6">
									<div className="flex items-center justify-between">
										<div className="flex items-center">
											<div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
												{species.image_url ? (
													<ImageWithFallback
														src={species.image_url}
														alt={species.name}
														className="object-cover"
														unoptimized
														width={40}
														height={40}
													/>
												) : (
													<div className="h-10 w-10 flex items-center justify-center bg-green-100 text-green-800">
														{species.name.charAt(0)}
													</div>
												)}
											</div>
											<div className="ml-4">
												<div className="text-sm font-medium text-gray-900">{species.name}</div>
												<div className="text-sm text-gray-500">{species.conservation_status}</div>
											</div>
										</div>
										<div>
											<Link
												href={`/admin/species/${species.id}`}
												className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
											>
												Edit
											</Link>
										</div>
									</div>
								</li>
							))
						) : (
							<li className="px-4 py-5 sm:px-6 text-center text-gray-500">No species found</li>
						)}
					</ul>
					<div className="bg-gray-50 px-4 py-4 sm:px-6 rounded-b-lg">
						<div className="text-sm">
							<Link
								href="/admin/species/new"
								className="font-medium text-green-600 hover:text-green-500"
							>
								Add new species
							</Link>
						</div>
					</div>
				</div>

				{/* Recent blog posts */}
				<div className="bg-white shadow rounded-lg">
					<div className="px-4 py-5 border-b border-gray-200 sm:px-6">
						<h3 className="text-lg leading-6 font-medium text-gray-900">Recent Blog Posts</h3>
					</div>
					<ul className="divide-y divide-gray-200">
						{recentPosts.length > 0 ? (
							recentPosts.map((post) => (
								<li key={post.id} className="px-4 py-4 sm:px-6">
									<div className="flex items-center justify-between">
										<div>
											<div className="text-sm font-medium text-gray-900">{post.title}</div>
											<div className="text-sm text-gray-500">
												{new Date(post.published_at).toLocaleDateString()} • {post.author}
											</div>
										</div>
										<div>
											<Link
												href={`/admin/blog/${post.id}`}
												className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
											>
												Edit
											</Link>
										</div>
									</div>
								</li>
							))
						) : (
							<li className="px-4 py-5 sm:px-6 text-center text-gray-500">No blog posts found</li>
						)}
					</ul>
					<div className="bg-gray-50 px-4 py-4 sm:px-6 rounded-b-lg">
						<div className="text-sm">
							<Link
								href="/admin/blog/new"
								className="font-medium text-green-600 hover:text-green-500"
							>
								Create new post
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
