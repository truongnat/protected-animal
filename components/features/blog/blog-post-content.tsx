'use client';

import type { BlogPost } from '@/lib/core/domain/entities/blog';

interface BlogPostContentProps {
	post: BlogPost;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
	// Add comprehensive styles for markdown content
	const blogStyles = `
    /* Base styles */
    .markdown-content {
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.75;
      color: #374151;
      max-width: 100%;
    }

    /* Dark mode */
    @media (prefers-color-scheme: dark) {
      .markdown-content {
        color: #e5e7eb;
      }
    }

    /* Headings */
    .heading-1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-top: 2rem;
      margin-bottom: 1.5rem;
      line-height: 1.2;
      color: #111827;
    }

    .heading-2 {
      font-size: 2rem;
      font-weight: 700;
      margin-top: 2rem;
      margin-bottom: 1rem;
      line-height: 1.3;
      color: #111827;
    }

    .heading-3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      line-height: 1.4;
      color: #111827;
    }

    /* Dark mode headings */
    @media (prefers-color-scheme: dark) {
      .heading-1, .heading-2, .heading-3 {
        color: #f3f4f6;
      }
    }

    /* Paragraphs */
    .markdown-content p {
      margin-bottom: 1.25rem;
      font-size: 1.125rem;
    }

    /* Lists */
    .list-disc {
      list-style-type: disc;
      margin-left: 1.5rem;
      margin-bottom: 1.25rem;
    }

    .list-decimal {
      list-style-type: decimal;
      margin-left: 1.5rem;
      margin-bottom: 1.25rem;
    }

    .markdown-content li {
      margin-bottom: 0.5rem;
      font-size: 1.125rem;
    }

    /* Links */
    .markdown-content a {
      color: #2563eb;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;
    }

    .markdown-content a:hover {
      color: #1d4ed8;
      text-decoration: underline;
    }

    /* Dark mode links */
    @media (prefers-color-scheme: dark) {
      .markdown-content a {
        color: #3b82f6;
      }
      .markdown-content a:hover {
        color: #60a5fa;
      }
    }

    /* Images */
    .image-container {
      margin: 2rem 0;
      text-align: center;
    }

    .markdown-content img {
      max-width: 100%;
      height: auto;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    /* Code blocks */
    .code-block {
      background-color: #f3f4f6;
      border-radius: 0.5rem;
      padding: 1rem;
      margin: 1.5rem 0;
      overflow-x: auto;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    /* Dark mode code blocks */
    @media (prefers-color-scheme: dark) {
      .code-block {
        background-color: #1f2937;
        color: #e5e7eb;
      }
    }

    /* Inline code */
    .markdown-content code {
      background-color: #f3f4f6;
      border-radius: 0.25rem;
      padding: 0.2rem 0.4rem;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 0.875rem;
    }

    /* Dark mode inline code */
    @media (prefers-color-scheme: dark) {
      .markdown-content code {
        background-color: #1f2937;
        color: #e5e7eb;
      }
    }

    /* Blockquotes */
    .blockquote {
      border-left: 4px solid #e5e7eb;
      padding-left: 1rem;
      margin: 1.5rem 0;
      font-style: italic;
      color: #6b7280;
    }

    /* Dark mode blockquotes */
    @media (prefers-color-scheme: dark) {
      .blockquote {
        border-left-color: #4b5563;
        color: #9ca3af;
      }
    }

    /* Tables */
    .markdown-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
      overflow: hidden;
      border-radius: 0.5rem;
    }

    .markdown-content th {
      background-color: #f3f4f6;
      padding: 0.75rem 1rem;
      text-align: left;
      font-weight: 600;
      border-bottom: 1px solid #e5e7eb;
    }

    .markdown-content td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .markdown-content tr:last-child td {
      border-bottom: none;
    }

    /* Dark mode tables */
    @media (prefers-color-scheme: dark) {
      .markdown-content th {
        background-color: #1f2937;
        border-bottom-color: #4b5563;
      }
      .markdown-content td {
        border-bottom-color: #4b5563;
      }
    }

    /* Horizontal rule */
    .markdown-content hr {
      border: 0;
      height: 1px;
      background-color: #e5e7eb;
      margin: 2rem 0;
    }

    /* Dark mode horizontal rule */
    @media (prefers-color-scheme: dark) {
      .markdown-content hr {
        background-color: #4b5563;
      }
    }
  `;

	return (
		<>
			<style jsx global>
				{blogStyles}
			</style>
			<article
				className="blog-post-content"
				dangerouslySetInnerHTML={{ __html: post.content as string }}
			/>
		</>
	);
}
