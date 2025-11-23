"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LumiOrb from "@/components/LumiOrb";
import TypingBubble from "@/components/TypingBubble";
import LumiVoiceButton from "@/components/LumiVoiceButton";

type Option = { id: string; text: string; score: number };
type AnswersMap = Record<string, Option>;

type Tier = {
  key: "low" | "mid" | "high";
  title: string;
  subtitle: string;
  lumiSummary: string;
  traits: string[];
  colorClass: string;
};

const TIERS: Tier[] = [
  {
    key: "low",
    title: "Explorer Energy",
    subtitle: "You connect through curiosity and momentum.",
    lumiSummary:
      "You’re still feeling out what really clicks for you — and that’s a good thing. Your vibe is open, experimental, and driven by chemistry. Lumi would help you slow the noise, notice patterns, and find people who feel exciting *and* safe.",
    traits: [
      "You’re led by spark + spontaneity",
      "You value fun and freedom early on",
      "You may need time to trust emotionally",
    ],
    colorClass: "from-fuchsia-500 to-cyan-400",
  },
  {
    key: "mid",
    title: "Balanced Connector",
    subtitle: "You want both chemistry and clarity.",
    lumiSummary:
      "You’re a blend of heart and logic. You want attraction, but not at the cost of alignment. You’re selective, but not closed-off. Lumi would match you with people who feel easy to talk to, emotionally steady, and genuinely compatible.",
    traits: [
      "You seek emotional comfort + attraction",
      "You like steady pacing",
      "You want conversations that flow naturally",
    ],
    colorClass: "from-purple-500 to-sky-400",
  },
  {
    key: "high",
    title: "Deep Bond Builder",
    subtitle: "You connect through emotional safety and meaning.",
    lumiSummary:
      "Your heart is tuned for real partnership. You care about emotional security, communication, and growing together. You don’t want random — you want *right*. Lumi would help you find people who are consistent, emotionally aware, and able to build something real.",
    traits: [
      "You prioritize emotional safety",
      "You want shared values",
      "You’re built for long-term love",
    ],
    colorClass: "from-indigo-500 to-purple-400",
  },
];

function getTier(score: number): Tier {
  // Max possible score = 12 (4 questions * 3)
  if (score <= 5) return TIERS[0];
  if (score <= 9) return TIERS[1];
  return TIERS[2];
}

export default function QuizResultsPage() {
  const router = useRouter();

  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswersMap | null>(null);
  const [thinking, setThinking] = useState(true);

  useEffect(() => {
    // Load from sessionStorage
    const rawScore = sessionStorage.getItem("rivva_quiz_score");
    const rawAnswers = sessionStorage.getItem("rivva_quiz_answers");

    if (!rawScore || !rawAnswers) {
      setThinking(false);
      setScore(null);
      setAnswers(null);
      return;
    }

    try {
      const parsedScore = Number(rawScore);
      const parsedAnswers = JSON.parse(rawAnswers) as AnswersMap;

      setScore(parsedScore);
      setAnswers(parsedAnswers);
    } catch (e) {
      console.error(e);
      setScore(null);
      setAnswers(null);
    } finally {
      // little Lumi pause
      const t = setTimeout(() => setThinking(false), 700);
      return () => clearTimeout(t);
    }
  }, []);

  const tier = useMemo(() => {
    if (score == null) return null;
    return getTier(score);
  }, [score]);

  function retake() {
    sessionStorage.removeItem("rivva_quiz_score");
    sessionStorage.removeItem("rivva_quiz_answers");
    router.push("/quiz");
  }

  const voiceText = tier
    ? `Here’s your Lumi read. ${tier.title}. ${tier.subtitle} ${tier.lumiSummary}`
    : "Your quiz results aren’t available. Try retaking the quiz.";

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-16">
      <div className="mb-6">
        <LumiOrb />
      </div>

      <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl text-center">
        {thinking && (
          <TypingBubble
            className="mb-6"
            label="Lumi is analyzing your answers…"
          />
        )}

        {!thinking && !tier && (
          <>
            <h1 className="text-3xl font-bold mb-3">No Results Found</h1>
            <p className="text-white/70 mb-8">
              Looks like your quiz data isn’t here (maybe you refreshed).  
              No worries — just retake it and Lumi will read your vibe again.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={retake}
                className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
              >
                Retake Quiz
              </button>
              <Link
                href="/"
                className="px-6 py-3 rounded-xl bg-white/10 border border-white/15 font-semibold hover:bg-white/15 transition"
              >
                Back Home
              </Link>
            </div>
          </>
        )}

        {!thinking && tier && score != null && (
          <>
            {/* Score badge */}
            <div
              className={`inline-flex items-center justify-center px-4 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${tier.colorClass} text-black mb-4`}
            >
              Your score: {score}/12
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
              {tier.title}
            </h1>
            <p className="text-white/75 mb-6">{tier.subtitle}</p>

            {/* Lumi summary */}
            <div className="text-left bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-semibold mb-2">Lumi’s Read</h2>
              <p className="text-white/80 leading-relaxed">
                {tier.lumiSummary}
              </p>
            </div>

            {/* Traits */}
            <div className="text-left mb-8">
              <h3 className="text-lg font-semibold mb-3">
                What this says about your vibe
              </h3>
              <ul className="space-y-2 text-white/80">
                {tier.traits.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="text-purple-300">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Voice button */}
            <div className="mb-8 flex justify-center">
              <LumiVoiceButton text={voiceText} />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={retake}
                className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
              >
                Retake Quiz
              </button>
              <Link
                href="/"
                className="px-6 py-3 rounded-xl bg-white/10 border border-white/15 font-semibold hover:bg-white/15 transition"
              >
                Back Home
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
