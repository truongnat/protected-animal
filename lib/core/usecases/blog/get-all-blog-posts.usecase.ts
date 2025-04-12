import type { BlogPost, BlogRepository } from '../../domain/entities/blog';

export class GetAllBlogPostsUseCase {
	constructor(private blogRepository: BlogRepository) {}

	async execute(): Promise<BlogPost[]> {
		return this.blogRepository.getAllPosts();
	}
}
