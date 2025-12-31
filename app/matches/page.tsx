"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import OnboardingGate from "@/components/OnboardingGate";
import RivvaOrb from "@/components/RivvaOrb";

import { MATCHES, type Match } from "@/lib/matches";
import { isLiked, toggleLike } from "@/lib/likes";

export default function MatchesPage() {
  const matches = useMemo(() => MATCHES, []);

  const [i, setI] = useState(0);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  useEffect(() => {
    const ids = matches.filter((m) => isLiked(m.id)).map((m) => m.id);
    setLikedIds(ids);
  }, [matches]);

  const current: Match | undefined = matches[i];

  function onPass() {
    if (i < matches.length - 1) setI((prev) => prev + 1);
  }

  function onLike() {
    if (!current) return;

    toggleLike(current.id);

    setLikedIds((prev) => {
      const has = prev.includes(current.id);
      if (has) return prev.filter((x) => x !== current.id);
      return [...prev, current.id];
    });

    if (i < matches.length - 1) setI((prev) => prev + 1);
  }

  if (!current) {
    return (
      <OnboardingGate>
        <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-12 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="flex justify-center mb-6">
              <RivvaOrb />
            </div>

            <p className="text-white/80 text-lg font-semibold">
              You’ve reached the end of your matches.
            </p>
            <p className="text-white/60 text-sm mt-2">
              More people will appear as Rivva learns you.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/liked"
                className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
              >
                View Liked ({likedIds.length})
              </Link>
              <Link
                href="/discover"
                className="px-6 py-3 rounded-xl bg-white/10 border border-white/15 font-semibold hover:bg-white/15 transition"
              >
                Go to Discover
              </Link>
            </div>
          </div>
        </main>
      </OnboardingGate>
    );
  }

  const tags = current.vibeTags ?? [];
  const location = current.location ?? "";
  const liked = likedIds.includes(current.id);

  return (
    <OnboardingGate>
      <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-12">
        <section className="max-w-xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Your Matches</h1>
              <p className="text-white/60 text-sm mt-1">
                Curated by Lumi from your quiz + vibe.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/settings" className="text-sm text-white/70 hover:text-white">
                Settings
              </Link>
              <div className="scale-75 rivva-orb">
                <RivvaOrb />
              </div>
            </div>
          </header>



          <div className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl">
            <div className="rounded-2xl overflow-hidden bg-black/30 border border-white/10">
              <img
                src={current.images?.[0] ?? "/matches/placeholder.jpg"}
                alt={current.name}
                className="w-full h-80 object-cover"
              />
            </div>

            <div className="mt-5">
              <h2 className="text-2xl font-bold">
                {current.name}
                {current.age ? `, ${current.age}` : ""}
              </h2>

              {(location || current.lastActive) && (
                <p className="text-white/60 text-sm mt-1">
                  {location}
                  {location && current.lastActive ? " • " : ""}
                  {current.lastActive}
                </p>
              )}

              {tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full bg-black/40 border border-white/10 text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {current.bio && (
                <p className="text-white/80 leading-relaxed mt-4">
                  {current.bio}
                </p>
              )}

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={onPass}
                  className="px-5 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition font-semibold"
                >
                  Pass
                </button>

                <button
                  type="button"
                  onClick={onLike}
                  className="px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
                >
                  {liked ? "Liked ✓" : "Like"}
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-white/50">
                <span>
                  {i + 1} / {matches.length}
                </span>

                <div className="flex items-center gap-4">
                  <Link
                    href={`/matches/${current.id}`}
                    className="text-sm text-white/70 hover:text-white hover:underline"
                  >
                    Full profile →
                  </Link>

                  <Link
                    href={`/matches/${current.id}#why-match`}
                    className="text-xs text-white/50 hover:text-white/80 hover:underline"
                  >
                    Why we matched →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3 justify-center">
            <Link
              href="/liked"
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-sm hover:bg-white/15 transition"
            >
              Liked ({likedIds.length})
            </Link>

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
          </div>
        </section>
      </main>
    </OnboardingGate>
  );
}
