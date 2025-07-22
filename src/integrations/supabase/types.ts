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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      age_group: "adult" | "teen" | "child"
      badge_type:
        | "streak"
        | "completion"
        | "quiz_master"
        | "perfect_score"
        | "fast_learner"
      completion_status: "not_started" | "in_progress" | "completed"
      difficulty_level: "beginner" | "intermediate" | "advanced" | "kids"
      legal_category:
        | "corporate"
        | "criminal"
        | "financial"
        | "rights"
        | "general"
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
      badge_type: [
        "streak",
        "completion",
        "quiz_master",
        "perfect_score",
        "fast_learner",
      ],
      completion_status: ["not_started", "in_progress", "completed"],
      difficulty_level: ["beginner", "intermediate", "advanced", "kids"],
      legal_category: [
        "corporate",
        "criminal",
        "financial",
        "rights",
        "general",
      ],
    },
  },
} as const
