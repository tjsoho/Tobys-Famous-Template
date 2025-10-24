-- Create privacy_policy table
CREATE TABLE IF NOT EXISTS privacy_policy (
    id TEXT PRIMARY KEY DEFAULT 'privacy-policy-1',
    content TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE privacy_policy ENABLE ROW LEVEL SECURITY;

-- Create policies for privacy_policy table
CREATE POLICY "Anyone can read privacy policy" ON privacy_policy
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can update privacy policy" ON privacy_policy
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert privacy policy" ON privacy_policy
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
