// File: scripts/seed-admin.js
// Simple script to create a single admin user for Supabase

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Supabase connection details
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY; // Using the service role key for admin operations

// Default admin credentials
const DEFAULT_ADMIN_EMAIL = 'admin@example.com';
const DEFAULT_ADMIN_PASSWORD = 'Admin123!'; // You should change this in production

async function seedAdminUser() {
	console.log('Starting admin user creation process...');

	if (!supabaseUrl || !supabaseServiceKey) {
		console.error('Missing Supabase URL or service role key. Please check your .env.local file.');
		console.log('Available environment variables:');
		console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓ Found' : '✗ Missing');
		console.log(
			'NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY:',
			supabaseServiceKey ? '✓ Found' : '✗ Missing',
		);
		console.log('\nMake sure your .env.local file contains:');
		console.log('NEXT_PUBLIC_SUPABASE_URL=your-supabase-url');
		console.log('NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key');
		return;
	}

	// Create Supabase client with service role key for admin privileges
	const supabase = createClient(supabaseUrl, supabaseServiceKey);

	try {
		console.log('Checking if admin_users table exists...');

		// Check if admin_users table exists by trying to query it
		const { error: checkTableError } = await supabase.from('admin_users').select('count').limit(1);
		if (checkTableError) {
			console.log(
				'\nAdmin_users table does not exist. Please create it first using the SQL Editor in Supabase.',
			);
			console.log('\nFollow these steps:');
			console.log('1. Log in to your Supabase dashboard');
			console.log('2. Go to the SQL Editor');
			console.log('3. Copy the contents of the file "scripts/setup-admin-table.sql"');
			console.log('4. Paste it into the SQL Editor and run the query');
			console.log('5. Then run this script again: pnpm seed-admin');
			console.log('\nAlternatively, you can run the following SQL:');
			console.log(`
        CREATE TABLE IF NOT EXISTS public.admin_users (
          id SERIAL PRIMARY KEY,
          user_id UUID NOT NULL,
          email TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'admin',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        -- Set up Row Level Security (RLS) policies
        ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

        -- Only authenticated users can view admin_users
        -- Use DO block to check if policy exists before creating it
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_policy
            WHERE polrelid = 'public.admin_users'::regclass
            AND polname = 'Allow authenticated users to view admin_users'
          ) THEN
            CREATE POLICY "Allow authenticated users to view admin_users"
              ON public.admin_users FOR SELECT
              USING (auth.role() = 'authenticated');
          END IF;
        END
        $$;

        -- Only superadmins can insert/update/delete admin_users
        -- Use DO block to check if policy exists before creating it
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_policy
            WHERE polrelid = 'public.admin_users'::regclass
            AND polname = 'Allow superadmins to manage admin_users'
          ) THEN
            CREATE POLICY "Allow superadmins to manage admin_users"
              ON public.admin_users FOR ALL
              USING (auth.uid() IN (
                SELECT user_id FROM public.admin_users WHERE role = 'superadmin'
              ));
          END IF;
        END
        $$;
      `);
			return;
		}

		console.log('Admin_users table exists, proceeding with admin user creation...');

		// Check if admin user already exists
		const { data: existingUser, error: checkError } = await supabase
			.from('admin_users')
			.select('*')
			.eq('email', DEFAULT_ADMIN_EMAIL)
			.maybeSingle();

		if (checkError) {
			console.error('Error checking for existing admin user:', checkError);
		}

		if (existingUser) {
			console.log(
				`Admin user with email ${DEFAULT_ADMIN_EMAIL} already exists. Skipping creation.`,
			);
			return;
		}

		console.log('Creating default admin user...');

		// First, check if the user already exists in Auth
		const {
			data: { users },
			error: getUserError,
		} = await supabase.auth.admin.listUsers();

		if (getUserError) {
			console.error('Error checking for existing users:', getUserError);
			throw getUserError;
		}

		// Find if our admin email already exists
		const existingUser = users.find((user) => user.email === DEFAULT_ADMIN_EMAIL);
		let authUser;

		if (existingUser) {
			console.log(
				`User with email ${DEFAULT_ADMIN_EMAIL} already exists in Auth. Using existing user.`,
			);
			authUser = { user: existingUser };

			// Update the password for the existing user
			const { error: updateError } = await supabase.auth.admin.updateUserById(existingUser.id, {
				password: DEFAULT_ADMIN_PASSWORD,
			});

			if (updateError) {
				console.warn('Could not update password for existing user:', updateError);
			}
		} else {
			// 1. Create the user in Supabase Auth
			const { data, error: authError } = await supabase.auth.admin.createUser({
				email: DEFAULT_ADMIN_EMAIL,
				password: DEFAULT_ADMIN_PASSWORD,
				email_confirm: true, // Auto-confirm the email
			});

			if (authError) {
				throw authError;
			}

			authUser = data;
			console.log('User created in Auth:', authUser.user.id);
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
