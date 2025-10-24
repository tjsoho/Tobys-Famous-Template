"use server";

import { NextResponse, NextRequest } from "next/server";
import { createClient } from "./utils/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const supabase = await createClient();
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
