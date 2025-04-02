'use client';

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

interface BlogPostFormProps {
	post?: BlogPost;
	isEditing?: boolean;
}

export default function BlogPostForm({ post, isEditing = false }: BlogPostFormProps) {
	const router = useRouter();
	const [formData, setFormData] = useState<Partial<BlogPost>>({
		title: '',
		content: '',
		author: '',
		image_url: '',
		published_at: new Date().toISOString().split('T')[0],
		category: '',
		tags: [],
		slug: '',
	});
	const [tagInput, setTagInput] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	// Category options
	const categoryOptions = [
		'Conservation',
		'Wildlife',
		'Habitat',
		'Climate',
		'Biodiversity',
		'Endangered Species',
		'Success Stories',
		'News',
	];

	useEffect(() => {
		if (post) {
			setFormData({
				title: post.title || '',
				content: post.content || '',
				author: post.author || '',
				image_url: post.image_url || '',
				published_at: post.published_at
					? new Date(post.published_at).toISOString().split('T')[0]
					: new Date().toISOString().split('T')[0],
				category: post.category || '',
				tags: post.tags || [],
				slug: post.slug || '',
			});
		}
	}, [post]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleAddTag = () => {
		if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
			setFormData((prev) => ({
				...prev,
				tags: [...(prev.tags || []), tagInput.trim()],
			}));
			setTagInput('');
		}
	};

	const handleRemoveTag = (tag: string) => {
		setFormData((prev) => ({
			...prev,
			tags: prev.tags?.filter((t) => t !== tag) || [],
		}));
	};

	const generateSlug = (title: string) => {
		return title
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
			.trim();
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const title = e.target.value;
		setFormData((prev) => ({
			...prev,
			title,
			slug: generateSlug(title),
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setSuccess('');

		try {
			// Validate required fields
			if (!formData.title || !formData.content || !formData.author || !formData.slug) {
				throw new Error('Title, content, author, and slug are required');
			}

			if (isEditing && post) {
				// Update existing post
				const { error: updateError } = await supabase
					.from('blog_posts')
					.update({
						...formData,
						updated_at: new Date().toISOString(),
					})
					.eq('id', post.id);

				if (updateError) throw updateError;
				setSuccess('Blog post updated successfully!');
			} else {
				// Create new post
				const { error: insertError } = await supabase.from('blog_posts').insert({
					...formData,
					created_at: new Date().toISOString(),
				});

				if (insertError) throw insertError;
				setSuccess('Blog post created successfully!');

				// Reset form after successful creation
				if (!isEditing) {
					setFormData({
						title: '',
						content: '',
						author: '',
						image_url: '',
						published_at: new Date().toISOString().split('T')[0],
						category: '',
						tags: [],
						slug: '',
					});
				}
			}

			// Redirect after a short delay to show success message
			setTimeout(() => {
				router.push('/admin/blog');
				router.refresh();
			}, 1500);
		} catch (err: any) {
			setError(err.message || 'An error occurred');
			console.error('Error saving blog post:', err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{error && (
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
						</div>
					</div>
				</div>
			)}

			{success && (
				<div className="bg-green-50 border-l-4 border-green-400 p-4">
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
							<p className="text-sm text-green-700">{success}</p>
						</div>
					</div>
				</div>
			)}

			<div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
				<div className="sm:col-span-4">
					<label htmlFor="title" className="block text-sm font-medium text-gray-700">
						Title *
					</label>
					<div className="mt-1">
						<input
							type="text"
							name="title"
							id="title"
							value={formData.title}
							onChange={handleTitleChange}
							required
							className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
				</div>

				<div className="sm:col-span-2">
					<label htmlFor="slug" className="block text-sm font-medium text-gray-700">
						Slug *
					</label>
					<div className="mt-1">
						<input
							type="text"
							name="slug"
							id="slug"
							value={formData.slug}
							onChange={handleChange}
							required
							className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
					<p className="mt-1 text-xs text-gray-500">
						URL-friendly version of the title. Auto-generated but can be edited.
					</p>
				</div>

				<div className="sm:col-span-3">
					<label htmlFor="author" className="block text-sm font-medium text-gray-700">
						Author *
					</label>
					<div className="mt-1">
						<input
							type="text"
							name="author"
							id="author"
							value={formData.author}
							onChange={handleChange}
							required
							className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
				</div>

				<div className="sm:col-span-3">
					<label htmlFor="published_at" className="block text-sm font-medium text-gray-700">
						Published Date
					</label>
					<div className="mt-1">
						<input
							type="date"
							name="published_at"
							id="published_at"
							value={formData.published_at}
							onChange={handleChange}
							className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
				</div>

				<div className="sm:col-span-3">
					<label htmlFor="category" className="block text-sm font-medium text-gray-700">
						Category
					</label>
					<div className="mt-1">
						<select
							id="category"
							name="category"
							value={formData.category}
							onChange={handleChange}
							className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
						>
							<option value="">Select a category</option>
							{categoryOptions.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="sm:col-span-3">
					<label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
						Featured Image URL
					</label>
					<div className="mt-1">
						<input
							type="url"
							name="image_url"
							id="image_url"
							value={formData.image_url}
							onChange={handleChange}
							className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
							placeholder="https://example.com/image.jpg"
						/>
					</div>
				</div>

				<div className="sm:col-span-6">
					<label htmlFor="tags" className="block text-sm font-medium text-gray-700">
						Tags
					</label>
					<div className="mt-1 flex rounded-md shadow-sm">
						<input
							type="text"
							name="tags"
							id="tags"
							value={tagInput}
							onChange={(e) => setTagInput(e.target.value)}
							className="flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 rounded-none rounded-l-md sm:text-sm border-gray-300"
							placeholder="Add a tag"
							onKeyPress={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault();
									handleAddTag();
								}
							}}
						/>
						<button
							type="button"
							onClick={handleAddTag}
							className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 sm:text-sm hover:bg-gray-100"
						>
							Add
						</button>
					</div>
					{formData.tags && formData.tags.length > 0 && (
						<div className="mt-2 flex flex-wrap gap-2">
							{formData.tags.map((tag) => (
								<span
									key={tag}
									className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
								>
									{tag}
									<button
										type="button"
										onClick={() => handleRemoveTag(tag)}
										className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-green-400 hover:text-green-600 focus:outline-none"
									>
										<svg
											className="h-3 w-3"
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
								</span>
							))}
						</div>
					)}
				</div>

				<div className="sm:col-span-6">
					<label htmlFor="content" className="block text-sm font-medium text-gray-700">
						Content *
					</label>
					<div className="mt-1">
						<textarea
							id="content"
							name="content"
							rows={15}
							value={formData.content}
							onChange={handleChange}
							required
							className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
					<p className="mt-2 text-sm text-gray-500">
						Content supports Markdown formatting. Use # for headings, * for lists, ** for bold, etc.
					</p>
				</div>
			</div>

			<div className="flex justify-end space-x-3">
				<button
					type="button"
					onClick={() => router.push('/admin/blog')}
					className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
				>
					Cancel
				</button>
				<button
					type="submit"
					disabled={loading}
					className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
				>
					{loading ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
				</button>
			</div>
		</form>
	);
}
