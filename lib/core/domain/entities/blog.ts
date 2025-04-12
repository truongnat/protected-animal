export interface BlogPost {
	id: string;
	title: string;
	slug: string;
	content: string;
	excerpt: string;
	coverImage: string;
	publishedAt: string;
	author: string;
	description: string;
	image?: string;
	date: string;
	readingTime?: number;
	tags?: string[];
}

export interface BlogRepository {
	getPostBySlug(slug: string): Promise<BlogPost | null>;
	getAllPosts(): Promise<BlogPost[]>;
	createPost(post: Omit<BlogPost, 'id'>): Promise<BlogPost>;
	updatePost(id: string, post: Partial<BlogPost>): Promise<BlogPost>;
	deletePost(id: string): Promise<void>;
}
