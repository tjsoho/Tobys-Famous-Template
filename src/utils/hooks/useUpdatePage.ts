"use client";

import { BasePage } from "@/app/types";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { revalidateAllPages } from "@/server-actions/revalidate";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function useUpdatePage<TContent>(slug: string) {
  const [isSaving, setIsSaving] = useState(false);

  const updatePage = async (page: BasePage<TContent>) => {
    setIsSaving(true);
    console.log("useUpdatePage - Saving page:", page);
    console.log("useUpdatePage - Content:", page.content);

    try {
      // First check if the page exists
      const { data: existingPage } = await supabase
        .from("pages")
        .select("*")
        .eq("slug", slug)
        .single();

      console.log("useUpdatePage - Existing page:", existingPage);

      const { data, error } = await supabase.from("pages").upsert(
        {
          id: existingPage?.id,
          ...page,
          slug,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "slug",
        }
      );

      if (error) {
        console.error("useUpdatePage - Error saving:", error);
        setIsSaving(false);
        throw error;
      }

      console.log("useUpdatePage - Save successful:", data);

      // Trigger revalidation to update the frontend
      try {
        await revalidateAllPages();
        console.log("useUpdatePage - Revalidation triggered for all pages");
      } catch (revalidateError) {
        console.error("useUpdatePage - Revalidation error:", revalidateError);
      }
    } catch (error) {
      console.error("useUpdatePage - Error:", error);
      setIsSaving(false);
      throw error;
    }

    setIsSaving(false);
  };

  return {
    isSaving,
    updatePage,
  };
}
