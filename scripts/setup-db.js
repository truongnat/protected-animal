// File: scripts/setup-db.js

const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Supabase connection details
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

async function setupDatabase() {
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
		console.log('Setting up database tables...');

		// Read the SQL file
		const sqlFilePath = path.join(__dirname, 'setup-admin-table.sql');
		const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');

		// Execute the SQL
		const { error } = await supabase.sql(sqlContent);

		if (error) {
			throw error;
		}

		console.log('Database tables set up successfully!');
	} catch (error) {
		console.error('Error setting up database:', error);
	}
}

// Run the setup function
setupDatabase();
