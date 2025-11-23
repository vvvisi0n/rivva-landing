"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import LumiOrb from "@/components/LumiOrb";
import TypingBubble from "@/components/TypingBubble";

type Option = { id: string; text: string; score: number };
type AnswerMap = Record<string, Option>;

type BandKey = "soul_first" | "balanced_builder" | "spark_chaser";

const BANDS: Record<
  BandKey,
  {
    title: string;
    subtitle: string;
    description: string;
    strengths: string[];
    watchouts: string[];
    bestMatch: string;
    shareLine: string;
  }
> = {
  soul_first: {
    title: "Soul-First Connector",
    subtitle: "You prioritize safety, depth, and emotional clarity.",
    description:
      "You’re not here for random swipes. You want something that feels grounded, honest, and emotionally clean. When it’s right, it’s calm — not confusing.",
    strengths: [
      "Emotionally intentional",
      "Loyal once you choose",
      "Strong communicator",
    ],
    watchouts: ["You can over-invest early", "You feel mismatches deeply"],
    bestMatch:
      "Someone steady, emotionally mature, and clear about what they want.",
    shareLine: "I’m a Soul-First Connector on Rivva.",
  },
  balanced_builder: {
    title: "Balanced Builder",
    subtitle: "Chemistry matters, but so does consistency.",
    description:
      "You want both spark and stability. You’re open-hearted, but not reckless. When a connection has rhythm and respect, you’re all in.",
    strengths: [
      "Healthy pace setter",
      "Values + chemistry aligned",
      "Adaptable and fair",
    ],
    watchouts: [
      "You may tolerate gray areas too long",
      "You can downplay your own needs",
    ],
    bestMatch:
      "Someone playful but dependable — who matches your energy and effort.",
    shareLine: "I’m a Balanced Builder on Rivva.",
  },
  spark_chaser: {
    title: "Spark-Driven Romantic",
    subtitle: "You lead with chemistry and momentum.",
    description:
      "You fall for vibe, excitement, and the feeling of being alive with someone. You’re not careless — you just want love to feel electric.",
    strengths: [
      "Warm, expressive, magnetic",
      "Keeps relationships fun",
      "Bold about desire",
    ],
    watchouts: [
      "You can get bored with slow burners",
      "You may ignore early red flags",
    ],
    bestMatch:
      "Someone emotionally stable who can handle passion *and* build something real.",
    shareLine: "I’m a Spark-Driven Romantic on Rivva.",
  },
};

function getBand(score: number, max: number): BandKey {
  const pct = max > 0 ? score / max : 0;
  if (pct >= 0.8) return "soul_first";
  if (pct >= 0.55) return "balanced_builder";
  return "spark_chaser";
}

export default function ResultsPage() {
  const [score, setScore] = useState<number | null>(null);
  const [maxScore, setMaxScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswerMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");

  useEffect(() => {
    const s = Number(sessionStorage.getItem("rivva_quiz_score"));
    const m = Number(sessionStorage.getItem("rivva_quiz_max"));
    const a = sessionStorage.getItem("rivva_quiz_answers");

    setScore(Number.isFinite(s) ? s : 0);
    setMaxScore(Number.isFinite(m) ? m : 0);
    setAnswers(a ? JSON.parse(a) : {});
    setLoading(false);
  }, []);

  const bandKey = useMemo(() => {
    if (score == null || maxScore == null) return "balanced_builder" as BandKey;
    return getBand(score, maxScore);
  }, [score, maxScore]);

  const band = BANDS[bandKey];
  const pct = maxScore ? Math.round(((score ?? 0) / maxScore) * 100) : 0;

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.origin : "";
    const shareText = `${band.shareLine} My vibe score: ${pct}%. Take the Lumi quiz on Rivva.`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "My Rivva compatibility vibe",
          text: shareText,
          url,
        });
        return;
      }
    } catch {
      // fall through to copy
    }

    try {
      await navigator.clipboard.writeText(`${shareText} ${url}`);
      setShareStatus("copied");
      setTimeout(() => setShareStatus("idle"), 1500);
    } catch {
      // last resort: do nothing
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center justify-center px-6">
        <LumiOrb />
        <TypingBubble className="mt-8" label="Lumi is reading your vibe…" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-16">
      <div className="mb-6">
        <LumiOrb />
      </div>

      <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">
        <p className="text-sm text-white/60 mb-2">Your compatibility vibe</p>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">{band.title}</h1>
        <p className="text-white/75 mb-6">{band.subtitle}</p>

        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-white/60 mb-2">
            <span>Score</span>
            <span>
              {score} / {maxScore} ({pct}%)
            </span>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <p className="text-white/80 leading-relaxed mb-8">
          {band.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="font-semibold mb-3">Your strengths</h3>
            <ul className="list-disc list-inside text-white/75 text-sm space-y-1">
              {band.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="font-semibold mb-3">Watchouts</h3>
            <ul className="list-disc list-inside text-white/75 text-sm space-y-1">
              {band.watchouts.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500/15 to-cyan-400/10 border border-white/10 rounded-2xl p-5 mb-8">
          <h3 className="font-semibold mb-2">Best match for you</h3>
          <p className="text-white/80 text-sm leading-relaxed">
            {band.bestMatch}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          <Link
            href="/quiz"
            className="flex-1 text-center px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition"
          >
            Retake Quiz
          </Link>

          <Link
            href="/"
            className="flex-1 text-center px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
          >
            Back to Rivva
          </Link>
        </div>

        <button
          onClick={handleShare}
          className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 text-black font-semibold hover:opacity-90 transition active:scale-[0.98]"
        >
          {shareStatus === "copied" ? "Copied ✓" : "Share my vibe"}
        </button>
      </div>

      {process.env.NODE_ENV !== "production" && answers && (
        <pre className="mt-8 text-xs text-white/40 max-w-2xl whitespace-pre-wrap">
          {JSON.stringify(answers, null, 2)}
        </pre>
      )}
    </main>
  );
}
