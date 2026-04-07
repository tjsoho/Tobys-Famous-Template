/* ************************************************************
                        NOTES
************************************************************ */
// API route for tracking page views
// Features rate limiting, geolocation detection, and session management
// Uses Vercel geolocation as primary with fallback to external APIs
/* ************************************************************
                        IMPORTS
************************************************************ */
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { geolocation, ipAddress } from "@vercel/functions";
import { trackPageView } from "@/utils/analytics";

/* ************************************************************
                        RATE LIMITING
************************************************************ */
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 30;

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(identifier: string): {
  limited: boolean;
  remaining: number;
  resetTime: number;
} {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return {
      limited: false,
      remaining: MAX_REQUESTS_PER_WINDOW - 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { limited: true, remaining: 0, resetTime: record.resetTime };
  }

  record.count++;
  return {
    limited: false,
    remaining: MAX_REQUESTS_PER_WINDOW - record.count,
    resetTime: record.resetTime,
  };
}

function cleanupOldEntries() {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) rateLimitStore.delete(key);
  }
}

/* ************************************************************
                        GEOLOCATION
************************************************************ */
interface GeoService {
  name: string;
  url: string;
  parse: (
    data: unknown,
    ip?: string
  ) => { city: string; state: string; country: string; ip: string } | null;
}

const GEO_SERVICES: GeoService[] = [
  {
    name: "ipapi.co",
    url: "https://ipapi.co/json/",
    parse: (data, ip) => {
      const d = data as Record<string, unknown>;
      if (d && typeof d === "object" && !d.error) {
        return {
          city: (d.city as string) || "Unknown",
          state: (d.region as string) || (d.region_code as string) || "Unknown",
          country: (d.country_name as string) || (d.country as string) || "Unknown",
          ip: (d.ip as string) || ip || "",
        };
      }
      return null;
    },
  },
  {
    name: "ip-api.com",
    url: "http://ip-api.com/json/",
    parse: (data, ip) => {
      const d = data as Record<string, unknown>;
      if (d && typeof d === "object" && d.status === "success") {
        return {
          city: (d.city as string) || "Unknown",
          state: (d.regionName as string) || (d.region as string) || "Unknown",
          country: (d.country as string) || "Unknown",
          ip: (d.query as string) || ip || "",
        };
      }
      return null;
    },
  },
  {
    name: "ipwho.is",
    url: "http://ipwho.is/",
    parse: (data, ip) => {
      const d = data as Record<string, unknown>;
      if (d && typeof d === "object" && d.success !== false) {
        return {
          city: (d.city as string) || "Unknown",
          state: (d.region as string) || "Unknown",
          country: (d.country as string) || "Unknown",
          ip: (d.ip as string) || ip || "",
        };
      }
      return null;
    },
  },
  {
    name: "freeipapi.com",
    url: "https://freeipapi.com/api/json",
    parse: (data, ip) => {
      const d = data as Record<string, unknown>;
      if (d && typeof d === "object") {
        return {
          city: (d.cityName as string) || "Unknown",
          state: (d.regionName as string) || "Unknown",
          country: (d.countryName as string) || "Unknown",
          ip: (d.ipAddress as string) || ip || "",
        };
      }
      return null;
    },
  },
];

async function getFallbackGeolocation(ip?: string) {
  for (const service of GEO_SERVICES) {
    try {
      const res = await fetch(service.url, {
        signal: AbortSignal.timeout(5000),
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        const result = service.parse(data, ip);
        if (result) return result;
      }
    } catch (error) {
      console.warn(`${service.name} failed:`, error);
    }
  }

  return { city: "Unknown", state: "Unknown", country: "Unknown", ip: ip || "" };
}

/* ************************************************************
                        ROUTE HANDLER
************************************************************ */
export async function POST(request: Request) {
  try {
    if (rateLimitStore.size > 100) cleanupOldEntries();

    const clientIp =
      ipAddress(request) ||
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rateLimitResult = isRateLimited(clientIp);

    if (rateLimitResult.limited) {
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": MAX_REQUESTS_PER_WINDOW.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimitResult.resetTime.toString(),
            "Retry-After": Math.ceil(
              (rateLimitResult.resetTime - Date.now()) / 1000
            ).toString(),
          },
        }
      );
    }

    const body = await request.json();

    if (!body.path || !body.path.startsWith("/")) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    const cookieStore = await cookies();

    let sessionId = cookieStore.get("sessionId")?.value;
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      cookieStore.set("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }

    // Geolocation - try Vercel first, then fallback
    const geo = geolocation(request);
    const hasVercelGeo = geo.city || geo.countryRegion || geo.country;

    let city: string;
    let state: string;
    let country: string;
    let ip: string;

    if (hasVercelGeo) {
      city = geo.city || "Unknown";
      state = geo.countryRegion || "Unknown";
      country = geo.country || "Unknown";
      ip =
        request.headers.get("x-forwarded-for")?.split(",")[0] ||
        request.headers.get("x-real-ip") ||
        "";
    } else {
      const fallbackIp =
        ipAddress(request) ||
        request.headers.get("x-forwarded-for")?.split(",")[0] ||
        request.headers.get("x-real-ip");

      const fallbackGeo = await getFallbackGeolocation(fallbackIp!);
      city = fallbackGeo.city;
      state = fallbackGeo.state;
      country = fallbackGeo.country;
      ip = fallbackGeo.ip;
    }

    await trackPageView({
      path: body.path,
      user_agent: body.userAgent || "",
      referrer: body.referrer || "",
      session_id: sessionId,
      device_type: body.deviceType || "Unknown",
      browser: body.browser || "Unknown",
      city,
      state,
      country,
      ip,
      source: body.source || "Direct",
      visitor_id: body.visitorId || "",
      is_returning: !!body.isReturning,
    });

    return NextResponse.json(
      { success: true },
      {
        headers: {
          "X-RateLimit-Limit": MAX_REQUESTS_PER_WINDOW.toString(),
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.resetTime.toString(),
        },
      }
    );
  } catch (error) {
    console.error("Error tracking page view:", error);
    return NextResponse.json(
      { error: "Failed to track page view" },
      { status: 500 }
    );
  }
}
