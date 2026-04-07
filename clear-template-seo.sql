-- Reset template SEO data to a clean state
-- Run this once against your Supabase/Postgres database.

DELETE FROM public.seo_metadata;

ALTER TABLE public.blogs
  ALTER COLUMN meta_title DROP DEFAULT,
  ALTER COLUMN meta_description DROP DEFAULT,
  ALTER COLUMN keywords DROP DEFAULT;

UPDATE public.blogs
SET
  meta_title = NULL,
  meta_description = NULL,
  keywords = NULL;
