DO $$
DECLARE
  v_user_id uuid;
BEGIN
  -- Retrieve the existing user ID
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'keiler@brasporto.com' LIMIT 1;

  IF v_user_id IS NOT NULL THEN
    -- User exists (likely from Magic Link usage), update their password
    UPDATE auth.users
    SET encrypted_password = crypt('Skip@Pass123', gen_salt('bf'))
    WHERE id = v_user_id;
  ELSE
    -- User does not exist, insert them
    v_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      v_user_id,
      '00000000-0000-0000-0000-000000000000',
      'keiler@brasporto.com',
      crypt('Skip@Pass123', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Keiler"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '',
      NULL,
      '', '', ''
    );
  END IF;

  -- Ensure the user is in the usuarios table as well
  INSERT INTO public.usuarios (id, email, nome, role)
  VALUES (v_user_id, 'keiler@brasporto.com', 'Keiler', 'analista')
  ON CONFLICT (id) DO NOTHING;
  
  -- Fix potential NULLs in token columns for this specific user to prevent GoTrue API crashes
  UPDATE auth.users
  SET
    confirmation_token = COALESCE(confirmation_token, ''),
    recovery_token = COALESCE(recovery_token, ''),
    email_change_token_new = COALESCE(email_change_token_new, ''),
    email_change = COALESCE(email_change, ''),
    email_change_token_current = COALESCE(email_change_token_current, ''),
    phone_change = COALESCE(phone_change, ''),
    phone_change_token = COALESCE(phone_change_token, ''),
    reauthentication_token = COALESCE(reauthentication_token, '')
  WHERE id = v_user_id AND (
    confirmation_token IS NULL OR recovery_token IS NULL
    OR email_change_token_new IS NULL OR email_change IS NULL
    OR email_change_token_current IS NULL
    OR phone_change IS NULL OR phone_change_token IS NULL
    OR reauthentication_token IS NULL
  );

END $$;
