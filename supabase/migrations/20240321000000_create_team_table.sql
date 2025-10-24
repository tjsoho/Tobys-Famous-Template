-- Create the team table
create table if not exists public.team (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    excerpt text,
    content text,
    cover_image text,
    slug text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.team enable row level security;

-- Create policies
create policy "Enable read access for all users" on public.team
    for select
    to public
    using (true);

create policy "Enable insert for authenticated users only" on public.team
    for insert
    to authenticated
    with check (true);

create policy "Enable update for authenticated users only" on public.team
    for update
    to authenticated
    using (true)
    with check (true);

create policy "Enable delete for authenticated users only" on public.team
    for delete
    to authenticated
    using (true);
