"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import LumiOrb from "@/components/LumiOrb";

type StoredAnswer = {
  id: string;
  text: string;
  score: number;
};

type AnswersMap = Record<string, StoredAnswer>;

type Archetype = {
  title: string;
  subtitle: string;
  description: string;
  strengths: string[];
  growthEdges: string[];
  colorClass: string;
};

function getArchetype(score: number, totalPossible: number): Archetype {
  const pct = totalPossible === 0 ? 0 : score / totalPossible;

  if (pct >= 0.85) {
    return {
      title: "The Heart-Reader",
      subtitle: "You connect through depth, safety, and emotional clarity.",
      description:
        "Lumi sees you as someone who’s naturally tuned into emotional undercurrents. You move toward people who feel steady and sincere, and your relationships thrive on honesty, empathy, and mutual growth.",
      strengths: [
        "Emotionally present and perceptive",
        "Values real compatibility over hype",
        "Builds trust fast through sincerity",
      ],
      growthEdges: [
        "Don’t over-give before trust is earned",
        "Let chemistry build naturally, not perfectly",
        "Keep your standards high, but stay open",
      ],
      colorClass: "from-purple-500 to-cyan-400",
    };
  }

  if (pct >= 0.65) {
    return {
      title: "The Slow-Burn Spark",
      subtitle: "You fall for people who match your rhythm and energy.",
      description:
        "You don’t chase random sparks — you trust patterns. Lumi reads you as someone who needs emotional consistency before attraction locks in. You’re at your best when things unfold naturally.",
      strengths: [
        "Selectively open, not impulsive",
        "Great at recognizing real alignment",
        "Stable and intentional",
      ],
      growthEdges: [
        "Don’t confuse comfort with stagnation",
        "Share your feelings sooner",
        "Let people show up in their own way",
      ],
      colorClass: "from-fuchsia-500 to-purple-400",
    };
  }

  if (pct >= 0.45) {
    return {
      title: "The Curious Connector",
      subtitle: "You’re drawn to conversation and discovery.",
      description:
        "Lumi sees you as exploratory: you learn what you feel by engaging. Attraction grows for you through fun, curiosity, and emotional safety over time.",
      strengths: [
        "Open-minded and socially intuitive",
        "Finds connection in unexpected places",
        "Balances fun with meaning",
      ],
      growthEdges: [
        "Name your needs earlier",
        "Don’t stay where you feel unsure",
        "Watch for mixed signals (in you + them)",
      ],
      colorClass: "from-cyan-400 to-emerald-400",
    };
  }

  return {
    title: "The Guarded Romantic",
    subtitle: "You want love, but you protect your heart.",
    description:
      "Lumi reads a high emotional radar with strong self-protection. You’re not cold — you’re careful. You’ll thrive with someone who builds trust slowly and respects boundaries.",
    strengths: [
      "Strong boundaries",
      "Loyal once safe",
      "Highly observant of energy shifts",
    ],
    growthEdges: [
      "Let safe people get closer",
      "Don’t interpret uncertainty as danger",
      "Practice asking instead of assuming",
    ],
    colorClass: "from-amber-400 to-pink-400",
  };
}

export default function QuizResultsPage() {
  const router = useRouter();
  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswersMap | null>(null);

  useEffect(() => {
    // sessionStorage is only available client-side
    const s = sessionStorage.getItem("rivva_quiz_score");
    const a = sessionStorage.getItem("rivva_quiz_answers");

    if (!s || !a) {
      // no data -> send them back to quiz
      router.replace("/quiz");
      return;
    }

    try {
      setScore(Number(s));
      setAnswers(JSON.parse(a));
    } catch {
      router.replace("/quiz");
    }
  }, [router]);

  const totalPossible = useMemo(() => {
    if (!answers) return 0;
    return Object.values(answers).reduce((sum, ans) => sum + 3, 0);
  }, [answers]);

  const archetype = useMemo(() => {
    if (score === null) return null;
    return getArchetype(score, totalPossible);
  }, [score, totalPossible]);

  if (score === null || !answers || !archetype) {
    return (
      <main className="min-h-screen bg-[#0b0b14] text-white flex items-center justify-center">
        <p className="text-white/70">Loading your results…</p>
      </main>
    );
  }

  const pct = totalPossible === 0 ? 0 : Math.round((score / totalPossible) * 100);

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-16">
      <div className="mb-8">
        <LumiOrb />
      </div>

      <div className="w-full max-w-3xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              {archetype.title}
            </h1>
            <p className="text-white/70 mt-2">{archetype.subtitle}</p>
          </div>

          <div className="text-right">
            <p className="text-sm text-white/70">Compatibility Signal</p>
            <p className="text-4xl font-extrabold">{pct}%</p>
          </div>
        </div>

        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-8">
          <div
            className={`h-full bg-gradient-to-r ${archetype.colorClass} transition-all`}
            style={{ width: `${pct}%` }}
          />
        </div>

        <p className="text-lg text-white/80 leading-relaxed mb-8">
          {archetype.description}
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-3">Your strengths</h2>
            <ul className="space-y-2 text-white/80">
              {archetype.strengths.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="text-cyan-300">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-3">Your growth edges</h2>
            <ul className="space-y-2 text-white/80">
              {archetype.growthEdges.map((g) => (
                <li key={g} className="flex gap-2">
                  <span className="text-purple-300">•</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Answers recap */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-10">
          <h2 className="text-xl font-semibold mb-4">What you chose</h2>
          <div className="space-y-3 text-white/80">
            {Object.entries(answers).map(([qid, ans]) => (
              <div key={qid} className="flex items-start justify-between gap-4">
                <p className="font-medium text-white/70">{qid.toUpperCase()}</p>
                <p className="flex-1">{ans.text}</p>
                <p className="text-sm text-white/50">+{ans.score}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              sessionStorage.removeItem("rivva_quiz_score");
              sessionStorage.removeItem("rivva_quiz_answers");
              router.push("/quiz");
            }}
            className="px-6 py-3 rounded-xl font-semibold bg-white text-black hover:bg-white/90 transition"
          >
            Retake Quiz
          </button>

          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 rounded-xl font-semibold bg-white/10 border border-white/20 hover:bg-white/15 transition"
          >
            Back Home
          </button>
        </div>

        <p className="text-xs text-white/50 mt-6">
          This is an early Lumi signal — your full compatibility map becomes more
          accurate once you’re using Rivva.
        </p>
      </div>
    </main>
  );
}
