// This file is used in the App Router, so we can use next/headers
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signOutAction(): Promise<void> {
	const cookieStore = cookies();

	// Clear the admin_auth cookie
	cookieStore.set('admin_auth', '', { maxAge: 0, path: '/' });

	// Also clear any Supabase cookies that might be left over
	const cookieNames = ['sb-access-token', 'sb-refresh-token'];
	for (const name of cookieNames) {
		cookieStore.set(name, '', { maxAge: 0, path: '/' });
	}

	redirect('/admin/login');
}
