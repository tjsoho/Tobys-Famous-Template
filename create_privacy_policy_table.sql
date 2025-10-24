-- Create privacy_policy table
CREATE TABLE IF NOT EXISTS privacy_policy (
    id TEXT PRIMARY KEY DEFAULT 'privacy-policy-1',
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE privacy_policy ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Enable read access for all users" ON privacy_policy
    FOR SELECT USING (true);

-- Create policy for authenticated users to insert/update
CREATE POLICY "Enable insert for authenticated users" ON privacy_policy
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON privacy_policy
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Insert initial data
INSERT INTO privacy_policy (id, content) 
VALUES ('privacy-policy-1', '<div class="space-y-8"><div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"><h2 class="text-2xl font-bold text-brand-black mb-4">1. What We Collect</h2><p class="text-brand-black/80">We may collect personal information including identity, employment, financial, vehicle, communications, analytics and supporting documents.</p></div></div>')
ON CONFLICT (id) DO NOTHING;
