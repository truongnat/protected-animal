'use client';

import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Callout } from '@/components/ui/callout'
import {
  Tabs as TabsUI,
  TabsList as TabsListUI,
  TabsTrigger as TabsTriggerUI,
  TabsContent as TabsContentUI
} from '@/components/ui/tabs'
import ImageWithFallback from '@/components/ui/image-with-fallback'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-8 mb-4 text-black dark:text-white">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-6 mb-3 text-black dark:text-white border-b border-gray-200 dark:border-gray-700 pb-1">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mt-4 mb-2 text-black dark:text-white">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold mt-4 mb-2 text-black dark:text-white">{children}</h4>
    ),

    // Basic elements
    p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    a: ({ href, children }) =>
      href?.startsWith('/') ? (
        <Link href={href} className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
          {children}
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
          {children}
        </a>
      ),

    // Lists
    ul: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
    li: ({ children }) => <li className="mb-1">{children}</li>,

    // Images
    img: ({ src, alt }) => {
      // Define default and fallback image paths
      const defaultImagePath = '/images/default-image.png';
      const fallbackImagePath = '/images/default-image.png';

      // Function to get the proper image source
      const getImageSrc = () => {
        // If no src provided, use default image
        if (!src) return defaultImagePath;

        // If src is a full URL (starts with http or https), use it directly
        if (src.startsWith('http://') || src.startsWith('https://')) {
          return src;
        }

        // For local images, ensure they start with a slash
        return src.startsWith('/') ? src : `/${src}`;
      };

      return (
        <figure className="my-8">
          <div className="flex justify-center">
            <ImageWithFallback
              src={getImageSrc()}
              fallbackSrc={fallbackImagePath}
              alt={alt || 'Blog image'}
              width={800}
              height={400}
              className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            />
          </div>
          {alt && <figcaption className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">{alt}</figcaption>}
        </figure>
      );
    },

    // Code blocks
    pre: ({ children }) => (
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-6 text-sm">{children}</pre>
    ),
    code: ({ children }) => {
      // Check if this is an inline code block (parent is not a pre)
      const isInline = typeof children === 'string' &&
                      !(children as any)?.props?.className?.includes('language-');

      if (isInline) {
        return (
          <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
        );
      }

      // For code blocks, just return the children (they'll be wrapped in a pre)
      return children;
    },

    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-500 dark:text-gray-400">
        {children}
      </blockquote>
    ),

    // Table
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-gray-100 dark:bg-gray-800">{children}</thead>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => <tr className="border-b border-gray-200 dark:border-gray-700">{children}</tr>,
    th: ({ children }) => <th className="px-4 py-2 text-left font-semibold">{children}</th>,
    td: ({ children }) => <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">{children}</td>,

    // Horizontal rule
    hr: () => <hr className="my-8 border-t border-gray-200 dark:border-gray-700" />,

    // Custom components
    Alert: ({ children, variant = 'default' }) => (
      <Alert variant={variant} className="my-4">
        <AlertDescription>{children}</AlertDescription>
      </Alert>
    ),
    AlertTitle: ({ children }) => <AlertTitle>{children}</AlertTitle>,
    AlertDescription: ({ children }) => <AlertDescription>{children}</AlertDescription>,

    // Callout component
    Callout: ({ children, type = 'default' }) => (
      <Callout type={type} className="my-4">{children}</Callout>
    ),

    // Tabs components
    Tabs: ({ children, defaultValue }) => (
      <TabsUI defaultValue={defaultValue} className="my-4">{children}</TabsUI>
    ),
    TabsList: ({ children }) => <TabsListUI>{children}</TabsListUI>,
    TabsTrigger: ({ children, value }) => <TabsTriggerUI value={value}>{children}</TabsTriggerUI>,
    TabsContent: ({ children, value }) => <TabsContentUI value={value}>{children}</TabsContentUI>,

    // Merge with any components provided through props
    ...components,
  }
}
