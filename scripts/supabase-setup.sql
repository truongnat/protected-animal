-- SQL script to set up tables and functions in Supabase
-- Run this in the Supabase SQL Editor before running the seed script

-- Create species table
CREATE TABLE IF NOT EXISTS public.species (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  scientific_name TEXT NOT NULL,
  conservation_status TEXT NOT NULL,
  population INTEGER,
  habitat TEXT,
  description TEXT,
  image_url TEXT,
  region TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  category TEXT,
  tags TEXT[],
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create function to create species table if it doesn't exist
CREATE OR REPLACE FUNCTION create_species_table_if_not_exists()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.species (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    scientific_name TEXT NOT NULL,
    conservation_status TEXT NOT NULL,
    population INTEGER,
    habitat TEXT,
    description TEXT,
    image_url TEXT,
    region TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
END;
$$ LANGUAGE plpgsql;

-- Create function to create blog_posts table if it doesn't exist
CREATE OR REPLACE FUNCTION create_blog_posts_table_if_not_exists()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.blog_posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    image_url TEXT,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    category TEXT,
    tags TEXT[],
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
END;
$$ LANGUAGE plpgsql;

-- Set up Row Level Security (RLS) policies
-- Enable RLS on the tables
ALTER TABLE public.species ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous access (read-only)
CREATE POLICY "Allow anonymous read access to species"
  ON public.species FOR SELECT
  USING (true);

CREATE POLICY "Allow anonymous read access to blog_posts"
  ON public.blog_posts FOR SELECT
  USING (true);

-- Create policies for authenticated users (full access)
CREATE POLICY "Allow authenticated users full access to species"
  ON public.species FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users full access to blog_posts"
  ON public.blog_posts FOR ALL
  USING (auth.role() = 'authenticated');

-- Create policies for service role (for seeding data)
CREATE POLICY "Allow service role full access to species"
  ON public.species FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access to blog_posts"
  ON public.blog_posts FOR ALL
  USING (auth.role() = 'service_role');

-- Alternatively, you can temporarily disable RLS for seeding
-- Uncomment these lines if you're still having issues with the service role policies
-- ALTER TABLE public.species DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.blog_posts DISABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS species_name_idx ON public.species (name);
CREATE INDEX IF NOT EXISTS species_conservation_status_idx ON public.species (conservation_status);
CREATE INDEX IF NOT EXISTS species_region_idx ON public.species (region);

CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON public.blog_posts (slug);
CREATE INDEX IF NOT EXISTS blog_posts_category_idx ON public.blog_posts (category);
CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON public.blog_posts (published_at);

-- Grant necessary permissions
GRANT SELECT ON public.species TO anon;
GRANT SELECT ON public.blog_posts TO anon;

GRANT ALL ON public.species TO authenticated;
GRANT ALL ON public.blog_posts TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE species_id_seq TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE blog_posts_id_seq TO authenticated;
