"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { loadProfile } from "@/lib/profile";
import { QUIZ_COPY, type QuizTier } from "./copy";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
      {children}
    </span>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <p className="text-xs uppercase tracking-widest text-white/55">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((t) => (
          <li key={t} className="text-sm text-white/75 leading-relaxed">
            • {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function QuizResultsPage() {
  const [tier, setTier] = useState<QuizTier | null>(null);

  useEffect(() => {
    const p = loadProfile() as any;
    const t = (p?.quizTier ?? null) as QuizTier | null;
    setTier(t);
  }, []);

  const content = useMemo(() => (tier ? QUIZ_COPY[tier] : null), [tier]);

  return (
    <main className="mx-auto max-w-4xl px-6 pt-14 pb-20 text-white">
      <div className="flex flex-wrap items-center gap-2">
        <Chip>Quiz</Chip>
        <Chip>Results</Chip>
        <Chip>Step 3 of 3</Chip>
        {tier ? <Chip>Tier {tier}</Chip> : <Chip>Missing tier</Chip>}
      </div>

      <h1 className="mt-6 text-4xl sm:text-5xl font-semibold tracking-tight">
        {content ? content.headline : "Finish your quiz to unlock results."}
      </h1>

      <p className="mt-4 text-lg text-white/70 max-w-2xl leading-relaxed">
        {content
          ? content.subhead
          : "We didn’t find a saved quiz tier yet. Retake the quiz, then we’ll generate your results."}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/matches/preview"
          className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
        >
          Preview matches →
        </Link>
        <Link
          href="/profile"
          className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
        >
          Edit profile
        </Link>
        <Link
          href="/quiz"
          className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-transparent px-5 py-3 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/5 transition"
        >
          Retake quiz
        </Link>
      </div>

      {content ? (
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Section title="Strengths" items={content.strengths} />
          <Section title="Watchouts" items={content.watchouts} />
          <Section title="Next steps" items={content.nextSteps} />
        </div>
      ) : (
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/75">
            Quick fix: go to <span className="text-white font-semibold">/quiz</span>, finish it, then come back here.
          </p>
        </div>
      )}

      <div className="mt-10 rounded-3xl border border-white/10 bg-black/30 p-6">
        <p className="text-xs uppercase tracking-widest text-white/55">Why this exists</p>
        <p className="mt-3 text-sm text-white/70 leading-relaxed max-w-3xl">
          Rivva sends fewer matches. The goal is quality: shared intent, compatible pace, and fewer dead-end conversations.
        </p>
      </div>
    </main>
  );
}
