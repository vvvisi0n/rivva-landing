"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function PreviewClient() {
  const sp = useSearchParams();

  const id = sp.get("id") ?? "";
  const name = sp.get("name") ?? "Match";

  const subtitle = useMemo(() => {
    if (!id) return "No match selected.";
    return "This is a lightweight preview while we finish the full matching UI.";
  }, [id]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 text-white">
      <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
        <p className="text-xs uppercase tracking-widest text-white/50">Preview</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">{name}</h1>
        <p className="mt-2 text-sm text-white/70">{subtitle}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/matches" className="inline-flex items-center justify-center rounded-2xl px-4 py-2 bg-white text-black text-sm font-medium">
            Back to Matches
          </Link>
          <Link href="/" className="inline-flex items-center justify-center rounded-2xl px-4 py-2 border border-white/15 bg-white/5 text-white text-sm font-medium">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
