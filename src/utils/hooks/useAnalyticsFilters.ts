/* ************************************************************
                        NOTES
************************************************************ */
// Custom hook for filtering analytics data
// Supports filtering by country, device, browser, visitor type, and source
/* ************************************************************
                        IMPORTS
************************************************************ */
"use client";

import { useState, useMemo } from "react";
import { AnalyticsSummary, AnalyticsRow } from "../analytics";

/* ************************************************************
                        INTERFACES
************************************************************ */
export interface FilterOptions {
  country: string;
  device: string;
  browser: string;
  visitorType: "all" | "new" | "returning";
  source: string;
}

export interface UseAnalyticsFiltersReturn {
  filters: FilterOptions;
  setCountry: (country: string) => void;
  setDevice: (device: string) => void;
  setBrowser: (browser: string) => void;
  setVisitorType: (type: "all" | "new" | "returning") => void;
  setSource: (source: string) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
  availableCountries: string[];
  availableDevices: string[];
  availableBrowsers: string[];
  availableSources: string[];
  filteredSummary: AnalyticsSummary | null;
}

/* ************************************************************
                        HOOKS
************************************************************ */
export function useAnalyticsFilters(
  summary: AnalyticsSummary | null
): UseAnalyticsFiltersReturn {
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedDevice, setSelectedDevice] = useState<string>("all");
  const [selectedBrowser, setSelectedBrowser] = useState<string>("all");
  const [selectedVisitorType, setSelectedVisitorType] = useState<
    "all" | "new" | "returning"
  >("all");
  const [selectedSource, setSelectedSource] = useState<string>("all");

  const resetFilters = () => {
    setSelectedCountry("all");
    setSelectedDevice("all");
    setSelectedBrowser("all");
    setSelectedVisitorType("all");
    setSelectedSource("all");
  };

  const hasActiveFilters = useMemo(() => {
    return (
      selectedCountry !== "all" ||
      selectedDevice !== "all" ||
      selectedBrowser !== "all" ||
      selectedVisitorType !== "all" ||
      selectedSource !== "all"
    );
  }, [selectedCountry, selectedDevice, selectedBrowser, selectedVisitorType, selectedSource]);

  const availableCountries = useMemo(() => {
    return summary ? Object.keys(summary.countryBreakdown || {}).sort() : [];
  }, [summary]);

  const availableDevices = useMemo(() => {
    return summary ? Object.keys(summary.deviceBreakdown || {}).sort() : [];
  }, [summary]);

  const availableBrowsers = useMemo(() => {
    return summary ? Object.keys(summary.browserBreakdown || {}).sort() : [];
  }, [summary]);

  const availableSources = useMemo(() => {
    return summary ? Object.keys(summary.sourceBreakdown || {}).sort() : [];
  }, [summary]);

  const filteredSummary = useMemo(() => {
    if (!summary) return null;

    const filteredViews = (summary.pageViews || []).filter(
      (view: AnalyticsRow) => {
        if (selectedCountry !== "all" && view.country !== selectedCountry) return false;
        if (selectedDevice !== "all" && view.device_type !== selectedDevice) return false;
        if (selectedBrowser !== "all" && view.browser !== selectedBrowser) return false;
        if (selectedVisitorType === "new" && view.is_returning) return false;
        if (selectedVisitorType === "returning" && !view.is_returning) return false;
        if (selectedSource !== "all" && view.source !== selectedSource) return false;
        return true;
      }
    );

    const recalculatedSummary: AnalyticsSummary = {
      totalViews: filteredViews.length,
      uniqueVisitors: new Set(
        filteredViews.map((v: AnalyticsRow) => v.visitor_id).filter(Boolean)
      ).size,
      viewsByPage: {},
      viewsByDay: {},
      viewsByMonth: {},
      viewsByQuarter: {},
      deviceBreakdown: {},
      browserBreakdown: {},
      locationBreakdown: {},
      countryBreakdown: {},
      sourceBreakdown: {},
      visitorList: [],
      pageViews: filteredViews,
    };

    const visitorMap: Record<
      string,
      {
        isReturning: boolean;
        count: number;
        firstVisit: string;
        lastVisit: string;
        deviceType: string;
        browser: string;
        country: string;
      }
    > = {};

    filteredViews.forEach((view: AnalyticsRow) => {
      recalculatedSummary.viewsByPage[view.path] =
        (recalculatedSummary.viewsByPage[view.path] || 0) + 1;

      const day = new Date(view.created_at).toISOString().split("T")[0];
      recalculatedSummary.viewsByDay[day] =
        (recalculatedSummary.viewsByDay[day] || 0) + 1;

      const month = new Date(view.created_at).toISOString().slice(0, 7);
      recalculatedSummary.viewsByMonth[month] =
        (recalculatedSummary.viewsByMonth[month] || 0) + 1;

      const date = new Date(view.created_at);
      const year = date.getFullYear();
      const quarter = Math.floor(date.getMonth() / 3) + 1;
      const quarterKey = `${year}-Q${quarter}`;
      recalculatedSummary.viewsByQuarter[quarterKey] =
        (recalculatedSummary.viewsByQuarter[quarterKey] || 0) + 1;

      if (view.device_type) {
        recalculatedSummary.deviceBreakdown[view.device_type] =
          (recalculatedSummary.deviceBreakdown[view.device_type] || 0) + 1;
      }
      if (view.browser) {
        recalculatedSummary.browserBreakdown[view.browser] =
          (recalculatedSummary.browserBreakdown[view.browser] || 0) + 1;
      }
      if (view.city && view.state && view.city !== "Unknown" && view.state !== "Unknown") {
        const loc = `${view.city}, ${view.state}`;
        recalculatedSummary.locationBreakdown[loc] =
          (recalculatedSummary.locationBreakdown[loc] || 0) + 1;
      }
      if (view.country && view.country !== "Unknown") {
        recalculatedSummary.countryBreakdown[view.country] =
          (recalculatedSummary.countryBreakdown[view.country] || 0) + 1;
      }
      if (view.source) {
        recalculatedSummary.sourceBreakdown[view.source] =
          (recalculatedSummary.sourceBreakdown[view.source] || 0) + 1;
      }

      if (view.visitor_id) {
        if (!visitorMap[view.visitor_id]) {
          visitorMap[view.visitor_id] = {
            isReturning: !!view.is_returning,
            count: 1,
            firstVisit: view.first_visit || new Date(view.created_at).toISOString(),
            lastVisit: new Date(view.created_at).toISOString(),
            deviceType: view.device_type,
            browser: view.browser,
            country: view.country,
          };
        } else {
          visitorMap[view.visitor_id].count += 1;
          visitorMap[view.visitor_id].lastVisit = new Date(view.created_at).toISOString();
        }
      }
    });

    recalculatedSummary.visitorList = Object.entries(visitorMap).map(
      ([visitorId, v]) => ({ visitorId, ...v })
    );

    return recalculatedSummary;
  }, [summary, selectedCountry, selectedDevice, selectedBrowser, selectedVisitorType, selectedSource]);

  return {
    filters: {
      country: selectedCountry,
      device: selectedDevice,
      browser: selectedBrowser,
      visitorType: selectedVisitorType,
      source: selectedSource,
    },
    setCountry: setSelectedCountry,
    setDevice: setSelectedDevice,
    setBrowser: setSelectedBrowser,
    setVisitorType: setSelectedVisitorType,
    setSource: setSelectedSource,
    resetFilters,
    hasActiveFilters,
    availableCountries,
    availableDevices,
    availableBrowsers,
    availableSources,
    filteredSummary,
  };
}
