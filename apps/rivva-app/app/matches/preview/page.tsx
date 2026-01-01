"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { MOCK_CANDIDATES } from "@/lib/candidates";

export default function MatchPreviewPage() {
  const sp = useSearchParams();
  const id = sp.get("id") ?? "";

  const c = useMemo(() => {
    return MOCK_CANDIDATES.find((x) => x.id === id) ?? null;
  }, [id]);

  return (
    <main className="mx-auto max-w-3xl px-6 pt-10 pb-20 text-white">
      <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">Preview</h1>
          <Link href="/matches" className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 transition">
            Back
          </Link>
        </div>

        {!c ? (
          <p className="mt-4 text-sm text-white/70">No match selected.</p>
        ) : (
          <>
            <p className="mt-6 text-xl font-semibold">{c.name} <span className="text-white/55 font-normal">· {c.age}</span></p>
            <p className="mt-2 text-sm text-white/60">{c.city}</p>

            <p className="mt-5 text-sm text-white/75 leading-relaxed">{c.headline}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {c.tags.slice(0, 10).map((t) => (
                <span key={t} className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/65">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/chat/${encodeURIComponent(c.id)}`} className="rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-white/90 transition">
                Start chat
              </Link>
              <Link href="/discover" className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition">
                Discover
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
