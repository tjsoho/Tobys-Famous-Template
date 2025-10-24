-- Create terms_of_use table
CREATE TABLE IF NOT EXISTS terms_of_use (
    id TEXT PRIMARY KEY DEFAULT 'terms-of-use-1',
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for terms_of_use
ALTER TABLE terms_of_use ENABLE ROW LEVEL SECURITY;

-- Create policies for terms_of_use
CREATE POLICY "Enable read access for all users" ON terms_of_use
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON terms_of_use
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON terms_of_use
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Insert initial terms of use data
INSERT INTO terms_of_use (id, content) 
VALUES ('terms-of-use-1', '<div class="space-y-8"><div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8"><h2 class="text-2xl font-bold text-brand-black mb-4">1. Site Content (General Information Only)</h2><p class="text-brand-black/80">Information on the Site is of a general nature and is not legal, tax or financial advice.</p></div></div>')
ON CONFLICT (id) DO NOTHING;
