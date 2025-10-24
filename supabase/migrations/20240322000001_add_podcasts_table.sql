-- Create podcasts table
CREATE TABLE IF NOT EXISTS public.podcasts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    link TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Disable RLS (matching our other tables)
ALTER TABLE public.podcasts DISABLE ROW LEVEL SECURITY;
