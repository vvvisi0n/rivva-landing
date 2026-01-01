"use client";

import Link from "next/link";
import { useMemo } from "react";
import { loadProfile } from "@/lib/profile";
import { MOCK_CANDIDATES } from "@/lib/candidates";
import { rankCandidates } from "@/lib/matching/engine";

export const metadata = { title: "Matches. Rivva" };

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/65">
      {children}
    </span>
  );
}

export default function MatchesPage() {
  const ranked = useMemo(() => {
    const p = loadProfile();
    const signal = {
      quizTier: (p as any)?.quizTier,
      aboutMeTags: (p as any)?.aboutMeTags ?? [],
      lookingForTags: (p as any)?.lookingForTags ?? [],
    };
    return rankCandidates(signal, MOCK_CANDIDATES);
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-6 pt-10 pb-20 text-white">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">Matches</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Your next conversations</h1>
          <p className="mt-3 text-sm text-white/70 max-w-2xl leading-relaxed">
            This is Matching v1. Deterministic scoring. Stable routes. Clean deploys.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/discover" className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition">
            Discover
          </Link>
          <Link href="/invite" className="rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-white/90 transition">
            Invite
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {ranked.map((c) => (
          <div key={c.id} className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-lg font-semibold truncate">{c.name} <span className="text-white/55 font-normal">· {c.age}</span></p>
                <p className="mt-1 text-sm text-white/60 truncate">{c.city}</p>
              </div>

              <div className="text-right">
                <p className="text-xs text-white/60">Score</p>
                <p className="text-lg font-semibold">{c.score.total}</p>
                <p className="text-xs text-white/50">{c.lastActiveLabel ?? "Active"}</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-white/75 leading-relaxed">
              {c.headline}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {(c.score.overlapTags.length ? c.score.overlapTags : c.tags.slice(0, 4)).map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/matches/preview?id=${encodeURIComponent(c.id)}`}
                className="inline-flex items-center justify-center rounded-2xl px-4 py-2 bg-white text-black text-sm font-semibold hover:bg-white/90 transition"
              >
                Preview
              </Link>
              <Link
                href={`/chat/${encodeURIComponent(c.id)}`}
                className="inline-flex items-center justify-center rounded-2xl px-4 py-2 border border-white/15 bg-white/5 text-white text-sm font-semibold hover:bg-white/10 transition"
              >
                Start chat
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
