// Use the browser client for client-side operations
import { supabase } from './supabase';

// Client-side authentication functions
export async function signIn(email: string, password: string) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		throw new Error(error.message);
	}

	return data;
}

export async function signOut() {
	const { error } = await supabase.auth.signOut();

	if (error) {
		throw new Error(error.message);
	}

	return true;
}

export async function getCurrentUser() {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		return null;
	}

	const {
		data: { user },
	} = await supabase.auth.getUser();
	return user;
}

export async function isAdmin() {
	const user = await getCurrentUser();

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
