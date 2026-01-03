import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Pass-through proxy: do not block routes.
// We can add rules later once routes are stable.
export default function proxy(_req: NextRequest) {
  return NextResponse.next();
}

// Optional: run on all routes
export const config = {
  matcher: "/:path*",
};
