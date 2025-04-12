import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { type NextRequest, NextResponse } from 'next/server';

// Path to the blog content directory
const contentDirectory = path.join(process.cwd(), 'content', 'blog');

// GET /api/blog/[slug] - Get a specific blog post by slug
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
	try {
		const slug = params.slug;

		// Check if the file exists with .mdx extension
		const mdxPath = path.join(contentDirectory, `${slug}.mdx`);
		let filePath: string;

		try {
			await fs.access(mdxPath);
			filePath = mdxPath;
		} catch {
			// Try with .md extension if .mdx doesn't exist
			const mdPath = path.join(contentDirectory, `${slug}.md`);
			try {
				await fs.access(mdPath);
				filePath = mdPath;
			} catch {
				return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
			}
		}

		// Read the markdown file
		const fileContents = await fs.readFile(filePath, 'utf8');

		// Parse the frontmatter
		const { data, content } = matter(fileContents);

		// Convert markdown to HTML with enhanced styling
		const processedContent = await remark()
			.use(html, { sanitize: false }) // Don't sanitize to allow custom HTML
			.process(content);

		// Get the HTML content
		let contentHtml = processedContent.toString();

		// Fix HTML to ensure all tags are properly formatted
		contentHtml = contentHtml
			// Fix self-closing tags
			.replace(/<img([^>]*)>/g, '<img$1 />')
			// Enhance image styling
			.replace(/<p><img([^>]*) \/><\/p>/g, '<div class="image-container"><img$1 /></div>')
			// Fix other self-closing tags
			.replace(/<p><([^>]*) \/><\/p>/g, '<$1 />')
			// Add classes to headings
			.replace(/<h1>/g, '<h1 class="heading-1">')
			.replace(/<h2>/g, '<h2 class="heading-2">')
			.replace(/<h3>/g, '<h3 class="heading-3">')
			// Add classes to lists
			.replace(/<ul>/g, '<ul class="list-disc">')
			.replace(/<ol>/g, '<ol class="list-decimal">')
			// Add classes to code blocks
			.replace(/<pre><code>/g, '<pre class="code-block"><code>')
			// Add classes to blockquotes
			.replace(/<blockquote>/g, '<blockquote class="blockquote">');

		// Wrap the content in a div with a class for styling
		contentHtml = `<div class="markdown-content">${contentHtml}</div>`;


		// Create a post object
		const post = {
			id: slug,
			slug,
			title: data.title || '',
			excerpt: data.description || '',
			content: contentHtml, // HTML content
			coverImage: data.image || '',
			publishedAt: data.date || new Date().toISOString(),
			author: data.author?.name || '',
			description: data.description || '',
			image: data.image || '',
			date: data.date || new Date().toISOString(),
			readingTime: data.readingTime || 0,
			tags: data.tags || []
		};

		return NextResponse.json(post);
	} catch (error) {
		console.error(`Error getting post by slug:`, error);
		return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
	}
}
