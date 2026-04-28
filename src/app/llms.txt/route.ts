import { fetchSiteSettings } from "@/data/site-settings";
import { seoPages } from "@/config/seo-pages";

/**
 * Emerging convention for AI-powered crawlers (ChatGPT, Perplexity, Claude).
 * Spec: https://llmstxt.org/
 */
export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";
  const settings = await fetchSiteSettings();

  if (settings.holdpage_enabled) {
    return new Response("# Coming soon\n", {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const lines: string[] = [
    "# Site",
    "",
    "> Update src/app/llms.txt/route.ts with a one-sentence description of this site.",
    "",
    "## Pages",
    "",
  ];

  for (const p of seoPages) {
    const url = `${baseUrl}${p.path === "/" ? "" : p.path}`;
    const description = p.defaultDescription?.trim() || p.label;
    lines.push(`- [${p.label}](${url}): ${description}`);
  }

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
