// This file is used in the App Router, so we can use next/headers
'use server';

import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signOutAction() {
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

	// Sign out and clear all auth cookies
	await supabase.auth.signOut();

	// Clear any additional cookies that might be set
	const cookieNames = ['sb-access-token', 'sb-refresh-token'];
	for (const name of cookieNames) {
		cookieStore.set(name, '', { maxAge: 0, path: '/' });
	}

	redirect('/admin/login');
}
