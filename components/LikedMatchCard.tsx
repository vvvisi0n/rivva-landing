"use client";

import type { Match } from "@/lib/matches";

export default function LikedMatchCard({
  match,
  onRemove,
}: {
  match: Match;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-5 shadow-xl flex flex-col">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-xl font-bold">
            {match.name}, {match.age}
          </h3>
          <p className="text-xs text-white/60">{match.city}</p>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-white/50">compat</p>
          <p className="text-lg font-extrabold">{match.compatibility}%</p>
        </div>
      </div>

      <p className="text-white/80 text-sm mt-3 leading-relaxed line-clamp-4">
        {match.bio}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {match.tags.map((t) => (
          <span
            key={t}
            className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/75"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-4">
        <button
          onClick={onRemove}
          className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-sm hover:bg-white/15 transition"
        >
          Remove Like
        </button>
      </div>
    </div>
  );
}
