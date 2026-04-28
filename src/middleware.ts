"use server";

import { NextResponse, NextRequest } from "next/server";
import { createClient } from "./utils/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Forward the pathname to server components via a request header so
  // <TrackingScripts>, the root layout (hold page), etc. can branch on it.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  // /admin auth gate
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next({ request: { headers: requestHeaders } });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  // Match everything except Next internals, static assets, and API routes.
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|favicon.ico|robots.txt|sitemap.xml|llms.txt|.*\\..*).*)",
  ],
};
