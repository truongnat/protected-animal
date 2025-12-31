import { MarkdownBlogRepository } from '../../markdown/blog.repository';
import type { BlogRepository } from '../domain/entities/blog';
import { GetAllBlogPostsUseCase } from '../usecases/blog/get-all-blog-posts.usecase';
import { GetBlogPostUseCase } from '../usecases/blog/get-blog-post.usecase';

/**
 * Factory for creating blog-related use cases and repositories
 */
export class BlogFactory {
	private static repository: BlogRepository | null = null;

	/**
	 * Get the blog repository instance (singleton)
	 */
	static getRepository(): BlogRepository {
		if (!BlogFactory.repository) {
			BlogFactory.repository = new MarkdownBlogRepository();
		}
		return BlogFactory.repository;
	}

	/**
	 * Create a GetBlogPostUseCase instance
	 */
	static createGetBlogPostUseCase(): GetBlogPostUseCase {
		return new GetBlogPostUseCase(BlogFactory.getRepository());
	}

	/**
	 * Create a GetAllBlogPostsUseCase instance
	 */
	static createGetAllBlogPostsUseCase(): GetAllBlogPostsUseCase {
		return new GetAllBlogPostsUseCase(BlogFactory.getRepository());
	}
}
