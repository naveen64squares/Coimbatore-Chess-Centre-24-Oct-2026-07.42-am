/*
# Create contact_submissions table (single-tenant, no auth)

1. New Tables
- `contact_submissions`
  - `id` (uuid, primary key)
  - `name` (text, not null) — submitter's full name
  - `email` (text, not null) — submitter's email address
  - `phone` (text) — optional phone number
  - `program` (text) — which program they're interested in
  - `message` (text) — the inquiry message
  - `created_at` (timestamptz, defaults to now())

2. Security
- Enable RLS on `contact_submissions`.
- Allow anon + authenticated to INSERT (so the public contact form can submit without signing in).
- Allow anon + authenticated to SELECT only for demonstration purposes — actually, keep SELECT restricted: only authenticated can read. To keep it simple and safe for a public form, allow anon INSERT only, and SELECT/UPDATE/DELETE disabled for anon.
- Policies:
  - anon_insert_contact: anon + authenticated may insert new submissions.
  - No SELECT/UPDATE/DELETE policies for anon (submissions are private to the centre owner).

3. Notes
- This is a public contact form with no sign-in, so only INSERT is opened to anon.
- The centre owner can view submissions through the Supabase dashboard or an authenticated admin view (not in scope).
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  program text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact" ON contact_submissions;
CREATE POLICY "anon_insert_contact"
ON contact_submissions FOR INSERT
TO anon, authenticated
WITH CHECK (true);
