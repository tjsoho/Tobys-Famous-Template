import { createClient } from "@supabase/supabase-js";
import { SciencePost } from "@/app/types/science";
import { createSlug } from "@/utils/create-slug";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getSciencePosts() {
  try {
    const { data, error } = await supabase
      .from("science")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching science posts:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error in getSciencePosts:", error);
    throw error;
  }
}

export async function createSciencePost(post: Partial<SciencePost>) {
  try {
    const slug = createSlug(post.title || "");
    const { data, error } = await supabase
      .from("science")
      .insert([
        {
          ...post,
          slug,
          created_at: new Date().toISOString(),
          content: post.content || "",
          excerpt: post.excerpt || "",
          cover_image: post.cover_image || "",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating science post:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in createSciencePost:", error);
    throw error;
  }
}

export async function updateSciencePost(
  id: string,
  post: Partial<SciencePost>
) {
  try {
    const { data, error } = await supabase
      .from("science")
      .update(post)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating science post:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in updateSciencePost:", error);
    throw error;
  }
}

export async function deleteSciencePost(id: string) {
  try {
    const { error } = await supabase.from("science").delete().eq("id", id);

    if (error) {
      console.error("Error deleting science post:", error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Error in deleteSciencePost:", error);
    throw error;
  }
}

export async function getSciencePostBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from("science")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Error fetching science post:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in getSciencePostBySlug:", error);
    throw error;
  }
}
