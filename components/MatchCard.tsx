"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Match } from "@/lib/matches";
import { isLiked, toggleLike } from "@/lib/likes";

export default function MatchCard({ match }: { match: Match }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(isLiked(match.id));
  }, [match.id]);

  function onLike(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setLiked(toggleLike(match.id));
  }

  return (
    <Link
      href={`/matches/${match.id}`}
      className="group block rounded-3xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition shadow-xl"
    >
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500/40 to-cyan-400/40 border border-white/10" />
        <div className="flex-1 text-left">
          <p className="text-lg font-semibold">
            {match.name}, {match.age}
          </p>
          <p className="text-sm text-white/60">{match.city}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {match.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-1 rounded-full bg-black/40 border border-white/10 text-white/80"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={onLike}
          className={`shrink-0 px-3 py-2 rounded-full text-xs font-semibold border transition
            ${
              liked
                ? "bg-white text-black border-white"
                : "bg-white/5 text-white border-white/10 hover:bg-white/10"
            }`}
          aria-label="Like match"
        >
          {liked ? "Liked ✓" : "Like"}
        </button>
      </div>

      <p className="text-sm text-white/70 mt-3 line-clamp-2">
        {match.bio}
      </p>

      <p className="text-xs text-purple-200 mt-3 opacity-0 group-hover:opacity-100 transition">
        View profile →
      </p>
    </Link>
  );
}
