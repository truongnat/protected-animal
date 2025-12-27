import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { type NextRequest, NextResponse } from 'next/server';

// Path to the blog content directory
const contentDirectory = path.join(process.cwd(), 'content', 'blog');

// GET /api/blog - Get all blog posts
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const tag = searchParams.get('tag');
		const limit = searchParams.get('limit')
			? Number.parseInt(searchParams.get('limit') as string)
			: 10;

		// Get all markdown files from the content directory
		const fileNames = await fs.readdir(contentDirectory);

		// Process files in parallel
		const postsPromises = fileNames
			.filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
			.map(async (fileName) => {
				// Remove the file extension to get the slug
				const slug = fileName.replace(/\.mdx?$/, '');

				// Read the markdown file
				const fullPath = path.join(contentDirectory, fileName);
				const fileContents = await fs.readFile(fullPath, 'utf8');

				// Parse the frontmatter
				const { data } = matter(fileContents);

				// Return the post metadata (without content for the list view)
				return {
					id: slug,
					slug,
					title: data.title || '',
					excerpt: data.description || '',
					coverImage: data.image || '',
					publishedAt: data.date || new Date().toISOString(),
					author: data.author?.name || '',
					description: data.description || '',
					image: data.image || '',
					date: data.date || new Date().toISOString(),
					readingTime: data.readingTime || 0,
					tags: data.tags || [],
				};
			});

		// Wait for all posts to be processed
		let posts = await Promise.all(postsPromises);

		// Filter by tag if provided
		if (tag) {
			posts = posts.filter(
				(post) => post.tags && post.tags.some((t: string) => t.toLowerCase() === tag.toLowerCase()),
			);
		}

		// Sort posts by date (newest first)
		const sortedPosts = posts.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		);

		// Apply limit
		const limitedPosts = sortedPosts.slice(0, limit);

		return NextResponse.json(limitedPosts);
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
	}
}
