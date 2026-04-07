/* ************************************************************
                        NOTES
************************************************************ */
// React hook for tracking page views in Next.js applications
// Supports automatic tracking on mount and route changes
/* ************************************************************
                        IMPORTS
************************************************************ */
"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "../analytics-client";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface UseAnalyticsOptions {
  trackOnMount?: boolean;
  trackOnRouteChange?: boolean;
  debounce?: number;
  enabled?: boolean;
}

/* ************************************************************
                        HOOKS
************************************************************ */
export function useAnalytics(options: UseAnalyticsOptions = {}) {
  const {
    trackOnMount = true,
    trackOnRouteChange = true,
    debounce = 0,
    enabled = true,
  } = options;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasTrackedMount = useRef(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const track = useCallback(
    (customPath?: string) => {
      if (!enabled) return;

      const path = customPath || pathname;

      if (debounce > 0) {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        debounceTimer.current = setTimeout(() => {
          trackPageView(path);
          debounceTimer.current = null;
        }, debounce);
      } else {
        trackPageView(path);
      }
    },
    [enabled, pathname, debounce]
  );

  // Track on mount
  useEffect(() => {
    if (enabled && trackOnMount && !hasTrackedMount.current) {
      hasTrackedMount.current = true;
      track();
    }
  }, [enabled, trackOnMount, track]);

  // Track on route changes
  useEffect(() => {
    if (enabled && trackOnRouteChange && hasTrackedMount.current) {
      track();
    }
  }, [pathname, searchParams, enabled, trackOnRouteChange, track]);

  // Cleanup debounce timer
  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  return { track, pathname };
}

export function usePageViewTracking(options: UseAnalyticsOptions = {}) {
  useAnalytics(options);
}
