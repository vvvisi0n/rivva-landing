"use client";

import { useEffect, useState } from "react";

export default function FirstMatchMoment() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const key = "rivva.first_match_moment.seen";
      if (localStorage.getItem(key) === "1") return;
      setOpen(true);
      localStorage.setItem(key, "1");
    } catch {}
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-zinc-950 p-6 text-white shadow-2xl">
        <div className="text-xs text-white/60">Why this match</div>
        <h2 className="mt-2 text-xl font-semibold">
          Rivva matched you because your values point in the same direction.
        </h2>
        <p className="mt-3 text-sm text-white/70 leading-relaxed">
          This is a calm, intentional match — less noise, more alignment.
        </p>

        <div className="mt-5 flex gap-2">
          <button
            onClick={() => setOpen(false)}
            className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 transition"
          >
            Continue
          </button>
          <button
            onClick={() => setOpen(false)}
            className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 transition"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
