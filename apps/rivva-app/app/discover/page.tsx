"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { loadProfile } from "@/lib/profile";
import { rankCandidates } from "@/lib/matching/engine";
import { MOCK_CANDIDATES } from "@/lib/candidates";
import type { ScoredMatch } from "@/lib/matching/types";

function ScorePill({ score }: { score: number }) {
  const label =
    score >= 86 ? "Excellent fit" :
    score >= 76 ? "Strong fit" :
    score >= 62 ? "Good fit" :
    "Exploring";
  return (
    <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/70">
      {label}. {score}
    </span>
  );
}

export default function DiscoverPage() {
  const [ready, setReady] = useState(false);
  const [ranked, setRanked] = useState<ScoredMatch[]>([]);

  useEffect(() => {
    const p = loadProfile();
    const viewer = (p ?? {}) as any;

    const results = rankCandidates(viewer, MOCK_CANDIDATES, {
      minScore: 62,
      limit: 10,
    });

    setRanked(results);
    setReady(true);
  }, []);

  const hasProfileSignal = useMemo(() => {
    const p = loadProfile();
    return Boolean(p?.quizTier || (p?.aboutMeTags && p.aboutMeTags.length) || (p?.lookingForTags && p.lookingForTags.length));
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-6 pt-16 pb-20 text-white">
      <div className="rounded-3xl border border-white/10 bg-black/30 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-widest text-white/50">Discover</p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Curated matches. Not endless swipes.</h1>
        <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl">
          Rivva shows fewer people, with stronger alignment. You will see your best options first.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/quiz" className="rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-white/90 transition">
            Take the quiz
          </Link>
          <Link href="/profile" className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition">
            Edit profile
          </Link>
          <Link href="/matches" className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition">
            View matches
          </Link>
        </div>
      </div>

      <div className="mt-8">
        {!ready ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/70">Loading your curated list.</p>
          </div>
        ) : !hasProfileSignal ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-semibold">Your matches improve when Rivva knows your signal.</p>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              Take the quiz and add a few tags. Then we can curate properly.
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
        ) : ranked.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-semibold">No strong matches yet.</p>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              This means Rivva is being strict. Add a few more tags and we will widen the pool carefully.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/profile" className="rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-white/90 transition">
                Edit profile
              </Link>
              <Link href="/quiz" className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition">
                Retake quiz
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ranked.map((m) => (
              <div key={m.candidate.id} className="rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-base font-semibold truncate">{m.candidate.name ?? "Match"}</p>
                    <p className="mt-1 text-xs text-white/60">
                      {(m.candidate.city ?? "Unknown city")}{m.candidate.age ? `. ${m.candidate.age}` : ""}
                    </p>
                  </div>
                  <ScorePill score={m.score} />
                </div>

                {m.explanations?.length ? (
                  <div className="mt-4 space-y-2">
                    {m.explanations.map((e, idx) => (
                      <div key={`${m.candidate.id}-${idx}`} className="rounded-2xl bg-black/30 border border-white/10 p-3">
                        <p className="text-xs font-semibold text-white/85">{e.label}</p>
                        <p className="mt-1 text-xs text-white/60 leading-relaxed">{e.detail}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-xs text-white/60">
                    Add tags and quiz results to strengthen curation.
                  </p>
                )}

                <div className="mt-5 flex gap-3">
                  <Link href="/chat/preview" className="flex-1 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-white/90 transition text-center">
                    Start chat
                  </Link>
                  <Link href="/matches" className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition">
                    Save
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
