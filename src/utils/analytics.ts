/* ************************************************************
                        NOTES
************************************************************ */
// Server-side analytics utility for database operations
// Handles tracking page views and generating analytics summaries
// Uses Supabase for data persistence
/* ************************************************************
                        IMPORTS
************************************************************ */
import { supabase } from "./supabase";

/* ************************************************************
                        INTERFACES
************************************************************ */
export interface AnalyticsRow {
  id: string;
  path: string;
  user_agent: string;
  referrer: string;
  session_id: string;
  device_type: string;
  browser: string;
  city: string;
  state: string;
  country: string;
  ip: string;
  source: string;
  visitor_id: string;
  is_returning: boolean;
  first_visit?: string | null;
  created_at: string;
}

export interface PageView {
  path: string;
  user_agent: string;
  referrer: string;
  session_id: string;
  device_type: string;
  browser: string;
  city: string;
  state: string;
  country: string;
  ip: string;
  source: string;
  visitor_id: string;
  is_returning: boolean;
  first_visit?: string;
}

export interface AnalyticsSummary {
  totalViews: number;
  uniqueVisitors: number;
  viewsByPage: Record<string, number>;
  viewsByDay: Record<string, number>;
  viewsByMonth: Record<string, number>;
  viewsByQuarter: Record<string, number>;
  deviceBreakdown: Record<string, number>;
  browserBreakdown: Record<string, number>;
  locationBreakdown: Record<string, number>;
  countryBreakdown: Record<string, number>;
  sourceBreakdown: Record<string, number>;
  visitorList: {
    visitorId: string;
    isReturning: boolean;
    count: number;
    firstVisit?: string;
    lastVisit?: string;
    deviceType?: string;
    browser?: string;
    country?: string;
  }[];
  pageViews?: AnalyticsRow[];
}

/* ************************************************************
                        FUNCTIONS
************************************************************ */
export async function trackPageView(pageView: PageView) {
  try {
    if (!pageView.path) {
      throw new Error("Path is required for page view tracking");
    }

    const { error } = await supabase.from("analytics").insert({
      ...pageView,
    });

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error tracking page view:", error);
    throw error;
  }
}

export async function getAnalyticsSummary(
  startDate: Date,
  endDate: Date
): Promise<AnalyticsSummary> {
  try {
    const { data: pageViews, error } = await supabase
      .from("analytics")
      .select("*")
      .gte("created_at", startDate.toISOString())
      .lte("created_at", endDate.toISOString())
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    if (!pageViews) {
      throw new Error("No data returned from Supabase");
    }

    const summary: AnalyticsSummary = {
      totalViews: pageViews.length,
      uniqueVisitors: new Set(pageViews.map((view) => view.session_id)).size,
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
      pageViews,
    };

    const visitorMap: Record<string, { isReturning: boolean; count: number }> =
      {};

    pageViews.forEach((view) => {
      // Count views by page
      summary.viewsByPage[view.path] =
        (summary.viewsByPage[view.path] || 0) + 1;

      // Count views by day
      if (view.created_at) {
        const day = new Date(view.created_at).toISOString().split("T")[0];
        summary.viewsByDay[day] = (summary.viewsByDay[day] || 0) + 1;

        const month = new Date(view.created_at).toISOString().slice(0, 7);
        summary.viewsByMonth[month] = (summary.viewsByMonth[month] || 0) + 1;

        const quarter = getQuarter(new Date(view.created_at));
        summary.viewsByQuarter[quarter] =
          (summary.viewsByQuarter[quarter] || 0) + 1;
      }

      // Device breakdown
      if (view.device_type) {
        summary.deviceBreakdown[view.device_type] =
          (summary.deviceBreakdown[view.device_type] || 0) + 1;
      }
      // Browser breakdown
      if (view.browser) {
        summary.browserBreakdown[view.browser] =
          (summary.browserBreakdown[view.browser] || 0) + 1;
      }
      // Location breakdown
      if (
        view.city &&
        view.state &&
        view.city !== "Unknown" &&
        view.state !== "Unknown"
      ) {
        const loc = `${view.city}, ${view.state}`;
        summary.locationBreakdown[loc] =
          (summary.locationBreakdown[loc] || 0) + 1;
      }
      // Country breakdown
      if (view.country && view.country !== "Unknown") {
        summary.countryBreakdown[view.country] =
          (summary.countryBreakdown[view.country] || 0) + 1;
      }
      // Source breakdown
      if (view.source) {
        summary.sourceBreakdown[view.source] =
          (summary.sourceBreakdown[view.source] || 0) + 1;
      }
      // Visitor list
      if (view.visitor_id) {
        visitorMap[view.visitor_id] = {
          isReturning: !!view.is_returning,
          count: (visitorMap[view.visitor_id]?.count ?? 0) + 1,
        };
      }
    });

    summary.visitorList = Object.entries(visitorMap).map(([visitorId, v]) => ({
      visitorId,
      ...v,
    }));

    return summary;
  } catch (error) {
    console.error("Error getting analytics summary:", error);
    throw error;
  }
}

function getQuarter(date: Date): string {
  const year = date.getFullYear();
  const quarter = Math.floor(date.getMonth() / 3) + 1;
  return `${year}-Q${quarter}`;
}

export async function resetAnalyticsCollection() {
  try {
    const { error } = await supabase.from("analytics").delete().neq("id", 0);

    if (error) {
      console.error("Error resetting analytics collection:", error);
      throw error;
    }

    console.log("Analytics collection has been reset");
  } catch (error) {
    console.error("Error resetting analytics collection:", error);
    throw error;
  }
}
