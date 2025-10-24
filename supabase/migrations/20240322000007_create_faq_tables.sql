-- Create FAQ categories table
CREATE TABLE IF NOT EXISTS faq_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create FAQs table
CREATE TABLE IF NOT EXISTS faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category_id UUID REFERENCES faq_categories(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default 'General' category if it doesn't exist
INSERT INTO faq_categories (id, name, slug)
SELECT 
    '00000000-0000-0000-0000-000000000000'::uuid,
    'General',
    'general'
WHERE NOT EXISTS (
    SELECT 1 FROM faq_categories WHERE slug = 'general'
);

-- Update any FAQs without a category to use 'General'
UPDATE faqs 
SET category_id = '00000000-0000-0000-0000-000000000000'::uuid
WHERE category_id IS NULL;

-- Add trigger to move FAQs to 'General' category when their category is deleted
CREATE OR REPLACE FUNCTION move_faqs_to_general()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE faqs
    SET category_id = '00000000-0000-0000-0000-000000000000'::uuid
    WHERE category_id = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER move_faqs_before_category_delete
    BEFORE DELETE ON faq_categories
    FOR EACH ROW
    WHEN (OLD.id != '00000000-0000-0000-0000-000000000000'::uuid)
    EXECUTE FUNCTION move_faqs_to_general();

-- Prevent deletion of 'General' category
CREATE OR REPLACE FUNCTION prevent_general_category_deletion()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.id = '00000000-0000-0000-0000-000000000000'::uuid THEN
        RAISE EXCEPTION 'Cannot delete the General category';
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER prevent_general_category_delete
    BEFORE DELETE ON faq_categories
    FOR EACH ROW
    EXECUTE FUNCTION prevent_general_category_deletion();

-- Disable RLS since these are managed in admin section
ALTER TABLE faq_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE faqs DISABLE ROW LEVEL SECURITY;