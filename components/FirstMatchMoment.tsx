"use client";

import { useEffect, useState } from "react";

export function FirstMatchMoment() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("rivva_seen_first_match_moment")) {
      setOpen(true);
    }
  }, []);

  function dismiss() {
    localStorage.setItem("rivva_seen_first_match_moment", "1");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-zinc-900 p-8 text-white shadow-xl border border-white/10">
        <h2 className="text-2xl font-semibold leading-tight">
          Rivva matched you because your values point in the same direction.
        </h2>

        <p className="mt-4 text-sm text-white/70 leading-relaxed">
          We look at intent, emotional pace, and what you’re building toward — not just who’s nearby.
        </p>

        <p className="mt-6 text-xs text-white/40">
          This is your first match preview.
        </p>

        <button
          onClick={dismiss}
          className="mt-8 w-full rounded-2xl bg-white py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
        >
          Show me
        </button>

        <button
          onClick={dismiss}
          className="mt-3 w-full rounded-2xl bg-white/0 py-2 text-xs font-semibold text-white/60 hover:text-white transition"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
