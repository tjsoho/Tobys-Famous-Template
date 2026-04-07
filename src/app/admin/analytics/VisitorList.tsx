/* ************************************************************
                        NOTES
************************************************************ */
// Visitor list component for analytics dashboard
/* ************************************************************
                        IMPORTS
************************************************************ */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface Visitor {
  visitorId: string;
  isReturning: boolean;
  count: number;
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function VisitorList({ data }: { data: Visitor[] }) {
  const hasData = data && data.length > 0;
  return (
    <div className="rounded-lg border-2 border-white/10 bg-white/5 p-6 shadow-sm">
      <h3 className="flex items-center mb-4 !text-lg font-bold text-white">
        <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-400" />
        <span>Visitor List</span>
      </h3>
      <div className="border-t border-white/10 my-4"></div>
      <ul className="space-y-2 max-h-60 overflow-y-auto">
        {hasData ? (
          data.map((visitor) => (
            <li
              key={visitor.visitorId}
              className="flex justify-between border-b border-white/10 pb-2 text-white"
            >
              <span className="text-sm">
                {visitor.visitorId.slice(0, 8)}
                {visitor.isReturning && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-white text-black font-semibold rounded">
                    Returning
                  </span>
                )}
              </span>
              <span className="font-semibold">{visitor.count} visits</span>
            </li>
          ))
        ) : (
          <li className="flex justify-between text-gray-400 text-sm">
            <span>No visitors yet</span>
            <span>0</span>
          </li>
        )}
      </ul>
    </div>
  );
}
