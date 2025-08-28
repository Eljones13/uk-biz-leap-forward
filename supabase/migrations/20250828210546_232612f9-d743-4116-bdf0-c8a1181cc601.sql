
-- Create articles table for blog and learn content
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('blog', 'learn')),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content_md TEXT,
  content_html TEXT,
  tags TEXT[] DEFAULT '{}',
  category TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  cover_url TEXT,
  status TEXT NOT NULL CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create article views table for analytics
CREATE TABLE public.article_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on articles table
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- RLS policies for articles
-- Anyone can view published articles
CREATE POLICY "Anyone can view published articles" 
  ON public.articles 
  FOR SELECT 
  USING (status = 'published' OR author_id = auth.uid());

-- Authors can insert their own articles
CREATE POLICY "Authors can create articles" 
  ON public.articles 
  FOR INSERT 
  WITH CHECK (author_id = auth.uid());

-- Authors can update their own articles
CREATE POLICY "Authors can update their own articles" 
  ON public.articles 
  FOR UPDATE 
  USING (author_id = auth.uid());

-- Authors can delete their own articles
CREATE POLICY "Authors can delete their own articles" 
  ON public.articles 
  FOR DELETE 
  USING (author_id = auth.uid());

-- Service role can do everything (for migrations/webhooks)
CREATE POLICY "Service role can manage all articles" 
  ON public.articles 
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

-- Enable RLS on article_views table
ALTER TABLE public.article_views ENABLE ROW LEVEL SECURITY;

-- Anyone can insert article views (for analytics)
CREATE POLICY "Anyone can log article views" 
  ON public.article_views 
  FOR INSERT 
  WITH CHECK (true);

-- Users can view their own article views
CREATE POLICY "Users can view their own article views" 
  ON public.article_views 
  FOR SELECT 
  USING (user_id = auth.uid());

-- Service role can manage all article views
CREATE POLICY "Service role can manage all article views" 
  ON public.article_views 
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

-- Create storage bucket for media
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true);

-- Storage policies for media bucket
-- Anyone can view media files (public bucket)
CREATE POLICY "Anyone can view media files" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'media');

-- Authenticated users can upload media files
CREATE POLICY "Authenticated users can upload media files" 
  ON storage.objects 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (bucket_id = 'media');

-- Users can update their own media files
CREATE POLICY "Users can update their own media files" 
  ON storage.objects 
  FOR UPDATE 
  TO authenticated 
  USING (bucket_id = 'media' AND owner = auth.uid());

-- Users can delete their own media files
CREATE POLICY "Users can delete their own media files" 
  ON storage.objects 
  FOR DELETE 
  TO authenticated 
  USING (bucket_id = 'media' AND owner = auth.uid());

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_articles_updated_at 
  BEFORE UPDATE ON public.articles 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
