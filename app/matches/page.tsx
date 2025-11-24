"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import LumiOrb from "@/components/LumiOrb";
import TypingBubble from "@/components/TypingBubble";
import MatchFeedCard from "@/components/MatchFeedCard";
import MatchFilters from "@/components/MatchFilters";

type Match = {
  id: string;
  name: string;
  age: number;
  city: string;
  bio: string;
  tags: string[];
  compatibility: number;
};

// Phase 3 mock feed (replace with DB later)
const FEED: Match[] = [
  {
    id: "m1",
    name: "Ari",
    age: 28,
    city: "Brooklyn, NY",
    bio: "Warm, playful, emotionally steady. Loves live music and deep laughs. Wants a connection that grows naturally.",
    tags: ["emotionally steady", "fun energy", "intentional"],
    compatibility: 88,
  },
  {
    id: "m2",
    name: "Sam",
    age: 31,
    city: "Atlanta, GA",
    bio: "Low ego, high curiosity. Into fitness, travel, and building something real with someone who communicates clearly.",
    tags: ["great communicator", "secure vibe", "values-led"],
    compatibility: 82,
  },
  {
    id: "m3",
    name: "Jo",
    age: 27,
    city: "Toronto, CA",
    bio: "Quiet confidence. Bookstore dates, cooking nights, and thoughtful conversation. Big on loyalty.",
    tags: ["slow-burn", "loyal", "gentle energy"],
    compatibility: 79,
  },
  {
    id: "m4",
    name: "Nia",
    age: 29,
    city: "London, UK",
    bio: "Creative, bold, and soft at the core. Wants someone who’s emotionally present and playful.",
    tags: ["creative", "romantic", "fun energy"],
    compatibility: 91,
  },
  {
    id: "m5",
    name: "Kofi",
    age: 33,
    city: "Accra, GH",
    bio: "Grounded, family-first, ambitious. Wants peace, laughter, and a partner who’s serious about love.",
    tags: ["values-led", "secure vibe", "provider energy"],
    compatibility: 84,
  },
];

const LIKE_KEY = "rivva_likes";
const PASS_KEY = "rivva_passes";

function readIds(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(sessionStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function writeIds(key: string, ids: string[]) {
  sessionStorage.setItem(key, JSON.stringify(ids));
}

export default function MatchesPage() {
  const [likes, setLikes] = useState<string[]>([]);
  const [passes, setPasses] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    minCompat: 70,
    city: "",
    tag: "",
  });

  const [cursor, setCursor] = useState(0);
  const [isThinking, setIsThinking] = useState(false);

  // load stored likes/passes
  useEffect(() => {
    setLikes(readIds(LIKE_KEY));
    setPasses(readIds(PASS_KEY));
  }, []);

  // available filter lists
  const availableCities = useMemo(() => {
    return Array.from(new Set(FEED.map((m) => m.city)));
  }, []);

  const availableTags = useMemo(() => {
    return Array.from(new Set(FEED.flatMap((m) => m.tags)));
  }, []);

  // filtered feed
  const filteredFeed = useMemo(() => {
    return FEED.filter((m) => {
      if (m.compatibility < filters.minCompat) return false;
      if (filters.city && m.city !== filters.city) return false;
      if (filters.tag && !m.tags.includes(filters.tag)) return false;
      if (likes.includes(m.id) || passes.includes(m.id)) return false; // already acted on
      return true;
    });
  }, [filters, likes, passes]);

  const current = filteredFeed[cursor];

  function advance() {
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      setCursor((c) => c + 1);
    }, 600);
  }

  function likeCurrent() {
    if (!current || isThinking) return;
    const next = [...likes, current.id];
    setLikes(next);
    writeIds(LIKE_KEY, next);
    advance();
  }

  function passCurrent() {
    if (!current || isThinking) return;
    const next = [...passes, current.id];
    setPasses(next);
    writeIds(PASS_KEY, next);
    advance();
  }

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-12">
      <div className="mb-6">
        <LumiOrb />
      </div>

      <div className="w-full max-w-4xl grid gap-6">
        {/* Header */}
        <header className="rounded-3xl bg-white/5 border border-white/10 p-7 shadow-xl">
          <h1 className="text-3xl font-bold mb-2">Your Matches</h1>
          <p className="text-white/75">
            Swipe energy-first. I’m prioritizing people who align with your blueprint.
          </p>

          <div className="flex flex-wrap gap-3 mt-4">
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-sm hover:bg-white/15 transition"
            >
              Back to Dashboard
            </Link>

            <Link
              href="/quiz"
              className="px-4 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition"
            >
              Retake Quiz
            </Link>
          </div>
        </header>

        {/* Filters */}
        <MatchFilters
          filters={filters}
          setFilters={setFilters}
          availableCities={availableCities}
          availableTags={availableTags}
        />

        {/* Feed */}
        <section className="grid gap-4">
          {!current ? (
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 shadow-xl text-center">
              <h2 className="text-2xl font-bold mb-2">No more matches right now</h2>
              <p className="text-white/70">
                Try loosening filters or check back later.
              </p>

              <button
                onClick={() => {
                  setCursor(0);
                  setLikes([]);
                  setPasses([]);
                  writeIds(LIKE_KEY, []);
                  writeIds(PASS_KEY, []);
                }}
                className="mt-5 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
              >
                Reset Feed
              </button>
            </div>
          ) : (
            <>
              {isThinking && (
                <TypingBubble label="Lumi is checking your compatibility..." />
              )}

              <MatchFeedCard
                match={current}
                onLike={likeCurrent}
                onPass={passCurrent}
                disabled={isThinking}
              />

              <p className="text-xs text-white/50 text-center">
                {cursor + 1} of {filteredFeed.length} in this filter set
              </p>
            </>
          )}
        </section>

        {/* Footer stats */}
        <footer className="rounded-3xl bg-white/5 border border-white/10 p-5 text-sm text-white/75">
          <div className="flex items-center justify-between">
            <span>Likes: {likes.length}</span>
            <span>Passes: {passes.length}</span>
            <span>Remaining: {filteredFeed.length - cursor}</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
