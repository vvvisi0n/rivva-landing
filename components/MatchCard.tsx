"use client";

import Link from "next/link";
import { useState } from "react";
import type { Match } from "@/lib/matches";

export default function MatchCard({ match }: { match: Match }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-5 shadow-xl hover:bg-white/10 transition">
      <div className="flex items-center gap-4">
        {/* avatar circle */}
        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-black font-bold text-lg">
          {match.name[0]}
        </div>

        <div className="flex-1">
          <p className="text-lg font-semibold">{match.name}</p>
          <p className="text-sm text-white/60">{match.city}</p>
          <p className="text-xs text-white/50 mt-1">
            vibe: <span className="text-white/80">{match.vibe}</span>
          </p>
        </div>

        <Link
          href={`/chat/${match.id}`}
          className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition"
        >
          Chat
        </Link>
      </div>

      {/* Lumi explain */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-4 text-xs text-purple-200 hover:text-purple-100 transition"
      >
        {open ? "Hide Lumi’s read ↑" : "Why Lumi thinks this match fits ↓"}
      </button>

      {open && (
        <div className="mt-3 rounded-2xl bg-black/30 border border-white/10 p-4 text-sm text-white/80 leading-relaxed">
          <p className="mb-2">
            <span className="text-white font-semibold">Lumi’s read:</span>{" "}
            {match.lumiWhy}
          </p>
          <p className="text-xs text-white/50">
            This is a soft signal based on vibe alignment + your quiz tier. You
            stay in control.
          </p>
        </div>
      )}
    </div>
  );
}
