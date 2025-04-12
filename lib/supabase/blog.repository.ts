import { BlogPost, BlogRepository } from '../../../core/domain/entities/blog';
import { supabase } from './client';

export class SupabaseBlogRepository implements BlogRepository {
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  }

  async getAllPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase.from('blog_posts').select('*');
    if (error) throw error;
    return data;
  }

  async createPost(post: Omit<BlogPost, 'id'>): Promise<BlogPost> {
    const { data, error } = await supabase.from('blog_posts').insert(post).select().single();
    if (error) throw error;
    return data;
  }

  async updatePost(id: string, post: Partial<BlogPost>): Promise<BlogPost> {
    const { data, error } = await supabase.from('blog_posts').update(post).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async deletePost(id: string): Promise<void> {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) throw error;
  }

  // Implement other repository methods...
} 