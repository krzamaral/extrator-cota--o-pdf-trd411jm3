DO $$
DECLARE
  t TEXT;
  new_user_id UUID;
BEGIN
  -- 1. Create tables
  CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    document_number TEXT,
    email TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS public.suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS public.agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    country TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS public.quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_number TEXT NOT NULL,
    modal TEXT NOT NULL,
    agent_name TEXT NOT NULL,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    incoterm TEXT NOT NULL,
    etd DATE NOT NULL,
    eta DATE,
    free_time INT DEFAULT 0,
    weight NUMERIC DEFAULT 0,
    currency TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS public.quote_tariffs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id UUID REFERENCES public.quotes(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    value NUMERIC NOT NULL,
    currency TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS public.routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id UUID REFERENCES public.quotes(id) ON DELETE CASCADE,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    transit_time INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS public.cargo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id UUID REFERENCES public.quotes(id) ON DELETE CASCADE,
    description TEXT,
    weight NUMERIC,
    volume NUMERIC,
    quantity INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS public.commercial_proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id UUID REFERENCES public.quotes(id) ON DELETE CASCADE,
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'draft',
    total_amount NUMERIC,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id UUID NOT NULL,
    reference_type TEXT NOT NULL,
    file_url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS public.status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id UUID NOT NULL,
    reference_type TEXT NOT NULL,
    status TEXT NOT NULL,
    notes TEXT,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  -- 2. Enable RLS and setup default policies
  FOR t IN SELECT unnest(ARRAY[
    'profiles', 'clients', 'suppliers', 'agents', 'quotes', 'quote_tariffs', 
    'routes', 'cargo', 'commercial_proposals', 'documents', 'status_history'
  ])
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);

    EXECUTE format('DROP POLICY IF EXISTS "authenticated_select" ON public.%I', t);
    EXECUTE format('CREATE POLICY "authenticated_select" ON public.%I FOR SELECT TO authenticated USING (true)', t);
    
    EXECUTE format('DROP POLICY IF EXISTS "authenticated_insert" ON public.%I', t);
    EXECUTE format('CREATE POLICY "authenticated_insert" ON public.%I FOR INSERT TO authenticated WITH CHECK (true)', t);
    
    EXECUTE format('DROP POLICY IF EXISTS "authenticated_update" ON public.%I', t);
    EXECUTE format('CREATE POLICY "authenticated_update" ON public.%I FOR UPDATE TO authenticated USING (true) WITH CHECK (true)', t);
    
    EXECUTE format('DROP POLICY IF EXISTS "authenticated_delete" ON public.%I', t);
    EXECUTE format('CREATE POLICY "authenticated_delete" ON public.%I FOR DELETE TO authenticated USING (true)', t);
  END LOOP;

  -- 3. Seed user
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'keiler@brasporto.com') THEN
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      new_user_id,
      '00000000-0000-0000-0000-000000000000',
      'keiler@brasporto.com',
      crypt('Skip@Pass2026', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Keiler"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );

    INSERT INTO public.profiles (id, email, name)
    VALUES (new_user_id, 'keiler@brasporto.com', 'Keiler')
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;

-- 4. Create trigger to enforce email domain
CREATE OR REPLACE FUNCTION public.check_brasporto_email()
RETURNS trigger AS $$
BEGIN
  IF NEW.email NOT LIKE '%@brasporto.com' THEN
    RAISE EXCEPTION 'Apenas emails @brasporto.com são permitidos.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS ensure_brasporto_email ON auth.users;
CREATE TRIGGER ensure_brasporto_email
  BEFORE INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.check_brasporto_email();
