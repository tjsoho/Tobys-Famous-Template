-- ============================================================================
-- Complete Database Setup Script
-- Creates all tables for dynamic content, pages, image library, and SEO
-- Includes storage bucket policies for site-images (no auth required for uploads)
-- ============================================================================

-- ============================================================================
-- 1. UTILITY FUNCTIONS
-- ============================================================================

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Alternative function name for compatibility
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 2. STORAGE BUCKET POLICIES FOR 'site-images'
-- ============================================================================
-- 
-- IMPORTANT: Before running this script, you must create the bucket manually:
-- 1. Go to Supabase Dashboard > Storage
-- 2. Click "New Bucket"
-- 3. Name: "site-images"
-- 4. Public bucket: ✅ (checked)
-- 5. File size limit: 500KB (512000 bytes)
--
-- ============================================================================

-- Drop existing policies (if they exist) to avoid conflicts
DROP POLICY IF EXISTS "Give public access to all files" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;
DROP POLICY IF EXISTS "Public read access for site-images" ON storage.objects;
DROP POLICY IF EXISTS "Public insert for site-images" ON storage.objects;
DROP POLICY IF EXISTS "Public update for site-images" ON storage.objects;
DROP POLICY IF EXISTS "Public delete for site-images" ON storage.objects;

-- Policy 1: Allow public read access to all files in site-images bucket
CREATE POLICY "Public read access for site-images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'site-images');

-- Policy 2: Allow public insert (no auth required)
CREATE POLICY "Public insert for site-images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'site-images');

-- Policy 3: Allow public update (no auth required)
CREATE POLICY "Public update for site-images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'site-images')
WITH CHECK (bucket_id = 'site-images');

-- Policy 4: Allow public delete (no auth required)
CREATE POLICY "Public delete for site-images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'site-images');

-- ============================================================================
-- 3. PAGES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT,
    description TEXT,
    content JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_pages_slug ON public.pages(slug);

-- Enable RLS
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Create policies for pages
CREATE POLICY "Enable read access for all users" ON public.pages
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON public.pages
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON public.pages
    FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON public.pages
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_pages_updated_at
    BEFORE UPDATE ON public.pages
    FOR EACH ROW
    EXECUTE FUNCTION trigger_set_timestamp();

-- ============================================================================
-- 4. BLOGS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    cover_image TEXT,
    excerpt TEXT,
    author TEXT NOT NULL,
    content TEXT,
    slug TEXT NOT NULL UNIQUE,
    -- SEO fields
    meta_title TEXT,
    meta_description TEXT,
    keywords TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for blogs
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON public.blogs(created_at DESC);

-- Enable RLS
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Create policies for blogs
CREATE POLICY "Enable read access for all users" ON public.blogs
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON public.blogs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON public.blogs
    FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON public.blogs
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_blogs_updated_at
    BEFORE UPDATE ON public.blogs
    FOR EACH ROW
    EXECUTE FUNCTION trigger_set_timestamp();

-- Add comments for SEO fields
COMMENT ON COLUMN public.blogs.meta_title IS 'Custom SEO meta title for the blog post';
COMMENT ON COLUMN public.blogs.meta_description IS 'Custom SEO meta description for the blog post';
COMMENT ON COLUMN public.blogs.keywords IS 'Comma-separated keywords for SEO meta tags';

