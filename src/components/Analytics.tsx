/* ************************************************************
                        NOTES
************************************************************ */
// Client component for automatic page view tracking
// Tracks every page navigation via the analytics API
// Debounced to prevent duplicate events
/* ************************************************************
                        IMPORTS
************************************************************ */
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/utils/analytics-client";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface AnalyticsProps {
  enabled?: boolean;
  debounce?: number;
  debug?: boolean;
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export function Analytics({
  enabled = true,
  debounce = 300,
  debug = false,
}: AnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!enabled) {
      if (debug) console.log("[Analytics] Tracking disabled");
      return;
    }

    const timer = setTimeout(() => {
      if (debug) console.log("[Analytics] Tracking page view:", pathname);

      trackPageView(pathname).catch((error) => {
        if (debug) console.error("[Analytics] Failed to track:", error);
      });
    }, debounce);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, enabled, debounce, debug]);

  return null;
}

/* ************************************************************
                        EXPORTS
************************************************************ */
export default Analytics;
