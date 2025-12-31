/**
 * Session Management Utilities
 * Handles cookie-based session management
 */

import { cookies } from 'next/headers';
import type { TokenPayload } from './jwt';

const ACCESS_TOKEN_COOKIE = 'access_token';
const REFRESH_TOKEN_COOKIE = 'refresh_token';

const COOKIE_OPTIONS = {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'lax' as const,
	path: '/',
};

/**
 * Set authentication cookies
 * @param accessToken - JWT access token
 * @param refreshToken - JWT refresh token
 */
export async function setAuthCookies(accessToken: string, refreshToken: string) {
	const cookieStore = await cookies();

	// Set access token (15 minutes)
	cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
		...COOKIE_OPTIONS,
		maxAge: 15 * 60, // 15 minutes
	});

	// Set refresh token (7 days)
	cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, {
		...COOKIE_OPTIONS,
		maxAge: 7 * 24 * 60 * 60, // 7 days
	});
}

/**
 * Get access token from cookies
 * @returns Access token or null if not found
 */
export async function getAccessToken(): Promise<string | null> {
	const cookieStore = await cookies();
	const token = cookieStore.get(ACCESS_TOKEN_COOKIE);
	return token?.value || null;
}

/**
 * Get refresh token from cookies
 * @returns Refresh token or null if not found
 */
export async function getRefreshToken(): Promise<string | null> {
	const cookieStore = await cookies();
	const token = cookieStore.get(REFRESH_TOKEN_COOKIE);
	return token?.value || null;
}

/**
 * Clear authentication cookies
 */
export async function clearAuthCookies() {
	const cookieStore = await cookies();
	cookieStore.delete(ACCESS_TOKEN_COOKIE);
	cookieStore.delete(REFRESH_TOKEN_COOKIE);
}

/**
 * Store user session data
 * @param user - User data to store
 */
export async function setUserSession(user: TokenPayload) {
	const cookieStore = await cookies();
	cookieStore.set('user_session', JSON.stringify(user), {
		...COOKIE_OPTIONS,
		maxAge: 7 * 24 * 60 * 60, // 7 days
	});
}

/**
 * Get user session data
 * @returns User session data or null
 */
export async function getUserSession(): Promise<TokenPayload | null> {
	const cookieStore = await cookies();
	const session = cookieStore.get('user_session');

	if (!session?.value) {
		return null;
	}

	try {
		return JSON.parse(session.value) as TokenPayload;
	} catch {
		return null;
	}
}

/**
 * Clear user session
 */
export async function clearUserSession() {
	const cookieStore = await cookies();
	cookieStore.delete('user_session');
}
