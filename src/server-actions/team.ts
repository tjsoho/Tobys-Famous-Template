import { createClient } from "@supabase/supabase-js";
import { TeamMember } from "@/app/types/team";
import { createSlug } from "@/utils/create-slug";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Initialize the team table if it doesn't exist
async function initializeTeamTable() {
  try {
    // First check if the table exists
    const { error: checkError } = await supabase
      .from("team")
      .select("id")
      .limit(1);

    if (checkError?.code === "PGRST205") {
      // Table doesn't exist, create it using Supabase's API
      const { error: createError } = await supabase.rpc("create_team_table", {
        table_sql: `
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
            for select to public using (true);

          create policy "Enable insert for authenticated users only" on public.team
            for insert to authenticated with check (true);

          create policy "Enable update for authenticated users only" on public.team
            for update to authenticated using (true) with check (true);

          create policy "Enable delete for authenticated users only" on public.team
            for delete to authenticated using (true);
        `,
      });

      if (createError) {
        console.error("Error creating team table:", createError);
      }
    }
  } catch (error) {
    console.error("Error checking/creating team table:", error);
  }
}

// Initialize the table when this module loads
initializeTeamTable();

export async function getTeamMembers() {
  try {
    const { data, error } = await supabase
      .from("team")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching team members:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error in getTeamMembers:", error);
    throw error;
  }
}

export async function createTeamMember(teamMember: Partial<TeamMember>) {
  try {
    const slug = createSlug(teamMember.title || "");
    const { data, error } = await supabase
      .from("team")
      .insert([
        {
          ...teamMember,
          slug,
          created_at: new Date().toISOString(),
          content: teamMember.content || "",
          excerpt: teamMember.excerpt || "",
          cover_image: teamMember.cover_image || "",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating team member:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in createTeamMember:", error);
    throw error;
  }
}

export async function updateTeamMember(
  id: string,
  teamMember: Partial<TeamMember>
) {
  const { data, error } = await supabase
    .from("team")
    .update(teamMember)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating team member:", error);
    return null;
  }

  return data;
}

export async function deleteTeamMember(id: string) {
  const { error } = await supabase.from("team").delete().eq("id", id);

  if (error) {
    console.error("Error deleting team member:", error);
    return false;
  }

  return true;
}
