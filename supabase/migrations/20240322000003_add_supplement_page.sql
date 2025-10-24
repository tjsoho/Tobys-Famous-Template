-- Create pages table if it doesn't exist
create table if not exists public.pages (
    id uuid default gen_random_uuid() primary key,
    slug text not null unique,
    title text,
    description text,
    content jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default supplement page data
insert into public.pages (slug, title, description, content)
values (
    'supplement',
    'STAIT Supplements',
    'Premium health optimization supplements',
    jsonb_build_object(
        'heroTitle', 'THAT WE AGE IS A GIVEN. HOW WE AGE IS A CHOICE.',
        'heroSubtitle', 'The ultimate in longevity and well-being.',
        'heroBenefitsList', jsonb_build_array(
            'Balanced Optimization',
            'Peak Performance',
            'Tested by high Standards'
        ),
        'heroImage', '/images/supplement/hero.jpg'
    )
)
on conflict (slug) do update
set 
    title = excluded.title,
    description = excluded.description,
    content = excluded.content,
    updated_at = now();

-- Enable RLS
alter table public.pages enable row level security;

-- Create policies
create policy "Enable read access for all users" on public.pages
    for select to public using (true);

create policy "Enable insert for authenticated users only" on public.pages
    for insert to authenticated with check (true);

create policy "Enable update for authenticated users only" on public.pages
    for update to authenticated using (true) with check (true);

create policy "Enable delete for authenticated users only" on public.pages
    for delete to authenticated using (true);
