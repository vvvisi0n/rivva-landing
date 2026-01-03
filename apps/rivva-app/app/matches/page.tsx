"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { loadProfile } from "@/lib/profile";
import { rankCandidates } from "@/lib/matching/engine";
import { MOCK_CANDIDATES } from "@/lib/candidates";

const getScore = (c: any): number => {
  const v =
    c?.totalScore ??
    (typeof c?.score === "number" ? c.score : (c?.score?.total ?? c?.score?.overall ?? c?.score ?? 0));
  return typeof v === "number" ? v : 0;
};

const getName = (c: any): string => String(c?.name ?? "Match");
const getCity = (c: any): string => String(c?.city ?? "");
const getAge = (c: any): string => (typeof c?.age === "number" ? String(c.age) : "");
const getReasons = (c: any): string[] => (Array.isArray(c?.reasons) ? c.reasons : []);
const getId = (c: any): string => String(c?.id ?? "");

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/70">
      {children}
    </span>
  );
}

export default function MatchesPage() {
  const [ranked, setRanked] = useState<any[]>([]);

  const viewer = useMemo(() => (loadProfile() ?? ({} as any)) as any, []);

  useEffect(() => {
    try {
      const r = rankCandidates(viewer, MOCK_CANDIDATES) as any[];
      setRanked(Array.isArray(r) ? r : []);
    } catch {
      setRanked([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 text-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">Matches</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Your current wave</h1>
          <p className="mt-2 text-sm text-white/65">
            Fewer matches. Higher signal. We’ll keep improving the ranking as profile signals get stronger.
          </p>
        </div>

        <div className="flex gap-2">
          <Link href="/discover" className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15 transition">
            Discover
          </Link>
          <Link href="/profile" className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 transition">
            Improve profile
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {ranked.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/70">No matches yet.</p>
            <p className="mt-2 text-xs text-white/55">
              Complete your quiz and add tags in your profile to unlock better ranking.
            </p>
            <div className="mt-4 flex gap-2">
              <Link href="/quiz" className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 transition">
                Take quiz
              </Link>
              <Link href="/profile" className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15 transition">
                Edit profile
              </Link>
            </div>
          </div>
        ) : (
          ranked.map((c) => {
            const id = getId(c);
            const name = getName(c);
            const age = getAge(c);
            const city = getCity(c);
            const score = getScore(c);
            const reasons = getReasons(c).slice(0, 4);

            return (
              <div key={id} className="rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-lg font-semibold truncate">
                      {name}
                      {(age || city) && (
                        <span className="text-white/55 font-normal">
                          {" "}
                          · {age || "—"}
                          {city ? ` · ${city}` : ""}
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-xs text-white/55">ID: {id}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-white/60">Score</p>
                    <p className="text-lg font-semibold">{score}</p>
                  </div>
                </div>

                {reasons.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {reasons.map((r) => (
                      <Pill key={r}>{r}</Pill>
                    ))}
                  </div>
                )}

                <div className="mt-5">
                  <Link
                    href={`/matches/preview?id=${encodeURIComponent(id)}`}
                    className="inline-flex items-center justify-center rounded-2xl px-4 py-2 bg-white text-black text-sm font-semibold hover:bg-white/90 transition"
                  >
                    Preview →
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
