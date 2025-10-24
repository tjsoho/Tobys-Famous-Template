-- Create supplement table
create table if not exists public.supplement (
    id uuid default gen_random_uuid() primary key,
    hero_title text,
    hero_subtitle text,
    hero_benefits text[],
    hero_image text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default data
insert into public.supplement (
    hero_title,
    hero_subtitle,
    hero_benefits,
    hero_image
) values (
    'THAT WE AGE IS A GIVEN. HOW WE AGE IS A CHOICE.',
    'The ultimate in longevity and well-being.',
    ARRAY[
        'Balanced Optimization',
        'Peak Performance',
        'Tested by high Standards'
    ],
    '/images/supplement/hero.jpg'
);

-- Enable RLS
alter table public.supplement enable row level security;

-- Create policies
create policy "Enable read access for all users" on public.supplement
    for select to public using (true);

create policy "Enable insert for authenticated users only" on public.supplement
    for insert to authenticated with check (true);

create policy "Enable update for authenticated users only" on public.supplement
    for update to authenticated using (true) with check (true);

create policy "Enable delete for authenticated users only" on public.supplement
    for delete to authenticated using (true);
