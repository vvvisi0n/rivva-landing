"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import LumiOrb from "@/components/LumiOrb";
import TypingBubble from "@/components/TypingBubble";
import LumiVoiceButton from "@/components/LumiVoiceButton";

type Option = { id: string; text: string; score: number };
type Answers = Record<string, Option>;

type ResultBand = {
  key: "deep" | "balanced" | "spark";
  title: string;
  subtitle: string;
  description: string;
  color: string; // tailwind class
  tips: string[];
};

const BANDS: ResultBand[] = [
  {
    key: "deep",
    title: "Deep Connector",
    subtitle: "emotion-first chemistry",
    description:
      "You bond through safety, meaning, and real emotional alignment. You’re not here for random sparks — you want connection that holds weight.",
    color: "from-purple-400 to-cyan-300",
    tips: [
      "You thrive with people who communicate clearly.",
      "You value consistency over intensity.",
      "You’re at your best when trust builds steadily.",
    ],
  },
  {
    key: "balanced",
    title: "Balanced Builder",
    subtitle: "slow burn + strong foundation",
    description:
      "You want both vibe and values. You’re open to fun, but you pay attention to how someone shows up over time.",
    color: "from-cyan-300 to-purple-400",
    tips: [
      "You connect best with grounded people.",
      "You prefer growth over drama.",
      "You’re drawn to chemistry that feels calm and real.",
    ],
  },
  {
    key: "spark",
    title: "Spark Chaser",
    subtitle: "energy + excitement led",
    description:
      "You fall for presence, attraction, and momentum. You want a relationship that feels alive, playful, and emotionally electric.",
    color: "from-fuchsia-400 to-purple-300",
    tips: [
      "You thrive with people who match your energy.",
      "You need chemistry that stays fun.",
      "You still want emotional safety — even when it’s exciting.",
    ],
  },
];

function getBand(score: number): ResultBand {
  // max score with current quiz = 12
  if (score >= 9) return BANDS[0];       // Deep Connector
  if (score >= 5) return BANDS[1];       // Balanced Builder
  return BANDS[2];                      // Spark Chaser
}

export default function QuizResultsPage() {
  const router = useRouter();

  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answers | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const s = sessionStorage.getItem("rivva_quiz_score");
      const a = sessionStorage.getItem("rivva_quiz_answers");

      if (!s || !a) {
        router.replace("/quiz");
        return;
      }

      setScore(Number(s));
      setAnswers(JSON.parse(a));
    } catch (e) {
      console.error(e);
      router.replace("/quiz");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const band = useMemo(() => {
    if (score == null) return null;
    return getBand(score);
  }, [score]);

  function handleRetake() {
    sessionStorage.removeItem("rivva_quiz_score");
    sessionStorage.removeItem("rivva_quiz_answers");
    router.push("/quiz");
  }

  async function handleShare() {
    if (!band || score == null) return;

    const text = `I got "${band.title}" on the Rivva Lumi quiz. My vibe score: ${score}/12.`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (e) {
      console.error(e);
    }
  }

  if (loading || !band || score == null) {
    return (
      <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center justify-center px-6">
        <TypingBubble label="Lumi is finalizing your results…" />
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
      <section className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-white/70 text-sm mb-2">Your Lumi Result</p>
            <h1 className="text-3xl md:text-4xl font-bold">
              {band.title}
            </h1>
            <p className="text-white/70 mt-2">{band.subtitle}</p>
          </div>

          <div className="text-right">
            <p className="text-xs text-white/60 mb-1">Vibe Score</p>
            <div
              className={`inline-flex items-center justify-center px-4 py-2 rounded-2xl font-semibold bg-gradient-to-r ${band.color} text-black`}
            >
              {score}/12
            </div>
          </div>
        </div>

        <p className="text-white/80 leading-relaxed mt-6">
          {band.description}
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {band.tips.map((tip, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/5 border border-white/10 p-4 text-sm text-white/80"
            >
              {tip}
            </div>
          ))}
        </div>

        {/* Lumi Voice Reaction */}
        <div className="mt-8 flex items-center gap-3">
          <LumiVoiceButton
            text={`Okay… I’m getting ${band.title} energy. That means your strongest pull is ${band.subtitle}.`}
          />
          <p className="text-xs text-white/50">
            Tap for Lumi’s take
          </p>
        </div>
      </section>

      {/* Actions */}
      <section className="w-full max-w-2xl mt-8 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleRetake}
          className="flex-1 px-6 py-3 rounded-2xl font-semibold bg-white/5 border border-white/10 hover:bg-white/10 transition"
        >
          Retake Quiz
        </button>

        <button
          onClick={handleShare}
          className="flex-1 px-6 py-3 rounded-2xl font-semibold bg-gradient-to-r from-purple-500 to-cyan-400 text-black hover:opacity-90 transition"
        >
          {copied ? "Copied!" : "Share Result"}
        </button>

        <Link
          href="/"
          className="flex-1 px-6 py-3 rounded-2xl font-semibold bg-white text-black text-center hover:opacity-90 transition"
        >
          Join Waitlist
        </Link>
      </section>

      {/* Optional answer recap */}
      {answers && (
        <section className="w-full max-w-2xl mt-10">
          <h2 className="text-lg font-semibold mb-3 text-white/90">
            Your Answers
          </h2>
          <div className="space-y-3">
            {Object.entries(answers).map(([qid, opt]) => (
              <div
                key={qid}
                className="rounded-2xl bg-white/5 border border-white/10 p-4"
              >
                <p className="text-xs text-white/50 mb-1">
                  {qid.toUpperCase()}
                </p>
                <p className="text-white/85">{opt.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
