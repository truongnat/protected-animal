import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createServerSupabaseClient() {
	const cookieStore = cookies();

	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value;
				},
				set(name: string, value: string, options: CookieOptions) {
					try {
						// Ensure path is set
						const cookieOptions = {
							name,
							value,
							...options,
							path: options?.path || '/',
						};
						cookieStore.set(cookieOptions);
					} catch (error) {
						// This will throw in middleware, but we can safely ignore it
					}
				},
				remove(name: string, options: CookieOptions) {
					try {
						// Ensure path is set
						const cookieOptions = {
							name,
							value: '',
							...options,
							path: options?.path || '/',
						};
						cookieStore.set(cookieOptions);
					} catch (error) {
						// This will throw in middleware, but we can safely ignore it
					}
				},
			},
		},
	);
}
