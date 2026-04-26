export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string | null;
          email: string | null;
          first_dream: string | null;
          current_interest: string | null;
          mission: string | null;
          saved_path_id: string | null;
          completed_path_ids: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name?: string | null;
          email?: string | null;
          first_dream?: string | null;
          current_interest?: string | null;
          mission?: string | null;
          saved_path_id?: string | null;
          completed_path_ids?: string[] | null;
        };
        Update: {
          name?: string | null;
          email?: string | null;
          first_dream?: string | null;
          current_interest?: string | null;
          mission?: string | null;
          saved_path_id?: string | null;
          completed_path_ids?: string[] | null;
          updated_at?: string;
        };
      };
      quiz_runs: {
        Row: {
          id: string;
          user_id: string;
          field_id: string;
          top_match_id: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          field_id: string;
          top_match_id?: string | null;
        };
        Update: {
          field_id?: string;
          top_match_id?: string | null;
        };
      };
      career_paths: {
        Row: {
          id: string;
          created_by: string;
          field: string;
          title: string;
          description: string;
          mission: string;
          traits: string[];
          skills: string[];
          classes: string[];
          projects: string[];
          roadmap: string[];
          answer_weights: Json;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          created_by: string;
          field: string;
          title: string;
          description: string;
          mission: string;
          traits?: string[];
          skills?: string[];
          classes?: string[];
          projects?: string[];
          roadmap?: string[];
          answer_weights?: Json;
          is_public?: boolean;
        };
        Update: {
          field?: string;
          title?: string;
          description?: string;
          mission?: string;
          traits?: string[];
          skills?: string[];
          classes?: string[];
          projects?: string[];
          roadmap?: string[];
          answer_weights?: Json;
          is_public?: boolean;
          updated_at?: string;
        };
      };
    };
  };
};
