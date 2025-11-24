"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadProfile, UserProfile } from "@/lib/profile";

const vibeColor: Record<string, string> = {
  spark: "from-pink-400 to-purple-500",
  anchor: "from-emerald-400 to-cyan-500",
  empath: "from-purple-400 to-indigo-500",
  magnetic: "from-amber-400 to-pink-500",
};

export default function Navbar() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    setProfile(loadProfile());
    const onStorage = () => setProfile(loadProfile());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const tier = profile?.quizTier;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0b0b14]/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight text-white">
            Rivva
          </span>
          <span className="text-xs text-white/50">beta</span>
        </Link>

        <div className="flex items-center gap-3">
          {tier && (
            <div
              className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${vibeColor[tier]} text-black font-semibold`}
            >
              {tier}
            </div>
          )}

          <Link
            href="/quiz"
            className="text-sm text-white/70 hover:text-white transition"
          >
            Quiz
          </Link>

          <Link
            href="/matches"
            className="text-sm text-white/70 hover:text-white transition"
          >
            Matches
          </Link>

          <Link
            href="/onboarding"
            className="text-sm text-white/70 hover:text-white transition"
          >
            Setup
          </Link>
        </div>
      </div>
    </nav>
  );
}
