"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import LumiOrb from "@/components/LumiOrb";
import TypingBubble from "@/components/TypingBubble";
import { FEED, type Match } from "@/lib/matches";

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
  if (typeof window === "undefined") return;
  sessionStorage.setItem(key, JSON.stringify(ids));
}

export default function MatchDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const id = params?.id;
  const match = useMemo<Match | undefined>(
    () => FEED.find((m) => m.id === id),
    [id]
  );

  const [likes, setLikes] = useState<string[]>([]);
  const [passes, setPasses] = useState<string[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    setLikes(readIds(LIKE_KEY));
    setPasses(readIds(PASS_KEY));
  }, []);

  if (!match) {
    return (
      <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center justify-center px-6 py-16">
        <div className="mb-6">
          <LumiOrb />
        </div>
        <div className="w-full max-w-xl rounded-3xl bg-white/5 border border-white/10 p-8 text-center shadow-xl">
          <h1 className="text-2xl font-bold mb-2">Match not found</h1>
          <p className="text-white/70 mb-6">
            This profile may have moved or expired.
          </p>
          <Link
            href="/matches"
            className="inline-flex px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
          >
            Back to Matches
          </Link>
        </div>
      </main>
    );
  }

  const alreadyLiked = likes.includes(match.id);
  const alreadyPassed = passes.includes(match.id);

  function likeMatch() {
    if (alreadyLiked || isThinking) return;
    const next = [...likes, match.id];
    setLikes(next);
    writeIds(LIKE_KEY, next);
    setIsThinking(true);
    setTimeout(() => setIsThinking(false), 600);
  }

  function passMatch() {
    if (alreadyPassed || isThinking) return;
    const next = [...passes, match.id];
    setPasses(next);
    writeIds(PASS_KEY, next);
    setIsThinking(true);
    setTimeout(() => setIsThinking(false), 600);
  }

  function startChat() {
    router.push(`/chat/${match.id}`);
  }

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-12">
      <div className="mb-6">
        <LumiOrb />
      </div>

      <div className="w-full max-w-3xl grid gap-6">
        {/* Header */}
        <header className="rounded-3xl bg-white/5 border border-white/10 p-7 shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                {match.name}, {match.age}
              </h1>
              <p className="text-white/60 mt-1">{match.city}</p>
            </div>

            <div className="text-right">
              <p className="text-[11px] text-white/50">compatibility</p>
              <p className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
                {match.compatibility}%
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {match.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80"
              >
                {t}
              </span>
            ))}
          </div>
        </header>

        {/* Bio */}
        <section className="rounded-3xl bg-white/5 border border-white/10 p-7 shadow-xl">
          <h2 className="text-xl font-semibold mb-3">About {match.name}</h2>
          <p className="text-white/80 leading-relaxed">
            {match.bio}
          </p>
        </section>

        {/* Lumi note */}
        <section className="rounded-3xl bg-white/5 border border-white/10 p-7 shadow-xl">
          <h2 className="text-lg font-semibold mb-2">Lumi’s read</h2>
          <p className="text-white/75 leading-relaxed">
            You and {match.name} align on emotional pacing and communication tone.
            This one feels like a “calm + chemistry” match.
          </p>

          {isThinking && (
            <div className="mt-4">
              <TypingBubble label="Lumi is tuning the vibe..." />
            </div>
          )}
        </section>

        {/* Actions */}
        <section className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl flex flex-col sm:flex-row gap-3">
          <button
            onClick={likeMatch}
            disabled={alreadyLiked || isThinking}
            className={`flex-1 px-6 py-3 rounded-2xl font-semibold transition border
              ${
                alreadyLiked
                  ? "bg-green-500/20 border-green-400/30 text-green-200 cursor-default"
                  : "bg-white/10 border-white/10 hover:bg-white/15"
              }`}
          >
            {alreadyLiked ? "Liked" : "Like"}
          </button>

          <button
            onClick={passMatch}
            disabled={alreadyPassed || isThinking}
            className={`flex-1 px-6 py-3 rounded-2xl font-semibold transition border
              ${
                alreadyPassed
                  ? "bg-red-500/15 border-red-400/30 text-red-200 cursor-default"
                  : "bg-white/10 border-white/10 hover:bg-white/15"
              }`}
          >
            {alreadyPassed ? "Passed" : "Pass"}
          </button>

          <button
            onClick={startChat}
            className="flex-1 px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition"
          >
            Start Chat
          </button>
        </section>

        {/* Back links */}
        <footer className="flex gap-3 justify-center text-sm text-white/70">
          <Link href="/matches" className="hover:text-white transition">
            ← Back to Matches
          </Link>
          <span>•</span>
          <Link href="/liked" className="hover:text-white transition">
            View Liked
          </Link>
        </footer>
      </div>
    </main>
  );
}
