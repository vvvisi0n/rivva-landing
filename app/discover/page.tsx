import type { Metadata } from "next";
import { Suspense } from "react";
import DiscoverClient from "./DiscoverClient";

export const metadata: Metadata = { title: "Discover · Rivva" };

// keep these so Next doesn't try to prerender around search params
export const dynamic = "force-dynamic";
export const runtime = "edge";

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="p-6 text-white/70">Loading…</div>}>
      <DiscoverClient />
    </Suspense>
  );
}
