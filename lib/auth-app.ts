// This file contains server-side authentication functions for the App Router
// Only import this file in app/ directory components

import { createServerSupabaseClient } from './supabase-server';

// Server-side authentication functions for App Router
export async function getServerSession() {
	const supabase = createServerSupabaseClient();
	return await supabase.auth.getSession();
}

export async function getServerUser() {
	const {
		data: { session },
	} = await getServerSession();

	if (!session) {
		return null;
	}

	return session.user;
}

export async function isAdminServer() {
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
