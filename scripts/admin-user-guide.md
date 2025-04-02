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

## Troubleshooting

If you encounter any issues:

1. Make sure your environment variables are correctly set in `.env.local`
2. Ensure you have created the admin_users table using the SQL script
3. Check the console output for specific error messages

For more detailed troubleshooting, see the [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) file.
