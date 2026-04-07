/* ************************************************************
                        NOTES
************************************************************ */
// Analytics dashboard page for the admin panel
// Shows page views, visitors, sessions, device/browser/location breakdowns
// Time range and multi-dimensional filtering
// Page views section is fully dynamic - auto-discovers all tracked pages
/* ************************************************************
                        IMPORTS
************************************************************ */
"use client";

import { useEffect, useState } from "react";
import {
  format,
  subDays,
  subMonths,
  subQuarters,
  subMinutes,
  startOfDay,
} from "date-fns";

import DeviceBreakdown from "./DeviceBreakdown";
import BrowserBreakdown from "./BrowserBreakdown";
import LocationBreakdown from "./LocationBreakdown";
import TrafficSourceBreakdown from "./TrafficSourceBreakdown";
import VisitorList from "./VisitorList";
import { useAnalyticsFilters } from "@/utils/hooks/useAnalyticsFilters";
import {
  AnalyticsSummary,
  getAnalyticsSummary,
  AnalyticsRow,
} from "@/utils/analytics";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

/* ************************************************************
                        COMPONENTS
************************************************************ */
export const dynamic = "force-dynamic";

export default function AnalyticsDashboard() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeRange, setTimeRange] = useState<
    "30min" | "1hour" | "today" | "day" | "week" | "month" | "quarter"
  >("day");

  const {
    filters,
    setCountry,
    setDevice,
    setBrowser,
    setVisitorType,
    setSource,
    resetFilters,
    hasActiveFilters,
    availableCountries,
    availableDevices,
    availableBrowsers,
    availableSources,
    filteredSummary,
  } = useAnalyticsFilters(summary);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const endDate = new Date();
        let startDate;

        switch (timeRange) {
          case "30min":
            startDate = subMinutes(endDate, 30);
            break;
          case "1hour":
            startDate = subMinutes(endDate, 60);
            break;
          case "today":
            startDate = startOfDay(endDate);
            break;
          case "day":
            startDate = subDays(endDate, 1);
            break;
          case "week":
            startDate = subDays(endDate, 7);
            break;
          case "month":
            startDate = subMonths(endDate, 1);
            break;
          case "quarter":
            startDate = subQuarters(endDate, 1);
            break;
        }

        const data = await getAnalyticsSummary(startDate, endDate);
        setSummary(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  // --- Session-based analytics ---
  const sessions: Record<
    string,
    {
      pages: string[];
      deviceType: string;
      browser: string;
      city: string;
      state: string;
      country: string;
      start: Date;
    }
  > = {};
  if (filteredSummary && Array.isArray(filteredSummary.pageViews)) {
    filteredSummary.pageViews.forEach((view: AnalyticsRow) => {
      if (!view.session_id || !view.path) return;
      if (!sessions[view.session_id]) {
        const sessionStart = view.created_at
          ? new Date(view.created_at)
          : new Date();
        sessions[view.session_id] = {
          pages: [],
          deviceType: view.device_type,
          browser: view.browser,
          city: view.city,
          state: view.state,
          country: view.country,
          start: sessionStart,
        };
      }
      sessions[view.session_id]?.pages.push(view.path);
    });
  }

  // Dynamic page views - auto-discovers all tracked pages from data
  // Sorted by view count descending so the most visited pages appear first
  const pageViewEntries = Object.entries(filteredSummary?.viewsByPage || {})
    .sort(([, a], [, b]) => (b as number) - (a as number));

  /* ************************************************************
                        TIME RANGE BUTTONS
  ************************************************************ */
  const timeRangeButtons: {
    key: typeof timeRange;
    label: string;
  }[] = [
    { key: "30min", label: "Last 30 Minutes" },
    { key: "1hour", label: "Last 1 Hour" },
    { key: "today", label: "Today" },
    { key: "day", label: "Last 24 Hours" },
    { key: "week", label: "Last Week" },
    { key: "month", label: "Last Month" },
    { key: "quarter", label: "Last Quarter" },
  ];

  /* ************************************************************
                        RENDER
  ************************************************************ */
  if (loading || !summary) {
    return (
      <div className="min-h-screen bg-black p-8 pt-20">
        <main className="bg-black min-h-screen">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-400">Loading analytics...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-8 pt-20">
      <main className="bg-black min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* ************************************************************
              BACK LINK
          ************************************************************ */}
          <div className="mb-8">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </Link>
          </div>

          {/* ************************************************************
              TIME RANGE FILTERS
          ************************************************************ */}
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {timeRangeButtons.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTimeRange(key)}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  timeRange === key
                    ? "bg-white text-black shadow-md"
                    : "bg-transparent border-2 border-white/20 text-white hover:border-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ************************************************************
              FILTERS SECTION
          ************************************************************ */}
          <div className="mb-8 rounded-lg border-2 border-white/10 bg-white/5 p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Filters</h2>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                >
                  Reset All Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-400">
                  Country
                </label>
                <select
                  value={filters.country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full rounded-lg border-2 border-white/20 bg-black px-4 py-2 text-white transition hover:border-white focus:border-white focus:outline-none"
                >
                  <option value="all">All Countries</option>
                  {availableCountries.map((country) => (
                    <option key={country} value={country}>
                      {country} ({summary.countryBreakdown[country]})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-400">
                  Device Type
                </label>
                <select
                  value={filters.device}
                  onChange={(e) => setDevice(e.target.value)}
                  className="w-full rounded-lg border-2 border-white/20 bg-black px-4 py-2 text-white transition hover:border-white focus:border-white focus:outline-none"
                >
                  <option value="all">All Devices</option>
                  {availableDevices.map((device) => (
                    <option key={device} value={device}>
                      {device} ({summary.deviceBreakdown[device]})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-400">
                  Browser
                </label>
                <select
                  value={filters.browser}
                  onChange={(e) => setBrowser(e.target.value)}
                  className="w-full rounded-lg border-2 border-white/20 bg-black px-4 py-2 text-white transition hover:border-white focus:border-white focus:outline-none"
                >
                  <option value="all">All Browsers</option>
                  {availableBrowsers.map((browser) => (
                    <option key={browser} value={browser}>
                      {browser} ({summary.browserBreakdown[browser]})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-400">
                  Visitor Type
                </label>
                <select
                  value={filters.visitorType}
                  onChange={(e) =>
                    setVisitorType(
                      e.target.value as "all" | "new" | "returning"
                    )
                  }
                  className="w-full rounded-lg border-2 border-white/20 bg-black px-4 py-2 text-white transition hover:border-white focus:border-white focus:outline-none"
                >
                  <option value="all">All Visitors</option>
                  <option value="new">New Visitors</option>
                  <option value="returning">Returning Visitors</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-400">
                  Traffic Source
                </label>
                <select
                  value={filters.source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full rounded-lg border-2 border-white/20 bg-black px-4 py-2 text-white transition hover:border-white focus:border-white focus:outline-none"
                >
                  <option value="all">All Sources</option>
                  {availableSources.map((source) => (
                    <option key={source} value={source}>
                      {source} ({summary.sourceBreakdown[source]})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ************************************************************
              ACTIVE FILTERS DISPLAY
          ************************************************************ */}
          {hasActiveFilters && (
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-sm font-semibold text-gray-400">
                Active filters:
              </span>
              {filters.country !== "all" && (
                <span className="rounded-full bg-white text-black px-3 py-1 text-xs font-semibold">
                  Country: {filters.country}
                </span>
              )}
              {filters.device !== "all" && (
                <span className="rounded-full bg-white text-black px-3 py-1 text-xs font-semibold">
                  Device: {filters.device}
                </span>
              )}
              {filters.browser !== "all" && (
                <span className="rounded-full bg-white text-black px-3 py-1 text-xs font-semibold">
                  Browser: {filters.browser}
                </span>
              )}
              {filters.visitorType !== "all" && (
                <span className="rounded-full bg-white text-black px-3 py-1 text-xs font-semibold">
                  Visitor: {filters.visitorType}
                </span>
              )}
              {filters.source !== "all" && (
                <span className="rounded-full bg-white text-black px-3 py-1 text-xs font-semibold">
                  Source: {filters.source}
                </span>
              )}
            </div>
          )}

          {/* ************************************************************
              STATISTICS CARDS
          ************************************************************ */}
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            <div className="flex flex-col items-center rounded-lg border-2 border-white/10 bg-white/5 p-6 text-center shadow-sm">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">
                Total Views
              </h3>
              <p className="text-3xl font-bold text-white">
                {filteredSummary?.totalViews || 0}
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg border-2 border-white/10 bg-white/5 p-6 text-center shadow-sm">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">
                Unique Visitors
              </h3>
              <p className="text-3xl font-bold text-white">
                {filteredSummary?.uniqueVisitors || 0}
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg border-2 border-white/10 bg-white/5 p-6 text-center shadow-sm">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">
                Unique Sessions
              </h3>
              <p className="text-3xl font-bold text-white">
                {Object.keys(sessions).length}
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg border-2 border-white/10 bg-white/5 p-6 text-center shadow-sm">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">
                New Visitors
              </h3>
              <p className="text-3xl font-bold text-white">
                {filteredSummary?.visitorList?.filter((v) => !v.isReturning)
                  .length || 0}
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg border-2 border-white/10 bg-white/5 p-6 text-center shadow-sm">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">
                Returning Visitors
              </h3>
              <p className="text-3xl font-bold text-white">
                {filteredSummary?.visitorList?.filter((v) => v.isReturning)
                  .length || 0}
              </p>
            </div>
          </div>

          {/* ************************************************************
              PAGE VIEWS AND TIMELINE
          ************************************************************ */}
          <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Dynamic Page Views - auto-discovers all tracked pages */}
            <div className="flex flex-col rounded-lg border-2 border-white/10 bg-white/5 p-6 shadow-sm">
              <h3 className="mb-6 text-2xl font-bold text-white">
                Page Views
              </h3>
              <div className="grid w-full grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                {pageViewEntries.length > 0 ? (
                  pageViewEntries.map(([path, views]) => (
                    <div
                      key={path}
                      className="flex justify-between border-b border-white/30 pb-2"
                    >
                      <span className="font-semibold text-white truncate mr-2">
                        {path === "/" ? "Home" : path}
                      </span>
                      <span className="text-gray-400 whitespace-nowrap">
                        {views as number} views
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">No page view data</p>
                )}
              </div>
            </div>

            {/* Views Over Time */}
            <div className="flex flex-col rounded-lg border-2 border-white/10 bg-white/5 p-6 shadow-sm">
              <h3 className="mb-6 text-2xl font-bold text-white">
                Views Over Time
              </h3>
              <div className="w-full space-y-3">
                {Object.entries(
                  timeRange === "30min" ||
                    timeRange === "1hour" ||
                    timeRange === "today" ||
                    timeRange === "day" ||
                    timeRange === "week"
                    ? filteredSummary?.viewsByDay || {}
                    : timeRange === "month"
                      ? filteredSummary?.viewsByMonth || {}
                      : filteredSummary?.viewsByQuarter || {}
                )
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([date, views]) => (
                    <div
                      key={date}
                      className="flex w-full justify-between border-b border-white/10 pb-2"
                    >
                      <span className="text-gray-400">
                        {isNaN(new Date(date).getTime())
                          ? date
                          : format(new Date(date), "MMM d, yyyy")}
                      </span>
                      <span className="font-semibold text-white">
                        {views as number} views
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* ************************************************************
              BREAKDOWN COMPONENTS
          ************************************************************ */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <DeviceBreakdown
              data={filteredSummary?.deviceBreakdown ?? {}}
            />
            <BrowserBreakdown
              data={filteredSummary?.browserBreakdown ?? {}}
            />
            <LocationBreakdown
              data={filteredSummary?.locationBreakdown ?? {}}
            />
            <TrafficSourceBreakdown
              data={filteredSummary?.sourceBreakdown ?? {}}
            />
            <VisitorList data={filteredSummary?.visitorList ?? []} />
          </div>

          {/* ************************************************************
              SESSION DETAILS
          ************************************************************ */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-white">
              Sessions ({Object.keys(sessions).length})
            </h2>
            <ul className="space-y-4">
              {Object.entries(sessions).map(([sessionId, session]) => (
                <li
                  key={sessionId}
                  className="rounded-lg border-2 border-white/10 bg-white/5 p-6 shadow-sm"
                >
                  <div className="mb-2 text-white">
                    <strong className="font-semibold">Session:</strong>{" "}
                    <span className="text-gray-400">{sessionId}</span>
                  </div>
                  <div className="mb-2 text-white">
                    <strong className="font-semibold">Started:</strong>{" "}
                    <span className="text-gray-400">
                      {session.start.toLocaleString()}
                    </span>
                  </div>
                  <div className="mb-2 text-white">
                    <strong className="font-semibold">Device:</strong>{" "}
                    <span className="text-gray-400">{session.deviceType}</span>,{" "}
                    <strong className="font-semibold">Browser:</strong>{" "}
                    <span className="text-gray-400">{session.browser}</span>
                  </div>
                  <div className="mb-2 text-white">
                    <strong className="font-semibold">Location:</strong>{" "}
                    <span className="text-gray-400">
                      {session.city}, {session.state}, {session.country}
                    </span>
                  </div>
                  <div className="text-white">
                    <strong className="font-semibold">Pages Visited:</strong>{" "}
                    <span className="text-gray-400">
                      {(session.pages || []).join(", ")}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
