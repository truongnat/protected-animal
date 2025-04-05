# Manual Admin User Setup Guide

Since you're encountering issues with the automated script, here's how to set up an admin user manually:

## 1. Create the admin_users table

1. Log in to your Supabase dashboard
2. Go to the SQL Editor
3. Copy and paste the following SQL:

```sql
-- Create admin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.admin_users (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create RLS policies for admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can view admin_users
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
```

4. Run the query

## 2. Create an admin user

1. Go to the "Authentication" section in your Supabase dashboard
2. Click on "Users" tab
3. Click "Add User"
4. Enter the email and password for your admin user (e.g., admin@example.com / Admin123!)
5. Click "Create User"
6. Note the UUID of the newly created user (click on the user to see details)

## 3. Add the user to the admin_users table

1. Go back to the SQL Editor
2. Run the following SQL, replacing `YOUR_USER_UUID` and `YOUR_EMAIL` with the actual values:

```sql
INSERT INTO public.admin_users (user_id, email, role)
VALUES ('YOUR_USER_UUID', 'YOUR_EMAIL', 'superadmin');
```

For example:
```sql
INSERT INTO public.admin_users (user_id, email, role)
VALUES ('d4b5e8f0-1234-5678-9abc-def012345678', 'admin@example.com', 'superadmin');
```

## 4. Test the admin login

1. Start your application:
   ```bash
   pnpm dev
   ```

2. Navigate to `/admin/auth/login` in your browser
3. Sign in with the admin credentials you created
4. You should be redirected to the admin dashboard

## Troubleshooting

If you encounter any issues:

1. Make sure the user exists in Supabase Auth (check the "Authentication" > "Users" section)
2. Make sure the user is added to the `admin_users` table with the correct UUID
3. Make sure the role is set to 'superadmin' or 'admin'
4. Check the browser console for any errors
