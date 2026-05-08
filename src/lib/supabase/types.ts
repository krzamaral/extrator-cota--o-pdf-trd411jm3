// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      agents: {
        Row: {
          country: string | null
          created_at: string
          id: string
          name: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          country?: string | null
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      cargo: {
        Row: {
          created_at: string
          description: string | null
          id: string
          quantity: number | null
          quote_id: string | null
          volume: number | null
          weight: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          quantity?: number | null
          quote_id?: string | null
          volume?: number | null
          weight?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          quantity?: number | null
          quote_id?: string | null
          volume?: number | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cargo_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          created_at: string
          document_number: string | null
          email: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          document_number?: string | null
          email?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          document_number?: string | null
          email?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      commercial_proposals: {
        Row: {
          client_id: string | null
          created_at: string
          id: string
          quote_id: string | null
          status: string | null
          total_amount: number | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          id?: string
          quote_id?: string | null
          status?: string | null
          total_amount?: number | null
        }
        Update: {
          client_id?: string | null
          created_at?: string
          id?: string
          quote_id?: string | null
          status?: string | null
          total_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "commercial_proposals_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commercial_proposals_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      cotacoes: {
        Row: {
          agente: string
          componentes: Json | null
          created_at: string
          destino: string
          eta: string | null
          etd: string
          free_time: number | null
          id: string
          incoterm: string
          modal: string | null
          moeda_original: string | null
          numero_cotacao: string | null
          origem: string
          peso_volume: number | null
          status: string | null
          updated_at: string
          user_id: string
          valor_brl: number | null
          valor_total: number | null
        }
        Insert: {
          agente: string
          componentes?: Json | null
          created_at?: string
          destino: string
          eta?: string | null
          etd: string
          free_time?: number | null
          id?: string
          incoterm: string
          modal?: string | null
          moeda_original?: string | null
          numero_cotacao?: string | null
          origem: string
          peso_volume?: number | null
          status?: string | null
          updated_at?: string
          user_id: string
          valor_brl?: number | null
          valor_total?: number | null
        }
        Update: {
          agente?: string
          componentes?: Json | null
          created_at?: string
          destino?: string
          eta?: string | null
          etd?: string
          free_time?: number | null
          id?: string
          incoterm?: string
          modal?: string | null
          moeda_original?: string | null
          numero_cotacao?: string | null
          origem?: string
          peso_volume?: number | null
          status?: string | null
          updated_at?: string
          user_id?: string
          valor_brl?: number | null
          valor_total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cotacoes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      document_processing_logs: {
        Row: {
          created_at: string | null
          document_id: string | null
          id: string
          message: string | null
          status: string
        }
        Insert: {
          created_at?: string | null
          document_id?: string | null
          id?: string
          message?: string | null
          status: string
        }
        Update: {
          created_at?: string | null
          document_id?: string | null
          id?: string
          message?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_processing_logs_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string
          error_message: string | null
          extracted_data: Json | null
          file_type: string | null
          file_url: string
          id: string
          original_filename: string | null
          processed_at: string | null
          reference_id: string | null
          reference_type: string
          status: string | null
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          extracted_data?: Json | null
          file_type?: string | null
          file_url: string
          id?: string
          original_filename?: string | null
          processed_at?: string | null
          reference_id?: string | null
          reference_type: string
          status?: string | null
        }
        Update: {
          created_at?: string
          error_message?: string | null
          extracted_data?: Json | null
          file_type?: string | null
          file_url?: string
          id?: string
          original_filename?: string | null
          processed_at?: string | null
          reference_id?: string | null
          reference_type?: string
          status?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      quote_tariffs: {
        Row: {
          created_at: string
          currency: string
          id: string
          name: string
          quote_id: string | null
          value: number
        }
        Insert: {
          created_at?: string
          currency: string
          id?: string
          name: string
          quote_id?: string | null
          value: number
        }
        Update: {
          created_at?: string
          currency?: string
          id?: string
          name?: string
          quote_id?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "quote_tariffs_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          agent_name: string
          created_at: string
          currency: string
          destination: string
          eta: string | null
          etd: string
          free_time: number | null
          id: string
          incoterm: string
          modal: string
          origin: string
          quote_number: string
          status: string | null
          user_id: string | null
          weight: number | null
        }
        Insert: {
          agent_name: string
          created_at?: string
          currency: string
          destination: string
          eta?: string | null
          etd: string
          free_time?: number | null
          id?: string
          incoterm: string
          modal: string
          origin: string
          quote_number: string
          status?: string | null
          user_id?: string | null
          weight?: number | null
        }
        Update: {
          agent_name?: string
          created_at?: string
          currency?: string
          destination?: string
          eta?: string | null
          etd?: string
          free_time?: number | null
          id?: string
          incoterm?: string
          modal?: string
          origin?: string
          quote_number?: string
          status?: string | null
          user_id?: string | null
          weight?: number | null
        }
        Relationships: []
      }
      routes: {
        Row: {
          created_at: string
          destination: string
          id: string
          origin: string
          quote_id: string | null
          transit_time: number | null
        }
        Insert: {
          created_at?: string
          destination: string
          id?: string
          origin: string
          quote_id?: string | null
          transit_time?: number | null
        }
        Update: {
          created_at?: string
          destination?: string
          id?: string
          origin?: string
          quote_id?: string | null
          transit_time?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "routes_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      scoring: {
        Row: {
          cotacao_id: string
          created_at: string
          custo_nota: number | null
          etd_nota: number | null
          free_time_nota: number | null
          id: string
          justificativa: string | null
          nota_final: number | null
          ranking: number | null
          tempo_nota: number | null
        }
        Insert: {
          cotacao_id: string
          created_at?: string
          custo_nota?: number | null
          etd_nota?: number | null
          free_time_nota?: number | null
          id?: string
          justificativa?: string | null
          nota_final?: number | null
          ranking?: number | null
          tempo_nota?: number | null
        }
        Update: {
          cotacao_id?: string
          created_at?: string
          custo_nota?: number | null
          etd_nota?: number | null
          free_time_nota?: number | null
          id?: string
          justificativa?: string | null
          nota_final?: number | null
          ranking?: number | null
          tempo_nota?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "scoring_cotacao_id_fkey"
            columns: ["cotacao_id"]
            isOneToOne: false
            referencedRelation: "cotacoes"
            referencedColumns: ["id"]
          },
        ]
      }
      status_history: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          notes: string | null
          reference_id: string
          reference_type: string
          status: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          reference_id: string
          reference_type: string
          status: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          reference_id?: string
          reference_type?: string
          status?: string
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          created_at: string
          id: string
          name: string
          type: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          type?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          type?: string | null
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          created_at: string
          email: string
          id: string
          nome: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          nome?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          nome?: string | null
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_cotacao_from_extracted_data: {
        Args: { p_document_id: string; p_extracted_data: Json }
        Returns: string
      }
      create_quote_from_extracted_data: {
        Args: { p_document_id: string; p_extracted_data: Json }
        Returns: string
      }
      update_document_status: {
        Args: {
          p_document_id: string
          p_error_message?: string
          p_extracted_data?: Json
          p_status: string
        }
        Returns: undefined
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


// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: agents
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   country: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: cargo
//   id: uuid (not null, default: gen_random_uuid())
//   quote_id: uuid (nullable)
//   description: text (nullable)
//   weight: numeric (nullable)
//   volume: numeric (nullable)
//   quantity: integer (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: clients
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   document_number: text (nullable)
//   email: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: commercial_proposals
//   id: uuid (not null, default: gen_random_uuid())
//   quote_id: uuid (nullable)
//   client_id: uuid (nullable)
//   status: text (nullable, default: 'draft'::text)
//   total_amount: numeric (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: cotacoes
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   numero_cotacao: text (nullable)
//   modal: text (nullable)
//   agente: text (not null)
//   origem: text (not null)
//   destino: text (not null)
//   incoterm: text (not null)
//   etd: date (not null)
//   eta: date (nullable)
//   free_time: integer (nullable)
//   peso_volume: numeric (nullable)
//   moeda_original: text (nullable)
//   valor_total: numeric (nullable)
//   componentes: jsonb (nullable)
//   valor_brl: numeric (nullable)
//   status: text (nullable, default: 'rascunho'::text)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: document_processing_logs
//   id: uuid (not null, default: gen_random_uuid())
//   document_id: uuid (nullable)
//   status: text (not null)
//   message: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: documents
//   id: uuid (not null, default: gen_random_uuid())
//   reference_id: uuid (nullable)
//   reference_type: text (not null)
//   file_url: text (not null)
//   created_at: timestamp with time zone (not null, default: now())
//   status: text (nullable, default: 'pending'::text)
//   file_type: text (nullable)
//   original_filename: text (nullable)
//   extracted_data: jsonb (nullable)
//   error_message: text (nullable)
//   processed_at: timestamp with time zone (nullable)
// Table: profiles
//   id: uuid (not null)
//   email: text (not null)
//   name: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: quote_tariffs
//   id: uuid (not null, default: gen_random_uuid())
//   quote_id: uuid (nullable)
//   name: text (not null)
//   value: numeric (not null)
//   currency: text (not null)
//   created_at: timestamp with time zone (not null, default: now())
// Table: quotes
//   id: uuid (not null, default: gen_random_uuid())
//   quote_number: text (not null)
//   modal: text (not null)
//   agent_name: text (not null)
//   origin: text (not null)
//   destination: text (not null)
//   incoterm: text (not null)
//   etd: date (not null)
//   eta: date (nullable)
//   free_time: integer (nullable, default: 0)
//   weight: numeric (nullable, default: 0)
//   currency: text (not null)
//   status: text (nullable, default: 'pending'::text)
//   created_at: timestamp with time zone (not null, default: now())
//   user_id: uuid (nullable)
// Table: routes
//   id: uuid (not null, default: gen_random_uuid())
//   quote_id: uuid (nullable)
//   origin: text (not null)
//   destination: text (not null)
//   transit_time: integer (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: scoring
//   id: uuid (not null, default: gen_random_uuid())
//   cotacao_id: uuid (not null)
//   custo_nota: numeric (nullable)
//   tempo_nota: numeric (nullable)
//   etd_nota: numeric (nullable)
//   free_time_nota: numeric (nullable)
//   nota_final: numeric (nullable)
//   ranking: integer (nullable)
//   justificativa: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: status_history
//   id: uuid (not null, default: gen_random_uuid())
//   reference_id: uuid (not null)
//   reference_type: text (not null)
//   status: text (not null)
//   notes: text (nullable)
//   created_by: uuid (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: suppliers
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   type: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: usuarios
//   id: uuid (not null)
//   email: text (not null)
//   nome: text (nullable)
//   role: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())

// --- CONSTRAINTS ---
// Table: agents
//   PRIMARY KEY agents_pkey: PRIMARY KEY (id)
// Table: cargo
//   PRIMARY KEY cargo_pkey: PRIMARY KEY (id)
//   FOREIGN KEY cargo_quote_id_fkey: FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE
// Table: clients
//   PRIMARY KEY clients_pkey: PRIMARY KEY (id)
// Table: commercial_proposals
//   FOREIGN KEY commercial_proposals_client_id_fkey: FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
//   PRIMARY KEY commercial_proposals_pkey: PRIMARY KEY (id)
//   FOREIGN KEY commercial_proposals_quote_id_fkey: FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE
// Table: cotacoes
//   CHECK cotacoes_modal_check: CHECK ((modal = ANY (ARRAY['Aéreo'::text, 'FCL'::text, 'LCL'::text])))
//   UNIQUE cotacoes_numero_cotacao_key: UNIQUE (numero_cotacao)
//   PRIMARY KEY cotacoes_pkey: PRIMARY KEY (id)
//   CHECK cotacoes_status_check: CHECK ((status = ANY (ARRAY['rascunho'::text, 'conferido'::text, 'scoring'::text, 'finalizado'::text])))
//   FOREIGN KEY cotacoes_user_id_fkey: FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE
// Table: document_processing_logs
//   FOREIGN KEY document_processing_logs_document_id_fkey: FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
//   PRIMARY KEY document_processing_logs_pkey: PRIMARY KEY (id)
// Table: documents
//   PRIMARY KEY documents_pkey: PRIMARY KEY (id)
// Table: profiles
//   FOREIGN KEY profiles_id_fkey: FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY profiles_pkey: PRIMARY KEY (id)
// Table: quote_tariffs
//   PRIMARY KEY quote_tariffs_pkey: PRIMARY KEY (id)
//   FOREIGN KEY quote_tariffs_quote_id_fkey: FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE
// Table: quotes
//   PRIMARY KEY quotes_pkey: PRIMARY KEY (id)
//   FOREIGN KEY quotes_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL
// Table: routes
//   PRIMARY KEY routes_pkey: PRIMARY KEY (id)
//   FOREIGN KEY routes_quote_id_fkey: FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE
// Table: scoring
//   FOREIGN KEY scoring_cotacao_id_fkey: FOREIGN KEY (cotacao_id) REFERENCES cotacoes(id) ON DELETE CASCADE
//   CHECK scoring_custo_nota_check: CHECK (((custo_nota >= (0)::numeric) AND (custo_nota <= (10)::numeric)))
//   CHECK scoring_etd_nota_check: CHECK (((etd_nota >= (0)::numeric) AND (etd_nota <= (10)::numeric)))
//   CHECK scoring_free_time_nota_check: CHECK (((free_time_nota >= (0)::numeric) AND (free_time_nota <= (10)::numeric)))
//   CHECK scoring_nota_final_check: CHECK (((nota_final >= (0)::numeric) AND (nota_final <= (10)::numeric)))
//   PRIMARY KEY scoring_pkey: PRIMARY KEY (id)
//   CHECK scoring_tempo_nota_check: CHECK (((tempo_nota >= (0)::numeric) AND (tempo_nota <= (10)::numeric)))
// Table: status_history
//   FOREIGN KEY status_history_created_by_fkey: FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE SET NULL
//   PRIMARY KEY status_history_pkey: PRIMARY KEY (id)
// Table: suppliers
//   PRIMARY KEY suppliers_pkey: PRIMARY KEY (id)
// Table: usuarios
//   UNIQUE usuarios_email_key: UNIQUE (email)
//   FOREIGN KEY usuarios_id_fkey: FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY usuarios_pkey: PRIMARY KEY (id)
//   CHECK usuarios_role_check: CHECK ((role = ANY (ARRAY['analista'::text, 'gerente'::text])))

// --- ROW LEVEL SECURITY POLICIES ---
// Table: agents
//   Policy "authenticated_delete" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_insert" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "authenticated_select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: cargo
//   Policy "authenticated_delete" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_insert" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "authenticated_select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: clients
//   Policy "authenticated_delete" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_insert" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "authenticated_select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: commercial_proposals
//   Policy "authenticated_delete" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_insert" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "authenticated_select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: cotacoes
//   Policy "cotacoes_delete" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: (auth.uid() = user_id)
//   Policy "cotacoes_insert" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (auth.uid() = user_id)
//   Policy "cotacoes_select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (auth.uid() = user_id)
//   Policy "cotacoes_update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (auth.uid() = user_id)
//     WITH CHECK: (auth.uid() = user_id)
// Table: document_processing_logs
//   Policy "Permitir insert logs" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (EXISTS ( SELECT 1    FROM documents   WHERE (documents.id = document_processing_logs.document_id)))
//   Policy "Permitir select logs" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM documents   WHERE (documents.id = document_processing_logs.document_id)))
// Table: documents
//   Policy "authenticated_delete" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_insert" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "authenticated_select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: profiles
//   Policy "authenticated_delete" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_insert" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "authenticated_select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: quote_tariffs
//   Policy "authenticated_delete" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_insert" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "authenticated_select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: quotes
//   Policy "authenticated_delete" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_insert" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "authenticated_select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: routes
//   Policy "authenticated_delete" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_insert" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "authenticated_select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: scoring
//   Policy "scoring_delete" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM cotacoes   WHERE ((cotacoes.id = scoring.cotacao_id) AND (cotacoes.user_id = auth.uid()))))
//   Policy "scoring_insert" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (EXISTS ( SELECT 1    FROM cotacoes   WHERE ((cotacoes.id = scoring.cotacao_id) AND (cotacoes.user_id = auth.uid()))))
//   Policy "scoring_select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM cotacoes   WHERE ((cotacoes.id = scoring.cotacao_id) AND (cotacoes.user_id = auth.uid()))))
//   Policy "scoring_update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM cotacoes   WHERE ((cotacoes.id = scoring.cotacao_id) AND (cotacoes.user_id = auth.uid()))))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM cotacoes   WHERE ((cotacoes.id = scoring.cotacao_id) AND (cotacoes.user_id = auth.uid()))))
// Table: status_history
//   Policy "authenticated_delete" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_insert" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "authenticated_select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: suppliers
//   Policy "authenticated_delete" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_insert" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "authenticated_select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: usuarios
//   Policy "usuarios_insert" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (auth.uid() = id)
//   Policy "usuarios_select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (auth.uid() = id)
//   Policy "usuarios_update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (auth.uid() = id)
//     WITH CHECK: (auth.uid() = id)

// --- DATABASE FUNCTIONS ---
// FUNCTION check_brasporto_email()
//   CREATE OR REPLACE FUNCTION public.check_brasporto_email()
//    RETURNS trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   BEGIN
//     IF NEW.email NOT LIKE '%@brasporto.com' THEN
//       RAISE EXCEPTION 'Apenas emails @brasporto.com são permitidos.';
//     END IF;
//     RETURN NEW;
//   END;
//   $function$
//   
// FUNCTION create_cotacao_from_extracted_data(uuid, jsonb)
//   CREATE OR REPLACE FUNCTION public.create_cotacao_from_extracted_data(p_document_id uuid, p_extracted_data jsonb)
//    RETURNS uuid
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   DECLARE
//     v_cotacao_id UUID;
//     v_user_id UUID;
//   BEGIN
//     -- Busca um usuário válido do sistema
//     SELECT id INTO v_user_id FROM auth.users LIMIT 1;
//   
//     INSERT INTO public.cotacoes (
//       user_id,
//       numero_cotacao,
//       modal,
//       agente,
//       origem,
//       destino,
//       incoterm,
//       etd,
//       eta,
//       free_time,
//       peso_volume,
//       moeda_original,
//       valor_total,
//       componentes,
//       valor_brl,
//       status
//     ) VALUES (
//       v_user_id,
//       COALESCE(p_extracted_data->>'quote_number', 'COT-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || SUBSTRING(p_document_id::TEXT, 1, 8)),
//       COALESCE(p_extracted_data->>'modal', 'FCL'),
//       COALESCE(p_extracted_data->>'agent_name', 'Agente não identificado'),
//       COALESCE(p_extracted_data->>'origin', ''),
//       COALESCE(p_extracted_data->>'destination', ''),
//       COALESCE(p_extracted_data->>'incoterm', ''),
//       COALESCE((p_extracted_data->>'etd')::DATE, CURRENT_DATE),
//       (p_extracted_data->>'eta')::DATE,
//       COALESCE((p_extracted_data->>'free_time')::INTEGER, 0),
//       COALESCE((p_extracted_data->>'weight')::NUMERIC, 0),
//       COALESCE(p_extracted_data->>'currency', 'USD'),
//       COALESCE((p_extracted_data->>'total_value')::NUMERIC, 0),
//       p_extracted_data,
//       0,
//       'rascunho'
//     )
//     RETURNING id INTO v_cotacao_id;
//   
//     UPDATE public.documents
//     SET reference_id = v_cotacao_id,
//         reference_type = 'cotacao'
//     WHERE id = p_document_id;
//   
//     PERFORM public.update_document_status(p_document_id, 'completed', p_extracted_data);
//   
//     RETURN v_cotacao_id;
//   EXCEPTION WHEN OTHERS THEN
//     PERFORM public.update_document_status(p_document_id, 'error', NULL, SQLERRM);
//     RAISE;
//   END;
//   $function$
//   
// FUNCTION create_quote_from_extracted_data(uuid, jsonb)
//   CREATE OR REPLACE FUNCTION public.create_quote_from_extracted_data(p_document_id uuid, p_extracted_data jsonb)
//    RETURNS uuid
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   DECLARE
//     v_quote_id UUID;
//     v_user_id UUID;
//   BEGIN
//     -- Busca o user_id do documento (se tiver reference_id vinculado a um usuário)
//     SELECT d.reference_id INTO v_user_id
//     FROM public.documents d
//     WHERE d.id = p_document_id;
//   
//     -- Se reference_id não for um usuário válido, tenta buscar o primeiro usuário do sistema
//     IF v_user_id IS NULL OR NOT EXISTS (SELECT 1 FROM auth.users WHERE id = v_user_id) THEN
//       SELECT id INTO v_user_id FROM auth.users LIMIT 1;
//     END IF;
//   
//     -- Insere a cotação
//     INSERT INTO public.quotes (
//       quote_number,
//       modal,
//       agent_name,
//       origin,
//       destination,
//       incoterm,
//       etd,
//       eta,
//       free_time,
//       weight,
//       currency,
//       status,
//       user_id
//     ) VALUES (
//       COALESCE(p_extracted_data->>'quote_number', 'COT-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || SUBSTRING(p_document_id::TEXT, 1, 8)),
//       COALESCE(p_extracted_data->>'modal', 'FCL'),
//       COALESCE(p_extracted_data->>'agent_name', 'Agente não identificado'),
//       COALESCE(p_extracted_data->>'origin', ''),
//       COALESCE(p_extracted_data->>'destination', ''),
//       COALESCE(p_extracted_data->>'incoterm', ''),
//       COALESCE((p_extracted_data->>'etd')::DATE, CURRENT_DATE),
//       (p_extracted_data->>'eta')::DATE,
//       COALESCE((p_extracted_data->>'free_time')::INTEGER, 0),
//       COALESCE((p_extracted_data->>'weight')::NUMERIC, 0),
//       COALESCE(p_extracted_data->>'currency', 'USD'),
//       'pending',
//       v_user_id
//     )
//     RETURNING id INTO v_quote_id;
//   
//     -- Vincula a nova cotação ao documento
//     UPDATE public.documents
//     SET reference_id = v_quote_id,
//         reference_type = 'quote'
//     WHERE id = p_document_id;
//   
//     -- Insere tarifas se vierem no JSON extraído
//     IF p_extracted_data ? 'tariffs' AND jsonb_typeof(p_extracted_data->'tariffs') = 'array' THEN
//       INSERT INTO public.quote_tariffs (quote_id, name, value, currency)
//       SELECT
//         v_quote_id,
//         tariff->>'name',
//         COALESCE((tariff->>'value')::NUMERIC, 0),
//         COALESCE(tariff->>'currency', 'USD')
//       FROM jsonb_array_elements(p_extracted_data->'tariffs') AS tariff;
//     END IF;
//   
//     -- Atualiza documento como concluído
//     PERFORM public.update_document_status(p_document_id, 'completed', p_extracted_data);
//   
//     RETURN v_quote_id;
//   EXCEPTION WHEN OTHERS THEN
//     PERFORM public.update_document_status(p_document_id, 'error', NULL, SQLERRM);
//     RAISE;
//   END;
//   $function$
//   
// FUNCTION handle_new_usuario()
//   CREATE OR REPLACE FUNCTION public.handle_new_usuario()
//    RETURNS trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   BEGIN
//     INSERT INTO public.usuarios (id, email, nome, role)
//     VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'name', 'analista')
//     ON CONFLICT (id) DO NOTHING;
//     RETURN NEW;
//   END;
//   $function$
//   
// FUNCTION handle_storage_upload()
//   CREATE OR REPLACE FUNCTION public.handle_storage_upload()
//    RETURNS trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   DECLARE
//     v_reference_id UUID;
//     v_reference_type TEXT;
//     v_file_type TEXT;
//   BEGIN
//     -- Tenta extrair reference_id com tratamento de erro seguro
//     BEGIN
//       v_reference_id := (NEW.metadata->>'reference_id')::UUID;
//     EXCEPTION WHEN OTHERS THEN
//       v_reference_id := NULL;
//     END;
//   
//     v_reference_type := COALESCE(NEW.metadata->>'reference_type', 'cotacao');
//     v_file_type := COALESCE(NEW.metadata->>'file_type', 'application/pdf');
//   
//     INSERT INTO public.documents (
//       reference_id,
//       reference_type,
//       file_url,
//       file_type,
//       original_filename,
//       status,
//       created_at
//     ) VALUES (
//       v_reference_id,
//       v_reference_type,
//       NEW.name,
//       v_file_type,
//       NEW.name,
//       'pending',
//       NOW()
//     );
//   
//     RETURN NEW;
//   END;
//   $function$
//   
// FUNCTION process_document_queue()
//   CREATE OR REPLACE FUNCTION public.process_document_queue()
//    RETURNS trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   BEGIN
//     -- Atualiza status do documento para processing
//     UPDATE public.documents
//     SET status = 'processing'
//     WHERE id = NEW.id;
//   
//     -- Log de início de processamento
//     INSERT INTO public.document_processing_logs (
//       document_id,
//       status,
//       message,
//       created_at
//     ) VALUES (
//       NEW.id,
//       'processing',
//       'Documento ' || COALESCE(NEW.original_filename, NEW.file_url) || ' entrou na fila de extração.',
//       NOW()
//     );
//   
//     RETURN NEW;
//   EXCEPTION WHEN OTHERS THEN
//     -- Se der erro no trigger, loga mas não impede o INSERT
//     INSERT INTO public.document_processing_logs (
//       document_id,
//       status,
//       message,
//       created_at
//     ) VALUES (
//       NEW.id,
//       'error',
//       'Erro ao colocar documento na fila: ' || SQLERRM,
//       NOW()
//     );
//     RETURN NEW;
//   END;
//   $function$
//   
// FUNCTION update_document_status(uuid, text, jsonb, text)
//   CREATE OR REPLACE FUNCTION public.update_document_status(p_document_id uuid, p_status text, p_extracted_data jsonb DEFAULT NULL::jsonb, p_error_message text DEFAULT NULL::text)
//    RETURNS void
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   BEGIN
//     UPDATE public.documents
//     SET
//       status = p_status,
//       extracted_data = COALESCE(p_extracted_data, extracted_data),
//       error_message = COALESCE(p_error_message, error_message),
//       processed_at = CASE
//         WHEN p_status IN ('completed', 'error') THEN NOW()
//         ELSE processed_at
//       END
//     WHERE id = p_document_id;
//   
//     INSERT INTO public.document_processing_logs (
//       document_id,
//       status,
//       message,
//       created_at
//     ) VALUES (
//       p_document_id,
//       p_status,
//       CASE
//         WHEN p_status = 'completed' THEN 'Extração de dados concluída com sucesso.'
//         WHEN p_status = 'error' THEN 'Erro no processamento: ' || COALESCE(p_error_message, 'Erro desconhecido')
//         ELSE 'Status atualizado para: ' || p_status
//       END,
//       NOW()
//     );
//   END;
//   $function$
//   

// --- TRIGGERS ---
// Table: documents
//   trg_process_document_queue: CREATE TRIGGER trg_process_document_queue AFTER INSERT ON public.documents FOR EACH ROW EXECUTE FUNCTION process_document_queue()

// --- INDEXES ---
// Table: cotacoes
//   CREATE UNIQUE INDEX cotacoes_numero_cotacao_key ON public.cotacoes USING btree (numero_cotacao)
// Table: documents
//   CREATE INDEX idx_documents_created_at ON public.documents USING btree (created_at DESC)
//   CREATE INDEX idx_documents_reference_id ON public.documents USING btree (reference_id)
//   CREATE INDEX idx_documents_status ON public.documents USING btree (status)
// Table: usuarios
//   CREATE UNIQUE INDEX usuarios_email_key ON public.usuarios USING btree (email)

