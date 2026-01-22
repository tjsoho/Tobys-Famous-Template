-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create SEO metadata table
CREATE TABLE IF NOT EXISTS public.seo_metadata (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    meta_title TEXT NOT NULL,
    meta_description TEXT,
    keywords TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Disable RLS (or configure as needed)
ALTER TABLE public.seo_metadata DISABLE ROW LEVEL SECURITY;

-- Add comment
COMMENT ON TABLE public.seo_metadata IS 'Stores custom SEO title, description, and keywords for each route.';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_seo_metadata_updated_at
    BEFORE UPDATE ON public.seo_metadata
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();


