import { cache } from "react";
import { createClient } from "@/utils/server";

export interface SiteSettingsRecord {
  id: string;
  holdpage_enabled: boolean;
  holdpage_title: string;
  holdpage_subtitle: string;
  holdpage_image_url: string | null;
  created_at: string;
  updated_at: string;
}

const SINGLETON_ID = "site-settings-1";

const EMPTY: SiteSettingsRecord = {
  id: SINGLETON_ID,
  holdpage_enabled: false,
  holdpage_title: "Coming Soon",
  holdpage_subtitle: "Website Launching Very Soon",
  holdpage_image_url: null,
  created_at: "",
  updated_at: "",
};

// React `cache()` dedupes the query within a single render — root layout,
// robots.ts, sitemap.ts, llms.txt can all call this without N round trips.
export const fetchSiteSettings = cache(async (): Promise<SiteSettingsRecord> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", SINGLETON_ID)
      .maybeSingle();

    if (error) {
      if (error.code === "42P01" || error.code === "PGRST205") return EMPTY;
      console.error("Failed to fetch site settings", error);
      return EMPTY;
    }
    return data ?? EMPTY;
  } catch (error) {
    console.error("Failed to fetch site settings", error);
    return EMPTY;
  }
});

export interface SaveSiteSettingsInput {
  holdpage_enabled: boolean;
  holdpage_title: string;
  holdpage_subtitle: string;
  holdpage_image_url: string | null;
}

export async function saveSiteSettings(input: SaveSiteSettingsInput) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("site_settings")
      .upsert({ id: SINGLETON_ID, ...input }, { onConflict: "id" });
    if (error) return { success: false as const, error: error.message };
    return { success: true as const };
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
