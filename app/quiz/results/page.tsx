"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import OnboardingGate from "@/components/OnboardingGate";
import LumiOrb from "@/components/LumiOrb";
import TypingBubble from "@/components/TypingBubble";
import { scoreToTier, tierLabel, tierSummary, type QuizTier } from "@/lib/quiz";

type StoredAnswers = Record<string, { id: string; text: string; score: number }>;

const SETTINGS_KEY = "rivva_settings";

export default function QuizResultsPage() {
  const [score, setScore] = useState<number | null>(null);
  const [tier, setTier] = useState<QuizTier | null>(null);
  const [answers, setAnswers] = useState<StoredAnswers | null>(null);

  // tiny "Lumi thinking" for drama
  const [thinking, setThinking] = useState(true);

  useEffect(() => {
    try {
      const s = sessionStorage.getItem("rivva_quiz_score");
      const a = sessionStorage.getItem("rivva_quiz_answers");
      const parsedScore = s ? Number(s) : 0;
      const parsedAnswers = a ? (JSON.parse(a) as StoredAnswers) : null;

      const t = scoreToTier(parsedScore);

      setScore(parsedScore);
      setTier(t);
      setAnswers(parsedAnswers);

      // persist tier into settings for later personalization
      try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        const settings = raw ? JSON.parse(raw) : {};
        localStorage.setItem(
          SETTINGS_KEY,
          JSON.stringify({ ...settings, tier: t })
        );
      } catch {}

      setTimeout(() => setThinking(false), 900);
    } catch {
      setThinking(false);
      setScore(0);
      setTier("spark");
    }
  }, []);

  const summary = useMemo(() => {
    if (!tier) return "";
    return tierSummary(tier);
  }, [tier]);

  if (score === null || tier === null) {
    return (
      <main className="min-h-screen bg-[#0b0b14] text-white flex items-center justify-center">
        <TypingBubble label="Lumi is reading your emotional blueprint…" />
      </main>
    );
  }

  return (
    <OnboardingGate>
      <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-16">
        <section className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <LumiOrb />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Your Lumi Compatibility Read
          </h1>

          {thinking ? (
            <div className="mt-6 flex justify-center">
              <TypingBubble label="Comparing patterns… syncing vibe… almost there." />
            </div>
          ) : (
            <>
              <p className="text-white/60 text-sm mt-2">
                Score: {score} / 12
              </p>

              <div className="mt-7 rounded-3xl bg-white/5 border border-white/10 p-7 shadow-xl text-left">
                <p className="text-sm text-white/60 mb-1">You are a</p>
                <p className="text-2xl font-bold">
                  {tierLabel(tier)}
                </p>
                <p className="text-white/75 mt-3 leading-relaxed">
                  {summary}
                </p>

                {answers && (
                  <div className="mt-5 text-sm text-white/70">
                    <p className="font-semibold text-white mb-2">
                      Your answers
                    </p>
                    <ul className="space-y-2">
                      {Object.entries(answers).map(([qid, ans]) => (
                        <li key={qid} className="rounded-xl bg-black/30 border border-white/10 p-3">
                          {ans.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/matches"
                  className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
                >
                  See matches
                </Link>

                <Link
                  href="/quiz"
                  className="px-6 py-3 rounded-xl bg-white/10 border border-white/15 font-semibold hover:bg-white/15 transition"
                >
                  Retake quiz
                </Link>

                <Link
                  href="/settings"
                  className="px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
                >
                  Update profile
                </Link>
              </div>
            </>
          )}
        </section>
      </main>
    </OnboardingGate>
  );
}
