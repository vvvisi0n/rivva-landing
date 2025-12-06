"use client";

import Link from "next/link";
import type { Match } from "@/lib/matches";

export default function LikedMatchCard({ match }: { match: Match }) {
  const tags = match.vibeTags ?? [];
  const location = match.location ?? "";
  const compatibility = match.compatibility;

  return (
    <Link
      href={`/matches/${match.id}`}
      className="block rounded-3xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 transition shadow-xl"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">
            {match.name}
            {match.age != null ? `, ${match.age}` : ""}
          </h3>

          {location && (
            <p className="text-xs text-white/60 mt-1">{location}</p>
          )}
        </div>

        {typeof compatibility === "number" && (
          <div className="text-right">
            <p className="text-[11px] text-white/50">compatibility</p>
            <p className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
              {compatibility}%
            </p>
          </div>
        )}
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((t) => (
            <span
              key={t}
              className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {match.bio && (
        <p className="text-sm text-white/80 mt-3 line-clamp-2">
          {match.bio}
        </p>
      )}
    </Link>
  );
}