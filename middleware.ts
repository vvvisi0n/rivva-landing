import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = [
  "/", 
  "/invite",
  "/how-it-works",
  "/privacy",
  "/quiz",
];

function isPublic(pathname: string) {
  if (PUBLIC_PATHS.includes(pathname)) return true;
  // allow public subpaths
  if (pathname.startsWith("/invite/")) return true;
  if (pathname.startsWith("/how-it-works/")) return true;
  if (pathname.startsWith("/privacy/")) return true;
  if (pathname.startsWith("/quiz/")) return true;
  return false;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow Next internals + assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap") ||
    pathname.match(/\.(png|jpg|jpeg|webp|svg|ico|css|js|map)$/)
  ) {
    return NextResponse.next();
  }

  // Public marketing pages stay open
  if (isPublic(pathname)) return NextResponse.next();

  // App pages require invite unlock cookie
  const unlocked = req.cookies.get("rivva_access")?.value === "1";
  if (unlocked) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/invite";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/:path*"],
};
