"use server";

import { revalidatePath } from "next/cache";

export async function revalidateAllPages() {
  try {
    revalidatePath("/", "layout");
    const paths = [
      "/",
      "/about-us",
      "/contact",
      "/blog",
      "/faqs",
    ];
    paths.forEach((p) => revalidatePath(p));
    console.log("Revalidated all pages");
    return { success: true };
  } catch (error) {
    console.error("Revalidation error:", error);
    return { success: false, error };
  }
}
