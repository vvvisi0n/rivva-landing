"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FirstMatchMoment() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // one-time per session (MVP)
    try {
      const k = "rivva.firstMatchMoment.v1";
      if (sessionStorage.getItem(k) === "1") setOpen(false);
      else sessionStorage.setItem(k, "1");
    } catch {}
  }, []);

  if (!open) return null;

  return (
    <div className="mx-auto max-w-5xl px-6 pt-6 text-white">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white/90">Your first Rivva moment</p>
            <p className="mt-1 text-sm text-white/70">
              Rivva matched you because your values point in the same direction.
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold hover:bg-white/15"
          >
            Close
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">Shared values</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">Serious intent</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">Calm pace</span>
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            href="/discover"
            className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 transition"
          >
            Explore
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15 transition"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
