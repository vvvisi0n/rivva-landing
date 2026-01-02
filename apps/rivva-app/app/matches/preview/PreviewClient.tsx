"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

export default function PreviewClient() {
  const sp = useSearchParams();

  const matchId = sp.get("id") ?? "";
  const name = sp.get("name") ?? "Match";
  const score = sp.get("score") ?? "";

  const subtitle = useMemo(() => {
    if (!matchId && !score) return "Preview details will appear here.";
    if (score) return `Preview score: ${score}`;
    return "Preview details will appear here.";
  }, [matchId, score]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 text-white">
      <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
        <p className="text-xs uppercase tracking-widest text-white/50">Match Preview</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">{name}</h1>
        <p className="mt-2 text-sm text-white/70">{subtitle}</p>

        {matchId ? (
          <p className="mt-4 text-xs text-white/55">ID: {matchId}</p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/matches"
            className="inline-flex items-center justify-center rounded-2xl px-4 py-2 bg-white text-black text-sm font-medium"
          >
            Back to matches
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl px-4 py-2 border border-white/15 bg-white/5 text-white text-sm font-medium"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
