import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { BlogPost } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'content/blog');

// Default images for fallback
const DEFAULT_IMAGES = {
	featured: '/images/blog/featured-default.jpg',
	author: '/images/blog/author-default.jpg',
};

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
	try {
		const fullPath = path.join(postsDirectory, `${slug}.mdx`);
		const fileContents = fs.readFileSync(fullPath, 'utf8');
		const { data, content } = matter(fileContents);

		return {
			slug,
			title: data.title,
			description: data.description,
			date: data.date,
			content,
			readingTime: data.readingTime,
			tags: data.tags,
			image: data.image || DEFAULT_IMAGES.featured,
			author: data.author?.name || 'Anonymous',
		};
	} catch (_error) {
		return null;
	}
}

export async function getAllBlogPosts() {
	const files = fs.readdirSync(postsDirectory);
	const posts = files.map((file) => {
		const slug = file.replace(/\.mdx$/, '');
		const fullPath = path.join(postsDirectory, file);
		const fileContents = fs.readFileSync(fullPath, 'utf8');
		const { data } = matter(fileContents);

		return {
			slug,
			title: data.title,
			description: data.description,
			date: data.date,
		};
	});

	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
