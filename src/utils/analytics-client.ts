/* ************************************************************
                        NOTES
************************************************************ */
// Client-side analytics tracking utility
// Handles device/browser detection, visitor ID management,
// source/referrer tracking, and sending data to the tracking API
/* ************************************************************
                        INTERFACES
************************************************************ */
interface TrackingData {
  path: string;
  userAgent: string;
  referrer: string;
  deviceType: string;
  browser: string;
  source: string;
  visitorId: string;
  isReturning: boolean;
}

/* ************************************************************
                        CONSTANTS
************************************************************ */
const VISITOR_ID_KEY = "analytics_visitor_id";
const FIRST_VISIT_KEY = "analytics_first_visit";
const LAST_VISIT_KEY = "analytics_last_visit";

/* ************************************************************
                        FUNCTIONS
************************************************************ */

/**
 * Detects the device type based on user agent and screen size
 */
export function detectDeviceType(): string {
  if (typeof window === "undefined") return "Unknown";

  const ua = navigator.userAgent.toLowerCase();
  const width = window.innerWidth;

  if (
    /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)
  ) {
    if (/ipad|tablet|playbook|silk/i.test(ua) || width >= 768) {
      return "Tablet";
    }
    return "Mobile";
  }

  return "Desktop";
}

/**
 * Detects the browser name
 */
export function detectBrowser(): string {
  if (typeof window === "undefined") return "Unknown";

  const ua = navigator.userAgent;

  if (ua.indexOf("Firefox") > -1) return "Firefox";
  if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) return "Opera";
  if (ua.indexOf("Trident") > -1) return "Internet Explorer";
  if (ua.indexOf("Edge") > -1 || ua.indexOf("Edg") > -1) return "Edge";
  if (ua.indexOf("Chrome") > -1) return "Chrome";
  if (ua.indexOf("Safari") > -1) return "Safari";

  return "Unknown";
}

/**
 * Gets or creates a unique visitor ID stored in localStorage
 */
export function getVisitorId(): string {
  if (typeof window === "undefined") return "";

  try {
    let visitorId = localStorage.getItem(VISITOR_ID_KEY);

    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem(VISITOR_ID_KEY, visitorId);
      localStorage.setItem(FIRST_VISIT_KEY, new Date().toISOString());
    }

    return visitorId;
  } catch (error) {
    console.warn("Failed to get/set visitor ID:", error);
    return "";
  }
}

/**
 * Checks if this is a returning visitor
 */
export function isReturningVisitor(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const firstVisit = localStorage.getItem(FIRST_VISIT_KEY);
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);

    localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString());

    return !!firstVisit && !!lastVisit;
  } catch (error) {
    console.warn("Failed to check returning visitor:", error);
    return false;
  }
}

/**
 * Determines the traffic source from referrer and URL parameters
 */
export function detectSource(): string {
  if (typeof window === "undefined") return "Direct";

  const referrer = document.referrer;
  const urlParams = new URLSearchParams(window.location.search);

  const utmSource = urlParams.get("utm_source");
  if (utmSource) return `UTM: ${utmSource}`;

  if (referrer) {
    try {
      const referrerUrl = new URL(referrer);
      const referrerHost = referrerUrl.hostname;

      if (referrerHost === window.location.hostname) return "Internal";

      if (referrerHost.includes("google")) return "Google";
      if (referrerHost.includes("bing")) return "Bing";
      if (referrerHost.includes("yahoo")) return "Yahoo";
      if (referrerHost.includes("duckduckgo")) return "DuckDuckGo";

      if (referrerHost.includes("facebook")) return "Facebook";
      if (referrerHost.includes("twitter") || referrerHost.includes("t.co"))
        return "Twitter";
      if (referrerHost.includes("linkedin")) return "LinkedIn";
      if (referrerHost.includes("instagram")) return "Instagram";
      if (referrerHost.includes("reddit")) return "Reddit";
      if (referrerHost.includes("pinterest")) return "Pinterest";
      if (referrerHost.includes("youtube")) return "YouTube";

      return referrerHost;
    } catch (error) {
      console.warn("Failed to parse referrer:", error);
    }
  }

  return "Direct";
}

/**
 * Main tracking function - sends page view data to the API
 */
export async function trackPageView(
  path?: string,
  additionalData?: Partial<TrackingData>
): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    const currentPath = path || window.location.pathname;

    const trackingData: TrackingData = {
      path: currentPath,
      userAgent: navigator.userAgent,
      referrer: document.referrer || "",
      deviceType: detectDeviceType(),
      browser: detectBrowser(),
      source: detectSource(),
      visitorId: getVisitorId(),
      isReturning: isReturningVisitor(),
      ...additionalData,
    };

    const response = await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trackingData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.warn("Analytics tracking failed:", errorData);
    }
  } catch (error) {
    // Silently fail - don't disrupt user experience
    console.warn("Failed to track page view:", error);
  }
}

/**
 * Debounced version of trackPageView
 */
let debounceTimer: NodeJS.Timeout | null = null;
export function trackPageViewDebounced(
  path?: string,
  delay: number = 300
): void {
  if (debounceTimer) clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    trackPageView(path);
    debounceTimer = null;
  }, delay);
}
