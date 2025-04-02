import BlogPostForm from '@/components/admin/BlogPostForm';

export default function NewBlogPostPage() {
	return (
		<div>
			<h1 className="text-2xl font-semibold text-gray-900 mb-6">Create New Blog Post</h1>
			<div className="bg-white shadow overflow-hidden sm:rounded-md p-6">
				<BlogPostForm />
			</div>
		</div>
	);
}
