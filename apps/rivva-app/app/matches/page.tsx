"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadProfile } from "@/lib/profile";
import { rankCandidates } from "@/lib/matching/engine";
import { MOCK_CANDIDATES } from "@/lib/candidates";
import type { ScoredMatch } from "@/lib/matching/types";

export default function MatchesPage() {
  const [ranked, setRanked] = useState<ScoredMatch[]>([]);

  useEffect(() => {
    const p = loadProfile();
    const viewer = (p ?? {}) as any;
    const results = rankCandidates(viewer, MOCK_CANDIDATES, { minScore: 66, limit: 8 });
    setRanked(results);
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-6 pt-12 pb-20 text-white">
      <div className="rounded-3xl border border-white/10 bg-black/30 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-widest text-white/50">Matches</p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Your best options first.</h1>
        <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl">
          This list is deliberately short. Rivva filters aggressively so you do not waste time.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/discover" className="rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-white/90 transition">
            Discover
          </Link>
          <Link href="/quiz" className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition">
            Improve signal
          </Link>
          <Link href="/profile" className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition">
            Edit profile
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ranked.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:col-span-2 lg:col-span-3">
            <p className="text-sm font-semibold">No curated matches yet.</p>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              Take the quiz and add tags so Rivva can curate properly.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/quiz" className="rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-white/90 transition">
                Take the quiz
              </Link>
              <Link href="/onboarding" className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition">
                Quick setup
              </Link>
            </div>
          </div>
        ) : (
          ranked.map((m) => (
            <div key={m.candidate.id} className="rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
              <p className="text-base font-semibold">{m.candidate.name ?? "Match"}</p>
              <p className="mt-1 text-xs text-white/60">
                {(m.candidate.city ?? "Unknown city")}{m.candidate.age ? `. ${m.candidate.age}` : ""}. Score. {m.score}
              </p>

              {m.explanations?.length ? (
                <div className="mt-4 space-y-2">
                  {m.explanations.map((e, idx) => (
                    <div key={`${m.candidate.id}-${idx}`} className="rounded-2xl bg-black/30 border border-white/10 p-3">
                      <p className="text-xs font-semibold text-white/85">{e.label}</p>
                      <p className="mt-1 text-xs text-white/60 leading-relaxed">{e.detail}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-5 flex gap-3">
                <Link href="/chat/preview" className="flex-1 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-white/90 transition text-center">
                  Start chat
                </Link>
                <Link href="/discover" className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition">
                  More
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
