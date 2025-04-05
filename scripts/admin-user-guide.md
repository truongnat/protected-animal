# Admin User Setup Guide

This guide explains how to set up an admin user for the Protected Animals website using Supabase.

## Prerequisites

1. You need to have a Supabase project set up
2. You need to have your Supabase URL, anon key, and service role key

## Setup Steps

### 1. Set up your environment variables

Create a `.env.local` file in the root of your project with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

Replace the placeholders with your actual Supabase project credentials.

### 2. Create the admin_users table

1. Log in to your Supabase dashboard
2. Go to the SQL Editor
3. Copy the contents of the file `scripts/setup-admin-table.sql`
4. Paste it into the SQL Editor and run the query

This will create the admin_users table and set up the necessary Row Level Security (RLS) policies.

### 3. Create the admin user

Run the following command to create a default admin user:

```bash
pnpm seed-admin
```

This will create an admin user with the following credentials:
- Email: admin@example.com
- Password: Admin123!

**IMPORTANT**: Change this password after first login!

## Using the Admin Interface

Once you've set up the admin user, you can access the admin interface:

1. Navigate to `/admin/auth/login` in your browser
2. Sign in with the admin credentials
3. You'll be redirected to the admin dashboard

### Adding More Admins

New users can sign up at `/admin/auth/signup`, but they'll need approval from an existing admin:

1. New user signs up at `/admin/auth/signup`
2. They'll see a "Pending Approval" message
3. Existing admin goes to `/admin/users` and approves the new user
4. New user can now access the admin dashboard

## Troubleshooting

If you encounter any issues:

1. Make sure your environment variables are correctly set in `.env.local`
2. Ensure you have created the admin_users table using the SQL script
3. Check the console output for specific error messages

### Common Errors

- **Database error creating new user**: This usually means the user already exists in Auth but not in the admin_users table. The fixed script should handle this case automatically.
- **Table doesn't exist**: Make sure you've run the SQL script to create the admin_users table.
- **Permission denied**: Make sure you're using the service role key, not the anon key, for admin operations.
