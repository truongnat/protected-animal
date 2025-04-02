-- Create team_members table
CREATE TABLE IF NOT EXISTS public.team_members (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  email TEXT,
  social_linkedin TEXT,
  social_twitter TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create RLS policies for team_members
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Anyone can view team_members
CREATE POLICY "Allow public to view team_members"
  ON public.team_members FOR SELECT
  USING (true);

-- Only admins can manage team_members
CREATE POLICY "Allow admins to manage team_members"
  ON public.team_members FOR ALL
  USING (auth.uid() IN (
    SELECT user_id FROM public.admin_users
  ));

-- Insert sample team members
INSERT INTO public.team_members (name, title, bio, image_url, display_order)
VALUES 
  (
    'Dr. Emma Wilson', 
    'Conservation Biologist', 
    'With over 15 years of experience in wildlife conservation, Dr. Wilson leads our research initiatives and ensures the accuracy of our species information.', 
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961', 
    1
  ),
  (
    'Dr. Michael Chen', 
    'Environmental Scientist', 
    'Dr. Chen specializes in habitat conservation and climate change impacts on endangered species, bringing valuable insights to our conservation strategies.', 
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974', 
    2
  ),
  (
    'Sarah Johnson', 
    'Conservation Educator', 
    'With a background in environmental education, Sarah develops our educational content and outreach programs to engage communities in conservation efforts.', 
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974', 
    3
  );
