"use client";

import { Suspense } from "react";
import DiscoverClient from "./DiscoverClient";

export const dynamic = "force-dynamic";

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="p-6 text-white/70">Loading…</div>}>
      <DiscoverClient />
    </Suspense>
  );
}
