"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface SupplementData {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  hero_benefits: string[];
  hero_image: string;
  created_at: string;
  updated_at: string;
}

export async function getSupplementData(): Promise<SupplementData | null> {
  try {
    const { data, error } = await supabase
      .from("supplement")
      .select("*")
      .single();

    if (error) {
      console.error("Error fetching supplement data:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in getSupplementData:", error);
    return null;
  }
}

export async function updateSupplementData(
  supplementData: Partial<SupplementData>
) {
  try {
    const { data, error } = await supabase
      .from("supplement")
      .update({
        ...supplementData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", supplementData.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating supplement data:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in updateSupplementData:", error);
    throw error;
  }
}
