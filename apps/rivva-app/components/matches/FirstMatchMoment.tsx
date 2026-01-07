"use client";

import { useEffect, useState } from "react";

export default function FirstMatchMoment() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // show once per browser
    const key = "rivva.firstMatchMoment.v1";
    if (typeof window === "undefined") return;
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, "1");
    setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-zinc-950 p-6 text-white shadow-2xl">
        <div className="text-sm text-white/60">Your first match</div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          Shared values. Same direction.
        </h2>
        <p className="mt-3 text-sm text-white/70 leading-relaxed">
          Rivva matched you because your values point in the same direction — not because you both like the same songs.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">Intent: serious</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">Pace: steady</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">Communication: listens</span>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            onClick={() => setOpen(false)}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
          >
            Close
          </button>
          <button
            onClick={() => setOpen(false)}
            className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
          >
            See matches
          </button>
        </div>
      </div>
    </div>
  );
}
