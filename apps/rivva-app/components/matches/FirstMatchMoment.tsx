"use client";

import { useEffect, useState } from "react";

const KEY = "rivva_seen_first_match_moment";

export default function FirstMatchMoment() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem(KEY);
    if (!seen) setOpen(true);
  }, []);

  function close() {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={close} />
      <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-zinc-950 p-6 text-white shadow-2xl">
        <div className="text-xs text-white/60">Rivva</div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          Shared values. Calm pace. Serious intent.
        </h2>
        <p className="mt-3 text-sm text-white/70 leading-relaxed">
          Rivva matched you because your values point in the same direction — and your intent and pace align.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">Values alignment</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">Intent match</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">Pace compatible</span>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={close}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            Got it
          </button>
          <button
            onClick={close}
            className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 transition"
          >
            View my match
          </button>
        </div>
      </div>
    </div>
  );
}
