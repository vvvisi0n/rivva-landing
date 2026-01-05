"use client";

import { Suspense } from "react";
import DiscoverClient from "./DiscoverClient";


export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="p-6 text-white/70">Loading discover…</div>}>
      <DiscoverClient />
    </Suspense>
  );
}