-- ============================================================================
-- 5. IMAGE LIBRARY TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.image_library (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    file_name TEXT NOT NULL,
    url TEXT NOT NULL,
    usage_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on url for faster lookups
CREATE INDEX IF NOT EXISTS idx_image_library_url ON public.image_library(url);
CREATE INDEX IF NOT EXISTS idx_image_library_file_name ON public.image_library(file_name);

-- Enable RLS
ALTER TABLE public.image_library ENABLE ROW LEVEL SECURITY;

-- Create policies for image_library
CREATE POLICY "Enable read access for all users" ON public.image_library
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON public.image_library
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON public.image_library
    FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON public.image_library
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_image_library_updated_at
    BEFORE UPDATE ON public.image_library
    FOR EACH ROW
    EXECUTE FUNCTION trigger_set_timestamp();

-- ============================================================================
-- 6. SEO METADATA TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.seo_metadata (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    meta_title TEXT NOT NULL,
    meta_description TEXT,
    keywords TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_seo_metadata_slug ON public.seo_metadata(slug);

-- Disable RLS (or configure as needed based on your requirements)
ALTER TABLE public.seo_metadata DISABLE ROW LEVEL SECURITY;

-- Add comment
COMMENT ON TABLE public.seo_metadata IS 'Stores custom SEO title, description, and keywords for each route.';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_seo_metadata_updated_at
    BEFORE UPDATE ON public.seo_metadata
    FOR EACH ROW
    EXECUTE FUNCTION trigger_set_timestamp();

-- ============================================================================
-- 7. FAQ CATEGORIES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.faq_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_faq_categories_slug ON public.faq_categories(slug);

-- ============================================================================
-- 8. FAQS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category_id UUID REFERENCES public.faq_categories(id) ON DELETE SET NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for FAQs
CREATE INDEX IF NOT EXISTS idx_faqs_category_id ON public.faqs(category_id);
CREATE INDEX IF NOT EXISTS idx_faqs_order_index ON public.faqs(order_index);

-- Insert default 'General' category if it doesn't exist
INSERT INTO public.faq_categories (id, name, slug)
SELECT 
    '00000000-0000-0000-0000-000000000000'::uuid,
    'General',
    'general'
WHERE NOT EXISTS (
    SELECT 1 FROM public.faq_categories WHERE slug = 'general'
);

-- Update any FAQs without a category to use 'General'
UPDATE public.faqs 
SET category_id = '00000000-0000-0000-0000-000000000000'::uuid
WHERE category_id IS NULL;

-- Function to move FAQs to 'General' category when their category is deleted
CREATE OR REPLACE FUNCTION move_faqs_to_general()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.faqs
    SET category_id = '00000000-0000-0000-0000-000000000000'::uuid
    WHERE category_id = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Trigger to move FAQs before category deletion
CREATE TRIGGER move_faqs_before_category_delete
    BEFORE DELETE ON public.faq_categories
    FOR EACH ROW
    WHEN (OLD.id != '00000000-0000-0000-0000-000000000000'::uuid)
    EXECUTE FUNCTION move_faqs_to_general();

-- Function to prevent deletion of 'General' category
CREATE OR REPLACE FUNCTION prevent_general_category_deletion()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.id = '00000000-0000-0000-0000-000000000000'::uuid THEN
        RAISE EXCEPTION 'Cannot delete the General category';
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Trigger to prevent deletion of General category
CREATE TRIGGER prevent_general_category_delete
    BEFORE DELETE ON public.faq_categories
    FOR EACH ROW
    EXECUTE FUNCTION prevent_general_category_deletion();

-- Create trigger to auto-update updated_at for FAQs
CREATE TRIGGER update_faqs_updated_at
    BEFORE UPDATE ON public.faqs
    FOR EACH ROW
    EXECUTE FUNCTION trigger_set_timestamp();

-- Disable RLS for FAQ tables (or configure as needed)
ALTER TABLE public.faq_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs DISABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 9. PRIVACY POLICY TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.privacy_policy (
    id TEXT PRIMARY KEY DEFAULT 'privacy-policy-1',
    content TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.privacy_policy ENABLE ROW LEVEL SECURITY;

-- Create policies for privacy_policy
CREATE POLICY "Anyone can read privacy policy" ON public.privacy_policy
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can update privacy policy" ON public.privacy_policy
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert privacy policy" ON public.privacy_policy
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_privacy_policy_updated_at
    BEFORE UPDATE ON public.privacy_policy
    FOR EACH ROW
    EXECUTE FUNCTION trigger_set_timestamp();

-- ============================================================================
-- 11. TERMS AND CONDITIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.terms_and_conditions (
    id TEXT PRIMARY KEY DEFAULT 'terms-and-conditions-1',
    content TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.terms_and_conditions ENABLE ROW LEVEL SECURITY;

-- Create policies for terms_and_conditions
CREATE POLICY "Enable read access for all users" ON public.terms_and_conditions
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON public.terms_and_conditions
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON public.terms_and_conditions
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_terms_and_conditions_updated_at
    BEFORE UPDATE ON public.terms_and_conditions
    FOR EACH ROW
    EXECUTE FUNCTION trigger_set_timestamp();

-- ============================================================================
-- 12. TERMS OF USE TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.terms_of_use (
    id TEXT PRIMARY KEY DEFAULT 'terms-of-use-1',
    content TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.terms_of_use ENABLE ROW LEVEL SECURITY;

-- Create policies for terms_of_use
CREATE POLICY "Enable read access for all users" ON public.terms_of_use
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON public.terms_of_use
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON public.terms_of_use
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_terms_of_use_updated_at
    BEFORE UPDATE ON public.terms_of_use
    FOR EACH ROW
    EXECUTE FUNCTION trigger_set_timestamp();

-- ============================================================================
-- 13. ANALYTICS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    path TEXT NOT NULL,
    user_agent TEXT,
    referrer TEXT,
    session_id TEXT,
    device_type TEXT,
    browser TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    ip TEXT,
    source TEXT,
    visitor_id TEXT,
    is_returning BOOLEAN DEFAULT false,
    first_visit TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON public.analytics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_path ON public.analytics(path);
CREATE INDEX IF NOT EXISTS idx_analytics_session_id ON public.analytics(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_visitor_id ON public.analytics(visitor_id);

-- Disable RLS - analytics inserts come from the API route, not authenticated users
ALTER TABLE public.analytics DISABLE ROW LEVEL SECURITY;

-- Add comment
COMMENT ON TABLE public.analytics IS 'Stores page view analytics data including device, browser, location, and traffic source information.';

-- ============================================================================
-- 14. SITE INTEGRATIONS TABLE (singleton)
-- ============================================================================
-- One-row table holding tracking pixel / tag IDs (GA4, GTM, Meta Pixel, Hotjar).
-- The public site reads this at render time so admins can flip pixels on/off
-- without a redeploy.

CREATE TABLE IF NOT EXISTS public.site_integrations (
    id TEXT PRIMARY KEY DEFAULT 'site-integrations-1',
    ga4_measurement_id TEXT,
    ga4_enabled BOOLEAN NOT NULL DEFAULT true,
    gtm_container_id TEXT,
    gtm_enabled BOOLEAN NOT NULL DEFAULT true,
    meta_pixel_id TEXT,
    meta_pixel_enabled BOOLEAN NOT NULL DEFAULT true,
    hotjar_site_id TEXT,
    hotjar_enabled BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT site_integrations_singleton CHECK (id = 'site-integrations-1')
);

INSERT INTO public.site_integrations (id) VALUES ('site-integrations-1')
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.site_integrations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read site integrations" ON public.site_integrations;
DROP POLICY IF EXISTS "Authenticated users can update site integrations" ON public.site_integrations;
DROP POLICY IF EXISTS "Authenticated users can insert site integrations" ON public.site_integrations;
CREATE POLICY "Public can read site integrations" ON public.site_integrations FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update site integrations" ON public.site_integrations
    FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert site integrations" ON public.site_integrations
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP TRIGGER IF EXISTS update_site_integrations_updated_at ON public.site_integrations;
CREATE TRIGGER update_site_integrations_updated_at
    BEFORE UPDATE ON public.site_integrations
    FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

COMMENT ON TABLE public.site_integrations IS 'Singleton: tracking pixel / tag IDs surfaced via /admin/integrations.';

-- ============================================================================
-- 15. SITE SETTINGS TABLE (singleton)
-- ============================================================================
-- Global site toggles. Currently houses the hold-page (coming-soon) feature
-- but designed to grow with future flags.

CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'site-settings-1',
    holdpage_enabled BOOLEAN NOT NULL DEFAULT false,
    holdpage_title TEXT NOT NULL DEFAULT 'Coming Soon',
    holdpage_subtitle TEXT NOT NULL DEFAULT 'Website Launching Very Soon',
    holdpage_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT site_settings_singleton CHECK (id = 'site-settings-1')
);

INSERT INTO public.site_settings (id) VALUES ('site-settings-1')
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Authenticated users can update site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Authenticated users can insert site settings" ON public.site_settings;
CREATE POLICY "Public can read site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update site settings" ON public.site_settings
    FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert site settings" ON public.site_settings
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

COMMENT ON TABLE public.site_settings IS 'Singleton: site-wide toggles (hold page, future flags).';

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================

DO $$
BEGIN
    RAISE NOTICE 'Database setup complete! All tables have been created.';
    RAISE NOTICE '';
    RAISE NOTICE 'Tables created:';
    RAISE NOTICE '  - pages (dynamic page content)';
    RAISE NOTICE '  - blogs (blog posts with SEO fields)';
    RAISE NOTICE '  - image_library (image management)';
    RAISE NOTICE '  - seo_metadata (page-level SEO)';
    RAISE NOTICE '  - faq_categories (FAQ categories)';
    RAISE NOTICE '  - faqs (FAQ entries)';
    RAISE NOTICE '  - privacy_policy (privacy policy content)';
    RAISE NOTICE '  - terms_and_conditions (terms and conditions content)';
    RAISE NOTICE '  - terms_of_use (terms of use content)';
    RAISE NOTICE '  - analytics (page view tracking and traffic data)';
    RAISE NOTICE '  - site_integrations (GA4 / GTM / Meta Pixel / Hotjar IDs)';
    RAISE NOTICE '  - site_settings (hold page + future global toggles)';
    RAISE NOTICE '';
    RAISE NOTICE 'Storage policies created for "site-images" bucket:';
    RAISE NOTICE '  ✓ Public read access';
    RAISE NOTICE '  ✓ Public insert (no auth required)';
    RAISE NOTICE '  ✓ Public update (no auth required)';
    RAISE NOTICE '  ✓ Public delete (no auth required)';
    RAISE NOTICE '';
    RAISE NOTICE 'IMPORTANT: Make sure you have created the "site-images" bucket in Supabase Dashboard > Storage';
    RAISE NOTICE '';
    RAISE NOTICE 'NEXT: Create an admin user:';
    RAISE NOTICE '  1. Go to Supabase Dashboard > Authentication > Users';
    RAISE NOTICE '  2. Click "Add User" or "Create User"';
    RAISE NOTICE '  3. Enter email and password for your admin account';
    RAISE NOTICE '  4. Use these credentials to log in at /admin/login';
END $$;

