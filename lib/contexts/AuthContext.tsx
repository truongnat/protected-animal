'use client';

import { useRouter } from 'next/navigation';
import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface User {
	id: number;
	email: string;
	fullName: string | null;
	role: 'user' | 'expert' | 'admin';
	emailVerified: boolean;
}

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<boolean>;
	logout: () => Promise<void>;
	refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	const fetchUser = useCallback(async () => {
		try {
			const response = await fetch('/api/auth/me', {
				credentials: 'include',
			});

			if (response.ok) {
				const result = await response.json();
				if (result.success) {
					setUser(result.data.user);
				}
			}
		} catch (error) {
			console.error('Failed to fetch user:', error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	// Fetch current user on mount
	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	const login = async (email: string, password: string): Promise<boolean> => {
		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
				credentials: 'include',
			});

			const result = await response.json();

			if (result.success) {
				setUser(result.data.user);
				return true;
			} else {
				toast.error(result.error.message || 'Login failed');
				return false;
			}
		} catch (error) {
			toast.error('An error occurred during login');
			console.error('Login error:', error);
			return false;
		}
	};

	const logout = async () => {
		try {
			await fetch('/api/auth/logout', {
				method: 'POST',
				credentials: 'include',
			});

			setUser(null);
			toast.success('Logged out successfully');
			router.push('/');
			router.refresh();
		} catch (error) {
			toast.error('An error occurred during logout');
			console.error('Logout error:', error);
		}
	};

	const refreshUser = async () => {
		await fetchUser();
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoading,
				isAuthenticated: !!user,
				login,
				logout,
				refreshUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
