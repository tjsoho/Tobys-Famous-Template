-- Add SEO fields to blogs table
ALTER TABLE public.blogs
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS keywords TEXT;

COMMENT ON COLUMN public.blogs.meta_title IS 'Custom SEO meta title for the blog post';
COMMENT ON COLUMN public.blogs.meta_description IS 'Custom SEO meta description for the blog post';
COMMENT ON COLUMN public.blogs.keywords IS 'Comma-separated keywords for SEO meta tags';


