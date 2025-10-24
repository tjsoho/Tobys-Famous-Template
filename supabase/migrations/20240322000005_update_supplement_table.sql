-- Update the supplement page in the pages table
UPDATE pages
SET content = '{
    "heroTitle": "",
    "heroSubtitle": "",
    "heroContent": "",
    "heroImage": "/images/supplement/hero.jpg",
    "featuredProductIds": []
}'::jsonb
WHERE slug = 'supplement';

-- If the supplement page doesn't exist, insert it
INSERT INTO pages (title, description, slug, content)
SELECT 
    'Supplement',
    'Supplement page content',
    'supplement',
    '{
        "heroTitle": "",
        "heroSubtitle": "",
        "heroContent": "",
        "heroImage": "/images/supplement/hero.jpg",
        "featuredProductIds": []
    }'::jsonb
WHERE NOT EXISTS (
    SELECT 1 FROM pages WHERE slug = 'supplement'
);