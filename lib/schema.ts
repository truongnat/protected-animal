import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';

// Species table
export const species = sqliteTable('species', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  scientificName: text('scientific_name').notNull(),
  conservationStatus: text('conservation_status').notNull(),
  population: integer('population'),
  habitat: text('habitat'),
  description: text('description'),
  imageUrl: text('image_url'),
  region: text('region'),
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
});

// Indexes for species
export const speciesRegionIndex = index('species_region_idx').on(species.region);
export const speciesStatusIndex = index('species_status_idx').on(species.conservationStatus);
export const speciesNameIndex = index('species_name_idx').on(species.name);
export const speciesScientificNameIndex = index('species_scientific_name_idx').on(species.scientificName);

// Blog posts table
export const blogPosts = sqliteTable('blog_posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content'),
  excerpt: text('excerpt'),
  coverImage: text('cover_image'),
  publishedAt: text('published_at'),
  author: text('author'),
  description: text('description'),
  image: text('image'),
  date: text('date'),
  readingTime: integer('reading_time'),
  tags: text('tags'), // JSON string
});

// Indexes for blog posts
export const blogPostsSlugIndex = index('blog_posts_slug_idx').on(blogPosts.slug);
export const blogPostsDateIndex = index('blog_posts_date_idx').on(blogPosts.date);

// Admin users table
export const adminUsers = sqliteTable('admin_users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').default('admin'),
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
});

// Indexes for admin users
export const adminUsersEmailIndex = index('admin_users_email_idx').on(adminUsers.email);

// Settings table
export const settings = sqliteTable('settings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  key: text('key').notNull().unique(),
  value: text('value'),
});

// Indexes for settings
export const settingsKeyIndex = index('settings_key_idx').on(settings.key);

// Team members table
export const teamMembers = sqliteTable('team_members', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  role: text('role'),
  bio: text('bio'),
  imageUrl: text('image_url'),
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
});

// Indexes for team members
export const teamMembersNameIndex = index('team_members_name_idx').on(teamMembers.name);