import { createBrowserClient } from '@supabase/ssr';

// Create a Supabase client for use in the browser
export const supabase = createBrowserClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// Export types for better type safety
export type { User, Session } from '@supabase/supabase-js';

// Define the database schema types
export interface Species {
	id: number;
	name: string;
	scientific_name: string;
	conservation_status: string;
	population: number;
	habitat: string;
	description: string;
	image_url: string;
	region: string;
	created_at: string;
}

export type BlogPost = {
	id: number;
	title: string;
	content: string;
	author: string;
	image_url: string;
	published_at: string;
	category: string;
	tags: string[];
	slug: string;
};
