DO $$
DECLARE
  v_user_id uuid;
  v_quote_id uuid;
BEGIN
  -- Tentar pegar o user id do admin/keiler
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'keiler@brasporto.com' LIMIT 1;
  
  -- Se não achar, pega o primeiro
  IF v_user_id IS NULL THEN
    SELECT id INTO v_user_id FROM auth.users LIMIT 1;
  END IF;

  IF v_user_id IS NOT NULL THEN
    -- Inserir cotacoes se não houver cotações mockadas para este usuario
    IF NOT EXISTS (SELECT 1 FROM public.cotacoes WHERE user_id = v_user_id AND numero_cotacao LIKE 'MOCK-%') THEN
      
      -- Mock 1
      v_quote_id := gen_random_uuid();
      INSERT INTO public.cotacoes (id, user_id, numero_cotacao, modal, agente, origem, destino, incoterm, etd, free_time, peso_volume, moeda_original, valor_total, status, created_at, updated_at)
      VALUES (v_quote_id, v_user_id, 'MOCK-001', 'Aéreo', 'DHL Global Forwarding', 'GRU', 'MIA', 'EXW', CURRENT_DATE + 5, 14, 1500, 'BRL', 3600, 'finalizado', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days');
      
      INSERT INTO public.scoring (cotacao_id, nota_final) VALUES (v_quote_id, 8.2);

      -- Mock 2
      v_quote_id := gen_random_uuid();
      INSERT INTO public.cotacoes (id, user_id, numero_cotacao, modal, agente, origem, destino, incoterm, etd, free_time, peso_volume, moeda_original, valor_total, status, created_at, updated_at)
      VALUES (v_quote_id, v_user_id, 'MOCK-002', 'FCL', 'Kuehne+Nagel', 'SSZ', 'HAM', 'FOB', CURRENT_DATE + 10, 7, 25000, 'BRL', 4200, 'scoring', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days');
      
      INSERT INTO public.scoring (cotacao_id, nota_final) VALUES (v_quote_id, 6.3);

      -- Mock 3
      v_quote_id := gen_random_uuid();
      INSERT INTO public.cotacoes (id, user_id, numero_cotacao, modal, agente, origem, destino, incoterm, etd, free_time, peso_volume, moeda_original, valor_total, status, created_at, updated_at)
      VALUES (v_quote_id, v_user_id, 'MOCK-003', 'LCL', 'DSV', 'ITJ', 'SHG', 'CIF', CURRENT_DATE + 2, 21, 500, 'BRL', 3200, 'conferido', NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days');
      
      INSERT INTO public.scoring (cotacao_id, nota_final) VALUES (v_quote_id, 8.9);

      -- Mock 4
      INSERT INTO public.cotacoes (id, user_id, numero_cotacao, modal, agente, origem, destino, incoterm, etd, free_time, peso_volume, moeda_original, valor_total, status, created_at, updated_at)
      VALUES (gen_random_uuid(), v_user_id, 'MOCK-004', 'FCL', 'Maersk', 'RIO', 'ROT', 'DDP', CURRENT_DATE + 15, 10, 18000, 'BRL', 5000, 'rascunho', NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days');

      -- Mock 5
      v_quote_id := gen_random_uuid();
      INSERT INTO public.cotacoes (id, user_id, numero_cotacao, modal, agente, origem, destino, incoterm, etd, free_time, peso_volume, moeda_original, valor_total, status, created_at, updated_at)
      VALUES (v_quote_id, v_user_id, 'MOCK-005', 'Aéreo', 'CMA CGM', 'VCP', 'JFK', 'FCA', CURRENT_DATE + 8, 14, 2000, 'BRL', 2800, 'finalizado', NOW() - INTERVAL '1 days', NOW() - INTERVAL '1 days');
      
      INSERT INTO public.scoring (cotacao_id, nota_final) VALUES (v_quote_id, 9.5);

    END IF;
  END IF;
END $$;
