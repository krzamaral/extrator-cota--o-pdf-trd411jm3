// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.5'
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
            foreignKeyName: 'cargo_quote_id_fkey'
            columns: ['quote_id']
            isOneToOne: false
            referencedRelation: 'quotes'
            referencedColumns: ['id']
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
            foreignKeyName: 'commercial_proposals_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'commercial_proposals_quote_id_fkey'
            columns: ['quote_id']
            isOneToOne: false
            referencedRelation: 'quotes'
            referencedColumns: ['id']
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
            foreignKeyName: 'cotacoes_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'usuarios'
            referencedColumns: ['id']
          },
        ]
      }
      documents: {
        Row: {
          created_at: string
          file_url: string
          id: string
          reference_id: string
          reference_type: string
        }
        Insert: {
          created_at?: string
          file_url: string
          id?: string
          reference_id: string
          reference_type: string
        }
        Update: {
          created_at?: string
          file_url?: string
          id?: string
          reference_id?: string
          reference_type?: string
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
            foreignKeyName: 'quote_tariffs_quote_id_fkey'
            columns: ['quote_id']
            isOneToOne: false
            referencedRelation: 'quotes'
            referencedColumns: ['id']
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
            foreignKeyName: 'routes_quote_id_fkey'
            columns: ['quote_id']
            isOneToOne: false
            referencedRelation: 'quotes'
            referencedColumns: ['id']
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
            foreignKeyName: 'scoring_cotacao_id_fkey'
            columns: ['cotacao_id']
            isOneToOne: false
            referencedRelation: 'cotacoes'
            referencedColumns: ['id']
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
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
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
// Table: documents
//   id: uuid (not null, default: gen_random_uuid())
//   reference_id: uuid (not null)
//   reference_type: text (not null)
//   file_url: text (not null)
//   created_at: timestamp with time zone (not null, default: now())
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

// --- INDEXES ---
// Table: cotacoes
//   CREATE UNIQUE INDEX cotacoes_numero_cotacao_key ON public.cotacoes USING btree (numero_cotacao)
// Table: usuarios
//   CREATE UNIQUE INDEX usuarios_email_key ON public.usuarios USING btree (email)
