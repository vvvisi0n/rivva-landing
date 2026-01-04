"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { loadProfile } from "@/lib/profile";
import { MOCK_CANDIDATES } from "@/lib/candidates";
import { rankCandidates } from "@/lib/matching/engine";

type Ranked = ReturnType<typeof rankCandidates>[number];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/70">
      {children}
    </span>
  );
}

function scoreOf(m: any): number {
  return (
    (m?.totalScore as number | undefined) ??
    (typeof m?.score === "number"
      ? (m.score as number)
      : ((m?.score?.total as number | undefined) ??
          (m?.score?.overall as number | undefined) ??
          0))
  );
}

function tagsOf(m: any): string[] {
  const fromOverlap =
    (m?.score?.overlapTags ?? m?.overlapTags ?? m?.commonTags ?? []) as string[];
  const fromCandidate = (m?.tags ?? m?.candidate?.tags ?? []) as string[];
  const tags = (fromOverlap.length ? fromOverlap : fromCandidate).filter(Boolean);
  return tags.slice(0, 6);
}

function reasonsOf(m: any): string[] {
  return (m?.reasons ?? m?.why ?? m?.explanations ?? []) as string[];
}

function headlineOf(m: any): string {
  return (m?.headline ?? m?.candidate?.headline ?? "") as string;
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
    return Boolean(
      p?.quizTier || (p?.aboutMeTags?.length ?? 0) || (p?.lookingForTags?.length ?? 0)
    );
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 text-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Matches</h1>
          <p className="mt-2 text-sm text-white/65">
            Small waves. Calm selection. This is v1 scaffolding.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/profile"
            className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15 transition"
          >
            Edit profile
          </Link>
          <Link
            href="/discover"
            className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 transition"
          >
            Discover
          </Link>
        </div>
      </div>

      {!hasSignal && (
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/70">
            Tip: add tags + quiz results for better ranking.
          </p>
          <div className="mt-3 flex gap-2">
            <Link
              href="/quiz"
              className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 transition"
            >
              Take quiz
            </Link>
            <Link
              href="/profile"
              className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15 transition"
            >
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
          const reasons = reasonsOf(m).slice(0, 3);
          const tags = tagsOf(m);
          const headline = headlineOf(m);

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
                    {age !== null && (
                      <span className="text-white/55 font-normal"> · {age}</span>
                    )}
                  </p>
                  {city && <p className="mt-1 text-sm text-white/60 truncate">{city}</p>}
                </div>

                <div className="text-right">
                  <p className="text-xs text-white/60">Score</p>
                  <p className="text-lg font-semibold">{score}</p>
                  <p className="text-xs text-white/50">{m?.lastActiveLabel ?? "Active"}</p>
                </div>
              </div>

              {headline && (
                <p className="mt-4 text-sm text-white/75 leading-relaxed">
                  {headline}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {tags.slice(0, 6).map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>

              {reasons.length > 0 && (
                <div className="mt-4 space-y-1">
                  {reasons.map((r, i) => (
                    <p key={i} className="text-xs text-white/60">
                      • {r}
                    </p>
                  ))}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
