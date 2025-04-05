# Admin Authentication System

This directory contains the authentication system for the Protected Animals admin panel. It uses Supabase Auth UI for a seamless authentication experience.

## Pages

- **Login** (`/admin/auth/login`): Allows existing admin users to sign in
- **Sign Up** (`/admin/auth/signup`): Allows new users to request admin access
- **Pending** (`/admin/auth/pending`): Shown to users who have signed up but haven't been approved yet
- **Callback** (`/admin/auth/callback`): Handles the OAuth callback from Supabase Auth

## How It Works

1. **User Authentication Flow**:
   - New users sign up through the `/admin/auth/signup` page
   - They are automatically added to the `admin_users` table with a `pending` role
   - Existing admin users can approve or reject pending users from the `/admin/users` page
   - Once approved, users can access the admin dashboard

2. **Security**:
   - The middleware (`middleware.ts`) protects all admin routes
   - Only authenticated users with an entry in the `admin_users` table can access admin pages
   - Users with a `pending` role are redirected to the pending approval page

3. **Admin Roles**:
   - `pending`: New users waiting for approval
   - `admin`: Regular admin users with access to the admin panel
   - `superadmin`: Super admins with additional privileges (like approving other admins)

## Database Schema

The authentication system relies on the `admin_users` table with the following structure:

```sql
CREATE TABLE IF NOT EXISTS public.admin_users (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Customization

The authentication UI is customized with the Protected Animals brand colors using the Supabase Auth UI theming system. You can modify the appearance in the login and signup pages by updating the `appearance` prop in the `Auth` component.

## Adding the First Admin

To add the first admin user (who can then approve others), use the seed script:

```bash
pnpm seed-admin
```

This will create a default admin user with the following credentials:
- Email: admin@example.com
- Password: Admin123!

**IMPORTANT**: Change this password after first login!
