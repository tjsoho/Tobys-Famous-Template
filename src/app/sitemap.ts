import { MetadataRoute } from "next";
import { fetchSiteSettings } from "@/data/site-settings";
import { seoPages } from "@/config/seo-pages";
import { getPosts } from "@/server-actions/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";
  const settings = await fetchSiteSettings();

  // While the hold page is on, signal "no public surface" to crawlers.
  if (settings.holdpage_enabled) return [];

  const now = new Date();

  // Static pages (driven from the SEO config so it stays in sync with /admin/seo).
  const staticEntries: MetadataRoute.Sitemap = seoPages.map((p) => ({
    url: `${baseUrl}${p.path === "/" ? "" : p.path}`,
    lastModified: now,
    changeFrequency: p.path === "/" ? "weekly" : "monthly",
    priority: p.path === "/" ? 1.0 : 0.7,
  }));

  // Blog posts.
  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = (await getPosts()) ?? [];
    postEntries = posts.map((post) => ({
      url: `${baseUrl}/blog/posts/${post.slug}`,
      lastModified: post.updated_at
        ? new Date(post.updated_at)
        : post.created_at
          ? new Date(post.created_at)
          : now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch (err) {
    console.warn("sitemap: failed to fetch blog posts", err);
  }

  return [...staticEntries, ...postEntries];
}
