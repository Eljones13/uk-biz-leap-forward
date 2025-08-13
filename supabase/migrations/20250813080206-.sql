-- Fix RLS issue on jobs table
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Fix remaining functions without secure search paths
CREATE OR REPLACE FUNCTION public.get_user_cic_applications(p_user_id uuid)
RETURNS TABLE(id uuid, user_id uuid, cic_name text, cic_structure text, community_purpose text, mission_statement text, target_age_ranges text[], employment_sectors text[], skills_programs text[], jumpstart_partnership_opted_in boolean, jumpstart_directory_listing boolean, jumpstart_cv_builder_access boolean, safeguarding_policy_required boolean, dbs_checks_required boolean, youth_protection_measures text[], current_stage text, completed_stages text[], progress_percentage integer, cic36_form_data jsonb, youth_employment_template_data jsonb, created_at timestamp with time zone, updated_at timestamp with time zone, submitted_at timestamp with time zone, status text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ca.id,
        ca.user_id,
        ca.cic_name,
        ca.cic_structure,
        ca.community_purpose,
        ca.mission_statement,
        ca.target_age_ranges,
        ca.employment_sectors,
        ca.skills_programs,
        ca.jumpstart_partnership_opted_in,
        ca.jumpstart_directory_listing,
        ca.jumpstart_cv_builder_access,
        ca.safeguarding_policy_required,
        ca.dbs_checks_required,
        ca.youth_protection_measures,
        ca.current_stage,
        ca.completed_stages,
        ca.progress_percentage,
        ca.cic36_form_data,
        ca.youth_employment_template_data,
        ca.created_at,
        ca.updated_at,
        ca.submitted_at,
        ca.status
    FROM public.cic_applications ca
    WHERE ca.user_id = p_user_id
    ORDER BY ca.created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION public.calculate_grant_match_score(p_grant_id uuid, p_cic_application_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_score INTEGER := 0;
  v_grant RECORD;
  v_cic RECORD;
BEGIN
  SELECT * INTO v_grant FROM public.grants WHERE id = p_grant_id;
  SELECT * INTO v_cic FROM public.cic_applications WHERE id = p_cic_application_id;
  
  IF v_grant IS NULL OR v_cic IS NULL THEN
    RETURN 0;
  END IF;
  
  -- Youth employment focus bonus
  IF v_grant.grant_type = 'youth_employment' THEN
    v_score := v_score + 50;
  END IF;
  
  -- 16-18 age group specialization
  IF '16-18' = ANY(v_grant.target_age_ranges) AND '16-18' = ANY(v_cic.target_age_ranges) THEN
    v_score := v_score + 40;
  END IF;
  
  -- Skills development programs match
  IF array_length(v_cic.skills_programs, 1) > 0 THEN
    v_score := v_score + 30;
  END IF;
  
  -- Jumpstart partnership bonus
  IF v_grant.jumpstart_partnership_bonus = true AND v_cic.jumpstart_partnership_opted_in = true THEN
    v_score := v_score + 10;
  END IF;
  
  RETURN v_score;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_user_grant_matches(p_user_id uuid)
RETURNS TABLE(grant_id uuid, title text, description text, funder_name text, funding_amount_min numeric, funding_amount_max numeric, application_deadline date, match_score integer, is_saved boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    g.id,
    g.title,
    g.description,
    g.funder_name,
    g.funding_amount_min,
    g.funding_amount_max,
    g.application_deadline,
    COALESCE(
      (SELECT public.calculate_grant_match_score(g.id, ca.id) 
       FROM public.cic_applications ca 
       WHERE ca.user_id = p_user_id 
       ORDER BY ca.created_at DESC 
       LIMIT 1), 
      0
    ) as match_score,
    EXISTS(SELECT 1 FROM public.user_saved_grants usg WHERE usg.user_id = p_user_id AND usg.grant_id = g.id) as is_saved
  FROM public.grants g
  WHERE g.is_active = true
  ORDER BY match_score DESC, g.application_deadline ASC;
END;
$$;

CREATE OR REPLACE FUNCTION public.calculate_cic_kpis(p_cic_application_id uuid, p_start_date date, p_end_date date)
RETURNS TABLE(total_participants bigint, cvs_created bigint, cvs_updated bigint, job_applications bigint, interviews_scheduled bigint, interviews_completed bigint, employment_placements bigint, retention_90_day bigint, apprenticeship_progressions bigint, further_education_progressions bigint, business_startups bigint)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(DISTINCT p.id) as total_participants,
    COUNT(CASE WHEN it.interaction_type = 'cv_created' THEN 1 END) as cvs_created,
    COUNT(CASE WHEN it.interaction_type = 'cv_updated' THEN 1 END) as cvs_updated,
    COUNT(CASE WHEN it.interaction_type = 'job_application' THEN 1 END) as job_applications,
    COUNT(CASE WHEN it.interaction_type = 'interview_scheduled' THEN 1 END) as interviews_scheduled,
    COUNT(CASE WHEN it.interaction_type = 'interview_completed' THEN 1 END) as interviews_completed,
    COUNT(CASE WHEN it.interaction_type = 'employment_placed' THEN 1 END) as employment_placements,
    COUNT(CASE WHEN eo.retention_90_day = true THEN 1 END) as retention_90_day,
    COUNT(CASE WHEN eo.employment_type = 'apprenticeship' THEN 1 END) as apprenticeship_progressions,
    COUNT(CASE WHEN eo.employment_type = 'further_education' THEN 1 END) as further_education_progressions,
    COUNT(CASE WHEN it.interaction_type = 'referral_made' AND it.metadata->>'type' = 'business_startup' THEN 1 END) as business_startups
  FROM public.participants p
  LEFT JOIN public.impact_tracking it ON p.id = it.participant_id
  LEFT JOIN public.employment_outcomes eo ON p.id = eo.participant_id
  WHERE p.cic_application_id = p_cic_application_id
    AND p.enrollment_date BETWEEN p_start_date AND p_end_date;
END;
$$;