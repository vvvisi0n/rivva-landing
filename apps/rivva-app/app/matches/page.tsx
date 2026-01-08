"use client";

import FirstMatchMoment from "@/components/matches/FirstMatchMoment";


import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { loadProfile } from "@/lib/profile";
import { MOCK_CANDIDATES } from "@/lib/candidates";
import { rankCandidates } from "@/lib/matching/engine";

type Ranked = ReturnType<typeof rankCandidates>[number];

const scoreOf = (m: any): number => {
  const v =
    m?.totalScore ??
    (typeof m?.score === "number"
      ? m.score
      : (m?.score?.total ?? m?.score?.overall ?? m?.score?.value ?? 0));
  return typeof v === "number" ? v : 0;
};

const tagsOf = (m: any): string[] => {
  const overlap = (m?.score?.overlapTags ?? m?.overlapTags ?? m?.commonTags ?? []) as string[];
  const base = (m?.tags ?? m?.candidate?.tags ?? []) as string[];
  const tags = (overlap.length ? overlap : base).filter(Boolean);
  return tags.slice(0, 6);
};

const reasonsOf = (m: any): string[] => {
  const r = (m?.reasons ?? m?.why ?? m?.explanations ?? []) as string[];
  return r.filter(Boolean).slice(0, 3);
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/70">
      {children}
    </span>
  );
}

export default function MatchesPage() {
  const [ranked, setRanked] = useState<Ranked[]>([]);

  useEffect(() => {
    const viewer = (loadProfile() ?? {}) as any;
    const results = rankCandidates(viewer, MOCK_CANDIDATES as any);
    setRanked(results.slice(0, 12));
  }, []);

  const hasSignal = useMemo(() => {
    const p = loadProfile() as any;
    return Boolean(p?.quizTier || (p?.aboutMeTags?.length ?? 0) || (p?.lookingForTags?.length ?? 0));
  }, []);

  return (
    <>
      <FirstMatchMoment />
<FirstMatchMoment />
      <main className="mx-auto max-w-5xl px-6 py-10 text-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Matches</h1>
          <p className="mt-2 text-sm text-white/65">Small waves. Calm selection. v1 scaffolding.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/profile" className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15 transition">
            Edit profile
          </Link>
          <Link href="/discover" className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 transition">
            Discover
          </Link>
        </div>
      </div>

      {!hasSignal && (
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/70">Tip: add tags + quiz results for better ranking.</p>
          <div className="mt-3 flex gap-2">
            <Link href="/quiz" className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 transition">
              Take quiz
            </Link>
            <Link href="/profile" className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15 transition">
              Add tags
            </Link>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {ranked.map((m: any) => {
          const id = String(m?.id ?? m?.candidate?.id ?? crypto.randomUUID());
          const name = (m?.name ?? m?.candidate?.name ?? "Match") as string;
          const age = (m?.age ?? m?.candidate?.age ?? null) as number | null;
          const city = (m?.city ?? m?.candidate?.city ?? "") as string;
          const score = scoreOf(m);
          const tags = tagsOf(m);
          const reasons = reasonsOf(m);

          return (
            <Link
              key={id}
              href={`/matches/preview?id=${encodeURIComponent(id)}`}
              className="rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition block"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-lg font-semibold truncate">
                    {name}
                    {age ? <span className="text-white/55 font-normal"> · {age}</span> : null}
                  </p>
                  <p className="mt-1 text-sm text-white/60 truncate">{city || "—"}</p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-white/60">Score</p>
                  <p className="text-lg font-semibold">{score}</p>
                </div>
              </div>

              {reasons.length > 0 && (
                <ul className="mt-4 space-y-1 text-sm text-white/70">
                  {reasons.map((r) => (
                    <li key={r}>• {r}</li>
                  ))}
                </ul>
              )}

              {tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </main>
    </>
  );
}
