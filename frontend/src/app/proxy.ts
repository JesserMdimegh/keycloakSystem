import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  console.log("=== MIDDLEWARE CALLED ===");
  console.log("Path:", request.nextUrl.pathname);
  
  // Test: Block all admin access temporarily
  if (request.nextUrl.pathname.startsWith("/admin")) {
    console.log("BLOCKING ADMIN ACCESS - redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  console.log("ALLOWING ACCESS");
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
