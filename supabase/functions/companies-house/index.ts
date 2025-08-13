
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const rateLimitData = rateLimitMap.get(identifier);
  
  if (!rateLimitData || now > rateLimitData.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (rateLimitData.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  rateLimitData.count++;
  return true;
}

function validateInput(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.companyName || typeof data.companyName !== 'string') {
    errors.push('Company name is required and must be a string');
  }
  
  if (data.companyName && data.companyName.length > 160) {
    errors.push('Company name must be 160 characters or less');
  }
  
  if (data.companyName && data.companyName.length < 2) {
    errors.push('Company name must be at least 2 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

async function logAuditEvent(supabase: any, userId: string, action: string, data: any) {
  try {
    await supabase.rpc('log_audit_event', {
      p_user_id: userId,
      p_action_type: action,
      p_table_name: 'company_name_checks',
      p_new_values: data
    });
  } catch (error) {
    console.error('Failed to log audit event:', error);
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get user from auth
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Rate limiting check
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitKey = `${user.id}:${clientIP}`;
    
    if (!checkRateLimit(rateLimitKey)) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse and validate request
    const requestData = await req.json();
    const validation = validateInput(requestData);
    
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({ error: 'Invalid input', details: validation.errors }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { companyName } = requestData;
    const companiesHouseApiKey = Deno.env.get('COMPANIES_HOUSE_API_KEY');

    if (!companiesHouseApiKey) {
      console.error('Companies House API key not configured');
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable' }),
        { 
          status: 503, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Check company name availability
    const searchUrl = `https://api.company-information.service.gov.uk/search/companies?q=${encodeURIComponent(companyName)}&items_per_page=1`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'Authorization': `Basic ${btoa(companiesHouseApiKey + ':')}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Companies House API error: ${response.status}`);
    }

    const searchResults = await response.json();
    const isAvailable = searchResults.total_results === 0;

    // Store the check result
    const { error: insertError } = await supabaseClient
      .from('company_name_checks')
      .insert({
        user_id: user.id,
        company_name: companyName,
        is_available: isAvailable,
        response_data: {
          total_results: searchResults.total_results,
          search_query: companyName,
          checked_at: new Date().toISOString()
        }
      });

    if (insertError) {
      console.error('Error storing company name check:', insertError);
    }

    // Log audit event
    await logAuditEvent(supabaseClient, user.id, 'company_name_check', {
      company_name: companyName,
      is_available: isAvailable
    });

    return new Response(
      JSON.stringify({
        companyName,
        isAvailable,
        message: isAvailable 
          ? 'Company name appears to be available'
          : 'Company name is already in use or similar names exist',
        totalResults: searchResults.total_results
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in companies-house function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: 'An unexpected error occurred. Please try again later.'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
