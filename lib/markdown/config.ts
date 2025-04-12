import path from 'path';

export const markdownConfig = {
  // Path to the blog content directory
  contentDirectory: path.join(process.cwd(), 'content', 'blog'),
  
  // Default image to use when a blog post doesn't have an image
  defaultImage: '/images/blog-placeholder.jpg',
  
  // Default author information
  defaultAuthor: {
    name: 'Protected Animals Team',
    avatar: '/images/default-avatar.jpg',
    bio: 'Wildlife conservation experts dedicated to protecting endangered species.'
  },
  
  // Default reading time in minutes
  defaultReadingTime: 5,
  
  // Default tags
  defaultTags: ['Wildlife', 'Conservation'],
  
  // File extensions to look for
  fileExtensions: ['.mdx', '.md']
};
