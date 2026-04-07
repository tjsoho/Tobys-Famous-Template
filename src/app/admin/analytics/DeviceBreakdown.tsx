/* ************************************************************
                        NOTES
************************************************************ */
// Device breakdown component for analytics dashboard
// Shows Desktop, Mobile, Tablet counts with icons
/* ************************************************************
                        IMPORTS
************************************************************ */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faMobileScreen, faTabletScreenButton } from "@fortawesome/free-solid-svg-icons";

/* ************************************************************
                        CONSTANTS
************************************************************ */
const DEFAULT_DEVICES = ["Desktop", "Mobile", "Tablet"];
const ICONS = {
  Desktop: <FontAwesomeIcon icon={faDesktop} className="mr-2 text-gray-400" />,
  Mobile: <FontAwesomeIcon icon={faMobileScreen} className="mr-2 text-gray-400" />,
  Tablet: <FontAwesomeIcon icon={faTabletScreenButton} className="mr-2 text-gray-400" />,
};

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function DeviceBreakdown({
  data,
}: {
  data: Record<string, number>;
}) {
  const merged = Object.fromEntries(
    DEFAULT_DEVICES.map((device) => [device, data?.[device] ?? 0])
  );
  return (
    <div className="rounded-lg border-2 border-white/10 bg-white/5 p-6 shadow-sm">
      <h3 className="flex items-center mb-4 !text-lg font-bold text-white">
        <FontAwesomeIcon icon={faDesktop} className="mr-2 text-gray-400" />
        <span>Device Breakdown</span>
      </h3>
      <div className="border-t border-white/10 my-4"></div>
      <ul className="space-y-2 max-h-60 overflow-y-auto">
        {Object.entries(merged).map(([device, count]) => (
          <li
            key={device}
            className="flex justify-between border-b border-white/10 pb-2 text-white"
          >
            <span className="flex items-center text-sm">
              {ICONS[device as keyof typeof ICONS]}
              {device}
            </span>
            <span className="font-semibold">{count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
