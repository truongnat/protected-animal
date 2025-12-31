import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function proxy(req: NextRequest) {
	const res = NextResponse.next();
	const pathname = req.nextUrl.pathname;

	// Check if the request is for an admin route
	if (pathname.startsWith('/admin') && !pathname.includes('/admin/login')) {
		// Get the auth cookie
		const authCookie = req.cookies.get('admin_auth')?.value;

		// If no auth cookie, redirect to login
		if (!authCookie) {
			const url = new URL('/admin/login', req.url);
			url.searchParams.set('redirectTo', pathname);
			return NextResponse.redirect(url);
		}

		try {
			// Verify the auth cookie
			const user = JSON.parse(authCookie);

			if (!user || !user.isLoggedIn) {
				// Invalid auth cookie, redirect to login
				const url = new URL('/admin/login', req.url);
				url.searchParams.set('redirectTo', pathname);
				return NextResponse.redirect(url);
			}
		} catch (error) {
			// Error parsing auth cookie, redirect to login
			console.error('Error in middleware:', error);
			const url = new URL('/admin/login', req.url);
			url.searchParams.set('redirectTo', pathname);
			return NextResponse.redirect(url);
		}
	}

	return res;
}

export const config = {
	matcher: ['/admin/:path*'],
};
