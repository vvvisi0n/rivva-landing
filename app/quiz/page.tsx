"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import LumiOrb from "@/components/LumiOrb";
import TypingBubble from "@/components/TypingBubble";
import LumiVoiceButton from "@/components/LumiVoiceButton";
import { QUESTIONS, Option, Traits } from "@/lib/quizData";

export default function QuizPage() {
  const router = useRouter();
  const totalQuestions = QUESTIONS.length;

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Option>>({});
  const [isThinking, setIsThinking] = useState(false);

  const current = QUESTIONS[index];

  const progress = useMemo(() => {
    return Math.round((index / totalQuestions) * 100);
  }, [index, totalQuestions]);

  function computeTotals(nextAnswers: Record<string, Option>) {
    const totals: Traits = {
      emotional: 0,
      playful: 0,
      adventurous: 0,
      grounded: 0,
    };

    Object.values(nextAnswers).forEach((a) => {
      for (const [k, v] of Object.entries(a.traits)) {
        totals[k as keyof Traits] += v ?? 0;
      }
    });

    return totals;
  }

  function computeProfile(totals: Traits): keyof Traits {
    return (Object.entries(totals) as [keyof Traits, number][])
      .sort((a, b) => b[1] - a[1])[0][0];
  }

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
        const totals = computeTotals(nextAnswers);
        const profile = computeProfile(totals);

        sessionStorage.setItem("rivva_quiz_totals", JSON.stringify(totals));
        sessionStorage.setItem("rivva_quiz_profile", profile);
        sessionStorage.setItem("rivva_quiz_answers", JSON.stringify(nextAnswers));

        router.push("/quiz/results");
      }
    }, 900);
  }

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-16">
      <div className="mb-8">
        <LumiOrb />
      </div>

      <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">
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

        <h1 className="text-2xl md:text-3xl font-semibold leading-snug mb-6">
          {current.prompt}
        </h1>

        {isThinking && (
          <TypingBubble className="mb-6" label="Lumi is processing your vibe…" />
        )}

        <div className="grid grid-cols-1 gap-3">
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

        <div className="mt-8 flex items-center justify-center">
          <LumiVoiceButton textToSpeak={current.prompt} />
        </div>
      </div>
    </main>
  );
}
