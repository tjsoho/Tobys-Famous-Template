"use server";

import { revalidatePath } from "next/cache";

export async function revalidateAllPages() {
  try {
    revalidatePath("/");
    revalidatePath("/about-us");
    revalidatePath("/services");
    revalidatePath("/work");
    revalidatePath("/team");
    revalidatePath("/blog");
    revalidatePath("/faqs");
    revalidatePath("/podcasts");
    revalidatePath("/science");
    revalidatePath("/reviews");
    console.log("Revalidated all pages");
    return { success: true };
  } catch (error) {
    console.error("Revalidation error:", error);
    return { success: false, error };
  }
}
