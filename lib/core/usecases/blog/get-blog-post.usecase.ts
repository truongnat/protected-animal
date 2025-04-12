import type { BlogPost, BlogRepository } from '../../domain/entities/blog';

export class GetBlogPostUseCase {
	constructor(private blogRepository: BlogRepository) {}

	async execute(slug: string): Promise<BlogPost | null> {
		return this.blogRepository.getPostBySlug(slug);
	}
}
