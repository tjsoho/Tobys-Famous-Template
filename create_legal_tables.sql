-- Create privacy_policy table
CREATE TABLE IF NOT EXISTS privacy_policy (
    id TEXT PRIMARY KEY DEFAULT 'privacy-policy-1',
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for privacy_policy
ALTER TABLE privacy_policy ENABLE ROW LEVEL SECURITY;

-- Create policies for privacy_policy
CREATE POLICY "Enable read access for all users" ON privacy_policy
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON privacy_policy
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON privacy_policy
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create terms_and_conditions table
CREATE TABLE IF NOT EXISTS terms_and_conditions (
    id TEXT PRIMARY KEY DEFAULT 'terms-and-conditions-1',
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for terms_and_conditions
ALTER TABLE terms_and_conditions ENABLE ROW LEVEL SECURITY;

-- Create policies for terms_and_conditions
CREATE POLICY "Enable read access for all users" ON terms_and_conditions
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON terms_and_conditions
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON terms_and_conditions
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Insert initial privacy policy data
INSERT INTO privacy_policy (id, content) 
VALUES ('privacy-policy-1', '<div class="space-y-8"><div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"><h2 class="text-2xl font-bold text-brand-black mb-4">1. What We Collect</h2><p class="text-brand-black/80">We may collect personal information including identity, employment, financial, vehicle, communications, analytics and supporting documents.</p></div></div>')
ON CONFLICT (id) DO NOTHING;

-- Insert initial terms and conditions data
INSERT INTO terms_and_conditions (id, content) 
VALUES ('terms-and-conditions-1', '<div class="space-y-8"><div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"><h2 class="text-2xl font-bold text-brand-black mb-4">1. About these Terms</h2><p class="text-brand-black/80">These Terms & Conditions (Terms) apply to quotes, products and services provided by Brightwork Group Pty Ltd trading as Bright Leasing (Bright Leasing, we, us) including novated leasing and related salary-packaging services. By requesting or accepting a quote, proceeding with an application, or using our services, you agree to these Terms.</p></div></div>')
ON CONFLICT (id) DO NOTHING;
