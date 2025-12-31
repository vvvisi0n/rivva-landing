"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import RivvaOrb from "@/components/RivvaOrb";
import TypingBubble from "@/components/TypingBubble";

type Option = { id: string; text: string; score: number };
type OnboardingState = {
  name: string;
  gender: string;
  orientation: string;
  goal: "serious" | "casual" | "friends_first" | "open_minded";
  communication: "direct" | "gentle" | "playful" | "slow_burn";
  boundaries: ("need_space" | "consistency" | "no_games" | "honesty")[];
  completedAt?: string;
};

type Match = {
  id: string;
  name: string;
  age: number;
  distance: string;
  headline: string;
  vibeTags: string[];
  compatibility: number; // 0-100
  reason: string;
};

const GOAL_LABEL: Record<OnboardingState["goal"], string> = {
  serious: "serious relationship",
  casual: "something light + fun",
  friends_first: "friends-first energy",
  open_minded: "open-minded connection",
};

const COMMS_LABEL: Record<OnboardingState["communication"], string> = {
  direct: "direct and clear",
  gentle: "gentle and emotionally aware",
  playful: "playful and flirty",
  slow_burn: "slow-burn and intentional",
};

function makeMockMatches(score: number, ob: OnboardingState): Match[] {
  const base = Math.min(92, 60 + score * 3);

  return [
    {
      id: "m1",
      name: "Ava",
      age: 28,
      distance: "3 miles away",
      headline: "Warm, witty, high-empathy",
      vibeTags: ["emotionally safe", "steady", "curious"],
      compatibility: base,
      reason:
        ob.communication === "gentle"
          ? "Her communication style mirrors your emotional pace."
          : "Her emotional rhythm complements yours.",
    },
    {
      id: "m2",
      name: "Jordan",
      age: 31,
      distance: "7 miles away",
      headline: "Intentional, grounded, playful mind",
      vibeTags: ["growth-minded", "no games", "consistent"],
      compatibility: Math.max(55, base - 7),
      reason:
        ob.boundaries.includes("no_games")
          ? "You both value clarity and consistency."
          : "Shared values around stable connection.",
    },
    {
      id: "m3",
      name: "Nia",
      age: 26,
      distance: "2 miles away",
      headline: "Soft energy, deep talker",
      vibeTags: ["slow-builder", "truth-anchored", "spark-driven"],
      compatibility: Math.max(50, base - 12),
      reason:
        ob.goal === "friends_first"
          ? "She aligns with a trust-first approach."
          : "She matches your vibe profile.",
    },
  ];
}

export default function MatchPreviewPage() {
  const router = useRouter();

  const [ob, setOb] = useState<OnboardingState | null>(null);
  const [answers, setAnswers] = useState<Record<string, Option> | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [isThinking, setIsThinking] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const rawOb = sessionStorage.getItem("rivva_onboarding");
    const rawScore = sessionStorage.getItem("rivva_quiz_score");
    const rawAnswers = sessionStorage.getItem("rivva_quiz_answers");

    if (!rawOb || !rawScore || !rawAnswers) {
      router.replace("/onboarding");
      return;
    }

    try {
      setOb(JSON.parse(rawOb));
      setScore(Number(rawScore));
      setAnswers(JSON.parse(rawAnswers));
    } catch {
      router.replace("/onboarding");
      return;
    } finally {
      setTimeout(() => setIsThinking(false), 900);
    }
  }, [router]);

  const matches = useMemo(() => {
    if (!ob || score == null) return [];
    return makeMockMatches(score, ob);
  }, [ob, score]);

  const summaryText = useMemo(() => {
    if (!ob || score == null) return "";
    const best = matches[0];
    return `Okay ${ob.name}. Based on your vibe and your quiz score, I found a few people you might actually enjoy. Your top match right now is ${best?.name}. You’re looking for ${GOAL_LABEL[ob.goal]}, and your communication style is ${COMMS_LABEL[ob.communication]}. These matches reflect that. Want to keep going?`;
  }, [ob, score, matches]);

  function speakSummary() {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) {
      alert("Your browser doesn't support voice playback.");
      return;
    }
    if (!summaryText.trim()) return;

    // stop any current speech first
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(summaryText);
    utter.rate = 1;
    utter.pitch = 1;

    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utter);
  }

  if (!ob || score == null || !answers) {
    return (
      <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center justify-center px-6 py-16">
        <TypingBubble label="Lumi is finding your first matches…" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-16">
      <div className="mb-8">
        <RivvaOrb />
      </div>

      <div className="w-full max-w-3xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-5 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              First Match Preview
            </h1>
            <p className="text-white/70 mt-2 max-w-xl">
              These are early, mock recommendations while Rivva learns you.
            </p>
          </div>

          {/* ✅ Replace LumiVoiceButton with built-in speak */}
          <div className="shrink-0">
            <button
              onClick={speakSummary}
              disabled={isSpeaking}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
                isSpeaking
                  ? "bg-white/10 text-white/60 border-white/10 cursor-not-allowed"
                  : "bg-white text-black border-white hover:bg-white/90"
              }`}
            >
              {isSpeaking ? "Playing..." : "Play Lumi Summary"}
            </button>
          </div>
        </div>

        {isThinking && (
          <TypingBubble className="mb-6" label="Lumi is tuning your matches…" />
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {matches.map((m, i) => (
            <div
              key={m.id}
              className="relative p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              {i === 0 && (
                <span className="absolute -top-3 left-4 px-3 py-1 text-xs rounded-full bg-purple-600">
                  Top match
                </span>
              )}

              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">
                  {m.name}, {m.age}
                </h3>
                <span className="text-sm text-white/70">
                  {m.compatibility}% fit
                </span>
              </div>

              <p className="text-sm text-white/60 mb-3">{m.distance}</p>
              <p className="text-white/90 font-medium mb-3">{m.headline}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                {m.vibeTags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/15"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <p className="text-sm text-white/75">{m.reason}</p>

              <button
                onClick={() => alert("Mock preview — messaging comes next.")}
                className="mt-4 w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 transition text-sm font-semibold"
              >
                Preview Chat
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => router.push("/quiz/results")}
            className="flex-1 px-6 py-3 rounded-xl bg-white/10 border border-white/20 font-semibold hover:bg-white/15 transition"
          >
            Back to Results
          </button>

          <button
            onClick={() => router.push("/")}
            className="flex-1 px-6 py-3 rounded-xl bg-purple-600 font-semibold hover:bg-purple-700 transition"
          >
            Finish Preview
          </button>
        </div>
      </div>
    </main>
  );
}