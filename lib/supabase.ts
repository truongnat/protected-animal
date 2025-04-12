import { createBrowserClient } from '@supabase/ssr';

// Create a Supabase client for use in the browser
export const supabase = createBrowserClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// Export types for better type safety
export type { User, Session } from '@supabase/supabase-js';

// Note: Database schema types have been moved to lib/core/domain/entities

// Note: BlogPost type has been moved to lib/core/domain/entities/blog.ts
