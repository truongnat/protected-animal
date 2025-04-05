'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Constants
const AUTH_COOKIE_NAME = 'admin_auth';
const AUTH_COOKIE_EXPIRY = 1; // 1 day

// Types
export interface AdminUser {
	username: string;
	isLoggedIn: boolean;
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
	if (typeof window === 'undefined') return false;

	const authCookie = Cookies.get(AUTH_COOKIE_NAME);
	return !!authCookie;
}

// Get current user
export function getCurrentUser(): AdminUser | null {
	if (typeof window === 'undefined') return null;

	const authCookie = Cookies.get(AUTH_COOKIE_NAME);
	if (!authCookie) return null;

	try {
		return JSON.parse(authCookie);
	} catch (error) {
		console.error('Error parsing auth cookie:', error);
		return null;
	}
}

// Login function
export async function loginAdmin(
	username: string,
	password: string,
): Promise<{ success: boolean; error?: string }> {
	// Check against environment variables
	const validUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin';
	const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'Admin123!';

	if (username === validUsername && password === validPassword) {
		// Set auth cookie
		const user: AdminUser = {
			username,
			isLoggedIn: true,
		};

		Cookies.set(AUTH_COOKIE_NAME, JSON.stringify(user), { expires: AUTH_COOKIE_EXPIRY });
		return { success: true };
	}

	return { success: false, error: 'Invalid username or password' };
}

// Logout function
export function logoutAdmin(): void {
	Cookies.remove(AUTH_COOKIE_NAME);

	// Force reload to clear any state
	if (typeof window !== 'undefined') {
		window.location.href = '/admin/login';
	}
}

// Auth hook for client components
export function useAuth() {
	const [user, setUser] = useState<AdminUser | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		// Check authentication on mount
		const currentUser = getCurrentUser();
		setUser(currentUser);
		setLoading(false);

		// Redirect if not authenticated
		if (
			!currentUser &&
			window.location.pathname.startsWith('/admin') &&
			!window.location.pathname.includes('/admin/login')
		) {
			router.push('/admin/login');
		}
	}, [router]);

	return { user, loading, isAuthenticated: !!user };
}
