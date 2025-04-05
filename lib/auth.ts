// This file is deprecated and only exists for backward compatibility
// Use auth-utils.ts instead for all authentication functions

import { getCurrentUser as getUser, isAuthenticated, loginAdmin, logoutAdmin } from './auth-utils';

// Re-export functions from auth-utils.ts for backward compatibility
export async function signIn(email: string, password: string) {
	// Convert email to username for the new auth system
	const result = await loginAdmin(email, password);

	if (!result.success) {
		throw new Error(result.error || 'Authentication failed');
	}

	return { user: getUser() };
}

export async function signOut() {
	logoutAdmin();
	return true;
}

export async function getCurrentUser() {
	// If not authenticated, return null
	if (!isAuthenticated()) {
		return null;
	}

	// Get user from the new auth system
	const user = getUser();

	// Convert to the format expected by the old code
	return {
		id: 'admin',
		email: user?.username,
		role: 'admin',
	};
}

export async function isAdmin() {
	// In the new system, if the user is authenticated, they are an admin
	return isAuthenticated();
}

// NOTE: The server-side authentication functions below should only be used in App Router components
// They are commented out to prevent import errors in Pages Router components
// Uncomment and use them only in app/ directory components

/*
// Server-side authentication functions for App Router
export async function getServerSession() {
  // Import dynamically to avoid issues with Pages Router
  const { createServerSupabaseClient } = await import('./supabase-server');
  const supabase = createServerSupabaseClient();
  return await supabase.auth.getSession();
}

export async function getServerUser() {
  const { data: { session } } = await getServerSession();

  if (!session) {
    return null;
  }

  return session.user;
}

export async function isAdminServer() {
  // Import dynamically to avoid issues with Pages Router
  const { createServerSupabaseClient } = await import('./supabase-server');
  const supabase = createServerSupabaseClient();
  const user = await getServerUser();

  if (!user) {
    return false;
  }

  // Check if user has admin role
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error || !data) {
    return false;
  }

  return true;
}
*/
