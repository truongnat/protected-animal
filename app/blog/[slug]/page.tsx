import fs from 'fs';
import path from 'path';
import { MDXContent } from '@/components/features/blog/mdx-content';
import { Button } from '@/components/ui/button';
import { FormattedDate } from '@/components/ui/formatted-date';
import matter from 'gray-matter';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
	params: Promise<{
		slug: string;
	}>;
}

// Function to get all blog post slugs for static generation
export function generateStaticParams() {
	const contentDirectory = path.join(process.cwd(), 'content', 'blog');
	const filenames = fs.readdirSync(contentDirectory);

	return filenames.map((filename) => ({
		slug: filename.replace('.mdx', ''),
	}));
}

// Function to get a specific blog post by slug
async function getBlogPost(slug: string) {
	const contentDirectory = path.join(process.cwd(), 'content', 'blog');
	const filePath = path.join(contentDirectory, `${slug}.mdx`);

	try {
		const fileContents = fs.readFileSync(filePath, 'utf8');
		const { data, content } = matter(fileContents);

		// Get author name - ensure it's always a string
		let author = '';
		if (data.author) {
			if (typeof data.author === 'string') {
				author = data.author;
			} else if (typeof data.author === 'object' && data.author.name) {
				// Handle case where author is an object with a name property
				author = data.author.name;
			}
		}

		return {
			slug,
			title: data.title,
			description: data.description,
			date: data.date,
			author: author,
			readingTime: data.readingTime || 5, // Default to 5 minutes if not specified
			content: content, // Include the raw MDX content
		};
	} catch (error) {
		console.error(`Error reading blog post ${slug}:`, error);
		return null;
	}
}

// Generate metadata for the page
export async function generateMetadata({ params }: BlogPostPageProps) {
	// await params in server side
	const { slug } = await params;

	const post = await getBlogPost(slug);

	if (!post) {
		return {
			title: 'Blog Post Not Found',
			description: 'The requested blog post could not be found.',
		};
	}

	return {
		title: `${post.title} | Protected Animal Blog`,
		description: post.description,
	};
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	// await params in server side
	const { slug } = await params;

	// Get post metadata and content
	const post = await getBlogPost(slug);

	if (!post) notFound();

	// Post found, continue with rendering

	return (
		<main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
			<div className="container mx-auto px-4 py-12">
				{/* Back button */}
				<div className="mb-8">
					<Link href="/blog">
						<Button variant="ghost" className="gap-2">
							<ArrowLeft className="h-4 w-4" />
							Back to Blog
						</Button>
					</Link>
				</div>

				{/* Post header */}
				<div className="mb-8">
					<h1 className="text-4xl font-bold mb-4">{post.title}</h1>
					<div className="flex flex-wrap gap-4 text-muted-foreground">
						<div className="flex items-center">
							<Calendar className="mr-2 h-4 w-4" />
							<FormattedDate date={post.date} format="long" />
						</div>
						{post.author && (
							<div className="flex items-center">
								<User className="mr-2 h-4 w-4" />
								{post.author}
							</div>
						)}
						{post.readingTime && (
							<div className="flex items-center">
								<Clock className="mr-2 h-4 w-4" />
								{post.readingTime} min read
							</div>
						)}
					</div>
				</div>

				{/* Post content */}
				<article className="prose prose-lg dark:prose-invert max-w-none prose-table:overflow-hidden prose-table:border prose-table:border-gray-200 dark:prose-table:border-gray-700 prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:p-2 prose-td:p-2 prose-td:border-t prose-td:border-gray-200 dark:prose-td:border-gray-700">
					{/* Render the MDX content using the client component */}
					<MDXContent content={post.content} />
				</article>
			</div>
		</main>
	);
}
