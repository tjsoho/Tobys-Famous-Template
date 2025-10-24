import { BlogPost } from "@/app/types/blog";
import { supabase } from "@/utils/supabase";

export async function getPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    return undefined;
  }

  if (!data) {
    return undefined;
  }

  return data as BlogPost;
}

export async function getPosts() {
  const { data, error } = await supabase.from("blogs").select("*");

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return data as BlogPost[];
}

export async function createPost(post: Partial<BlogPost>) {
  const { data, error } = await supabase
    .from("blogs")
    .insert([post])
    .select()
    .single();

  if (error) {
    console.error("Error creating post:", error);
    throw error;
  }

  return data;
}

export async function updatePost(id: string, post: Partial<BlogPost>) {
  const { data, error } = await supabase
    .from("blogs")
    .update(post)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating post:", error);
    throw error;
  }

  return data;
}

export async function deletePost(id: string) {
  const { error } = await supabase.from("blogs").delete().eq("id", id);

  if (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}
