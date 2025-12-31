import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Card component props interface
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Card component
 *
 * A container component that provides a card-style layout with border, background, and shadow.
 * Use as a wrapper for related content with optional header, content, and footer sections.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description text</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card content goes here</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
		{...props}
	/>
));
Card.displayName = 'Card';

/**
 * CardHeader component props interface
 */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * CardHeader component
 *
 * Header section of a card, typically containing title and description.
 * Provides consistent spacing and layout for card headers.
 */
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
	),
);
CardHeader.displayName = 'CardHeader';

/**
 * CardTitle component props interface
 */
export interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * CardTitle component
 *
 * Title element for card headers. Renders as a div with heading-style typography.
 * For semantic HTML, consider wrapping content in an h2 or h3 element.
 *
 * @example
 * ```tsx
 * <CardTitle>
 *   <h2>My Card Title</h2>
 * </CardTitle>
 * ```
 */
const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
			{...props}
		/>
	),
);
CardTitle.displayName = 'CardTitle';

/**
 * CardDescription component props interface
 */
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * CardDescription component
 *
 * Description text for card headers. Provides muted styling for secondary information.
 */
const CardDescription = React.forwardRef<HTMLDivElement, CardDescriptionProps>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
	),
);
CardDescription.displayName = 'CardDescription';

/**
 * CardContent component props interface
 */
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * CardContent component
 *
 * Main content area of a card. Provides consistent padding for card body content.
 */
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
	),
);
CardContent.displayName = 'CardContent';

/**
 * CardFooter component props interface
 */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * CardFooter component
 *
 * Footer section of a card, typically containing actions or additional information.
 * Uses flexbox layout for horizontal arrangement of footer content.
 */
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
	),
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
