-- Create terms_and_conditions table
CREATE TABLE IF NOT EXISTS terms_and_conditions (
    id TEXT PRIMARY KEY DEFAULT 'terms-and-conditions-1',
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE terms_and_conditions ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Enable read access for all users" ON terms_and_conditions
    FOR SELECT USING (true);

-- Create policy for authenticated users to insert/update
CREATE POLICY "Enable insert for authenticated users" ON terms_and_conditions
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON terms_and_conditions
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Insert initial data
INSERT INTO terms_and_conditions (id, content) 
VALUES ('terms-and-conditions-1', '<div class="space-y-8"><div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"><h2 class="text-2xl font-bold text-brand-black mb-4">1. About these Terms</h2><p class="text-brand-black/80">These Terms & Conditions (Terms) apply to quotes, products and services provided by Brightwork Group Pty Ltd trading as Bright Leasing (Bright Leasing, we, us) including novated leasing and related salary-packaging services. By requesting or accepting a quote, proceeding with an application, or using our services, you agree to these Terms.</p></div></div>')
ON CONFLICT (id) DO NOTHING;
