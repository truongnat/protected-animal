import { BlogPost, BlogRepository } from '../core/domain/entities/blog';
import { markdownConfig } from './config';

// Cache for blog posts to improve performance
let postsCache: BlogPost[] | null = null;

export class MarkdownBlogRepository implements BlogRepository {
  constructor() {}

  // Helper method to fetch from API
  private async fetchFromApi(path: string): Promise<any> {
    // Get the origin for absolute URLs
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    // Create the full URL
    const fullUrl = `${origin}${path}`;

    const response = await fetch(fullUrl, { next: { revalidate: 60 } }); // Cache for 60 seconds

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get all blog posts from API
   */
  async getAllPosts(): Promise<BlogPost[]> {
    try {
      // Return cached posts if available
      if (postsCache) {
        return postsCache;
      }

      // Fetch posts from API
      const posts = await this.fetchFromApi('/api/blog');

      // Cache the posts
      postsCache = posts;

      return posts;
    } catch (error) {
      console.error('Error getting all posts:', error);
      return [];
    }
  }

  /**
   * Get a blog post by slug from API
   */
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      // Try to find the post in the cache first
      if (postsCache) {
        const cachedPost = postsCache.find(post => post.slug === slug);
        if (cachedPost && cachedPost.content) {
          return cachedPost;
        }
      }

      // Fetch post from API
      const post = await this.fetchFromApi(`/api/blog/${slug}`);

      return post;
    } catch (error) {
      console.error(`Error getting post by slug ${slug}:`, error);
      return null;
    }
  }

  /**
   * Create a new blog post (not implemented for client-side)
   * This would require a POST API endpoint
   */
  async createPost(post: Omit<BlogPost, 'id'>): Promise<BlogPost> {
    throw new Error('Creating posts is not supported in the client. Use the admin interface.');
  }

  /**
   * Update a blog post (not implemented for client-side)
   * This would require a PUT API endpoint
   */
  async updatePost(id: string, post: Partial<BlogPost>): Promise<BlogPost> {
    throw new Error('Updating posts is not supported in the client. Use the admin interface.');
  }

  /**
   * Delete a blog post (not implemented for client-side)
   * This would require a DELETE API endpoint
   */
  async deletePost(id: string): Promise<void> {
    throw new Error('Deleting posts is not supported in the client. Use the admin interface.');
  }
}
