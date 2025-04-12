'use client';

import { useState, useEffect } from 'react';
import { useMDXComponents } from '@/mdx-components';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import remarkGfm from 'remark-gfm';

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps) {
  const [compiledSource, setCompiledSource] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
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
    return <div className="animate-pulse h-96 bg-muted/20 rounded-lg"></div>;
  }

  if (error) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 text-red-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Error rendering content</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!compiledSource) {
    return <div>No content available</div>;
  }

  return (
    <div className="mdx-content">
      <MDXRemote
        {...compiledSource}
        components={useMDXComponents({})}
      />
    </div>
  );
}
