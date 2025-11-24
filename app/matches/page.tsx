"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import MatchCard from "@/components/MatchCard";
import MatchFilters from "@/components/MatchFilters";
import OnboardingGate from "@/components/OnboardingGate";
import { getMatches } from "@/lib/matches";

export default function MatchesPage() {
  const allMatches = getMatches();

  const vibes = useMemo(() => {
    const set = new Set(allMatches.map((m) => m.vibe));
    return Array.from(set);
  }, [allMatches]);

  const [search, setSearch] = useState("");
  const [vibe, setVibe] = useState("all");

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();

    return allMatches.filter((m) => {
      const matchesSearch =
        !s ||
        m.name.toLowerCase().includes(s) ||
        m.city.toLowerCase().includes(s);

      const matchesVibe = vibe === "all" || m.vibe === vibe;

      return matchesSearch && matchesVibe;
    });
  }, [allMatches, search, vibe]);

  return (
    <OnboardingGate>
      <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-12">
        <section className="max-w-5xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">Your Matches</h1>
              <p className="text-white/60 text-sm mt-1">
                Lumi sorted these by emotional fit — not random swipes.
              </p>
            </div>

            <Link
              href="/vibe-check"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-white/10 border border-white/15 hover:bg-white/15 transition text-sm"
            >
              Daily Vibe Check →
            </Link>
          </header>

          <MatchFilters
            search={search}
            setSearch={setSearch}
            vibe={vibe}
            setVibe={setVibe}
            vibes={vibes}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            {filtered.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-white/60 text-sm mt-8">
              No matches found. Try a different search or vibe.
            </p>
          )}
        </section>
      </main>
    </OnboardingGate>
  );
}
