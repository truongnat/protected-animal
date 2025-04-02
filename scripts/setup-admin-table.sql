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
