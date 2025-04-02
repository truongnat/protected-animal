-- Simple script to create an admin user
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

-- Set admin credentials
DO $$
DECLARE
  admin_email TEXT := 'admin@example.com';
  admin_password TEXT := 'Admin123!';
  admin_id UUID;
BEGIN
  -- Get the ID of the existing admin user if exists
  SELECT id INTO admin_id FROM auth.users WHERE email = admin_email;

  -- Delete existing admin user if exists (to start fresh)
  IF admin_id IS NOT NULL THEN
    -- First delete from profiles (to handle foreign key constraint)
    DELETE FROM public.profiles WHERE id = admin_id;

    -- Then delete from admin_users
    DELETE FROM public.admin_users WHERE user_id = admin_id;

    -- Finally delete from auth.users
    DELETE FROM auth.users WHERE id = admin_id;

    -- Reset admin_id to NULL since we deleted the user
    admin_id := NULL;
  END IF;

  -- Double-check that the profile doesn't exist (in case of orphaned records)
  DELETE FROM public.profiles WHERE id IN (SELECT id FROM auth.users WHERE email = admin_email);
  DELETE FROM public.admin_users WHERE email = admin_email;

  -- At this point, admin_id should be NULL (either it was NULL from the start or we deleted the user)
  -- Create a new admin user

  -- Generate a new UUID
  admin_id := gen_random_uuid();

  -- Insert directly into auth.users
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
    admin_id,
    admin_email,
    '{"provider":"email","providers":["email"]}',
    '{}',
    crypt(admin_password, gen_salt('bf')),
    now(),
    now(),
    now(),
    'authenticated',
    'authenticated',
    ''
  );

  -- Insert into profiles
  INSERT INTO public.profiles (id, username, updated_at)
  VALUES (admin_id, 'admin', now());

  -- Insert into admin_users
  INSERT INTO public.admin_users (user_id, email, role)
  VALUES (admin_id, admin_email, 'superadmin');

  RAISE NOTICE 'Admin user created successfully!';
  RAISE NOTICE 'Email: %', admin_email;
  RAISE NOTICE 'Password: %', admin_password;
END $$;
