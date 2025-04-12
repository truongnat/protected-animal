'use client'

import { useEffect, useState } from 'react';
import { BlogPost } from '../core/domain/entities/blog';
import { BlogFactory } from '../core/factories/blog.factory';

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Get use case from factory
    const getBlogPostUseCase = BlogFactory.createGetBlogPostUseCase();

    getBlogPostUseCase
      .execute(slug)
      .then((data) => {
        if (data) {
          // Serialize the data before setting state
          setPost(JSON.parse(JSON.stringify(data)));
        } else {
          setPost(null);
        }
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [slug]);

  return { post, loading, error };
}