
-- Create newsletter signups table
CREATE TABLE public.newsletter_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on newsletter signups
ALTER TABLE public.newsletter_signups ENABLE ROW LEVEL SECURITY;

-- Create policy for newsletter signups (allow public inserts)
CREATE POLICY "Anyone can sign up for newsletter" 
  ON public.newsletter_signups 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to prevent public reads (only service role can read)
CREATE POLICY "Service role can read newsletter signups" 
  ON public.newsletter_signups 
  FOR SELECT 
  USING (false);

-- Create authors table for author profiles
CREATE TABLE public.authors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  avatar TEXT,
  social JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on authors (public read access)
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;

-- Create policy for public reads on authors
CREATE POLICY "Anyone can view authors" 
  ON public.authors 
  FOR SELECT 
  USING (true);

-- Insert default BusinessBuilder Pro author
INSERT INTO public.authors (slug, name, role, bio, avatar, social) VALUES 
('businessbuilder-pro', 'BusinessBuilder Pro', 'Content Team', 'Expert insights on UK business formation, compliance, and growth strategies.', '/placeholder.svg', '{"twitter": "businessbuilder", "linkedin": "businessbuilder-pro"}');
