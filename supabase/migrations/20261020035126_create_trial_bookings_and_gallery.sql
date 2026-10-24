/*
# Create trial_bookings and gallery_photos tables

1. New Tables

## trial_bookings
- `id` (uuid, primary key)
- `student_name` (text, not null) — student's full name
- `age` (int) — student's age
- `level` (text) — Beginner / Intermediate / Advanced
- `format` (text) — chosen class format (offline, online-group-8, online-group-4, online-private)
- `language` (text) — Tamil / English / Tamil & English
- `time_slot` (text) — preferred time slot
- `parent_name` (text) — parent/guardian name (optional)
- `phone` (text) — contact number
- `email` (text) — contact email
- `whatsapp_sent` (boolean, default false) — whether WhatsApp was opened
- `created_at` (timestamptz, defaults to now())

## gallery_photos
- `id` (uuid, primary key)
- `url` (text, not null) — photo URL
- `caption` (text) — optional caption
- `category` (text) — tournament / trophy / training / event
- `created_at` (timestamptz, defaults to now())

2. Security
- Enable RLS on both tables.
- trial_bookings: anon + authenticated may INSERT (public trial form). No SELECT/UPDATE/DELETE for anon — submissions are private to the centre.
- gallery_photos: anon + authenticated may SELECT (public gallery display) and INSERT (admin uploader). No UPDATE/DELETE for anon.

3. Notes
- Public-facing site with no sign-in, so anon INSERT/SELECT is required for the forms and gallery to work.
- The centre owner can view trial bookings through the Supabase dashboard.
*/

CREATE TABLE IF NOT EXISTS trial_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  age integer,
  level text,
  format text,
  language text,
  time_slot text,
  parent_name text,
  phone text,
  email text,
  whatsapp_sent boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE trial_bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_trial" ON trial_bookings;
CREATE POLICY "anon_insert_trial"
ON trial_bookings FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE TABLE IF NOT EXISTS gallery_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  caption text,
  category text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_gallery" ON gallery_photos;
CREATE POLICY "anon_select_gallery"
ON gallery_photos FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "anon_insert_gallery" ON gallery_photos;
CREATE POLICY "anon_insert_gallery"
ON gallery_photos FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Seed a few starter photos so the gallery isn't empty before the admin uploads more.
INSERT INTO gallery_photos (url, caption, category) VALUES
  ('https://images.pexels.com/photos/28397727/pexels-photo-28397727.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200', 'Young players focused at our annual tournament', 'tournament'),
  ('https://images.pexels.com/photos/34021984/pexels-photo-34021984.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200', 'Trophy lineup from the state championship', 'trophy'),
  ('https://images.pexels.com/photos/8465436/pexels-photo-8465436.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200', 'Junior batch during training', 'training'),
  ('https://images.pexels.com/photos/10435675/pexels-photo-10435675.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200', 'Champions and their medals', 'trophy'),
  ('https://images.pexels.com/photos/33738613/pexels-photo-33738613.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200', 'Open-air chess at our community event', 'event'),
  ('https://images.pexels.com/photos/8466014/pexels-photo-8466014.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200', 'Intensity in the classroom', 'training'),
  ('https://images.pexels.com/photos/12111207/pexels-photo-12111207.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200', 'Tournament hall in full swing', 'tournament'),
  ('https://images.pexels.com/photos/29707905/pexels-photo-29707905.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200', 'Our students take home the hardware', 'trophy')
ON CONFLICT DO NOTHING;
