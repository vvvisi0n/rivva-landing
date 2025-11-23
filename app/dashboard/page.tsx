"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import LumiOrb from "@/components/LumiOrb";
import TypingBubble from "@/components/TypingBubble";
import BlueprintCard from "@/components/BlueprintCard";

type Profile = {
  name: string;
  age: string;
  gender: string;
  lookingFor: string;
  intent: string;
  ageMin: string;
  ageMax: string;
};

type AnswerOption = { id: string; text: string; score: number };
type Answers = Record<string, AnswerOption>;

const MAX_SCORE = 12; // 4 questions * 3

const TIERS = [
  {
    min: 0,
    max: 5,
    title: "Spark Seeker",
    subtitle: "You lead with vibe, excitement, and instant chemistry.",
    description:
      "You’re drawn to connection that feels alive right away. When someone matches your energy, you open up fast. Your best relationships keep things emotionally engaging and light enough to breathe.",
    strengths: [
      "You spot chemistry quickly",
      "You bring warmth and momentum",
      "You keep dating fun, not forced",
    ],
    watchouts: [
      "You can lose interest if it gets too slow",
      "Sometimes passion hides misalignment",
      "You may ignore red flags early on",
    ],
    lumiTip:
      "Don’t just ask 'Do I feel it?' — ask 'Do I feel safe growing here?'",
  },
  {
    min: 6,
    max: 9,
    title: "Grounded Connector",
    subtitle: "You balance emotion with logic and real-life fit.",
    description:
      "You care about values, consistency, and the *way someone shows up*. You don't need fireworks on day one — you need alignment and stability that builds naturally.",
    strengths: [
      "You prioritize real compatibility",
      "You communicate clearly",
      "You build trust over time",
    ],
    watchouts: [
      "You may overthink early signals",
      "You can be slow to risk vulnerability",
      "Sometimes you settle for 'fine'",
    ],
    lumiTip:
      "Let yourself feel the moment — not everything needs a conclusion on date one.",
  },
  {
    min: 10,
    max: 12,
    title: "Deep Bond Builder",
    subtitle: "You lead with safety, depth, and emotional closeness.",
    description:
      "You want intimacy that feels honest, emotionally intelligent, and secure. You’re naturally tuned into pacing, boundaries, and meaning. When you love, you *really* love.",
    strengths: [
      "You create emotional safety",
      "You value depth over surface",
      "You’re loyal and intentional",
    ],
    watchouts: [
      "You may expect depth too early",
      "You can over-give emotionally",
      "Slow chemistry may feel like rejection",
    ],
    lumiTip:
      "Depth is your gift — just make sure it’s earned, not rushed.",
  },
];

function getTier(score: number) {
  return TIERS.find((t) => score >= t.min && score <= t.max) ?? TIERS[0];
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answers | null>(null);

  useEffect(() => {
    const rawProfile = sessionStorage.getItem("rivva_profile");
    if (rawProfile) setProfile(JSON.parse(rawProfile));

    const rawScore = sessionStorage.getItem("rivva_quiz_score");
    if (rawScore) setScore(Number(rawScore));

    const rawAnswers = sessionStorage.getItem("rivva_quiz_answers");
    if (rawAnswers) setAnswers(JSON.parse(rawAnswers));
  }, []);

  const tier = useMemo(() => {
    if (score == null) return null;
    return getTier(score);
  }, [score]);

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-14">
      <div className="mb-6">
        <LumiOrb />
      </div>

      <div className="w-full max-w-4xl grid gap-6">
        {/* Header */}
        <div className="rounded-3xl bg-white/5 border border-white/10 p-7 shadow-xl">
          <h1 className="text-3xl font-bold mb-2">Lumi Dashboard</h1>

          {!profile ? (
            <TypingBubble label="Loading your vibe profile…" />
          ) : (
            <p className="text-white/80">
              Welcome back,{" "}
              <span className="font-semibold">{profile.name}</span>.
              Here’s what I’m learning about your relationship energy.
            </p>
          )}
        </div>

        {/* Blueprint */}
        {score == null || !tier ? (
          <div className="rounded-3xl bg-white/5 border border-white/10 p-7 shadow-xl">
            <h2 className="text-2xl font-bold mb-2">Your Compatibility Blueprint</h2>
            <p className="text-white/75 mb-5">
              I don’t have your quiz vibe yet. Take the Lumi Compatibility Quiz
              so I can generate your blueprint.
            </p>

            <Link
              href="/quiz"
              className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 text-black font-semibold hover:opacity-90 transition active:scale-[0.98]"
            >
              Take the Quiz
            </Link>
          </div>
        ) : (
          <BlueprintCard tier={tier} score={score} maxScore={MAX_SCORE} />
        )}

        {/* Snapshot (pulling answers lightly) */}
        {answers && (
          <div className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-3">Quick vibe snapshot</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-white/80">
              {Object.entries(answers).map(([qid, opt]) => (
                <div
                  key={qid}
                  className="rounded-2xl bg-white/5 border border-white/10 p-4"
                >
                  <p className="text-xs text-white/50 mb-1">{qid.toUpperCase()}</p>
                  <p>{opt.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-5">
              <Link
                href="/quiz"
                className="px-5 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition active:scale-[0.98]"
              >
                Retake Quiz
              </Link>

              <Link
                href="/"
                className="px-5 py-2 rounded-xl bg-white/10 border border-white/10 text-sm hover:bg-white/15 transition active:scale-[0.98]"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}

        {/* Next Feature Tease */}
        <div className="rounded-3xl bg-gradient-to-r from-purple-500/10 to-cyan-400/5 border border-white/10 p-6">
          <p className="text-white/80 text-sm">
            Next up: I’ll generate your first Rivva matches and show a “connection forecast”
            based on your blueprint.
          </p>
        </div>
      </div>
    </main>
  );
}
