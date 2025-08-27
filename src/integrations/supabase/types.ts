export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          ip_address: unknown | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      authors: {
        Row: {
          avatar: string | null
          bio: string | null
          created_at: string
          id: string
          name: string
          role: string | null
          slug: string
          social: Json | null
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          name: string
          role?: string | null
          slug: string
          social?: Json | null
        }
        Update: {
          avatar?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          name?: string
          role?: string | null
          slug?: string
          social?: Json | null
        }
        Relationships: []
      }
      company_registrations: {
        Row: {
          company_name: string
          company_type: string
          created_at: string
          directors: Json | null
          id: string
          registered_office: Json
          share_capital: Json | null
          shareholders: Json | null
          sic_codes: string[] | null
          status: string | null
          submission_reference: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          company_name: string
          company_type: string
          created_at?: string
          directors?: Json | null
          id?: string
          registered_office: Json
          share_capital?: Json | null
          shareholders?: Json | null
          sic_codes?: string[] | null
          status?: string | null
          submission_reference?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          company_name?: string
          company_type?: string
          created_at?: string
          directors?: Json | null
          id?: string
          registered_office?: Json
          share_capital?: Json | null
          shareholders?: Json | null
          sic_codes?: string[] | null
          status?: string | null
          submission_reference?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          subject?: string
        }
        Relationships: []
      }
      gdpr_requests: {
        Row: {
          id: string
          processed_at: string | null
          request_type: string
          requested_at: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          processed_at?: string | null
          request_type: string
          requested_at?: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          processed_at?: string | null
          request_type?: string
          requested_at?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      legal_documents: {
        Row: {
          created_at: string
          document_data: Json
          document_type: string
          generated_content: string | null
          id: string
          pdf_url: string | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          document_data?: Json
          document_type: string
          generated_content?: string | null
          id?: string
          pdf_url?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          document_data?: Json
          document_type?: string
          generated_content?: string | null
          id?: string
          pdf_url?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      newsletter_signups: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
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
          role: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_status: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      waitlist_emails: {
        Row: {
          created_at: string
          email: string
          feature: string | null
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          feature?: string | null
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          feature?: string | null
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_subscription_tier: {
        Args: { user_uuid: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
