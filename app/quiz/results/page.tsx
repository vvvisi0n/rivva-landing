"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import LumiOrb from "@/components/LumiOrb";

type Option = { id: string; text: string; score: number };
type AnswersMap = Record<string, Option>;

type TierKey = "spark" | "anchor" | "pulse" | "rare";

const TIERS: Record<
  TierKey,
  {
    title: string;
    subtitle: string;
    vibe: string;
    color: string;
    advice: string[];
  }
> = {
  spark: {
    title: "The Spark Seeker",
    subtitle: "You lead with chemistry.",
    vibe:
      "You’re drawn to excitement, momentum, and attraction. You want a relationship that feels alive and magnetic.",
    color: "from-pink-500 to-purple-500",
    advice: [
      "Look for emotional maturity with the same heat.",
      "Don’t confuse intensity with compatibility.",
      "Choose partners who can grow with your passion.",
    ],
  },
  anchor: {
    title: "The Safe Harbor",
    subtitle: "You lead with emotional safety.",
    vibe:
      "You value consistency, respect, and stability. You want love that feels calm, secure, and deeply understood.",
    color: "from-emerald-400 to-cyan-400",
    advice: [
      "Don’t settle for comfort without attraction.",
      "Speak your needs early instead of hoping they’re noticed.",
      "Let safe love still be fun love.",
    ],
  },
  pulse: {
    title: "The Deep Connector",
    subtitle: "You lead with meaning.",
    vibe:
      "You prioritize values, communication, and emotional depth. You want a bond that feels real, not random.",
    color: "from-purple-500 to-cyan-400",
    advice: [
      "Don’t overthink early-stage energy.",
      "Let people show you who they are in actions too.",
      "A great match feels easy and deep.",
    ],
  },
  rare: {
    title: "The Rare Match",
    subtitle: "You’re extremely high-compatibility.",
    vibe:
      "You’re a blend of emotional intelligence, openness, and secure confidence. You tend to attract healthy connections.",
    color: "from-yellow-400 to-pink-500",
    advice: [
      "Protect your peace — not everyone deserves access.",
      "Stay open to surprises without lowering standards.",
      "You don’t need many matches — just the right one.",
    ],
  },
};

function getTier(score: number, maxScore: number): TierKey {
  const pct = score / maxScore;

  if (pct >= 0.9) return "rare";
  if (pct >= 0.7) return "pulse";
  if (pct >= 0.45) return "anchor";
  return "spark";
}

export default function QuizResultsPage() {
  const router = useRouter();

  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswersMap | null>(null);

  useEffect(() => {
    const rawScore = sessionStorage.getItem("rivva_quiz_score");
    const rawAnswers = sessionStorage.getItem("rivva_quiz_answers");

    if (!rawScore || !rawAnswers) {
      router.push("/quiz");
      return;
    }

    setScore(Number(rawScore));
    setAnswers(JSON.parse(rawAnswers));
  }, [router]);

  const maxScore = useMemo(() => {
    // 4 questions, each max option score = 3 => 12
    // if you add more questions later, update this formula
    return 12;
  }, []);

  const percent = useMemo(() => {
    if (score === null) return 0;
    return Math.round((score / maxScore) * 100);
  }, [score, maxScore]);

  const tier = useMemo(() => {
    if (score === null) return null;
    return getTier(score, maxScore);
  }, [score, maxScore]);

  if (score === null || !answers || !tier) {
    return null;
  }

  const t = TIERS[tier];

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-16">
      {/* Orb */}
      <div className="mb-8">
        <LumiOrb />
      </div>

      {/* Results Card */}
      <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">
        <p className="text-sm text-white/60 mb-2">Lumi’s Compatibility Read</p>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {t.title}
        </h1>
        <p className="text-white/70 mb-6">{t.subtitle}</p>

        {/* Score bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-white/60 mb-2">
            <span>Your match style score</span>
            <span>{percent}%</span>
          </div>
          <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${t.color} transition-all`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Vibe */}
        <p className="text-lg leading-relaxed text-white/90 mb-6">
          {t.vibe}
        </p>

        {/* Advice */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8">
          <h2 className="font-semibold mb-3">Lumi’s advice for you</h2>
          <ul className="list-disc list-inside text-white/80 space-y-2">
            {t.advice.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => router.push("/quiz")}
            className="flex-1 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition border border-white/10"
          >
            Retake Quiz
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 text-black font-semibold hover:opacity-90 transition"
          >
            Back to Home
          </button>
        </div>
      </div>

      {/* Answer recap (optional but nice) */}
      <div className="w-full max-w-2xl mt-8 text-white/70 text-sm space-y-3">
        <h3 className="text-white font-semibold text-base mb-2">
          Your answers
        </h3>
        {Object.entries(answers).map(([qid, opt]) => (
          <div
            key={qid}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <p className="text-white/60 mb-1">{qid.toUpperCase()}</p>
            <p className="text-white">{opt.text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
