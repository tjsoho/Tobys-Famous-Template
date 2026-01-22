"use server";

import { revalidatePath } from "next/cache";

export async function revalidateAllPages() {
  try {
    revalidatePath("/", "layout");
    revalidatePath("/about-us");
    revalidatePath("/services");
    revalidatePath("/work");
    revalidatePath("/team");
    revalidatePath("/blog");
    revalidatePath("/faqs");
    revalidatePath("/podcasts");
    revalidatePath("/science");
    revalidatePath("/reviews");
    revalidatePath("/contact");
    revalidatePath("/privacy-policy");
    revalidatePath("/terms-and-conditions");
    revalidatePath("/terms-of-use");
    console.log("Revalidated all pages");
    return { success: true };
  } catch (error) {
    console.error("Revalidation error:", error);
    return { success: false, error };
  }
}
