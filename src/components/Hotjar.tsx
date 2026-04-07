/* ************************************************************
                        NOTES
************************************************************ */
// Hotjar integration component
// Loads the Hotjar tracking script using the site ID from env
// Set NEXT_PUBLIC_HOTJAR_ID in .env.local to enable
// Free tier supports heatmaps, session recordings, and funnels
/* ************************************************************
                        IMPORTS
************************************************************ */
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* ************************************************************
                        TYPES
************************************************************ */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HotjarWindow = Window & typeof globalThis & { hj?: any; _hjSettings?: any };

/* ************************************************************
                        COMPONENTS
************************************************************ */
export function Hotjar() {
  const hotjarId = process.env.NEXT_PUBLIC_HOTJAR_ID;
  const pathname = usePathname();

  useEffect(() => {
    if (!hotjarId) return;

    const w = window as HotjarWindow;

    // Initialize Hotjar if not already loaded
    if (!w.hj) {
      w.hj = w.hj || function (...args: unknown[]) {
        (w.hj.q = w.hj.q || []).push(args);
      };
      w._hjSettings = { hjid: parseInt(hotjarId, 10), hjsv: 6 };

      const head = document.getElementsByTagName("head")[0];
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://static.hotjar.com/c/hotjar-${w._hjSettings.hjid}.js?sv=6`;
      head?.appendChild(script);
    }
  }, [hotjarId]);

  // Notify Hotjar of SPA route changes so it tracks every page
  useEffect(() => {
    if (!hotjarId) return;

    const w = window as HotjarWindow;
    if (w.hj) {
      w.hj("stateChange", pathname);
    }
  }, [pathname, hotjarId]);

  return null;
}

/* ************************************************************
                        EXPORTS
************************************************************ */
export default Hotjar;
