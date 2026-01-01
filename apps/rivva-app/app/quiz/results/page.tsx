"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { loadProfile } from "@/lib/profile";

const COPY: Record<string, { title: string; subtitle: string; body: string }> = {
  spark: {
    title: "Spark",
    subtitle: "You move with clarity and momentum.",
    body: "You value directness. You do not want ambiguous attention. You do best with people who communicate cleanly and follow through.",
  },
  anchor: {
    title: "Anchor",
    subtitle: "You build trust slowly and intentionally.",
    body: "You value steadiness and consistency. You do not rush. You do best with people who respect pace and show reliability over time.",
  },
  empath: {
    title: "Empath",
    subtitle: "You care about emotional safety and tone.",
    body: "You read energy quickly. You do best with people who are kind, accountable, and regulated. You want calm communication, not performance.",
  },
  magnetic: {
    title: "Magnetic",
    subtitle: "You connect through curiosity and presence.",
    body: "You value depth. You do not like small talk for long. You do best with people who are intentional and emotionally available.",
  },
};

export default function QuizResultsPage() {
  const [tier, setTier] = useState<string | null>(null);

  useEffect(() => {
    const p = loadProfile();
    setTier(((p as any)?.quizTier) ?? null);
  }, []);

  const profile = useMemo(() => (tier ? COPY[tier] : null), [tier]);

  return (
    <main className="mx-auto max-w-2xl px-6 pt-16 pb-20">
      {!profile ? (
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
          <h1 className="text-2xl font-semibold">No results yet.</h1>
          <p className="mt-2 text-sm text-white/65">
            Take the quiz to generate your compatibility read.
          </p>
          <div className="mt-6">
            <Link className="rounded-full bg-white text-black px-5 py-3 text-sm font-semibold inline-flex" href="/quiz">
              Start the quiz
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 text-center">
          <p className="text-sm text-white/60">Your Lumi compatibility read</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{profile.title}</h1>
          <p className="mt-2 text-white/80">{profile.subtitle}</p>

          <div className="mt-6 rounded-2xl bg-black/30 border border-white/10 p-5 text-left">
            <p className="text-sm text-white/75 leading-relaxed">{profile.body}</p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link className="rounded-full bg-white text-black px-5 py-3 text-sm font-semibold inline-flex" href="/matches/preview">
              See your first match
            </Link>
            <Link className="rounded-full bg-white/10 border border-white/10 px-5 py-3 text-sm font-semibold inline-flex hover:bg-white/15 transition" href="/onboarding">
              Edit setup
            </Link>
          </div>

          <p className="mt-6 text-xs text-white/55">
            Rivva sends fewer matches. The goal is quality.
          </p>
        </div>
      )}
    </main>
  );
}
