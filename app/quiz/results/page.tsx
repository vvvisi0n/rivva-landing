"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import LumiOrb from "@/components/LumiOrb";
import LumiVoiceButton from "@/components/LumiVoiceButton";

type StoredOption = { id: string; text: string; score: number };
type StoredAnswers = Record<string, StoredOption>;

type Archetype = {
  key: string;
  title: string;
  vibe: string;
  strengths: string[];
  growth: string[];
  lumiTip: string;
};

function getArchetype(score: number): Archetype {
  if (score <= 4) {
    return {
      key: "explorer",
      title: "The Explorer",
      vibe:
        "You’re still mapping your relationship rhythm. You value freedom, curiosity, and low-pressure connection.",
      strengths: [
        "Open-minded and adaptive",
        "Good at reading new situations",
        "Doesn’t rush attachment",
      ],
      growth: [
        "Let people know what you need early",
        "Don’t disappear when it gets deep",
      ],
      lumiTip:
        "Lumi will help you spot who matches your pace — and who’s too intense too soon.",
    };
  }

  if (score <= 8) {
    return {
      key: "connector",
      title: "The Balanced Connector",
      vibe:
        "You want chemistry *and* stability. Your best relationships feel easy, honest, and emotionally steady.",
      strengths: [
        "Strong emotional awareness",
        "Values healthy communication",
        "Knows what feels right",
      ],
      growth: [
        "Don’t overthink early signals",
        "Trust consistent actions over sparks",
      ],
      lumiTip:
        "Lumi will filter for people who communicate clearly *and* bring real joy.",
    };
  }

  return {
    key: "resonator",
    title: "The Deep Resonator",
    vibe:
      "You’re wired for real intimacy. You want emotional safety, growth, and a bond that feels rare.",
    strengths: [
      "High emotional depth",
      "Naturally loyal",
      "Creates safe, real connection",
    ],
    growth: [
      "Be patient with slow builders",
      "Let love be simple sometimes",
    ],
    lumiTip:
      "Lumi will steer you toward emotionally mature matches — not just exciting ones.",
  };
}

export default function ResultsPage() {
  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<StoredAnswers | null>(null);

  useEffect(() => {
    const rawScore = sessionStorage.getItem("rivva_quiz_score");
    const rawAnswers = sessionStorage.getItem("rivva_quiz_answers");

    if (!rawScore || !rawAnswers) {
      setScore(0);
      setAnswers({});
      return;
    }

    setScore(Number(rawScore));
    try {
      setAnswers(JSON.parse(rawAnswers));
    } catch {
      setAnswers({});
    }
  }, []);

  const archetype = useMemo(
    () => getArchetype(score ?? 0),
    [score]
  );

  const percent = useMemo(() => {
    const max = 12;
    return Math.min(100, Math.round(((score ?? 0) / max) * 100));
  }, [score]);

  const readableRecap = useMemo(() => {
    if (!answers) return [];
    return Object.entries(answers).map(([qid, opt], i) => ({
      number: i + 1,
      qid,
      text: opt.text,
      score: opt.score,
    }));
  }, [answers]);

  const summaryToSpeak = `Your Rivva vibe is ${archetype.title}. ${archetype.vibe} ${archetype.lumiTip}`;

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-16">
      <div className="mb-8">
        <LumiOrb />
      </div>

      <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">
        <p className="text-sm text-white/60 mb-2">Your Compatibility Read</p>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {archetype.title}
        </h1>

        <p className="text-white/80 leading-relaxed mb-4">
          {archetype.vibe}
        </p>

        <div className="mb-6">
          <LumiVoiceButton
            text={summaryToSpeak}
            preface="Here’s your compatibility read."
          />
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-white/60 mb-2">
            <span>Exploratory</span>
            <span>Balanced</span>
            <span>Deep</span>
          </div>
          <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-300 transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-white/60">
            Score: {score ?? 0} / 12
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Your strengths</h2>
          <ul className="list-disc list-inside text-white/80 space-y-1">
            {archetype.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Watch-outs</h2>
          <ul className="list-disc list-inside text-white/80 space-y-1">
            {archetype.growth.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-5 mb-8">
          <p className="text-white/90 font-medium">Lumi’s note</p>
          <p className="text-white/70 mt-1">{archetype.lumiTip}</p>
        </div>

        {readableRecap.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Your answers</h2>
            <div className="space-y-2">
              {readableRecap.map((r) => (
                <div
                  key={r.qid}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/80 text-sm"
                >
                  <span className="text-white/50 mr-2">Q{r.number}:</span>
                  {r.text}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
          >
            Back to Rivva
          </Link>

          <Link
            href="/#waitlist"
            className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 text-black font-semibold hover:opacity-90 transition"
          >
            Join Early Access
          </Link>
        </div>
      </div>

      <p className="text-xs text-white/50 mt-6">
        This is a quick vibe read — Lumi gets smarter with real interactions.
      </p>
    </main>
  );
}
