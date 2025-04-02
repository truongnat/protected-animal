// This file is used in the App Router, so we can use next/headers
'use server';

import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signInAction(formData: FormData) {
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const redirectTo = (formData.get('redirectTo') as string) || '/admin/dashboard';

	// Create a Supabase client with cookie handling for the App Router
	const cookieStore = cookies();
	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			auth: {
				flowType: 'pkce',
				autoRefreshToken: true,
				detectSessionInUrl: false,
				persistSession: true,
				storage: {
					getItem: (key) => {
						const cookie = cookieStore.get(key);
						return cookie?.value;
					},
					setItem: (key, value) => {
						// In a server component, we need to use the cookies() API
						// This will set the cookie for the response
						cookieStore.set(key, value, {
							path: '/',
							httpOnly: true,
							sameSite: 'lax',
							secure: process.env.NODE_ENV === 'production',
							maxAge: 60 * 60 * 24 * 7, // 1 week
						});
					},
					removeItem: (key) => {
						cookieStore.set(key, '', { maxAge: 0, path: '/' });
					},
				},
			},
		},
	);

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return { error: error.message };
	}

	// Check if user is an admin
	const { data: adminUser, error: adminError } = await supabase
		.from('admin_users')
		.select('*')
		.eq('email', email)
		.single();

	if (adminError || !adminUser) {
		await supabase.auth.signOut();
		return { error: 'You do not have permission to access the admin area.' };
	}

	redirect(redirectTo);
}
