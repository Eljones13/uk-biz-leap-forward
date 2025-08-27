
-- Create waitlist_emails table for beta feature gate
CREATE TABLE public.waitlist_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  feature TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.waitlist_emails ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to insert (for public waitlist signup)
CREATE POLICY "Anyone can join waitlist" 
  ON public.waitlist_emails 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy that only service role can read waitlist emails
CREATE POLICY "Service role can read waitlist emails" 
  ON public.waitlist_emails 
  FOR SELECT 
  USING (false);

-- Create contact_messages table for contact form
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to insert (for public contact form)
CREATE POLICY "Anyone can send contact messages" 
  ON public.contact_messages 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy that only service role can read contact messages
CREATE POLICY "Service role can read contact messages" 
  ON public.contact_messages 
  FOR SELECT 
  USING (false);
