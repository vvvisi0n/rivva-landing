"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import LumiOrb from "@/components/LumiOrb";
import TypingBubble from "@/components/TypingBubble";
import LumiVoiceButton from "@/components/LumiVoiceButton";

type Option = { id: string; text: string; score: number };
type Question = {
  id: string;
  prompt: string;
  options: Option[];
};

const QUESTIONS: Question[] = [
  {
    id: "q1",
    prompt: "When you meet someone new, what matters most first?",
    options: [
      { id: "a", text: "Their energy / vibe", score: 3 },
      { id: "b", text: "Shared values", score: 2 },
      { id: "c", text: "Physical attraction", score: 1 },
      { id: "d", text: "Conversation flow", score: 3 },
    ],
  },
  {
    id: "q2",
    prompt: "Your ideal first date is…",
    options: [
      { id: "a", text: "Something thoughtful + personal", score: 3 },
      { id: "b", text: "Fun + spontaneous", score: 2 },
      { id: "c", text: "A chill low-pressure hang", score: 2 },
      { id: "d", text: "A deep talk over coffee", score: 3 },
    ],
  },
  {
    id: "q3",
    prompt: "When conflict shows up, your instinct is to…",
    options: [
      { id: "a", text: "Talk it out ASAP", score: 3 },
      { id: "b", text: "Take space then return calm", score: 2 },
      { id: "c", text: "Avoid it if possible", score: 0 },
      { id: "d", text: "Use humor to soften it", score: 1 },
    ],
  },
  {
    id: "q4",
    prompt: "A relationship feels right when…",
    options: [
      { id: "a", text: "You feel emotionally safe", score: 3 },
      { id: "b", text: "You grow together", score: 3 },
      { id: "c", text: "It’s exciting + passionate", score: 2 },
      { id: "d", text: "You feel understood", score: 3 },
    ],
  },
];

export default function QuizPage() {
  const router = useRouter();
  const totalQuestions = QUESTIONS.length;

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Option>>({});
  const [isThinking, setIsThinking] = useState(false);

  const current = QUESTIONS[index];

  const progress = useMemo(() => {
    // 0% on first question, increments as you advance
    return Math.round((index / totalQuestions) * 100);
  }, [index, totalQuestions]);

  function pickOption(opt: Option) {
    if (isThinking) return;

    const nextAnswers = {
      ...answers,
      [current.id]: opt,
    };
    setAnswers(nextAnswers);

    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);

      if (index + 1 < totalQuestions) {
        setIndex(index + 1);
      } else {
        const score = Object.values(nextAnswers).reduce(
          (sum, a) => sum + a.score,
          0
        );

        sessionStorage.setItem("rivva_quiz_score", String(score));
        sessionStorage.setItem(
          "rivva_quiz_answers",
          JSON.stringify(nextAnswers)
        );

        router.push("/quiz/results");
      }
    }, 900);
  }

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-16">
      {/* Orb */}
      <div className="mb-8">
        <LumiOrb />
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">
        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-white/70">
            Question {index + 1} of {totalQuestions}
          </p>
          <p className="text-sm text-white/70">{progress}%</p>
        </div>

        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-8">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Prompt */}
        <h1 className="text-2xl md:text-3xl font-semibold leading-snug">
          {current.prompt}
        </h1>

        {/* Lumi Voice */}
        {!isThinking && (
          <LumiVoiceButton
            text={current.prompt}
            className="mt-3"
          />
        )}

        {/* Typing Bubble */}
        {isThinking && (
          <TypingBubble
            className="my-6"
            label="Lumi is processing your vibe…"
          />
        )}

        {/* Options */}
        <div className="grid grid-cols-1 gap-3 mt-6">
          {current.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => pickOption(opt)}
              disabled={isThinking}
              className={`text-left px-5 py-4 rounded-2xl border transition
                ${
                  isThinking
                    ? "bg-white/5 border-white/10 opacity-60 cursor-not-allowed"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
