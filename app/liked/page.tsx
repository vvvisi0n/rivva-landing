"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import OnboardingGate from "@/components/OnboardingGate";
import RivvaOrb from "@/components/RivvaOrb";

import { MOCK_MATCHES, type Match } from "@/lib/matches";
import { isLiked, toggleLike } from "@/lib/likes";

export default function LikedPage() {
  const matches = useMemo(() => MOCK_MATCHES, []);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  useEffect(() => {
    const ids = matches.filter((m) => isLiked(m.id)).map((m) => m.id);
    setLikedIds(ids);
  }, [matches]);

  const likedMatches: Match[] = useMemo(() => {
    const set = new Set(likedIds);
    return matches.filter((m) => set.has(m.id));
  }, [likedIds, matches]);

  function onUnlike(matchId: string) {
    toggleLike(matchId);
    setLikedIds((prev) => prev.filter((id) => id !== matchId));
  }

  return (
    <OnboardingGate>
      <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-12">
        <section className="max-w-3xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Liked</h1>
              <p className="text-white/60 text-sm mt-1">
                Everyone you’ve liked so far.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/matches"
                className="text-sm text-white/70 hover:text-white"
              >
                Matches
              </Link>
              <div className="scale-75 rivva-orb">
                <RivvaOrb />
              </div>
            </div>
          </header>

          {likedMatches.length === 0 ? (
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 shadow-xl">
              <p className="text-white/80 leading-relaxed">
                No likes yet. Head to Discover and start building your vibe.
              </p>

              <div className="mt-6 flex gap-3">
                <Link
                  href="/discover"
                  className="px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
                >
                  Go to Discover
                </Link>
                <Link
                  href="/matches"
                  className="px-5 py-3 rounded-xl bg-white/10 border border-white/15 font-semibold hover:bg-white/15 transition"
                >
                  Back to Matches
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {likedMatches.map((m) => (
                <div
                  key={m.id}
                  className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-20 w-20 rounded-2xl overflow-hidden bg-black/30 border border-white/10">
                      <img
                        src={m.images?.[0] ?? "/matches/placeholder.jpg"}
                        alt={m.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-xl font-bold">
                            {m.name}
                            {m.age != null ? `, ${m.age}` : ""}
                          </h2>

                          {(m.location || m.lastActive) && (
                            <p className="text-sm text-white/60 mt-1">
                              {m.location ?? ""}
                              {m.location && m.lastActive ? " • " : ""}
                              {m.lastActive ?? ""}
                            </p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => onUnlike(m.id)}
                          className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/10 hover:bg-white/15 transition"
                        >
                          Unlike
                        </button>
                      </div>

                      {m.bio && (
                        <p className="text-white/80 text-sm leading-relaxed mt-3">
                          {m.bio}
                        </p>
                      )}

                      <div className="mt-4 flex flex-wrap gap-3">
                        <Link
                          href={`/matches/${m.id}`}
                          className="text-sm text-white/70 hover:text-white hover:underline"
                        >
                          Full profile →
                        </Link>

                        <Link
                          href={`/matches/${m.id}#why-match`}
                          className="text-sm text-white/50 hover:text-white/80 hover:underline"
                        >
                          Why we matched →
                        </Link>

                        <Link
                          href={`/chat/${m.id}`}
                          className="text-sm text-white/70 hover:text-white hover:underline"
                        >
                          Chat →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/discover"
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-sm hover:bg-white/15 transition"
            >
              Discover
            </Link>
            <Link
              href="/inbox"
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-sm hover:bg-white/15 transition"
            >
              Inbox
            </Link>
            <Link
              href="/settings"
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-sm hover:bg-white/15 transition"
            >
              Settings
            </Link>
          </div>
        </section>
      </main>
    </OnboardingGate>
  );
}
