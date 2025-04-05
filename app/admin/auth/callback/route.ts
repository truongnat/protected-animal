import { createServerSupabaseClient } from '@/lib/supabase-server';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get('code');

	if (code) {
		const supabase = await createServerSupabaseClient();

		// Exchange the code for a session
		await supabase.auth.exchangeCodeForSession(code);

		// Get the user from the session
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (session) {
			// Check if the user is already in the admin_users table
			const { data: existingAdmin } = await supabase
				.from('admin_users')
				.select('*')
				.eq('user_id', session.user.id)
				.single();

			if (!existingAdmin) {
				// Add the user to the admin_users table with pending status
				await supabase.from('admin_users').insert([
					{
						user_id: session.user.id,
						email: session.user.email,
						role: 'pending', // Default to pending until approved
					},
				]);
			}

			// Redirect to the dashboard or a pending approval page
			if (existingAdmin && existingAdmin.role !== 'pending') {
				return NextResponse.redirect(new URL('/admin/dashboard', request.url));
			} else {
				return NextResponse.redirect(new URL('/admin/auth/pending', request.url));
			}
		}
	}

	// If there's no code or session, redirect to login
	return NextResponse.redirect(new URL('/admin/auth/login', request.url));
}
