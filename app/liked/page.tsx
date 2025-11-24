"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LumiOrb from "@/components/LumiOrb";
import TypingBubble from "@/components/TypingBubble";
import { FEED, type Match } from "@/lib/matches";

const LIKE_KEY = "rivva_likes";

function readLikes(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(sessionStorage.getItem(LIKE_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeLikes(ids: string[]) {
  sessionStorage.setItem(LIKE_KEY, JSON.stringify(ids));
}

export default function LikedPage() {
  const router = useRouter();

  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [isThinking, setIsThinking] = useState(true);

  useEffect(() => {
    const ids = readLikes();
    setLikedIds(ids);

    // tiny Lumi "thinking" delay for vibe
    const t = setTimeout(() => setIsThinking(false), 700);
    return () => clearTimeout(t);
  }, []);

  const likedMatches = useMemo<Match[]>(
    () => FEED.filter((m) => likedIds.includes(m.id)),
    [likedIds]
  );

  function removeLike(id: string) {
    const next = likedIds.filter((x) => x !== id);
    setLikedIds(next);
    writeLikes(next);
  }

  function openMatch(id: string) {
    router.push(`/matches/${id}`);
  }

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-12">
      {/* Top orb */}
      <div className="mb-6">
        <LumiOrb />
      </div>

      <div className="w-full max-w-4xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Liked Matches</h1>
            <p className="text-white/60 text-sm mt-1">
              People your vibe said “yes” to.
            </p>
          </div>

          <Link
            href="/matches"
            className="text-sm text-white/70 hover:text-white transition"
          >
            ← Matches
          </Link>
        </header>

        {/* Lumi thinking */}
        {isThinking && (
          <div className="mb-6">
            <TypingBubble label="Lumi is gathering your likes…" />
          </div>
        )}

        {/* Empty state */}
        {!isThinking && likedMatches.length === 0 && (
          <section className="rounded-3xl bg-white/5 border border-white/10 p-10 text-center shadow-xl">
            <h2 className="text-2xl font-semibold mb-2">
              No likes yet.
            </h2>
            <p className="text-white/70 max-w-xl mx-auto">
              That’s totally fine. Start exploring matches and when someone feels right,
              tap Like — I’ll keep them here for you.
            </p>

            <div className="mt-6">
              <Link
                href="/matches"
                className="inline-flex px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
              >
                Explore Matches
              </Link>
            </div>

            <p className="text-xs text-white/40 mt-4">
              Lumi tip: trust the calm chemistry.
            </p>
          </section>
        )}

        {/* Grid */}
        {!isThinking && likedMatches.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {likedMatches.map((m) => (
              <div
                key={m.id}
                className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl hover:bg-white/10 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold">
                      {m.name}, {m.age}
                    </h3>
                    <p className="text-white/60 text-sm">{m.city}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-[11px] text-white/50">compatibility</p>
                    <p className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
                      {m.compatibility}%
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {m.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-white/75 text-sm leading-relaxed mt-4 line-clamp-3">
                  {m.bio}
                </p>

                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => openMatch(m.id)}
                    className="flex-1 px-4 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition"
                  >
                    View Profile
                  </button>

                  <button
                    onClick={() => removeLike(m.id)}
                    className="px-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white/80 hover:bg-white/15 transition"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-3">
                  <Link
                    href={`/chat/${m.id}`}
                    className="text-sm text-cyan-200 hover:text-cyan-100 transition"
                  >
                    Start Chat →
                  </Link>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
