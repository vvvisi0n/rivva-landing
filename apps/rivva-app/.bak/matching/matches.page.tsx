"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { loadProfile } from "@/lib/profile";
import * as Candidates from "@/lib/candidates";
import * as Engine from "@/lib/matching/engine";

type Decision = "interested" | "pass";
type DecisionMap = Record<string, { decision: Decision; at: number }>;

function readDecisions(): DecisionMap {
  try {
    const raw = localStorage.getItem("rivva.decisions");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeDecisions(next: DecisionMap) {
  try {
    localStorage.setItem("rivva.decisions", JSON.stringify(next));
  } catch {}
}

export default function MatchesPage() {
  const [decisions, setDecisions] = useState<DecisionMap>({});

  useEffect(() => {
    setDecisions(readDecisions());
  }, []);

  const profile = useMemo(() => loadProfile(), []);

  const list = useMemo(() => {
    const raw =
      (Candidates as any).CANDIDATES ??
      (Candidates as any).candidates ??
      (Candidates as any).MOCK_CANDIDATES ??
      [];

    const rankFn = (Engine as any).rankCandidates;
    const scoreFn = (Engine as any).scoreCandidate;

    let ranked = raw;

    if (typeof rankFn === "function") {
      try {
        ranked = rankFn(raw, profile);
      } catch {
        ranked = raw;
      }
    }

    const withScore = ranked.map((c: any) => {
      let score: number | null = null;
      if (typeof scoreFn === "function") {
        try {
          score = scoreFn(c, profile);
        } catch {
          score = null;
        }
      }
      return { c, score };
    });

    return withScore;
  }, [profile]);

  const visible = useMemo(() => {
    return list.filter(({ c }: any) => {
      const id = String(c?.id ?? c?.handle ?? c?.email ?? c?.name ?? "");
      return id && !decisions[id];
    });
  }, [list, decisions]);

  function setDecision(id: string, decision: Decision) {
    const next = { ...decisions, [id]: { decision, at: Date.now() } };
    setDecisions(next);
    writeDecisions(next);
  }

  return (
    <main className="mx-auto max-w-5xl px-6 pt-12 pb-20 text-white">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Matches</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">First wave</h1>
            <p className="mt-3 text-sm text-white/70 max-w-2xl leading-relaxed">
              These are ranked quietly when we have enough signal. You can pass or mark interest. Nothing is sent. This is only for your local flow.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-2xl px-4 py-2 bg-white text-black text-sm font-semibold hover:bg-white/90 transition"
            >
              Refine signal
            </Link>
            <button
              onClick={() => {
                const next: DecisionMap = {};
                setDecisions(next);
                writeDecisions(next);
              }}
              className="inline-flex items-center justify-center rounded-2xl px-4 py-2 border border-white/15 bg-white/5 text-white text-sm font-semibold hover:bg-white/10 transition"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          {visible.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <p className="text-sm text-white/80 font-semibold">No candidates left in this wave.</p>
              <p className="mt-2 text-sm text-white/60">
                Reset if you want to review the list again.
              </p>
            </div>
          ) : (
            visible.map(({ c, score }: any) => {
              const id = String(c?.id ?? c?.handle ?? c?.email ?? c?.name ?? "");
              const name = String(c?.name ?? c?.displayName ?? "Candidate");
              const subtitle = String(c?.headline ?? c?.bioShort ?? c?.city ?? "");
              const scoreLabel =
                typeof score === "number" ? `${Math.round(score * 100)}%` : null;

              return (
                <div
                  key={id}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <p className="text-base font-semibold truncate">{name}</p>
                      {scoreLabel ? (
                        <span className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/70">
                          {scoreLabel}
                        </span>
                      ) : null}
                    </div>
                    {subtitle ? (
                      <p className="mt-1 text-sm text-white/60 truncate">{subtitle}</p>
                    ) : (
                      <p className="mt-1 text-sm text-white/50 truncate">Profile preview available.</p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/matches/preview?id=${encodeURIComponent(id)}`}
                      className="inline-flex items-center justify-center rounded-2xl px-4 py-2 bg-white text-black text-sm font-semibold hover:bg-white/90 transition"
                    >
                      Preview
                    </Link>
                    <button
                      onClick={() => setDecision(id, "interested")}
                      className="inline-flex items-center justify-center rounded-2xl px-4 py-2 border border-white/15 bg-white/5 text-white text-sm font-semibold hover:bg-white/10 transition"
                    >
                      Interested
                    </button>
                    <button
                      onClick={() => setDecision(id, "pass")}
                      className="inline-flex items-center justify-center rounded-2xl px-4 py-2 border border-white/15 bg-white/5 text-white text-sm font-semibold hover:bg-white/10 transition"
                    >
                      Pass
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/inbox" className="text-sm text-white/70 hover:text-white transition">
            Inbox
          </Link>
          <Link href="/discover" className="text-sm text-white/70 hover:text-white transition">
            Discover
          </Link>
          <Link href="/settings" className="text-sm text-white/70 hover:text-white transition">
            Settings
          </Link>
        </div>
      </div>
    </main>
  );
}
