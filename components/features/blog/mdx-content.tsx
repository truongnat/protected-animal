'use client';

import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useState } from 'react';
import remarkGfm from 'remark-gfm';
import { useMDXComponents } from '@/mdx-components';

/**
 * Props for the MDXContent component
 */
interface MDXContentProps {
	/** The raw markdown/MDX content string to be compiled and rendered */
	content: string;
}

/**
 * MDXContent Component
 *
 * A client component that compiles and renders MDX (Markdown with JSX) content.
 * This component handles the asynchronous compilation of markdown content with
 * GitHub Flavored Markdown support, including proper error handling and loading states.
 *
 * @example
 * ```tsx
 * <MDXContent content="# Hello World\n\nThis is **markdown** content." />
 * ```
 *
 * @param props - Component props
 * @returns Rendered MDX content with loading and error states
 */
export function MDXContent({ content }: MDXContentProps) {
	const [compiledSource, setCompiledSource] = useState<MDXRemoteSerializeResult | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		/**
		 * Compiles markdown content into MDX format
		 * Handles errors during compilation and updates component state accordingly
		 */
		async function compileMarkdown() {
			try {
				setIsLoading(true);
				const mdxSource = await serialize(content, {
					// Add MDX options to properly handle tables and other elements
					mdxOptions: {
						remarkPlugins: [
							remarkGfm, // GitHub Flavored Markdown for tables
						],
					},
				});
				setCompiledSource(mdxSource);
				setError(null);
			} catch (err) {
				console.error('Error compiling MDX:', err);
				setError(err instanceof Error ? err : new Error('Failed to compile MDX'));
			} finally {
				setIsLoading(false);
			}
		}

		compileMarkdown();
	}, [content]);

	if (isLoading) {
		return (
			<div
				className="animate-pulse h-96 bg-muted/20 rounded-lg"
				role="status"
				aria-label="Loading content"
			/>
		);
	}

	if (error) {
		return (
			<div
				className="p-4 border border-red-300 bg-red-50 dark:bg-red-950 dark:border-red-800 text-red-800 dark:text-red-200 rounded-lg"
				role="alert"
			>
				<h3 className="text-lg font-semibold mb-2">Error rendering content</h3>
				<p>{error.message}</p>
			</div>
		);
	}

	if (!compiledSource) {
		return <div className="text-muted-foreground">No content available</div>;
	}

	return (
		<div className="mdx-content">
			<MDXRemote {...compiledSource} components={useMDXComponents({})} />
		</div>
	);
}
