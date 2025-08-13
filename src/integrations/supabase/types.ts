export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          badge_name: string
          badge_type: Database["public"]["Enums"]["badge_type"]
          description: string | null
          earned_date: string
          id: string
          metadata: Json | null
          points_awarded: number | null
          user_id: string | null
        }
        Insert: {
          badge_name: string
          badge_type: Database["public"]["Enums"]["badge_type"]
          description?: string | null
          earned_date?: string
          id?: string
          metadata?: Json | null
          points_awarded?: number | null
          user_id?: string | null
        }
        Update: {
          badge_name?: string
          badge_type?: Database["public"]["Enums"]["badge_type"]
          description?: string | null
          earned_date?: string
          id?: string
          metadata?: Json | null
          points_awarded?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_advisor_sessions: {
        Row: {
          ai_response: Json | null
          created_at: string
          id: string
          input_data: Json
          recommendations: string[] | null
          session_type: string
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_response?: Json | null
          created_at?: string
          id?: string
          input_data: Json
          recommendations?: string[] | null
          session_type: string
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_response?: Json | null
          created_at?: string
          id?: string
          input_data?: Json
          recommendations?: string[] | null
          session_type?: string
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action_type: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      budget_items: {
        Row: {
          category: string
          created_at: string | null
          description: string
          grant_id: string | null
          id: string
          quantity: number | null
          total: number | null
          unit_cost: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          grant_id?: string | null
          id?: string
          quantity?: number | null
          total?: number | null
          unit_cost?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          grant_id?: string | null
          id?: string
          quantity?: number | null
          total?: number | null
          unit_cost?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "budget_items_grant_id_fkey"
            columns: ["grant_id"]
            isOneToOne: false
            referencedRelation: "grants"
            referencedColumns: ["id"]
          },
        ]
      }
      cic_applications: {
        Row: {
          cic_name: string | null
          cic_structure: string | null
          cic36_form_data: Json | null
          community_purpose: string | null
          completed_stages: string[] | null
          created_at: string
          current_stage: string | null
          dbs_checks_required: boolean | null
          employment_sectors: string[] | null
          id: string
          jumpstart_cv_builder_access: boolean | null
          jumpstart_directory_listing: boolean | null
          jumpstart_partnership_opted_in: boolean | null
          mission_statement: string | null
          progress_percentage: number | null
          safeguarding_policy_required: boolean | null
          skills_programs: string[] | null
          status: string | null
          submitted_at: string | null
          target_age_ranges: string[] | null
          updated_at: string
          user_id: string
          youth_employment_template_data: Json | null
          youth_protection_measures: string[] | null
        }
        Insert: {
          cic_name?: string | null
          cic_structure?: string | null
          cic36_form_data?: Json | null
          community_purpose?: string | null
          completed_stages?: string[] | null
          created_at?: string
          current_stage?: string | null
          dbs_checks_required?: boolean | null
          employment_sectors?: string[] | null
          id?: string
          jumpstart_cv_builder_access?: boolean | null
          jumpstart_directory_listing?: boolean | null
          jumpstart_partnership_opted_in?: boolean | null
          mission_statement?: string | null
          progress_percentage?: number | null
          safeguarding_policy_required?: boolean | null
          skills_programs?: string[] | null
          status?: string | null
          submitted_at?: string | null
          target_age_ranges?: string[] | null
          updated_at?: string
          user_id: string
          youth_employment_template_data?: Json | null
          youth_protection_measures?: string[] | null
        }
        Update: {
          cic_name?: string | null
          cic_structure?: string | null
          cic36_form_data?: Json | null
          community_purpose?: string | null
          completed_stages?: string[] | null
          created_at?: string
          current_stage?: string | null
          dbs_checks_required?: boolean | null
          employment_sectors?: string[] | null
          id?: string
          jumpstart_cv_builder_access?: boolean | null
          jumpstart_directory_listing?: boolean | null
          jumpstart_partnership_opted_in?: boolean | null
          mission_statement?: string | null
          progress_percentage?: number | null
          safeguarding_policy_required?: boolean | null
          skills_programs?: string[] | null
          status?: string | null
          submitted_at?: string | null
          target_age_ranges?: string[] | null
          updated_at?: string
          user_id?: string
          youth_employment_template_data?: Json | null
          youth_protection_measures?: string[] | null
        }
        Relationships: []
      }
      cic_network_directory: {
        Row: {
          accepting_referrals: boolean | null
          cic_application_id: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          focus_areas: string[] | null
          id: string
          is_public: boolean | null
          location: string | null
          public_name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          accepting_referrals?: boolean | null
          cic_application_id?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          focus_areas?: string[] | null
          id?: string
          is_public?: boolean | null
          location?: string | null
          public_name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          accepting_referrals?: boolean | null
          cic_application_id?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          focus_areas?: string[] | null
          id?: string
          is_public?: boolean | null
          location?: string | null
          public_name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cic_network_directory_cic_application_id_fkey"
            columns: ["cic_application_id"]
            isOneToOne: false
            referencedRelation: "cic_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      clause_explanations: {
        Row: {
          action_required: boolean | null
          clause_text: string
          clause_type: string
          created_at: string
          document_analysis_id: string
          end_position: number | null
          explanation_detailed: string | null
          explanation_simple: string | null
          explanation_standard: string | null
          id: string
          legal_implications: string | null
          risk_level: string
          start_position: number | null
        }
        Insert: {
          action_required?: boolean | null
          clause_text: string
          clause_type: string
          created_at?: string
          document_analysis_id: string
          end_position?: number | null
          explanation_detailed?: string | null
          explanation_simple?: string | null
          explanation_standard?: string | null
          id?: string
          legal_implications?: string | null
          risk_level: string
          start_position?: number | null
        }
        Update: {
          action_required?: boolean | null
          clause_text?: string
          clause_type?: string
          created_at?: string
          document_analysis_id?: string
          end_position?: number | null
          explanation_detailed?: string | null
          explanation_simple?: string | null
          explanation_standard?: string | null
          id?: string
          legal_implications?: string | null
          risk_level?: string
          start_position?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "clause_explanations_document_analysis_id_fkey"
            columns: ["document_analysis_id"]
            isOneToOne: false
            referencedRelation: "document_analysis"
            referencedColumns: ["id"]
          },
        ]
      }
      company_registrations: {
        Row: {
          companies_house_number: string | null
          company_name: string
          company_type: string
          created_at: string
          directors: Json | null
          id: string
          incorporation_date: string | null
          registered_address: Json | null
          registration_status: string | null
          shareholders: Json | null
          sic_codes: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          companies_house_number?: string | null
          company_name: string
          company_type?: string
          created_at?: string
          directors?: Json | null
          id?: string
          incorporation_date?: string | null
          registered_address?: Json | null
          registration_status?: string | null
          shareholders?: Json | null
          sic_codes?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          companies_house_number?: string | null
          company_name?: string
          company_type?: string
          created_at?: string
          directors?: Json | null
          id?: string
          incorporation_date?: string | null
          registered_address?: Json | null
          registration_status?: string | null
          shareholders?: Json | null
          sic_codes?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      document_analysis: {
        Row: {
          analysis_date: string | null
          created_at: string
          document_id: string
          document_type: string
          id: string
          key_findings: string[] | null
          recommended_actions: string[] | null
          risk_score: number | null
          total_clauses: number | null
          user_id: string
        }
        Insert: {
          analysis_date?: string | null
          created_at?: string
          document_id: string
          document_type: string
          id?: string
          key_findings?: string[] | null
          recommended_actions?: string[] | null
          risk_score?: number | null
          total_clauses?: number | null
          user_id: string
        }
        Update: {
          analysis_date?: string | null
          created_at?: string
          document_id?: string
          document_type?: string
          id?: string
          key_findings?: string[] | null
          recommended_actions?: string[] | null
          risk_score?: number | null
          total_clauses?: number | null
          user_id?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          confidence_score: number | null
          created_at: string
          document_type: string | null
          extraction_status: string
          file_size: number
          filename: string
          id: string
          mime_type: string
          original_name: string
          page_count: number | null
          user_id: string
          word_count: number | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          document_type?: string | null
          extraction_status?: string
          file_size: number
          filename: string
          id?: string
          mime_type: string
          original_name: string
          page_count?: number | null
          user_id: string
          word_count?: number | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          document_type?: string | null
          extraction_status?: string
          file_size?: number
          filename?: string
          id?: string
          mime_type?: string
          original_name?: string
          page_count?: number | null
          user_id?: string
          word_count?: number | null
        }
        Relationships: []
      }
      employment_outcomes: {
        Row: {
          created_at: string | null
          employer_name: string | null
          employment_type: Database["public"]["Enums"]["employment_type"] | null
          end_date: string | null
          id: string
          job_title: string | null
          jumpstart_placement: boolean | null
          participant_id: string | null
          progression_notes: string | null
          retention_90_day: boolean | null
          retention_check_date: string | null
          salary_range: string | null
          start_date: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          employer_name?: string | null
          employment_type?:
            | Database["public"]["Enums"]["employment_type"]
            | null
          end_date?: string | null
          id?: string
          job_title?: string | null
          jumpstart_placement?: boolean | null
          participant_id?: string | null
          progression_notes?: string | null
          retention_90_day?: boolean | null
          retention_check_date?: string | null
          salary_range?: string | null
          start_date?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          employer_name?: string | null
          employment_type?:
            | Database["public"]["Enums"]["employment_type"]
            | null
          end_date?: string | null
          id?: string
          job_title?: string | null
          jumpstart_placement?: boolean | null
          participant_id?: string | null
          progression_notes?: string | null
          retention_90_day?: boolean | null
          retention_check_date?: string | null
          salary_range?: string | null
          start_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employment_outcomes_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
        ]
      }
      grant_applications: {
        Row: {
          ai_assistance_used: boolean | null
          application_data: Json | null
          cic_application_id: string | null
          collaboration_cics: string[] | null
          created_at: string
          grant_id: string
          id: string
          jumpstart_referral_enabled: boolean | null
          status: string | null
          submitted_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_assistance_used?: boolean | null
          application_data?: Json | null
          cic_application_id?: string | null
          collaboration_cics?: string[] | null
          created_at?: string
          grant_id: string
          id?: string
          jumpstart_referral_enabled?: boolean | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_assistance_used?: boolean | null
          application_data?: Json | null
          cic_application_id?: string | null
          collaboration_cics?: string[] | null
          created_at?: string
          grant_id?: string
          id?: string
          jumpstart_referral_enabled?: boolean | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "grant_applications_cic_application_id_fkey"
            columns: ["cic_application_id"]
            isOneToOne: false
            referencedRelation: "cic_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grant_applications_grant_id_fkey"
            columns: ["grant_id"]
            isOneToOne: false
            referencedRelation: "grants"
            referencedColumns: ["id"]
          },
        ]
      }
      grants: {
        Row: {
          application_deadline: string | null
          created_at: string
          description: string | null
          eligibility_criteria: Json | null
          funder_name: string
          funding_amount_max: number | null
          funding_amount_min: number | null
          geographic_coverage: string[] | null
          grant_type: string
          guidance: string | null
          id: string
          is_active: boolean | null
          jumpstart_partnership_bonus: boolean | null
          partnership_opportunities: boolean | null
          question_set: Json | null
          skills_focus: string[] | null
          target_age_ranges: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          application_deadline?: string | null
          created_at?: string
          description?: string | null
          eligibility_criteria?: Json | null
          funder_name: string
          funding_amount_max?: number | null
          funding_amount_min?: number | null
          geographic_coverage?: string[] | null
          grant_type?: string
          guidance?: string | null
          id?: string
          is_active?: boolean | null
          jumpstart_partnership_bonus?: boolean | null
          partnership_opportunities?: boolean | null
          question_set?: Json | null
          skills_focus?: string[] | null
          target_age_ranges?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          application_deadline?: string | null
          created_at?: string
          description?: string | null
          eligibility_criteria?: Json | null
          funder_name?: string
          funding_amount_max?: number | null
          funding_amount_min?: number | null
          geographic_coverage?: string[] | null
          grant_type?: string
          guidance?: string | null
          id?: string
          is_active?: boolean | null
          jumpstart_partnership_bonus?: boolean | null
          partnership_opportunities?: boolean | null
          question_set?: Json | null
          skills_focus?: string[] | null
          target_age_ranges?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      impact_tracking: {
        Row: {
          cic_application_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          interaction_date: string | null
          interaction_type: Database["public"]["Enums"]["interaction_type"]
          jumpstart_sync_id: string | null
          metadata: Json | null
          notes: string | null
          participant_id: string | null
          success_indicator: boolean | null
        }
        Insert: {
          cic_application_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          interaction_date?: string | null
          interaction_type: Database["public"]["Enums"]["interaction_type"]
          jumpstart_sync_id?: string | null
          metadata?: Json | null
          notes?: string | null
          participant_id?: string | null
          success_indicator?: boolean | null
        }
        Update: {
          cic_application_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          interaction_date?: string | null
          interaction_type?: Database["public"]["Enums"]["interaction_type"]
          jumpstart_sync_id?: string | null
          metadata?: Json | null
          notes?: string | null
          participant_id?: string | null
          success_indicator?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "impact_tracking_cic_application_id_fkey"
            columns: ["cic_application_id"]
            isOneToOne: false
            referencedRelation: "cic_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "impact_tracking_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          application_data: Json | null
          applied_at: string | null
          id: string
          job_id: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          application_data?: Json | null
          applied_at?: string | null
          id?: string
          job_id: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          application_data?: Json | null
          applied_at?: string | null
          id?: string
          job_id?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_interactions: {
        Row: {
          action: string
          created_at: string | null
          id: string
          job_id: string
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          job_id: string
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          job_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_interactions_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          company: string
          description: string | null
          external_id: string
          external_url: string
          id: string
          is_active: boolean | null
          job_board: string
          location: string | null
          posted_date: string | null
          requirements: string[] | null
          salary_max: number | null
          salary_min: number | null
          scraped_at: string | null
          title: string
        }
        Insert: {
          company: string
          description?: string | null
          external_id: string
          external_url: string
          id?: string
          is_active?: boolean | null
          job_board: string
          location?: string | null
          posted_date?: string | null
          requirements?: string[] | null
          salary_max?: number | null
          salary_min?: number | null
          scraped_at?: string | null
          title: string
        }
        Update: {
          company?: string
          description?: string | null
          external_id?: string
          external_url?: string
          id?: string
          is_active?: boolean | null
          job_board?: string
          location?: string | null
          posted_date?: string | null
          requirements?: string[] | null
          salary_max?: number | null
          salary_min?: number | null
          scraped_at?: string | null
          title?: string
        }
        Relationships: []
      }
      jumpstart_partnerships: {
        Row: {
          available_placements: number | null
          cic_application_id: string | null
          created_at: string | null
          directory_listed: boolean | null
          id: string
          last_sync_at: string | null
          safeguarding_contact: string | null
          sync_status: string | null
          tagline: string | null
          target_age_range: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          available_placements?: number | null
          cic_application_id?: string | null
          created_at?: string | null
          directory_listed?: boolean | null
          id?: string
          last_sync_at?: string | null
          safeguarding_contact?: string | null
          sync_status?: string | null
          tagline?: string | null
          target_age_range?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          available_placements?: number | null
          cic_application_id?: string | null
          created_at?: string | null
          directory_listed?: boolean | null
          id?: string
          last_sync_at?: string | null
          safeguarding_contact?: string | null
          sync_status?: string | null
          tagline?: string | null
          target_age_range?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "jumpstart_partnerships_cic_application_id_fkey"
            columns: ["cic_application_id"]
            isOneToOne: false
            referencedRelation: "cic_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_modules: {
        Row: {
          age_group: Database["public"]["Enums"]["age_group"]
          created_at: string
          description: string | null
          estimated_weeks: number | null
          id: string
          is_featured: boolean | null
          learning_outcomes: string[] | null
          legal_category: Database["public"]["Enums"]["legal_category"]
          name: string
          prerequisites: string[] | null
          total_lessons: number | null
        }
        Insert: {
          age_group: Database["public"]["Enums"]["age_group"]
          created_at?: string
          description?: string | null
          estimated_weeks?: number | null
          id?: string
          is_featured?: boolean | null
          learning_outcomes?: string[] | null
          legal_category: Database["public"]["Enums"]["legal_category"]
          name: string
          prerequisites?: string[] | null
          total_lessons?: number | null
        }
        Update: {
          age_group?: Database["public"]["Enums"]["age_group"]
          created_at?: string
          description?: string | null
          estimated_weeks?: number | null
          id?: string
          is_featured?: boolean | null
          learning_outcomes?: string[] | null
          legal_category?: Database["public"]["Enums"]["legal_category"]
          name?: string
          prerequisites?: string[] | null
          total_lessons?: number | null
        }
        Relationships: []
      }
      legal_documents: {
        Row: {
          company_registration_id: string | null
          created_at: string
          document_data: Json
          document_type: string
          generated_content: string | null
          id: string
          signed_at: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_registration_id?: string | null
          created_at?: string
          document_data: Json
          document_type: string
          generated_content?: string | null
          id?: string
          signed_at?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_registration_id?: string | null
          created_at?: string
          document_data?: Json
          document_type?: string
          generated_content?: string | null
          id?: string
          signed_at?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "legal_documents_company_registration_id_fkey"
            columns: ["company_registration_id"]
            isOneToOne: false
            referencedRelation: "company_registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      lender_reviews: {
        Row: {
          created_at: string
          helpful_count: number | null
          id: string
          lender_id: string | null
          rating: number
          review_text: string | null
          review_title: string | null
          updated_at: string
          user_id: string | null
          verified: boolean | null
        }
        Insert: {
          created_at?: string
          helpful_count?: number | null
          id?: string
          lender_id?: string | null
          rating: number
          review_text?: string | null
          review_title?: string | null
          updated_at?: string
          user_id?: string | null
          verified?: boolean | null
        }
        Update: {
          created_at?: string
          helpful_count?: number | null
          id?: string
          lender_id?: string | null
          rating?: number
          review_text?: string | null
          review_title?: string | null
          updated_at?: string
          user_id?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "lender_reviews_lender_id_fkey"
            columns: ["lender_id"]
            isOneToOne: false
            referencedRelation: "lenders"
            referencedColumns: ["id"]
          },
        ]
      }
      lenders: {
        Row: {
          average_rating: number | null
          coverage_areas: string[] | null
          created_at: string
          description: string | null
          email: string | null
          established_year: number | null
          headquarters_location: string | null
          id: string
          is_active: boolean
          lender_type: Database["public"]["Enums"]["lender_type"]
          logo_url: string | null
          name: string
          nmls_id: string | null
          phone: string | null
          total_reviews: number | null
          updated_at: string
          website: string | null
        }
        Insert: {
          average_rating?: number | null
          coverage_areas?: string[] | null
          created_at?: string
          description?: string | null
          email?: string | null
          established_year?: number | null
          headquarters_location?: string | null
          id?: string
          is_active?: boolean
          lender_type?: Database["public"]["Enums"]["lender_type"]
          logo_url?: string | null
          name: string
          nmls_id?: string | null
          phone?: string | null
          total_reviews?: number | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          average_rating?: number | null
          coverage_areas?: string[] | null
          created_at?: string
          description?: string | null
          email?: string | null
          established_year?: number | null
          headquarters_location?: string | null
          id?: string
          is_active?: boolean
          lender_type?: Database["public"]["Enums"]["lender_type"]
          logo_url?: string | null
          name?: string
          nmls_id?: string | null
          phone?: string | null
          total_reviews?: number | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      lessons: {
        Row: {
          age_group: Database["public"]["Enums"]["age_group"]
          audio_url: string | null
          content: string
          created_at: string
          description: string | null
          difficulty_level: Database["public"]["Enums"]["difficulty_level"]
          downloadable_content: string | null
          estimated_duration: number
          id: string
          is_active: boolean
          key_terms: string[] | null
          learning_objectives: string[] | null
          legal_category: Database["public"]["Enums"]["legal_category"]
          lesson_order: number | null
          module_name: string | null
          prerequisite_lessons: string[] | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          age_group?: Database["public"]["Enums"]["age_group"]
          audio_url?: string | null
          content: string
          created_at?: string
          description?: string | null
          difficulty_level?: Database["public"]["Enums"]["difficulty_level"]
          downloadable_content?: string | null
          estimated_duration?: number
          id?: string
          is_active?: boolean
          key_terms?: string[] | null
          learning_objectives?: string[] | null
          legal_category?: Database["public"]["Enums"]["legal_category"]
          lesson_order?: number | null
          module_name?: string | null
          prerequisite_lessons?: string[] | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          age_group?: Database["public"]["Enums"]["age_group"]
          audio_url?: string | null
          content?: string
          created_at?: string
          description?: string | null
          difficulty_level?: Database["public"]["Enums"]["difficulty_level"]
          downloadable_content?: string | null
          estimated_duration?: number
          id?: string
          is_active?: boolean
          key_terms?: string[] | null
          learning_objectives?: string[] | null
          legal_category?: Database["public"]["Enums"]["legal_category"]
          lesson_order?: number | null
          module_name?: string | null
          prerequisite_lessons?: string[] | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      loan_products: {
        Row: {
          apr_range_high: number | null
          apr_range_low: number | null
          base_rate: number | null
          created_at: string
          estimated_closing_days: number | null
          features: string[] | null
          fees: Json | null
          first_time_buyer_program: boolean | null
          id: string
          is_active: boolean
          lender_id: string | null
          low_income_program: boolean | null
          max_credit_score: number | null
          max_loan_amount: number | null
          min_credit_score: number | null
          min_down_payment_percent: number | null
          min_loan_amount: number | null
          product_name: string
          product_type: Database["public"]["Enums"]["loan_product_type"]
          updated_at: string
          veteran_program: boolean | null
        }
        Insert: {
          apr_range_high?: number | null
          apr_range_low?: number | null
          base_rate?: number | null
          created_at?: string
          estimated_closing_days?: number | null
          features?: string[] | null
          fees?: Json | null
          first_time_buyer_program?: boolean | null
          id?: string
          is_active?: boolean
          lender_id?: string | null
          low_income_program?: boolean | null
          max_credit_score?: number | null
          max_loan_amount?: number | null
          min_credit_score?: number | null
          min_down_payment_percent?: number | null
          min_loan_amount?: number | null
          product_name: string
          product_type: Database["public"]["Enums"]["loan_product_type"]
          updated_at?: string
          veteran_program?: boolean | null
        }
        Update: {
          apr_range_high?: number | null
          apr_range_low?: number | null
          base_rate?: number | null
          created_at?: string
          estimated_closing_days?: number | null
          features?: string[] | null
          fees?: Json | null
          first_time_buyer_program?: boolean | null
          id?: string
          is_active?: boolean
          lender_id?: string | null
          low_income_program?: boolean | null
          max_credit_score?: number | null
          max_loan_amount?: number | null
          min_credit_score?: number | null
          min_down_payment_percent?: number | null
          min_loan_amount?: number | null
          product_name?: string
          product_type?: Database["public"]["Enums"]["loan_product_type"]
          updated_at?: string
          veteran_program?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "loan_products_lender_id_fkey"
            columns: ["lender_id"]
            isOneToOne: false
            referencedRelation: "lenders"
            referencedColumns: ["id"]
          },
        ]
      }
      network_analytics: {
        Row: {
          apprenticeship_progressions: number | null
          business_startups: number | null
          cic_application_id: string | null
          cic_referrals_made: number | null
          cic_referrals_received: number | null
          cvs_created: number | null
          cvs_updated: number | null
          employment_placements: number | null
          further_education_progressions: number | null
          generated_at: string | null
          id: string
          interviews_completed: number | null
          interviews_scheduled: number | null
          job_applications: number | null
          jumpstart_sync_status: string | null
          reporting_period_end: string
          reporting_period_start: string
          retention_90_day: number | null
          shared_employer_partnerships: number | null
          total_participants: number | null
        }
        Insert: {
          apprenticeship_progressions?: number | null
          business_startups?: number | null
          cic_application_id?: string | null
          cic_referrals_made?: number | null
          cic_referrals_received?: number | null
          cvs_created?: number | null
          cvs_updated?: number | null
          employment_placements?: number | null
          further_education_progressions?: number | null
          generated_at?: string | null
          id?: string
          interviews_completed?: number | null
          interviews_scheduled?: number | null
          job_applications?: number | null
          jumpstart_sync_status?: string | null
          reporting_period_end: string
          reporting_period_start: string
          retention_90_day?: number | null
          shared_employer_partnerships?: number | null
          total_participants?: number | null
        }
        Update: {
          apprenticeship_progressions?: number | null
          business_startups?: number | null
          cic_application_id?: string | null
          cic_referrals_made?: number | null
          cic_referrals_received?: number | null
          cvs_created?: number | null
          cvs_updated?: number | null
          employment_placements?: number | null
          further_education_progressions?: number | null
          generated_at?: string | null
          id?: string
          interviews_completed?: number | null
          interviews_scheduled?: number | null
          job_applications?: number | null
          jumpstart_sync_status?: string | null
          reporting_period_end?: string
          reporting_period_start?: string
          retention_90_day?: number | null
          shared_employer_partnerships?: number | null
          total_participants?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "network_analytics_cic_application_id_fkey"
            columns: ["cic_application_id"]
            isOneToOne: false
            referencedRelation: "cic_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      network_resources: {
        Row: {
          access_count: number | null
          content_data: Json | null
          contributing_cic_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_public: boolean | null
          jumpstart_featured: boolean | null
          network_wide: boolean | null
          resource_type: string
          title: string
          updated_at: string | null
        }
        Insert: {
          access_count?: number | null
          content_data?: Json | null
          contributing_cic_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          jumpstart_featured?: boolean | null
          network_wide?: boolean | null
          resource_type: string
          title: string
          updated_at?: string | null
        }
        Update: {
          access_count?: number | null
          content_data?: Json | null
          contributing_cic_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          jumpstart_featured?: boolean | null
          network_wide?: boolean | null
          resource_type?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "network_resources_contributing_cic_id_fkey"
            columns: ["contributing_cic_id"]
            isOneToOne: false
            referencedRelation: "cic_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      participants: {
        Row: {
          cic_application_id: string | null
          completion_date: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          enrollment_date: string | null
          first_name: string
          id: string
          jumpstart_user_id: string | null
          last_name: string
          phone: string | null
          postcode: string | null
          status: Database["public"]["Enums"]["participant_status"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          cic_application_id?: string | null
          completion_date?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          enrollment_date?: string | null
          first_name: string
          id?: string
          jumpstart_user_id?: string | null
          last_name: string
          phone?: string | null
          postcode?: string | null
          status?: Database["public"]["Enums"]["participant_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          cic_application_id?: string | null
          completion_date?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          enrollment_date?: string | null
          first_name?: string
          id?: string
          jumpstart_user_id?: string | null
          last_name?: string
          phone?: string | null
          postcode?: string | null
          status?: Database["public"]["Enums"]["participant_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participants_cic_application_id_fkey"
            columns: ["cic_application_id"]
            isOneToOne: false
            referencedRelation: "cic_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      peer_reviews: {
        Row: {
          created_at: string
          feedback: string | null
          grant_application_id: string
          id: string
          rating: number | null
          review_data: Json | null
          reviewer_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          feedback?: string | null
          grant_application_id: string
          id?: string
          rating?: number | null
          review_data?: Json | null
          reviewer_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          feedback?: string | null
          grant_application_id?: string
          id?: string
          rating?: number | null
          review_data?: Json | null
          reviewer_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "peer_reviews_grant_application_id_fkey"
            columns: ["grant_application_id"]
            isOneToOne: false
            referencedRelation: "grant_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_name: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          subscription_expires_at: string | null
          subscription_status: string | null
          subscription_tier: Database["public"]["Enums"]["subscription_tier"]
          updated_at: string
          user_id: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          subscription_expires_at?: string | null
          subscription_status?: string | null
          subscription_tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
          user_id: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          subscription_expires_at?: string | null
          subscription_status?: string | null
          subscription_tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      quizzes: {
        Row: {
          correct_answer: string
          created_at: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          explanation: string | null
          id: string
          lesson_id: string | null
          options: Json
          question: string
          question_order: number
        }
        Insert: {
          correct_answer: string
          created_at?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          explanation?: string | null
          id?: string
          lesson_id?: string | null
          options: Json
          question: string
          question_order?: number
        }
        Update: {
          correct_answer?: string
          created_at?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          explanation?: string | null
          id?: string
          lesson_id?: string | null
          options?: Json
          question?: string
          question_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_limits: {
        Row: {
          action_type: string
          attempt_count: number | null
          blocked_until: string | null
          created_at: string | null
          id: string
          identifier: string
          updated_at: string | null
          window_start: string | null
        }
        Insert: {
          action_type: string
          attempt_count?: number | null
          blocked_until?: string | null
          created_at?: string | null
          id?: string
          identifier: string
          updated_at?: string | null
          window_start?: string | null
        }
        Update: {
          action_type?: string
          attempt_count?: number | null
          blocked_until?: string | null
          created_at?: string | null
          id?: string
          identifier?: string
          updated_at?: string | null
          window_start?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string | null
          created_by: string
          from_cic_id: string | null
          id: string
          notes: string | null
          participant_id: string | null
          status: string | null
          to_cic_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          from_cic_id?: string | null
          id?: string
          notes?: string | null
          participant_id?: string | null
          status?: string | null
          to_cic_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          from_cic_id?: string | null
          id?: string
          notes?: string | null
          participant_id?: string | null
          status?: string | null
          to_cic_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_from_cic_id_fkey"
            columns: ["from_cic_id"]
            isOneToOne: false
            referencedRelation: "cic_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_to_cic_id_fkey"
            columns: ["to_cic_id"]
            isOneToOne: false
            referencedRelation: "cic_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      response_templates: {
        Row: {
          created_at: string
          id: string
          question: string
          template: string
          template_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          question: string
          template: string
          template_type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          question?: string
          template?: string
          template_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      security_settings: {
        Row: {
          created_at: string | null
          id: string
          locked_until: string | null
          login_attempts: number | null
          password_changed_at: string | null
          two_factor_enabled: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          locked_until?: string | null
          login_attempts?: number | null
          password_changed_at?: string | null
          two_factor_enabled?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          locked_until?: string | null
          login_attempts?: number | null
          password_changed_at?: string | null
          two_factor_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      shared_resources: {
        Row: {
          age_group_focus: string[] | null
          category: string | null
          content_url: string | null
          created_at: string
          created_by: string
          description: string | null
          download_count: number | null
          file_path: string | null
          id: string
          is_public: boolean | null
          resource_type: string
          title: string
          updated_at: string
        }
        Insert: {
          age_group_focus?: string[] | null
          category?: string | null
          content_url?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          download_count?: number | null
          file_path?: string | null
          id?: string
          is_public?: boolean | null
          resource_type: string
          title: string
          updated_at?: string
        }
        Update: {
          age_group_focus?: string[] | null
          category?: string | null
          content_url?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          download_count?: number | null
          file_path?: string | null
          id?: string
          is_public?: boolean | null
          resource_type?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_applications: {
        Row: {
          application_date: string | null
          application_status: Database["public"]["Enums"]["application_status"]
          callback_completed: boolean | null
          callback_requested: boolean | null
          created_at: string
          id: string
          lender_id: string | null
          loan_amount: number | null
          loan_product_id: string | null
          notes: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          application_date?: string | null
          application_status?: Database["public"]["Enums"]["application_status"]
          callback_completed?: boolean | null
          callback_requested?: boolean | null
          created_at?: string
          id?: string
          lender_id?: string | null
          loan_amount?: number | null
          loan_product_id?: string | null
          notes?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          application_date?: string | null
          application_status?: Database["public"]["Enums"]["application_status"]
          callback_completed?: boolean | null
          callback_requested?: boolean | null
          created_at?: string
          id?: string
          lender_id?: string | null
          loan_amount?: number | null
          loan_product_id?: string | null
          notes?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_applications_lender_id_fkey"
            columns: ["lender_id"]
            isOneToOne: false
            referencedRelation: "lenders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_applications_loan_product_id_fkey"
            columns: ["loan_product_id"]
            isOneToOne: false
            referencedRelation: "loan_products"
            referencedColumns: ["id"]
          },
        ]
      }
      user_grant_answers: {
        Row: {
          answer: string | null
          created_at: string | null
          grant_id: string | null
          id: string
          question_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          answer?: string | null
          created_at?: string | null
          grant_id?: string | null
          id?: string
          question_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          answer?: string | null
          created_at?: string | null
          grant_id?: string | null
          id?: string
          question_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_grant_answers_grant_id_fkey"
            columns: ["grant_id"]
            isOneToOne: false
            referencedRelation: "grants"
            referencedColumns: ["id"]
          },
        ]
      }
      user_lender_bookmarks: {
        Row: {
          created_at: string
          id: string
          lender_id: string | null
          personal_notes: string | null
          ranking: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          lender_id?: string | null
          personal_notes?: string | null
          ranking?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          lender_id?: string | null
          personal_notes?: string | null
          ranking?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_lender_bookmarks_lender_id_fkey"
            columns: ["lender_id"]
            isOneToOne: false
            referencedRelation: "lenders"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string | null
          cv_url: string | null
          education: Json | null
          email: string | null
          experience: Json | null
          full_name: string | null
          id: string
          linkedin_url: string | null
          location: string | null
          phone: string | null
          skills: string[] | null
          updated_at: string | null
          user_id: string
          weekly_goal: number | null
        }
        Insert: {
          created_at?: string | null
          cv_url?: string | null
          education?: Json | null
          email?: string | null
          experience?: Json | null
          full_name?: string | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          skills?: string[] | null
          updated_at?: string | null
          user_id: string
          weekly_goal?: number | null
        }
        Update: {
          created_at?: string | null
          cv_url?: string | null
          education?: Json | null
          email?: string | null
          experience?: Json | null
          full_name?: string | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          skills?: string[] | null
          updated_at?: string | null
          user_id?: string
          weekly_goal?: number | null
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          attempts: number | null
          best_score: number | null
          completed_at: string | null
          completion_status: Database["public"]["Enums"]["completion_status"]
          created_at: string
          id: string
          lesson_id: string | null
          notes: string | null
          quiz_score: number | null
          time_spent: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          attempts?: number | null
          best_score?: number | null
          completed_at?: string | null
          completion_status?: Database["public"]["Enums"]["completion_status"]
          created_at?: string
          id?: string
          lesson_id?: string | null
          notes?: string | null
          quiz_score?: number | null
          time_spent?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          attempts?: number | null
          best_score?: number | null
          completed_at?: string | null
          completion_status?: Database["public"]["Enums"]["completion_status"]
          created_at?: string
          id?: string
          lesson_id?: string | null
          notes?: string | null
          quiz_score?: number | null
          time_spent?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress_tracking: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string
          id: string
          milestone_data: Json | null
          milestone_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          id?: string
          milestone_data?: Json | null
          milestone_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          id?: string
          milestone_data?: Json | null
          milestone_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_saved_grants: {
        Row: {
          application_status: string | null
          grant_id: string
          id: string
          match_score: number | null
          notes: string | null
          saved_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          application_status?: string | null
          grant_id: string
          id?: string
          match_score?: number | null
          notes?: string | null
          saved_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          application_status?: string | null
          grant_id?: string
          id?: string
          match_score?: number | null
          notes?: string | null
          saved_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_saved_grants_grant_id_fkey"
            columns: ["grant_id"]
            isOneToOne: false
            referencedRelation: "grants"
            referencedColumns: ["id"]
          },
        ]
      }
      user_stats: {
        Row: {
          badges: string[] | null
          created_at: string | null
          current_streak: number | null
          id: string
          level: number | null
          longest_streak: number | null
          total_applications: number | null
          total_interviews: number | null
          total_xp: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          badges?: string[] | null
          created_at?: string | null
          current_streak?: number | null
          id?: string
          level?: number | null
          longest_streak?: number | null
          total_applications?: number | null
          total_interviews?: number | null
          total_xp?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          badges?: string[] | null
          created_at?: string | null
          current_streak?: number | null
          id?: string
          level?: number | null
          longest_streak?: number | null
          total_applications?: number | null
          total_interviews?: number | null
          total_xp?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      weekly_goals: {
        Row: {
          applications_count: number | null
          created_at: string | null
          goal_count: number
          id: string
          user_id: string
          week_start: string
        }
        Insert: {
          applications_count?: number | null
          created_at?: string | null
          goal_count: number
          id?: string
          user_id: string
          week_start: string
        }
        Update: {
          applications_count?: number | null
          created_at?: string | null
          goal_count?: number
          id?: string
          user_id?: string
          week_start?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_cic_kpis: {
        Args: {
          p_cic_application_id: string
          p_start_date: string
          p_end_date: string
        }
        Returns: {
          total_participants: number
          cvs_created: number
          cvs_updated: number
          job_applications: number
          interviews_scheduled: number
          interviews_completed: number
          employment_placements: number
          retention_90_day: number
          apprenticeship_progressions: number
          further_education_progressions: number
          business_startups: number
        }[]
      }
      calculate_grant_match_score: {
        Args: { p_grant_id: string; p_cic_application_id: string }
        Returns: number
      }
      get_user_cic_applications: {
        Args: { p_user_id: string }
        Returns: {
          id: string
          user_id: string
          cic_name: string
          cic_structure: string
          community_purpose: string
          mission_statement: string
          target_age_ranges: string[]
          employment_sectors: string[]
          skills_programs: string[]
          jumpstart_partnership_opted_in: boolean
          jumpstart_directory_listing: boolean
          jumpstart_cv_builder_access: boolean
          safeguarding_policy_required: boolean
          dbs_checks_required: boolean
          youth_protection_measures: string[]
          current_stage: string
          completed_stages: string[]
          progress_percentage: number
          cic36_form_data: Json
          youth_employment_template_data: Json
          created_at: string
          updated_at: string
          submitted_at: string
          status: string
        }[]
      }
      get_user_grant_matches: {
        Args: { p_user_id: string }
        Returns: {
          grant_id: string
          title: string
          description: string
          funder_name: string
          funding_amount_min: number
          funding_amount_max: number
          application_deadline: string
          match_score: number
          is_saved: boolean
        }[]
      }
      log_audit_event: {
        Args: {
          p_user_id: string
          p_action_type: string
          p_table_name?: string
          p_record_id?: string
          p_old_values?: Json
          p_new_values?: Json
          p_ip_address?: string
          p_user_agent?: string
        }
        Returns: undefined
      }
      submit_grant_application: {
        Args: { p_grant_id: string }
        Returns: undefined
      }
    }
    Enums: {
      age_group: "adult" | "teen" | "child"
      application_status:
        | "pending"
        | "submitted"
        | "approved"
        | "denied"
        | "withdrawn"
      badge_type:
        | "streak"
        | "completion"
        | "quiz_master"
        | "perfect_score"
        | "fast_learner"
      completion_status: "not_started" | "in_progress" | "completed"
      difficulty_level: "beginner" | "intermediate" | "advanced" | "kids"
      employment_type:
        | "full_time"
        | "part_time"
        | "apprenticeship"
        | "internship"
        | "self_employed"
        | "further_education"
      interaction_type:
        | "cv_created"
        | "cv_updated"
        | "job_application"
        | "interview_scheduled"
        | "interview_completed"
        | "employment_placed"
        | "retention_check"
        | "progression_tracked"
        | "referral_made"
      legal_category:
        | "corporate"
        | "criminal"
        | "financial"
        | "rights"
        | "general"
      lender_type: "bank" | "credit_union" | "online" | "mortgage_company"
      loan_product_type:
        | "conventional"
        | "fha"
        | "va"
        | "usda"
        | "jumbo"
        | "commercial"
      participant_status:
        | "enrolled"
        | "active"
        | "completed"
        | "employed"
        | "further_education"
        | "business_start_up"
        | "inactive"
      subscription_tier: "free" | "starter" | "growth" | "scale"
      user_role: "entrepreneur" | "advisor" | "affiliate" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      age_group: ["adult", "teen", "child"],
      application_status: [
        "pending",
        "submitted",
        "approved",
        "denied",
        "withdrawn",
      ],
      badge_type: [
        "streak",
        "completion",
        "quiz_master",
        "perfect_score",
        "fast_learner",
      ],
      completion_status: ["not_started", "in_progress", "completed"],
      difficulty_level: ["beginner", "intermediate", "advanced", "kids"],
      employment_type: [
        "full_time",
        "part_time",
        "apprenticeship",
        "internship",
        "self_employed",
        "further_education",
      ],
      interaction_type: [
        "cv_created",
        "cv_updated",
        "job_application",
        "interview_scheduled",
        "interview_completed",
        "employment_placed",
        "retention_check",
        "progression_tracked",
        "referral_made",
      ],
      legal_category: [
        "corporate",
        "criminal",
        "financial",
        "rights",
        "general",
      ],
      lender_type: ["bank", "credit_union", "online", "mortgage_company"],
      loan_product_type: [
        "conventional",
        "fha",
        "va",
        "usda",
        "jumbo",
        "commercial",
      ],
      participant_status: [
        "enrolled",
        "active",
        "completed",
        "employed",
        "further_education",
        "business_start_up",
        "inactive",
      ],
      subscription_tier: ["free", "starter", "growth", "scale"],
      user_role: ["entrepreneur", "advisor", "affiliate", "admin"],
    },
  },
} as const
