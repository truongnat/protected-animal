-- Ultra simple script to create an admin user
-- Run this in the Supabase SQL Editor

-- Create admin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.admin_users (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY,
  username TEXT,
  avatar_url TEXT,
  full_name TEXT,
  updated_at TIMESTAMP WITH TIME ZONE
);

-- First, clean up any existing data for admin@example.com
DELETE FROM public.admin_users WHERE email = 'admin@example.com';
DELETE FROM auth.users WHERE email = 'admin@example.com';

-- Now create a completely new admin user with a safe UUID
DO $$
DECLARE
  new_admin_id UUID;
  profile_exists BOOLEAN;
BEGIN
  -- Generate a UUID that doesn't exist in profiles
  LOOP
    new_admin_id := gen_random_uuid();
    
    -- Check if this ID already exists in profiles
    SELECT EXISTS(SELECT 1 FROM public.profiles WHERE id = new_admin_id) INTO profile_exists;
    
    -- Exit the loop if the ID doesn't exist in profiles
    EXIT WHEN NOT profile_exists;
  END LOOP;

  -- Insert the admin user into auth.users
  INSERT INTO auth.users (
    id,
    email,
    raw_app_meta_data,
    raw_user_meta_data,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    role,
    aud,
    confirmation_token
  )
  VALUES (
    new_admin_id,
    'admin@example.com',
    '{"provider":"email","providers":["email"]}',
    '{}',
    crypt('Admin123!', gen_salt('bf')),
    now(),
    now(),
    now(),
    'authenticated',
    'authenticated',
    ''
  );

  -- Insert into profiles
  INSERT INTO public.profiles (id, username, updated_at)
  VALUES (new_admin_id, 'admin', now());

  -- Insert into admin_users
  INSERT INTO public.admin_users (user_id, email, role)
  VALUES (new_admin_id, 'admin@example.com', 'superadmin');

  RAISE NOTICE 'Admin user created successfully!';
  RAISE NOTICE 'Email: admin@example.com';
  RAISE NOTICE 'Password: Admin123!';
END $$;
