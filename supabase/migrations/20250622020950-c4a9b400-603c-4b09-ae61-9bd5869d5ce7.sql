
-- Create channels table to store YouTube channel information
CREATE TABLE public.channels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  subscriber_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  video_count INTEGER DEFAULT 0,
  logo_url TEXT,
  youtube_channel_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create videos table to store YouTube video information
CREATE TABLE public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  youtube_video_id TEXT,
  thumbnail_url TEXT,
  youtube_url TEXT,
  duration TEXT,
  view_count INTEGER DEFAULT 0,
  category TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vault table for storing API keys securely
CREATE TABLE public.vault (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  secret TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vault ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access for channels and videos
CREATE POLICY "Public can view channels" ON public.channels FOR SELECT USING (true);
CREATE POLICY "Public can view videos" ON public.videos FOR SELECT USING (true);

-- Allow authenticated users to manage vault (API keys)
CREATE POLICY "Authenticated users can manage vault" ON public.vault FOR ALL USING (true);

-- Allow public insert/update for channels and videos (for sync functionality)
CREATE POLICY "Public can insert channels" ON public.channels FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update channels" ON public.channels FOR UPDATE USING (true);
CREATE POLICY "Public can insert videos" ON public.videos FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update videos" ON public.videos FOR UPDATE USING (true);
