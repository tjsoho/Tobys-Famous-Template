import { createSlug } from "@/utils/create-slug";
import { supabase } from "@/utils/supabase";
import { FAQ } from "@/app/types/faq";

// Category actions
export async function getFAQCategories() {
  const { data, error } = await supabase
    .from("faq_categories")
    .select("*")
    .order("name");

  if (error) throw error;
  return data;
}

export async function createFAQCategory(name: string) {
  const slug = createSlug(name);
  const { data, error } = await supabase
    .from("faq_categories")
    .insert({ name, slug })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteFAQCategory(id: string) {
  const { error } = await supabase.from("faq_categories").delete().eq("id", id);

  if (error) throw error;
}

// FAQ actions
export async function getFAQs() {
  const { data, error } = await supabase
    .from("faqs")
    .select(
      `
            *,
            category:faq_categories (
                id,
                name,
                slug
            )
        `
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createFAQ(faq: Partial<FAQ>) {
  const { data, error } = await supabase
    .from("faqs")
    .insert({
      question: faq.question,
      answer: faq.answer,
      category_id: faq.category_id || "00000000-0000-0000-0000-000000000000", // Default to General
    })
    .select(
      `
            *,
            category:faq_categories (
                id,
                name,
                slug
            )
        `
    )
    .single();

  if (error) throw error;
  return data;
}

export async function updateFAQ(id: string, faq: Partial<FAQ>) {
  const { data, error } = await supabase
    .from("faqs")
    .update({
      question: faq.question,
      answer: faq.answer,
      category_id: faq.category_id || "00000000-0000-0000-0000-000000000000",
    })
    .eq("id", id)
    .select(
      `
            *,
            category:faq_categories (
                id,
                name,
                slug
            )
        `
    )
    .single();

  if (error) throw error;
  return data;
}

export async function deleteFAQ(id: string) {
  const { error } = await supabase.from("faqs").delete().eq("id", id);

  if (error) throw error;
}
