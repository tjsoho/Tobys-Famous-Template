-- Create image_library table
CREATE TABLE IF NOT EXISTS image_library (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    file_name TEXT NOT NULL,
    url TEXT NOT NULL,
    usage_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on url for faster lookups
CREATE INDEX IF NOT EXISTS idx_image_library_url ON image_library(url);

-- Add RLS policies
ALTER TABLE image_library ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON image_library
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON image_library
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON image_library
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_image_library_updated_at
    BEFORE UPDATE ON image_library
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
