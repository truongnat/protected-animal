// File: scripts/seed-admin-user.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Supabase connection details
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY; // Using the service role key for admin operations

// Default admin credentials
const DEFAULT_ADMIN_EMAIL = 'admin@example.com';
const DEFAULT_ADMIN_PASSWORD = 'Admin123!'; // You should change this in production

async function seedAdminUser() {
	if (!supabaseUrl || !supabaseServiceKey) {
		console.error('Missing Supabase URL or service role key. Please check your .env.local file.');
		console.log('Available environment variables:');
		console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓ Found' : '✗ Missing');
		console.log(
			'NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY:',
			supabaseServiceKey ? '✓ Found' : '✗ Missing',
		);
		return;
	}

	// Create Supabase client with service role key for admin privileges
	const supabase = createClient(supabaseUrl, supabaseServiceKey);

	try {
		console.log('Creating default admin user...');

		// 1. Create the user in Supabase Auth
		const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
			email: DEFAULT_ADMIN_EMAIL,
			password: DEFAULT_ADMIN_PASSWORD,
			email_confirm: true, // Auto-confirm the email
		});

		if (authError) {
			throw authError;
		}

		console.log('User created in Auth:', authUser.user.id);

		// 2. Add the user to the admin_users table
		const { data: adminUser, error: adminError } = await supabase
			.from('admin_users')
			.insert([
				{
					user_id: authUser.user.id,
					email: DEFAULT_ADMIN_EMAIL,
					role: 'superadmin',
				},
			])
			.select()
			.single();

		if (adminError) {
			throw adminError;
		}

		console.log('Admin user added to admin_users table:', adminUser);
		console.log('\nDefault admin credentials:');
		console.log(`Email: ${DEFAULT_ADMIN_EMAIL}`);
		console.log(`Password: ${DEFAULT_ADMIN_PASSWORD}`);
		console.log('\nIMPORTANT: Change this password after first login!');
	} catch (error) {
		console.error('Error creating admin user:', error);

		// Check if error is because user already exists
		if (error.code === '23505' || error.message.includes('already exists')) {
			console.log('Admin user already exists. No changes made.');
		}
	}
}

// Run the seed function
seedAdminUser();
