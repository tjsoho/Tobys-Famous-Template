import { NextRequest, NextResponse } from "next/server";

export type StockImage = {
  id: string;
  source: "pexels" | "unsplash";
  thumbUrl: string;
  fullUrl: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
  attributionUrl: string;
  width: number;
  height: number;
};

type PexelsPhoto = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  alt: string;
  src: {
    original: string;
    large: string;
    medium: string;
    small: string;
    tiny: string;
  };
};

type UnsplashPhoto = {
  id: string;
  width: number;
  height: number;
  alt_description: string | null;
  description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    html: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
};

const PER_PAGE = 30;

async function fetchPexels(
  query: string,
  page: number,
): Promise<StockImage[]> {
  const key = process.env.PEXELS_API_KEY;
  if (!key) return [];

  const url = query
    ? `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${PER_PAGE}&page=${page}`
    : `https://api.pexels.com/v1/curated?per_page=${PER_PAGE}&page=${page}`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: key },
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { photos: PexelsPhoto[] };
    return (data.photos || []).map(
      (p): StockImage => ({
        id: `pexels-${p.id}`,
        source: "pexels",
        thumbUrl: p.src.medium,
        fullUrl: `${p.src.original}?auto=compress&cs=tinysrgb&w=2400`,
        alt: p.alt || query || "Pexels image",
        photographer: p.photographer,
        photographerUrl: p.photographer_url,
        attributionUrl: p.url,
        width: p.width,
        height: p.height,
      }),
    );
  } catch (err) {
    console.warn("Pexels fetch failed:", err);
    return [];
  }
}

async function fetchUnsplash(
  query: string,
  page: number,
): Promise<StockImage[]> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return [];

  const url = query
    ? `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${PER_PAGE}&page=${page}`
    : `https://api.unsplash.com/photos?per_page=${PER_PAGE}&page=${page}&order_by=popular`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Client-ID ${key}` },
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const photos: UnsplashPhoto[] = query ? data.results : data;
    return (photos || []).map(
      (p): StockImage => ({
        id: `unsplash-${p.id}`,
        source: "unsplash",
        thumbUrl: p.urls.small,
        fullUrl: `${p.urls.raw}&w=2400&q=85&auto=format&fit=max`,
        alt: p.alt_description || p.description || query || "Unsplash image",
        photographer: p.user.name,
        photographerUrl: p.user.links.html,
        attributionUrl: p.links.html,
        width: p.width,
        height: p.height,
      }),
    );
  } catch (err) {
    console.warn("Unsplash fetch failed:", err);
    return [];
  }
}

function interleave(a: StockImage[], b: StockImage[]): StockImage[] {
  const out: StockImage[] = [];
  const max = Math.max(a.length, b.length);
  for (let i = 0; i < max; i++) {
    if (i < a.length) out.push(a[i]);
    if (i < b.length) out.push(b[i]);
  }
  return out;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const provider = searchParams.get("provider") || "all";

  const tasks: Promise<StockImage[]>[] = [];
  if (provider === "all" || provider === "pexels") tasks.push(fetchPexels(q, page));
  else tasks.push(Promise.resolve([]));
  if (provider === "all" || provider === "unsplash") tasks.push(fetchUnsplash(q, page));
  else tasks.push(Promise.resolve([]));

  const [pexels, unsplash] = await Promise.all(tasks);
  const images = interleave(pexels, unsplash);

  return NextResponse.json({
    images,
    page,
    hasMore: images.length >= PER_PAGE,
  });
}
