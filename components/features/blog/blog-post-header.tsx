import { Calendar, Clock, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import type { BlogPost } from '@/lib/core/domain/entities/blog';
import { markdownConfig } from '@/lib/markdown/config';

interface BlogPostHeaderProps {
	post: BlogPost;
}

export function BlogPostHeader({ post }: BlogPostHeaderProps) {
	return (
		<div className="mb-8">
			<h1 className="text-5xl font-bold mb-4 text-foreground">{post.title}</h1>
			<div className="flex items-center gap-4 text-muted-foreground">
				<div className="flex items-center">
					<Calendar className="mr-2 h-4 w-4" />
					{new Date(post.date).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
				</div>
				<div className="flex items-center">
					<Clock className="mr-2 h-4 w-4" />
					{post.readingTime} min read
				</div>
			</div>
			{post.tags && (
				<div className="flex flex-wrap gap-2 mt-4">
					{post.tags.map((tag) => (
						<Badge key={tag} variant="secondary">
							<Tag className="mr-2 h-3 w-3" />
							{tag}
						</Badge>
					))}
				</div>
			)}
			<div className="mt-8">
				<ImageWithFallback
					src={post.image || markdownConfig.defaultImage}
					alt={post.title}
					width={1200}
					height={600}
					className="rounded-lg shadow-lg dark:shadow-gray-800/50"
				/>
			</div>
		</div>
	);
}
