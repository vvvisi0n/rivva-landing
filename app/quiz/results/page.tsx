"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import LumiOrb from "@/components/LumiOrb";

type Option = { id: string; text: string; score: number };
type StoredAnswers = Record<string, Option>;

function getResultTier(score: number) {
  if (score >= 11) {
    return {
      title: "Deep Connector",
      subtitle: "You bond through emotional safety, values, and real presence.",
      vibe:
        "You’re not here for surface energy — you want something that feels grounded, mutual, and intentional.",
      tips: [
        "Look for consistency over charisma.",
        "Avoid people who rush the pace.",
        "Prioritize clarity and calm communication.",
      ],
      gradient: "from-purple-500 to-cyan-400",
    };
  }

  if (score >= 7) {
    return {
      title: "Balanced Spark",
      subtitle: "You want chemistry *and* meaning — not one without the other.",
      vibe:
        "You’re attracted to good energy, but you still need emotional alignment to stay invested.",
      tips: [
        "Let chemistry open the door, not decide the house.",
        "Ask better questions early.",
        "Watch how they handle small tension.",
      ],
      gradient: "from-fuchsia-500 to-purple-400",
    };
  }

  return {
    title: "Spark Seeker",
    subtitle: "You lead with excitement, fun, and momentum.",
    vibe:
      "You’re drawn to passion and play. Long-term, you thrive when your excitement is matched by emotional depth.",
    tips: [
      "Notice who makes you feel safe, not just hyped.",
      "Slow down when it feels too fast too soon.",
      "Choose people who grow with you.",
    ],
    gradient: "from-cyan-400 to-emerald-400",
  };
}

export default function ResultsPage() {
  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<StoredAnswers | null>(null);

  useEffect(() => {
    const s = sessionStorage.getItem("rivva_quiz_score");
    const a = sessionStorage.getItem("rivva_quiz_answers");

    if (s) setScore(Number(s));
    if (a) setAnswers(JSON.parse(a));
  }, []);

  const tier = useMemo(() => {
    if (score === null) return null;
    return getResultTier(score);
  }, [score]);

  if (score === null || !tier) {
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
      <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl text-center">
        <p className="text-sm text-white/60 mb-2">
          Your compatibility signal score
        </p>

        <div
          className={`text-5xl font-extrabold bg-gradient-to-r ${tier.gradient} bg-clip-text text-transparent`}
        >
          {score}
        </div>

        <h1 className="mt-4 text-3xl md:text-4xl font-bold">
          {tier.title}
        </h1>

        <p className="mt-2 text-white/80 text-lg">
          {tier.subtitle}
        </p>

        <p className="mt-6 text-white/70 leading-relaxed">
          {tier.vibe}
        </p>

        {/* Tips */}
        <div className="mt-8 text-left bg-white/5 rounded-2xl p-6 border border-white/10">
          <h2 className="text-lg font-semibold mb-3">Lumi’s notes for you</h2>
          <ul className="space-y-2 text-white/75">
            {tier.tips.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="text-white/40">•</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Answers recap (optional, lightweight) */}
        {answers && (
          <div className="mt-8 text-left">
            <h3 className="text-base font-semibold mb-3 text-white/90">
              Your answers
            </h3>
            <div className="space-y-3">
              {Object.entries(answers).map(([qid, opt]) => (
                <div
                  key={qid}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                >
                  <p className="text-xs text-white/50 uppercase mb-1">{qid}</p>
                  <p className="text-white/80">{opt.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/#early-access"
            className="px-6 py-3 rounded-xl text-black font-semibold bg-white hover:bg-white/90 transition"
          >
            Join Early Access
          </Link>

          <Link
            href="/quiz"
            className="px-6 py-3 rounded-xl text-white font-semibold bg-white/10 border border-white/20 hover:bg-white/15 transition"
          >
            Retake Quiz
          </Link>
        </div>
      </div>
    </main>
  );
}
