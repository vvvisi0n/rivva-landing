import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public routes
  const isPublic =
    pathname === "/" ||
    pathname.startsWith("/invite") ||
    pathname.startsWith("/privacy") ||
    pathname.startsWith("/how-it-works") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/api");

  if (isPublic) return NextResponse.next();

  // Until launch: everything else requires invite flow
  const url = req.nextUrl.clone();
  url.pathname = "/invite";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
