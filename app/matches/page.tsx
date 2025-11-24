"use client";

import Link from "next/link";
import OnboardingGate from "@/components/OnboardingGate";
import LumiOrb from "@/components/LumiOrb";
import MatchCard from "@/components/MatchCard";
import { MOCK_MATCHES } from "@/lib/matches";

export default function MatchesPage() {
  return (
    <OnboardingGate>
      <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-12">
        <section className="max-w-5xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Your Matches</h1>
              <p className="text-white/60 text-sm mt-1">
                Curated by Lumi from your quiz + vibe.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/settings"
                className="text-sm text-white/70 hover:text-white"
              >
                Profile
              </Link>
              <div className="scale-75">
                <LumiOrb />
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_MATCHES.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>
      </main>
    </OnboardingGate>
  );
}
