DO $block$
DECLARE
  t TEXT;
BEGIN
  -- 1. Create tables
  CREATE TABLE IF NOT EXISTS public.usuarios (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    nome TEXT,
    role TEXT CHECK (role IN ('analista', 'gerente')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS public.cotacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE NOT NULL,
    numero_cotacao TEXT UNIQUE,
    modal TEXT CHECK (modal IN ('Aéreo', 'FCL', 'LCL')),
    agente TEXT NOT NULL,
    origem TEXT NOT NULL,
    destino TEXT NOT NULL,
    incoterm TEXT NOT NULL,
    etd DATE NOT NULL,
    eta DATE,
    free_time INTEGER,
    peso_volume NUMERIC,
    moeda_original TEXT,
    valor_total NUMERIC,
    componentes JSONB,
    valor_brl NUMERIC,
    status TEXT CHECK (status IN ('rascunho', 'conferido', 'scoring', 'finalizado')) DEFAULT 'rascunho',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS public.scoring (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cotacao_id UUID REFERENCES public.cotacoes(id) ON DELETE CASCADE NOT NULL,
    custo_nota NUMERIC CHECK (custo_nota >= 0 AND custo_nota <= 10),
    tempo_nota NUMERIC CHECK (tempo_nota >= 0 AND tempo_nota <= 10),
    etd_nota NUMERIC CHECK (etd_nota >= 0 AND etd_nota <= 10),
    free_time_nota NUMERIC CHECK (free_time_nota >= 0 AND free_time_nota <= 10),
    nota_final NUMERIC CHECK (nota_final >= 0 AND nota_final <= 10),
    ranking INTEGER,
    justificativa TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  -- 2. Enable RLS
  FOR t IN SELECT unnest(ARRAY['usuarios', 'cotacoes', 'scoring']) LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
  END LOOP;

  -- 3. Create Policies
  DROP POLICY IF EXISTS "usuarios_select" ON public.usuarios;
  CREATE POLICY "usuarios_select" ON public.usuarios FOR SELECT TO authenticated USING (auth.uid() = id);

  DROP POLICY IF EXISTS "usuarios_insert" ON public.usuarios;
  CREATE POLICY "usuarios_insert" ON public.usuarios FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

  DROP POLICY IF EXISTS "usuarios_update" ON public.usuarios;
  CREATE POLICY "usuarios_update" ON public.usuarios FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

  DROP POLICY IF EXISTS "cotacoes_select" ON public.cotacoes;
  CREATE POLICY "cotacoes_select" ON public.cotacoes FOR SELECT TO authenticated USING (auth.uid() = user_id);

  DROP POLICY IF EXISTS "cotacoes_insert" ON public.cotacoes;
  CREATE POLICY "cotacoes_insert" ON public.cotacoes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

  DROP POLICY IF EXISTS "cotacoes_update" ON public.cotacoes;
  CREATE POLICY "cotacoes_update" ON public.cotacoes FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

  DROP POLICY IF EXISTS "cotacoes_delete" ON public.cotacoes;
  CREATE POLICY "cotacoes_delete" ON public.cotacoes FOR DELETE TO authenticated USING (auth.uid() = user_id);

  DROP POLICY IF EXISTS "scoring_select" ON public.scoring;
  CREATE POLICY "scoring_select" ON public.scoring FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.cotacoes WHERE cotacoes.id = scoring.cotacao_id AND cotacoes.user_id = auth.uid())
  );

  DROP POLICY IF EXISTS "scoring_insert" ON public.scoring;
  CREATE POLICY "scoring_insert" ON public.scoring FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.cotacoes WHERE cotacoes.id = scoring.cotacao_id AND cotacoes.user_id = auth.uid())
  );

  DROP POLICY IF EXISTS "scoring_update" ON public.scoring;
  CREATE POLICY "scoring_update" ON public.scoring FOR UPDATE TO authenticated USING (
    EXISTS (SELECT 1 FROM public.cotacoes WHERE cotacoes.id = scoring.cotacao_id AND cotacoes.user_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM public.cotacoes WHERE cotacoes.id = scoring.cotacao_id AND cotacoes.user_id = auth.uid())
  );

  DROP POLICY IF EXISTS "scoring_delete" ON public.scoring;
  CREATE POLICY "scoring_delete" ON public.scoring FOR DELETE TO authenticated USING (
    EXISTS (SELECT 1 FROM public.cotacoes WHERE cotacoes.id = scoring.cotacao_id AND cotacoes.user_id = auth.uid())
  );

  -- Backfill existing users from previous profiles schema safely
  INSERT INTO public.usuarios (id, email, nome, role)
  SELECT id, email, raw_user_meta_data->>'name', 'analista'
  FROM auth.users
  ON CONFLICT (id) DO NOTHING;

END $block$;

-- Trigger out of DO block
CREATE OR REPLACE FUNCTION public.handle_new_usuario()
RETURNS trigger AS $func$
BEGIN
  INSERT INTO public.usuarios (id, email, nome, role)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'name', 'analista')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$func$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created_usuario ON auth.users;
CREATE TRIGGER on_auth_user_created_usuario
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_usuario();
