import { createClient } from "@/utils/server";

export interface SiteIntegrationsRecord {
  id: string;
  ga4_measurement_id: string | null;
  ga4_enabled: boolean;
  gtm_container_id: string | null;
  gtm_enabled: boolean;
  meta_pixel_id: string | null;
  meta_pixel_enabled: boolean;
  hotjar_site_id: string | null;
  hotjar_enabled: boolean;
  created_at: string;
  updated_at: string;
}

const SINGLETON_ID = "site-integrations-1";

const EMPTY: SiteIntegrationsRecord = {
  id: SINGLETON_ID,
  ga4_measurement_id: null,
  ga4_enabled: true,
  gtm_container_id: null,
  gtm_enabled: true,
  meta_pixel_id: null,
  meta_pixel_enabled: true,
  hotjar_site_id: null,
  hotjar_enabled: true,
  created_at: "",
  updated_at: "",
};

export async function fetchSiteIntegrations(): Promise<SiteIntegrationsRecord> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_integrations")
      .select("*")
      .eq("id", SINGLETON_ID)
      .maybeSingle();

    if (error) {
      // Table missing — return defaults so the public site still renders.
      // PostgreSQL raw code = 42P01; PostgREST schema-cache code = PGRST205.
      if (error.code === "42P01" || error.code === "PGRST205") {
        console.warn("site_integrations table does not exist yet");
        return EMPTY;
      }
      console.error("Failed to fetch site integrations", error);
      return EMPTY;
    }

    return data ?? EMPTY;
  } catch (error) {
    console.error("Failed to fetch site integrations", error);
    return EMPTY;
  }
}

export interface SaveSiteIntegrationsInput {
  ga4_measurement_id: string | null;
  ga4_enabled: boolean;
  gtm_container_id: string | null;
  gtm_enabled: boolean;
  meta_pixel_id: string | null;
  meta_pixel_enabled: boolean;
  hotjar_site_id: string | null;
  hotjar_enabled: boolean;
}

export async function saveSiteIntegrations(input: SaveSiteIntegrationsInput) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("site_integrations")
      .upsert({ id: SINGLETON_ID, ...input }, { onConflict: "id" });
    if (error) {
      return { success: false as const, error: error.message };
    }
    return { success: true as const };
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
