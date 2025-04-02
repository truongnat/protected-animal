import { createClient } from '@supabase/supabase-js';

// Create a Supabase client for use in the Pages Router
// This doesn't use cookies from next/headers, so it's compatible with pages/
export function createPagesSupabaseClient() {
	return createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	);
}

// Export a pre-initialized client for convenience
export const supabasePages = createPagesSupabaseClient();
