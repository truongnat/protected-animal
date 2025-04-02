-- Script to create an admin user for Protected Animals CMS
-- Run this in the Supabase SQL Editor

-- Create profiles table if it doesn't exist (required by Supabase auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT,
  avatar_url TEXT,
  full_name TEXT,
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create admin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.admin_users (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Check if the handle_new_user function exists and create it if not
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create the admin user
DO $$
DECLARE
  admin_email TEXT := 'admin@example.com';
  admin_password TEXT := 'Admin123!';
  admin_user_id UUID;
BEGIN
  -- Check if user already exists
  SELECT id INTO admin_user_id FROM auth.users WHERE email = admin_email;

  -- Create a new user if they don't exist
  IF admin_user_id IS NULL THEN
    -- Generate a UUID for the new user
    admin_user_id := gen_random_uuid();

    -- Insert the user into auth.users
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
      confirmation_token
    )
    VALUES (
      admin_user_id,
      admin_email,
      '{"provider":"email","providers":["email"]}',
      '{}',
      crypt(admin_password, gen_salt('bf')),
      now(),
      now(),
      now(),
      'authenticated',
      ''
    );

    RAISE NOTICE 'Created new user with email %', admin_email;
  ELSE
    RAISE NOTICE 'User with email % already exists', admin_email;
  END IF;

  -- Check if user is already in admin_users table
  IF NOT EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = admin_user_id) THEN
    -- Add the user to admin_users table
    INSERT INTO public.admin_users (
      user_id,
      email,
      role
    )
    VALUES (
      admin_user_id,
      admin_email,
      'superadmin'
    );

    RAISE NOTICE 'Added user to admin_users table with role superadmin';
  ELSE
    RAISE NOTICE 'User is already in admin_users table';
  END IF;

  RAISE NOTICE 'Admin user setup complete!';
END $$;
