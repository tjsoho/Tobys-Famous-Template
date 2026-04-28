"use server";

import { revalidatePath } from "next/cache";
import {
  saveSiteSettings,
  type SaveSiteSettingsInput,
} from "@/data/site-settings";

export async function upsertSiteSettingsAction(input: SaveSiteSettingsInput) {
  const result = await saveSiteSettings(input);
  if (result.success) {
    revalidatePath("/", "layout");
    revalidatePath("/admin/holdpage");
  }
  return result;
}
