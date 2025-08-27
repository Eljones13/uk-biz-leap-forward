
-- Create affiliate_clicks table for tracking bank application clicks
CREATE TABLE public.affiliate_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  bank_name TEXT NOT NULL,
  affiliate_link TEXT NOT NULL,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address INET,
  user_agent TEXT,
  conversion_tracked BOOLEAN DEFAULT false
);

-- Add RLS to affiliate_clicks
ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;

-- Users can view their own clicks and insert new ones
CREATE POLICY "Users can view their own affiliate clicks" 
  ON public.affiliate_clicks 
  FOR SELECT 
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create affiliate clicks" 
  ON public.affiliate_clicks 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Service role can view all for analytics
CREATE POLICY "Service role can view all affiliate clicks" 
  ON public.affiliate_clicks 
  FOR SELECT 
  USING (current_setting('role') = 'service_role');

-- Create ai_advisor_sessions table
CREATE TABLE public.ai_advisor_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  session_data JSONB NOT NULL DEFAULT '{}',
  readiness_score INTEGER,
  recommendations JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS to ai_advisor_sessions
ALTER TABLE public.ai_advisor_sessions ENABLE ROW LEVEL SECURITY;

-- Users can manage their own sessions
CREATE POLICY "Users can manage their own advisor sessions" 
  ON public.ai_advisor_sessions 
  FOR ALL 
  USING (auth.uid() = user_id);

-- Update audit_logs to ensure it has proper structure
ALTER TABLE public.audit_logs ALTER COLUMN user_id SET NOT NULL;

-- Add indexes for performance
CREATE INDEX idx_affiliate_clicks_user_id ON public.affiliate_clicks(user_id);
CREATE INDEX idx_affiliate_clicks_bank_name ON public.affiliate_clicks(bank_name);
CREATE INDEX idx_affiliate_clicks_clicked_at ON public.affiliate_clicks(clicked_at);
CREATE INDEX idx_ai_advisor_sessions_user_id ON public.ai_advisor_sessions(user_id);
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at);
