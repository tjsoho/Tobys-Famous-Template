-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON public.team;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.team;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.team;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.team;

-- Recreate policies to match the blog table
CREATE POLICY "Enable read access for all users" ON public.team
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for service role" ON public.team
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for service role" ON public.team
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for service role" ON public.team
    FOR DELETE USING (auth.role() = 'authenticated');
