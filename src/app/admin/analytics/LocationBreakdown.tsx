/* ************************************************************
                        NOTES
************************************************************ */
// Location breakdown component for analytics dashboard
/* ************************************************************
                        IMPORTS
************************************************************ */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function LocationBreakdown({
  data,
}: {
  data: Record<string, number>;
}) {
  const hasData = data && Object.keys(data).length > 0;
  return (
    <div className="rounded-lg border-2 border-white/10 bg-white/5 p-6 shadow-sm">
      <h3 className="flex items-center mb-4 !text-lg font-bold text-white">
        <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-gray-400" />
        <span>Location Breakdown</span>
      </h3>
      <div className="border-t border-white/10 my-4"></div>
      <ul className="space-y-2 max-h-60 overflow-y-auto">
        {hasData ? (
          Object.entries(data).map(([loc, count]) => (
            <li
              key={loc}
              className="flex justify-between border-b border-white/10 pb-2 text-white"
            >
              <span className="text-sm">{loc}</span>
              <span className="font-semibold">{count}</span>
            </li>
          ))
        ) : (
          <li className="flex justify-between text-gray-400 text-sm">
            <span>No data</span>
            <span>0</span>
          </li>
        )}
      </ul>
    </div>
  );
}
