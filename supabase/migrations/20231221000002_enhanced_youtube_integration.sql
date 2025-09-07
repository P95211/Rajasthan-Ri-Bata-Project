
-- Add new columns to channels table
ALTER TABLE channels ADD COLUMN IF NOT EXISTS banner_url TEXT;
ALTER TABLE channels ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE channels ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE channels ADD COLUMN IF NOT EXISTS custom_url TEXT;

-- Add new columns to videos table
ALTER TABLE videos ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;
ALTER TABLE videos ADD COLUMN IF NOT EXISTS like_count INTEGER DEFAULT 0;
ALTER TABLE videos ADD COLUMN IF NOT EXISTS comment_count INTEGER DEFAULT 0;
ALTER TABLE videos ADD COLUMN IF NOT EXISTS duration TEXT;

-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Allow public read access on documents" ON storage.objects 
FOR SELECT USING (bucket_id = 'documents');

CREATE POLICY "Allow authenticated upload on documents" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.role() = 'authenticated');

CREATE POLICY "Allow public read access on images" ON storage.objects 
FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Allow authenticated upload on images" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
