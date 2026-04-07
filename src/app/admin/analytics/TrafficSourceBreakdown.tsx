/* ************************************************************
                        NOTES
************************************************************ */
// Traffic source breakdown component for analytics dashboard
/* ************************************************************
                        IMPORTS
************************************************************ */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

/* ************************************************************
                        CONSTANTS
************************************************************ */
const DEFAULT_SOURCES = ["Google", "Instagram", "Facebook", "Direct", "Other"];

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function TrafficSourceBreakdown({
  data,
}: {
  data: Record<string, number>;
}) {
  const merged = Object.fromEntries(
    DEFAULT_SOURCES.map((source) => [source, data?.[source] ?? 0])
  );
  return (
    <div className="rounded-lg border-2 border-white/10 bg-white/5 p-6 shadow-sm">
      <h3 className="flex items-center mb-4 !text-lg font-bold text-white">
        <FontAwesomeIcon icon={faLink} className="mr-2 text-gray-400" />
        <span>Traffic Source Breakdown</span>
      </h3>
      <div className="border-t border-white/10 my-4"></div>
      <ul className="space-y-2 max-h-60 overflow-y-auto">
        {Object.entries(merged).map(([source, count]) => (
          <li
            key={source}
            className="flex justify-between border-b border-white/10 pb-2 text-white"
          >
            <span className="text-sm">{source}</span>
            <span className="font-semibold">{count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
