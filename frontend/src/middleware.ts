import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  console.log("=== PROXY CALLED ===");
  console.log("Path:", request.nextUrl.pathname);
  
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = await getToken({ req: request });
    console.log("Token:", token);
    
    const isAdmin = token && Array.isArray(token.roles) && token.roles.includes("admin");
    console.log("Is admin:", isAdmin);
    
    if (!isAdmin) {
      console.log("BLOCKING ADMIN ACCESS - redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  
  console.log("ALLOWING ACCESS");
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};


