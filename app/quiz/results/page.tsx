"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import LumiOrb from "@/components/LumiOrb";
import { saveQuizTier } from "@/lib/profile";

type Tier = "spark" | "anchor" | "empath" | "magnetic";

function tierFromScore(score: number): Tier {
  if (score >= 10) return "empath";
  if (score >= 7) return "anchor";
  if (score >= 4) return "magnetic";
  return "spark";
}

const TIER_COPY: Record<Tier, { title: string; body: string }> = {
  spark: {
    title: "Spark",
    body:
      "You lead with chemistry and momentum. You connect fast when energy is right.",
  },
  magnetic: {
    title: "Magnetic",
    body:
      "You’re drawn to presence, humor, and emotional pull. You want a vibe that feels alive.",
  },
  anchor: {
    title: "Anchor",
    body:
      "You value stability and intention. You’re looking for something real, not random.",
  },
  empath: {
    title: "Empath",
    body:
      "You prioritize emotional safety and depth. You want a relationship that feels like home.",
  },
};

export default function QuizResultsPage() {
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("rivva_quiz_score");
    const value = raw ? Number(raw) : null;
    setScore(value);

    if (value !== null && !Number.isNaN(value)) {
      const tier = tierFromScore(value);
      saveQuizTier(tier);
    }
  }, []);

  const tier = useMemo(() => {
    if (score === null || Number.isNaN(score)) return null;
    return tierFromScore(score);
  }, [score]);

  if (tier === null) {
    return (
      <main className="min-h-screen bg-[#0b0b14] text-white flex items-center justify-center">
        <p className="text-white/70">No quiz results found.</p>
      </main>
    );
  }

  const copy = TIER_COPY[tier];

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-16">
      <div className="mb-8">
        <LumiOrb />
      </div>

      <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-xl text-center">
        <h1 className="text-4xl font-bold mb-2">
          Your Lumi Tier: <span className="text-cyan-300">{copy.title}</span>
        </h1>
        <p className="text-white/70 mb-8">{copy.body}</p>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 text-left">
          <h2 className="text-lg font-semibold mb-2">What this means</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            Lumi will now tailor your matches and conversation guidance to your tier.
            You’ll see people who align with your emotional rhythm, not just photos.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/onboarding"
            className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
          >
            Continue Setup
          </Link>

          <Link
            href="/quiz"
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            Retake Quiz
          </Link>
        </div>
      </div>
    </main>
  );
}
