import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerSupabaseClient } from './lib/supabase-server';

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const request = req;
	const pathname = req.nextUrl.pathname;
	let supabaseResponse = NextResponse.next({
		request: request,
	});

	// Create a Supabase client using the standard client
	// This is compatible with both Pages Router and App Router
	const supabase = await createServerSupabaseClient();

	// Get the auth cookies from the request
	// The actual cookie names depend on your Supabase project
	// They typically start with 'sb-' followed by the project reference
	const authToken = req.cookies.get('sb-access-token')?.value;
	const refreshToken = req.cookies.get('sb-refresh-token')?.value;

	// If there are auth cookies, set them for this request
	if (authToken && refreshToken) {
		await supabase.auth.setSession({
			access_token: authToken,
			refresh_token: refreshToken,
		});
	}

	// Check if the request is for an admin route
	if (pathname.startsWith('/admin') && !pathname.includes('/admin/login')) {
		try {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			// If no session, redirect to login
			if (!session) {
				const url = new URL('/admin/login', req.url);
				url.searchParams.set('redirectTo', pathname);
				return NextResponse.redirect(url);
			}

			// If there is a session, check if the user is an admin
			const { data: adminUser } = await supabase
				.from('admin_users')
				.select('*')
				.eq('user_id', session.user.id)
				.single();

			if (!adminUser) {
				// User is not an admin, redirect to login
				return NextResponse.redirect(new URL('/admin/login', req.url));
			}
		} catch (error) {
			// If there's an error checking the session, redirect to login
			console.error('Error in middleware:', error);
			return NextResponse.redirect(new URL('/admin/login', req.url));
		}
	}

	return res;
}

export const config = {
	matcher: ['/admin/:path*'],
};
