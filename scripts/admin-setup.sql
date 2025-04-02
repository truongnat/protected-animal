-- Create admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create settings table
CREATE TABLE IF NOT EXISTS public.settings (
  id SERIAL PRIMARY KEY,
  site_title TEXT NOT NULL DEFAULT 'Protected Animals',
  site_description TEXT NOT NULL DEFAULT 'Raising awareness about endangered species and conservation efforts',
  contact_email TEXT,
  social_facebook TEXT,
  social_twitter TEXT,
  social_instagram TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create RLS policies for admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can view admin_users
CREATE POLICY "Allow authenticated users to view admin_users"
  ON public.admin_users FOR SELECT
  USING (auth.role() = 'authenticated');

-- Only superadmins can insert/update/delete admin_users
CREATE POLICY "Allow superadmins to manage admin_users"
  ON public.admin_users FOR ALL
  USING (auth.uid() IN (
    SELECT user_id FROM public.admin_users WHERE role = 'superadmin'
  ));

-- Create RLS policies for settings
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Anyone can view settings
CREATE POLICY "Allow public to view settings"
  ON public.settings FOR SELECT
  USING (true);

-- Only admins can update settings
CREATE POLICY "Allow admins to update settings"
  ON public.settings FOR UPDATE
  USING (auth.uid() IN (
    SELECT user_id FROM public.admin_users
  ));

-- Only admins can insert settings (if none exist)
CREATE POLICY "Allow admins to insert settings"
  ON public.settings FOR INSERT
  WITH CHECK (auth.uid() IN (
    SELECT user_id FROM public.admin_users
  ));

-- Create function to create the first admin user
CREATE OR REPLACE FUNCTION create_first_admin(admin_email TEXT, admin_password TEXT)
RETURNS TEXT AS $$
DECLARE
  new_user_id UUID;
  admin_count INTEGER;
BEGIN
  -- Check if there are any admin users
  SELECT COUNT(*) INTO admin_count FROM public.admin_users;
  
  IF admin_count > 0 THEN
    RETURN 'Admin users already exist. Cannot create first admin.';
  END IF;
  
  -- Create a new user in auth.users
  INSERT INTO auth.users (email, password, email_confirmed_at)
  VALUES (admin_email, crypt(admin_password, gen_salt('bf')), now())
  RETURNING id INTO new_user_id;
  
  -- Add the user to the admin_users table as a superadmin
  INSERT INTO public.admin_users (user_id, email, role)
  VALUES (new_user_id, admin_email, 'superadmin');
  
  RETURN 'First admin user created successfully.';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Instructions for creating the first admin user:
-- SELECT create_first_admin('admin@example.com', 'your-secure-password');
