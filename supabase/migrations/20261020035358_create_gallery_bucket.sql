/*
# Create gallery storage bucket

1. Storage
- Create a public bucket named `gallery` for storing tournament/trophy photos uploaded by the admin.
- Set the bucket to public so gallery images can be displayed on the website.

2. Policies
- Allow public (anon) SELECT (read) on the gallery bucket — visitors need to see photos.
- Allow authenticated AND anon INSERT (upload) — the admin uploader uses the anon key from the browser.
- Allow anon DELETE — so the admin can remove photos from the browser.

3. Notes
- This is a public gallery; all photos are intentionally viewable by everyone.
- The admin gate is a client-side passcode; storage policies remain permissive since the bucket is public content.
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "gallery_public_read" ON storage.objects;
CREATE POLICY "gallery_public_read"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'gallery');

DROP POLICY IF EXISTS "gallery_anon_upload" ON storage.objects;
CREATE POLICY "gallery_anon_upload"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'gallery');

DROP POLICY IF EXISTS "gallery_anon_delete" ON storage.objects;
CREATE POLICY "gallery_anon_delete"
ON storage.objects FOR DELETE
TO anon, authenticated
USING (bucket_id = 'gallery');
