"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { MOCK_MATCHES } from "@/lib/matches";

export default function NewUserSpotlight() {
  const params = useSearchParams();
  const newId = params.get("new");

  const match = useMemo(() => {
    if (!newId) return null;
    return MOCK_MATCHES.find((m) => m.id === newId) ?? null;
  }, [newId]);

  if (!newId) return null;

  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-5 shadow-xl mb-6">
      <p className="text-sm font-semibold">✨ Someone new just joined Rivva. Check them out.</p>
      <p className="text-xs text-white/60 mt-1">
        Tap to view the new profile in full.
      </p>

      <div className="mt-4 flex items-center gap-3">
        <Link
          href={match ? `/matches/${match.id}` : "/matches"}
          className="px-4 py-2.5 rounded-2xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition"
        >
          View new profile
        </Link>

        <Link
          href="/discover"
          className="px-4 py-2.5 rounded-2xl bg-white/10 border border-white/10 text-sm font-semibold hover:bg-white/15 transition"
        >
          Keep browsing
        </Link>
      </div>
    </div>
  );
}
