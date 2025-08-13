
-- Fix 1: Enable RLS on jobs table and add proper policies
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing jobs (authenticated users only)
CREATE POLICY "Authenticated users can view active jobs" 
  ON public.jobs 
  FOR SELECT 
  USING (is_active = true AND auth.uid() IS NOT NULL);

-- Fix 2: Create missing company_name_checks table
CREATE TABLE public.company_name_checks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT false,
  response_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on company_name_checks table
ALTER TABLE public.company_name_checks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for company_name_checks
CREATE POLICY "Users can view their own company name checks" 
  ON public.company_name_checks 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own company name checks" 
  ON public.company_name_checks 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Fix 3: Update database functions to be more secure
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  
  -- Create security settings for new user
  INSERT INTO public.security_settings (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.log_audit_event(
  p_user_id uuid, 
  p_action_type text, 
  p_table_name text DEFAULT NULL::text, 
  p_record_id uuid DEFAULT NULL::uuid, 
  p_old_values jsonb DEFAULT NULL::jsonb, 
  p_new_values jsonb DEFAULT NULL::jsonb, 
  p_ip_address text DEFAULT NULL::text, 
  p_user_agent text DEFAULT NULL::text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.audit_logs (
    user_id,
    action_type,
    table_name,
    record_id,
    old_values,
    new_values,
    ip_address,
    user_agent
  ) VALUES (
    p_user_id,
    p_action_type,
    p_table_name,
    p_record_id,
    p_old_values,
    p_new_values,
    p_ip_address::inet,
    p_user_agent
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.submit_grant_application(p_grant_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  UPDATE public.user_saved_grants
  SET application_status = 'applied_waiting',
      updated_at = now()
  WHERE grant_id = p_grant_id
    AND user_id = auth.uid();
    
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Grant not found or not accessible';
  END IF;
END;
$$;

-- Fix 4: Add trigger for updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Apply the trigger to company_name_checks
CREATE TRIGGER update_company_name_checks_updated_at
  BEFORE UPDATE ON public.company_name_checks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
