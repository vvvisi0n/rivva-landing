"use client";

import Link from "next/link";
import LumiOrb from "@/components/LumiOrb";
import { MATCHES } from "@/lib/matches";
import { loadProfile } from "@/lib/profile";
import { useMemo } from "react";

const vibeColor: Record<string, string> = {
  spark: "from-pink-400 to-purple-500",
  anchor: "from-emerald-400 to-cyan-500",
  empath: "from-purple-400 to-indigo-500",
  magnetic: "from-amber-400 to-pink-500",
};

export default function MatchesPage() {
  const profile = typeof window !== "undefined" ? loadProfile() : null;

  const filtered = useMemo(() => {
    const tier = profile?.quizTier;
    if (!tier) return MATCHES;
    return MATCHES.filter((m) => m.vibe === tier);
  }, [profile]);

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-14">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Matches{profile?.name ? ` for ${profile.name}` : ""}
            </h1>
            <p className="text-white/70 mt-1">
              {profile?.quizTier
                ? `Filtered by your Lumi tier: ${profile.quizTier}`
                : "People Lumi thinks fit your energy."}
            </p>
          </div>
          <div className="hidden md:block">
            <LumiOrb />
          </div>
        </header>

        {filtered.length === 0 && (
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <p className="text-white/70">
              No matches in this tier yet. We’ll expand as Rivva grows.
            </p>
            <Link
              href="/quiz"
              className="inline-block mt-3 text-cyan-300 hover:underline"
            >
              Retake Quiz →
            </Link>
          </div>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((m) => (
            <Link
              key={m.id}
              href={`/chat/${m.id}`}
              className="group rounded-3xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {m.name}{" "}
                    <span className="text-white/60 font-normal">{m.age}</span>
                  </h2>
                  <p className="text-sm text-white/60 mt-1">{m.city}</p>
                </div>

                <div
                  className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${vibeColor[m.vibe]} text-black font-semibold`}
                >
                  {m.vibe}
                </div>
              </div>

              <p className="mt-4 text-white/90 font-medium">{m.headline}</p>
              <p className="mt-2 text-sm text-white/70 leading-relaxed line-clamp-3">
                {m.bio}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {m.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs text-white/70 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-xs text-white/50">{m.lastActive}</p>

              <div className="mt-4 text-sm text-cyan-300 opacity-0 group-hover:opacity-100 transition">
                Open chat →
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
