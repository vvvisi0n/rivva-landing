"use client";

import Link from "next/link";
import { useMemo } from "react";
import * as Candidates from "@/lib/candidates";

export default function MatchPreviewPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const id = (searchParams?.id ?? "").toString();

  const candidate = useMemo(() => {
    const raw =
      (Candidates as any).CANDIDATES ??
      (Candidates as any).candidates ??
      (Candidates as any).MOCK_CANDIDATES ??
      [];

    return raw.find((c: any) => String(c?.id ?? c?.handle ?? c?.email ?? c?.name ?? "") === id) ?? null;
  }, [id]);

  if (!id) {
    return (
      <main className="mx-auto max-w-3xl px-6 pt-12 pb-20 text-white">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl">
          <p className="text-sm text-white/70">Missing candidate id.</p>
          <div className="mt-6">
            <Link href="/matches" className="inline-flex items-center justify-center rounded-2xl px-4 py-2 bg-white text-black text-sm font-semibold">
              Back to matches
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 pt-12 pb-20 text-white">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest text-white/50">Preview</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {candidate?.name ?? candidate?.displayName ?? "Candidate"}
            </h1>
            <p className="mt-2 text-sm text-white/70">
              {candidate?.headline ?? candidate?.bioShort ?? candidate?.city ?? "Profile details coming soon."}
            </p>
          </div>

          <Link
            href="/matches"
            className="inline-flex items-center justify-center rounded-2xl px-4 py-2 border border-white/15 bg-white/5 text-white text-sm font-semibold hover:bg-white/10 transition"
          >
            Back
          </Link>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-6">
          <p className="text-sm font-semibold">Signal snapshot</p>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <p>
              <span className="text-white/50">Location.</span> {candidate?.city ?? candidate?.location ?? "Unknown"}
            </p>
            <p>
              <span className="text-white/50">Vibe.</span> {candidate?.vibe ?? candidate?.tone ?? "Not set"}
            </p>
            <p>
              <span className="text-white/50">Notes.</span> {candidate?.notes ?? candidate?.bio ?? "More detail will appear as we enrich profiles."}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/chat/${encodeURIComponent(id)}`}
            className="inline-flex items-center justify-center rounded-2xl px-4 py-2 bg-white text-black text-sm font-semibold hover:bg-white/90 transition"
          >
            Start chat
          </Link>
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-2xl px-4 py-2 border border-white/15 bg-white/5 text-white text-sm font-semibold hover:bg-white/10 transition"
          >
            Improve signal
          </Link>
        </div>
      </div>
    </main>
  );
}
