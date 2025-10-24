import { createClient } from "@supabase/supabase-js";
import { Podcast } from "@/app/types/podcast";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getPodcasts() {
  const { data, error } = await supabase
    .from("podcasts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching podcasts:", error);
    throw error;
  }

  return data;
}

export async function createPodcast(podcast: Partial<Podcast>) {
  const { error } = await supabase.from("podcasts").insert(podcast);

  if (error) {
    console.error("Error creating podcast:", error);
    throw error;
  }
}

export async function updatePodcast(id: string, podcast: Partial<Podcast>) {
  const { error } = await supabase
    .from("podcasts")
    .update(podcast)
    .eq("id", id);

  if (error) {
    console.error("Error updating podcast:", error);
    throw error;
  }
}

export async function deletePodcast(id: string) {
  const { error } = await supabase.from("podcasts").delete().eq("id", id);

  if (error) {
    console.error("Error deleting podcast:", error);
    throw error;
  }
}
