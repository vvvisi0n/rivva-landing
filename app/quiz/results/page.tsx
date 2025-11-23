"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import LumiOrb from "@/components/LumiOrb";
import LumiVoiceButton from "@/components/LumiVoiceButton";

type Option = { id: string; text: string; score: number };
type SavedAnswers = Record<string, Option>;

type ResultTier = {
  title: string;
  subtitle: string;
  description: string;
  lumiSays: string;
  color: string; // tailwind-ish text color class
  ring: string;  // tailwind-ish ring class
};

const TIERS: ResultTier[] = [
  {
    title: "Emotionally Aligned",
    subtitle: "High EQ + deep compatibility energy",
    description:
      "You naturally look for emotional safety, real connection, and people who complement your vibe. You’re not here for random swipes—you’re here for something that feels right.",
    lumiSays:
      "I’m picking up strong emotional alignment from you. You’re the type who connects deeply and wants something that actually feels safe, mutual, and real.",
    color: "text-cyan-200",
    ring: "ring-cyan-300/40",
  },
  {
    title: "Balanced Connector",
    subtitle: "You want both spark and substance",
    description:
      "You value chemistry, but you also pay attention to how someone communicates and shows up emotionally. You’re great at building something real without forcing it.",
    lumiSays:
      "You’re a balanced connector. You want the spark but you also listen for substance—how someone communicates, respects you, and matches your emotional rhythm.",
    color: "text-purple-200",
    ring: "ring-purple-300/40",
  },
  {
    title: "Spark Seeker",
    subtitle: "Chemistry-first, but still intentional",
    description:
      "You’re drawn to excitement, attraction, and momentum. When it’s right, it should feel alive. Lumi will help filter that spark into something sustainable.",
    lumiSays:
      "You’re a spark seeker. You lead with chemistry and excitement, and when it clicks you want it to feel alive. I’ll help you channel that spark into something real.",
    color: "text-fuchsia-200",
    ring: "ring-fuchsia-300/40",
  },
];

function tierForScore(score: number, maxScore: number): ResultTier {
  // 3 tiers based on % of max
  const pct = maxScore === 0 ? 0 : score / maxScore;
  if (pct >= 0.8) return TIERS[0];
  if (pct >= 0.55) return TIERS[1];
  return TIERS[2];
}

export default function QuizResultsPage() {
  const router = useRouter();

  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<SavedAnswers | null>(null);

  // Pull from sessionStorage on mount
  useEffect(() => {
    try {
      const s = sessionStorage.getItem("rivva_quiz_score");
      const a = sessionStorage.getItem("rivva_quiz_answers");

      setScore(s ? Number(s) : 0);
      setAnswers(a ? (JSON.parse(a) as SavedAnswers) : {});
    } catch {
      setScore(0);
      setAnswers({});
    }
  }, []);

  const maxScore = useMemo(() => {
    // based on your QUESTIONS config: 4 questions * max 3 each = 12
    // If you add more questions later, update this calc or store max in quiz page.
    return 12;
  }, []);

  const tier = useMemo(() => {
    return tierForScore(score ?? 0, maxScore);
  }, [score, maxScore]);

  const percent = useMemo(() => {
    const s = score ?? 0;
    return Math.round((s / maxScore) * 100);
  }, [score, maxScore]);

  const lumiSummary = useMemo(() => {
    return `${tier.lumiSays} Your compatibility style score is ${percent} percent.`;
  }, [tier, percent]);

  if (score === null || answers === null) {
    return (
      <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center justify-center px-6 py-16">
        <div className="mb-6">
          <LumiOrb />
        </div>
        <p className="text-white/70">Loading your results…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-16">
      {/* Orb */}
      <div className="mb-8">
        <LumiOrb />
      </div>

      {/* Results Card */}
      <div className={`w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl ring-1 ${tier.ring}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className={`text-3xl md:text-4xl font-bold ${tier.color}`}>
              {tier.title}
            </h1>
            <p className="text-white/70 mt-1">{tier.subtitle}</p>
          </div>

          {/* Lumi Voice */}
          <LumiVoiceButton text={lumiSummary} />
        </div>

        {/* Score bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm text-white/70 mb-2">
            <span>Your vibe score</span>
            <span>{percent}%</span>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Description */}
        <p className="mt-6 text-lg text-white/90 leading-relaxed">
          {tier.description}
        </p>

        {/* Lumi says bubble */}
        <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-sm text-white/80">
            <span className="font-semibold text-white">Lumi:</span>{" "}
            {tier.lumiSays}
          </p>
        </div>

        {/* Answer recap */}
        {Object.keys(answers).length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3 text-white/90">
              Your answers
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(answers).map(([qid, opt], i) => (
                <div
                  key={qid}
                  className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                >
                  <p className="text-sm text-white/70">
                    Q{i + 1}
                  </p>
                  <p className="text-sm text-white/95 text-right">
                    {opt.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => router.push("/quiz")}
            className="flex-1 px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
          >
            Retake Quiz
          </button>

          <button
            onClick={() => router.push("/")}
            className="flex-1 px-5 py-3 rounded-xl bg-white/5 border border-white/10 font-semibold hover:bg-white/10 transition"
          >
            Back to Home
          </button>
        </div>

        {/* tiny note */}
        <p className="text-xs text-white/50 mt-4">
          Results are a vibe snapshot. Lumi gets smarter as you interact.
        </p>
      </div>
    </main>
  );
}
