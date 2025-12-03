"use client";

import Link from "next/link";
import type { Match } from "@/lib/matches";

type Props = {
  match: Match & {
    // allow legacy fields that some pages still use
    city?: string;
    tags?: string[];
    compatibility?: number;
  };
};

export default function MatchCard({ match }: Props) {
  const tags =
    match.vibeTags ??
    match.tags ??
    [];

  const city = match.location ?? match.city ?? "";
  const percent = match.compatibility;

  return (
    <Link
      href={`/matches/${match.id}`}
      className="rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 transition block"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">
            {match.name}
            {match.age ? `, ${match.age}` : ""}
          </h3>

          {city && (
            <p className="text-sm text-white/60">{city}</p>
          )}
        </div>

        {typeof percent === "number" && (
          <div className="text-right">
            <p className="text-[11px] text-white/50">compatibility</p>
            <p className="text-xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
              {percent}%
            </p>
          </div>
        )}
      </div>

      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-1 rounded-full bg-black/40 border border-white/10 text-white/80"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {match.bio && (
        <p className="text-sm text-white/75 mt-3 line-clamp-3">
          {match.bio}
        </p>
      )}
    </Link>
  );
}