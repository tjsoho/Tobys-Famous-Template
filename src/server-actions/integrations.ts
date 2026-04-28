"use server";

import { revalidatePath } from "next/cache";
import {
  saveSiteIntegrations,
  type SaveSiteIntegrationsInput,
} from "@/data/integrations";

export async function upsertSiteIntegrationsAction(
  input: SaveSiteIntegrationsInput,
) {
  const result = await saveSiteIntegrations(input);
  if (result.success) {
    revalidatePath("/", "layout");
    revalidatePath("/admin/integrations");
  }
  return result;
}
