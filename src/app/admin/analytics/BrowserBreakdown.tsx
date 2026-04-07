/* ************************************************************
                        NOTES
************************************************************ */
// Browser breakdown component for analytics dashboard
// Shows Chrome, Safari, Firefox, Edge, Other with icons
/* ************************************************************
                        IMPORTS
************************************************************ */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChrome, faSafari, faFirefoxBrowser, faEdge } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

/* ************************************************************
                        CONSTANTS
************************************************************ */
const DEFAULT_BROWSERS = ["Chrome", "Safari", "Firefox", "Edge", "Other"];
const ICONS = {
  Chrome: <FontAwesomeIcon icon={faChrome} className="mr-2 text-gray-400" />,
  Safari: <FontAwesomeIcon icon={faSafari} className="mr-2 text-gray-400" />,
  Firefox: <FontAwesomeIcon icon={faFirefoxBrowser} className="mr-2 text-gray-400" />,
  Edge: <FontAwesomeIcon icon={faEdge} className="mr-2 text-gray-400" />,
  Other: <FontAwesomeIcon icon={faGlobe} className="mr-2 text-gray-400" />,
};

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function BrowserBreakdown({
  data,
}: {
  data: Record<string, number>;
}) {
  const merged = Object.fromEntries(
    DEFAULT_BROWSERS.map((browser) => [browser, data?.[browser] ?? 0])
  );
  return (
    <div className="rounded-lg border-2 border-white/10 bg-white/5 p-6 shadow-sm">
      <h3 className="flex items-center mb-4 !text-lg font-bold text-white">
        <FontAwesomeIcon icon={faGlobe} className="mr-2 text-gray-400" />
        <span>Browser Breakdown</span>
      </h3>
      <div className="border-t border-white/10 my-4"></div>
      <ul className="space-y-2 max-h-60 overflow-y-auto">
        {Object.entries(merged).map(([browser, count]) => (
          <li
            key={browser}
            className="flex justify-between border-b border-white/10 pb-2 text-white"
          >
            <span className="flex items-center text-sm">
              {ICONS[browser as keyof typeof ICONS]}
              {browser}
            </span>
            <span className="font-semibold">{count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
