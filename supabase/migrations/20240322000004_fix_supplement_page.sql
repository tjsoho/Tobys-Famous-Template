-- Delete existing supplement page data
DELETE FROM pages WHERE slug = 'supplement';

-- Insert correct supplement page data
INSERT INTO pages (
    title,
    description,
    slug,
    content,
    created_at,
    updated_at
) VALUES (
    'STAIT Supplements',
    'Premium health optimization supplements',
    'supplement',
    jsonb_build_object(
        'heroTitle', 'THAT WE AGE IS A GIVEN. HOW WE AGE IS A CHOICE.',
        'heroSubtitle', 'The ultimate in longevity and well-being.',
        'heroContent', 'Clinically proven formulas for men who demand the best out of life.

The STAIT Advantage:

✔️ Maximum Optimization: Clinically proven ingredients at therapeutic dosage.

✔️ Elite Performance Formula: Enhanced energy, focus and stress relief.

✔️ Optimum dosage: Therapeutic-grade results. Zero compromises.

✔️ Trusted by High Performers: From Special Forces operators to C-Suite Executives to Tradies, Entrepreneurs and Elite Sports Performers.

Born in the boardroom, perfected in the battlefield. STAIT''s premium formula harnesses the mental fortitude of elite Special Forces veterans and the relentless drive of high performers who accept nothing less than excellence.

Clinically validated results:

✔️ 99% increase in free testosterone
✔️ 167% increase in sperm count
✔️ 53% increase in semen volume
✔️ 57% increase in sperm motility
✔️ Reduction in serum cortisol levels
✔️ Alleviated stress or tension related anxieties and associated fatigue
✔️ Greater improvements in sleep quality
✔️ Increased morning erections

Because true power starts with optimization.',
        'heroImage', '/images/supplement/hero.jpg',
        'featuredProductIds', '[]'::jsonb
    ),
    now(),
    now()
);
