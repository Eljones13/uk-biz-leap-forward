import Deno from "https://deno.land/x/deno_core@0.254.0/mod.ts";
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get API credentials from environment variables
    const COMPANIES_HOUSE_API_KEY = Deno.env.get("COMPANIES_HOUSE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    if (!COMPANIES_HOUSE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Companies House API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get the request data
    const { action, data, userId } = await req.json();

    // Create Supabase client with admin privileges for database operations
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Base64 encode the API key for Companies House auth
    const authHeader = `Basic ${btoa(`${COMPANIES_HOUSE_API_KEY}:`)}`;
    
    // Perform different actions based on the request
    switch (action) {
      case "company_name_availability": {
        // Check if a company name is available
        const { companyName } = data;
        
        const response = await fetch(
          `https://api.company-information.service.gov.uk/company-name-availability?company_name=${encodeURIComponent(companyName)}`,
          {
            method: "GET",
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        
        // Log the check in the database
        await supabase.from("company_name_checks").insert({
          user_id: userId,
          company_name: companyName,
          is_available: result.company_name_availability === "available",
          response_data: result
        });
        
        return new Response(
          JSON.stringify(result),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "company_search": {
        // Search for existing companies
        const { query, items_per_page = 20, start_index = 0 } = data;
        
        const response = await fetch(
          `https://api.company-information.service.gov.uk/search/companies?q=${encodeURIComponent(query)}&items_per_page=${items_per_page}&start_index=${start_index}`,
          {
            method: "GET",
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        
        return new Response(
          JSON.stringify(result),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "company_profile": {
        // Get detailed company information
        const { companyNumber } = data;
        
        const response = await fetch(
          `https://api.company-information.service.gov.uk/company/${companyNumber}`,
          {
            method: "GET",
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        
        return new Response(
          JSON.stringify(result),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "officer_search": {
        // Search for company officers/directors
        const { query, items_per_page = 20, start_index = 0 } = data;
        
        const response = await fetch(
          `https://api.company-information.service.gov.uk/search/officers?q=${encodeURIComponent(query)}&items_per_page=${items_per_page}&start_index=${start_index}`,
          {
            method: "GET",
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        
        return new Response(
          JSON.stringify(result),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      case "register_company": {
        // This is a simplified placeholder - actual company registration requires
        // submitting a complex set of data to Companies House Web Filing or XMLGW services
        // Usually done through an approved formation agent
        
        const { companyData } = data;
        
        // Log the registration attempt
        await supabase.from("company_registrations").insert({
          user_id: userId,
          company_name: companyData.company_name,
          company_type: companyData.company_type,
          registered_address: companyData.registered_address,
          directors: companyData.directors,
          shareholders: companyData.shareholders,
          registration_status: "submitted"
        });
        
        return new Response(
          JSON.stringify({ 
            status: "submitted",
            message: "Company registration submitted. An agent will process your request." 
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      default:
        return new Response(
          JSON.stringify({ error: "Invalid action" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
  } catch (error) {
    console.error("Error:", error.message);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});