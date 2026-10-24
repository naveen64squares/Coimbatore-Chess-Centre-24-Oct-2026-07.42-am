/*
# Add title, description, link fields to gallery_photos

1. Modified Tables
- `gallery_photos`
  - Add `title` (text, nullable) — a short headline shown in the lightbox caption area
  - Add `description` (text, nullable) — a longer description shown beneath the title in the lightbox
  - Add `link_url` (text, nullable) — optional external or internal URL for the "View details" button
  - Add `link_label` (text, nullable) — optional custom label for the link button (defaults to "View Details" in the UI)

2. Security
- Add UPDATE and DELETE policies for `anon` + `authenticated` so the admin can edit and remove photos from the browser.
- Existing SELECT and INSERT policies remain unchanged.
- Grant UPDATE, DELETE to `anon` + `authenticated`.

3. Notes
- Public-facing site with no sign-in; admin is gated by a client-side passcode.
- Existing data is preserved — new columns are nullable so old rows work without changes.
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gallery_photos' AND column_name = 'title') THEN
    ALTER TABLE gallery_photos ADD COLUMN title text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gallery_photos' AND column_name = 'description') THEN
    ALTER TABLE gallery_photos ADD COLUMN description text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gallery_photos' AND column_name = 'link_url') THEN
    ALTER TABLE gallery_photos ADD COLUMN link_url text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gallery_photos' AND column_name = 'link_label') THEN
    ALTER TABLE gallery_photos ADD COLUMN link_label text;
  END IF;
END $$;

GRANT SELECT, INSERT, UPDATE, DELETE ON gallery_photos TO anon, authenticated;

DROP POLICY IF EXISTS "anon_update_gallery" ON gallery_photos;
CREATE POLICY "anon_update_gallery"
ON gallery_photos FOR UPDATE
TO anon, authenticated
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_gallery" ON gallery_photos;
CREATE POLICY "anon_delete_gallery"
ON gallery_photos FOR DELETE
TO anon, authenticated
USING (true);
