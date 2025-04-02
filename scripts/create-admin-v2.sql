-- Script to create an admin user (version 2)
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

-- Clean up any existing admin user with this email
DO $$
BEGIN
  -- Delete from profiles and admin_users first
  DELETE FROM public.profiles WHERE id IN (SELECT id FROM auth.users WHERE email = 'admin@example.com');
  DELETE FROM public.admin_users WHERE email = 'admin@example.com';
  
  -- Then delete from auth.users
  DELETE FROM auth.users WHERE email = 'admin@example.com';
END $$;

-- Create a new admin user
DO $$
DECLARE
  admin_id UUID := gen_random_uuid();
BEGIN
  -- Insert into auth.users
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
  VALUES (admin_id, 'admin', now());
  
  -- Insert into admin_users
  INSERT INTO public.admin_users (user_id, email, role)
  VALUES (admin_id, 'admin@example.com', 'superadmin');
  
  RAISE NOTICE 'Admin user created successfully!';
  RAISE NOTICE 'Email: admin@example.com';
  RAISE NOTICE 'Password: Admin123!';
END $$;
