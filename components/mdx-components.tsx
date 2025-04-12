'use client';

import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { Alert } from '@/components/ui/alert';
import { Callout } from '@/components/ui/callout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type React from 'react';

interface MDXComponentProps {
	children?: React.ReactNode;
}

interface MDXLinkProps extends MDXComponentProps {
	href?: string;
}

interface MDXImageProps {
	src?: string;
	alt?: string;
}

interface MDXCalloutProps extends MDXComponentProps {
	type?: 'default' | 'warning' | 'success' | 'error' | 'info';
}

interface MDXAlertProps extends MDXComponentProps {
	variant?: 'default' | 'destructive';
}

interface MDXTabProps extends MDXComponentProps {
	value?: string;
}

export function useMDXComponents(components: Record<string, React.ComponentType>) {
	return {
		h1: ({ children }: MDXComponentProps) => (
			<h1 className="text-4xl font-bold mb-6 mt-8 text-foreground">{children}</h1>
		),
		h2: ({ children }: MDXComponentProps) => (
			<h2 className="text-3xl font-bold mb-4 mt-8 text-foreground">{children}</h2>
		),
		h3: ({ children }: MDXComponentProps) => (
			<h3 className="text-2xl font-bold mb-3 mt-6 text-foreground">{children}</h3>
		),
		p: ({ children }: MDXComponentProps) => (
			<p className="text-lg leading-relaxed mb-4 text-foreground">{children}</p>
		),
		ul: ({ children }: MDXComponentProps) => (
			<ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">{children}</ul>
		),
		ol: ({ children }: MDXComponentProps) => (
			<ol className="list-decimal pl-6 mb-4 space-y-2 text-foreground">{children}</ol>
		),
		li: ({ children }: MDXComponentProps) => (
			<li className="text-lg text-foreground">{children}</li>
		),
		a: ({ href, children }: MDXLinkProps) => (
			<a href={href} className="text-primary hover:underline font-medium">
				{children}
			</a>
		),
		blockquote: ({ children }: MDXComponentProps) => (
			<blockquote className="border-l-4 border-primary pl-4 italic my-6 text-lg text-foreground bg-muted/50 p-4 rounded-r-lg">
				{children}
			</blockquote>
		),
		code: ({ children }: MDXComponentProps) => (
			<code className="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground">
				{children}
			</code>
		),
		pre: ({ children }: MDXComponentProps) => (
			<pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4 text-sm font-mono text-foreground border border-border">
				{children}
			</pre>
		),
		img: ({ src, alt }: MDXImageProps) => (
			<div className="my-8">
				<ImageWithFallback
					src={src || ''}
					alt={alt || ''}
					width={800}
					height={400}
					className="rounded-lg shadow-lg dark:shadow-gray-800/50"
					fallbackSrc="/images/blog/featured-default.jpg"
				/>
				{alt && <p className="text-center text-muted-foreground mt-2">{alt}</p>}
			</div>
		),
		Callout: ({ children, type = 'default' }: MDXCalloutProps) => (
			<Callout type={type}>{children}</Callout>
		),
		Alert: ({ children, variant = 'default' }: MDXAlertProps) => (
			<Alert variant={variant}>{children}</Alert>
		),
		Tabs: ({ children }: MDXComponentProps) => <Tabs>{children}</Tabs>,
		TabsList: ({ children }: MDXComponentProps) => <TabsList>{children}</TabsList>,
		TabsTrigger: ({ children, value }: MDXTabProps) => (
			<TabsTrigger value={value || ''}>{children}</TabsTrigger>
		),
		TabsContent: ({ children, value }: MDXTabProps) => (
			<TabsContent value={value || ''}>{children}</TabsContent>
		),
		...components,
	};
}
