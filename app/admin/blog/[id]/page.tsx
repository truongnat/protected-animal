'use client';

import BlogPostForm from '@/components/admin/BlogPostForm';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BlogPost {
	id: number;
	title: string;
	content: string;
	author: string;
	image_url: string;
	published_at: string;
	category: string;
	tags: string[];
	slug: string;
	created_at: string;
}

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
	const [post, setPost] = useState<BlogPost | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const router = useRouter();

	useEffect(() => {
		async function fetchPost() {
			try {
				const { data, error } = await supabase
					.from('blog_posts')
					.select('*')
					.eq('id', params.id)
					.single();

				if (error) {
					throw error;
				}

				setPost(data);
			} catch (err: any) {
				console.error('Error fetching blog post:', err);
				setError(err.message || 'Failed to load blog post');
			} finally {
				setLoading(false);
			}
		}

		fetchPost();
	}, [params.id]);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-red-50 border-l-4 border-red-400 p-4">
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
						<div className="mt-4">
							<button
								type="button"
								onClick={() => router.push('/admin/blog')}
								className="text-sm font-medium text-red-700 hover:text-red-600"
							>
								Go back to blog posts
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (!post) {
		return (
			<div className="text-center py-12">
				<h3 className="text-lg font-medium text-gray-900">Blog post not found</h3>
				<div className="mt-4">
					<button
						type="button"
						onClick={() => router.push('/admin/blog')}
						className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
					>
						Go back to blog posts
					</button>
				</div>
			</div>
		);
	}

	return (
		<div>
			<h1 className="text-2xl font-semibold text-gray-900 mb-6">Edit Blog Post: {post.title}</h1>
			<div className="bg-white shadow overflow-hidden sm:rounded-md p-6">
				<BlogPostForm post={post} isEditing={true} />
			</div>
		</div>
	);
}
