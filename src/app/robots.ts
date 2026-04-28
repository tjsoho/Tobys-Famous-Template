import { MetadataRoute } from "next";
import { fetchSiteSettings } from "@/data/site-settings";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";
  const settings = await fetchSiteSettings();

  if (settings.holdpage_enabled) {
    return { rules: [{ userAgent: "*", disallow: "/" }], host: baseUrl };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*", "/admin/*", "/private/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
