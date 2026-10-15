/*
# Create contatos table for contact form submissions

1. New Tables
- `contatos`
  - `id` (uuid, primary key, auto-generated)
  - `nome` (text, not null) — sender's name
  - `email` (text, not null) — sender's email address
  - `mensagem` (text, not null) — the message content
  - `created_at` (timestamptz, default now()) — submission timestamp

2. Security
- Enable RLS on `contatos`.
- Allow anon + authenticated to INSERT only (public contact form, no sign-in).
- No SELECT/UPDATE/DELETE policies — submissions cannot be read or modified from the client.

3. Notes
- This is a no-auth app (no sign-in screen), so the anon role must be able to insert.
- Only INSERT is granted to prevent anyone from reading or manipulating submissions via the public anon key.
- An admin panel is not part of this task; when built later, it will use authenticated policies.
*/

CREATE TABLE IF NOT EXISTS contatos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  email text NOT NULL,
  mensagem text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contatos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contatos" ON contatos;
CREATE POLICY "anon_insert_contatos" ON contatos
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
