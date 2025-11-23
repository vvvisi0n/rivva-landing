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
  {
    id: "q5",
    prompt: "What attracts you long-term?",
    options: [
      { id: "a", text: "Emotional consistency", score: 3 },
      { id: "b", text: "Ambition and drive", score: 2 },
      { id: "c", text: "Playful chemistry", score: 2 },
      { id: "d", text: "Shared purpose", score: 3 },
    ],
  },
  {
    id: "q6",
    prompt: "How do you usually show love?",
    options: [
      { id: "a", text: "Support + reliability", score: 3 },
      { id: "b", text: "Words and reassurance", score: 3 },
      { id: "c", text: "Physical affection", score: 2 },
      { id: "d", text: "Acts of fun / adventure", score: 2 },
    ],
  },
  {
    id: "q7",
    prompt: "If texting slows down, you assume…",
    options: [
      { id: "a", text: "They’re busy — no big deal", score: 3 },
      { id: "b", text: "Maybe interest is fading", score: 1 },
      { id: "c", text: "I’ll match their energy", score: 2 },
      { id: "d", text: "I should check in directly", score: 3 },
    ],
  },
  {
    id: "q8",
    prompt: "What do you want Rivva to protect you from?",
    options: [
      { id: "a", text: "Wasting time on mismatches", score: 3 },
      { id: "b", text: "Emotional games", score: 3 },
      { id: "c", text: "Boring connections", score: 2 },
      { id: "d", text: "People who don’t get me", score: 3 },
    ],
  },
];

function lumiReaction(score: number) {
  if (score >= 3) return "Ooo okay… I see you.";
  if (score === 2) return "That makes sense. Interesting.";
  if (score === 1) return "Noted — chemistry counts.";
  return "Alright… storing that.";
}

export default function QuizPage() {
  const router = useRouter();
  const totalQuestions = QUESTIONS.length;

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Option>>({});
  const [isThinking, setIsThinking] = useState(false);
  const [transitionOut, setTransitionOut] = useState(false);
  const [reaction, setReaction] = useState<string | null>(null);
  const [voiceOn, setVoiceOn] = useState(true);

  const current = QUESTIONS[index];

  const maxScore = useMemo(() => {
    return QUESTIONS.reduce((sum, q) => {
      const best = Math.max(...q.options.map(o => o.score));
      return sum + best;
    }, 0);
  }, []);

  const progress = useMemo(() => {
    return Math.round((index / totalQuestions) * 100);
  }, [index, totalQuestions]);

  function goBack() {
    if (isThinking || index === 0) return;

    const prevQuestion = QUESTIONS[index - 1];
    const nextAnswers = { ...answers };
    delete nextAnswers[prevQuestion.id];

    setAnswers(nextAnswers);
    setTransitionOut(true);

    setTimeout(() => {
      setIndex(index - 1);
      setTransitionOut(false);
      setReaction(null);
    }, 220);
  }

  function pickOption(opt: Option) {
    if (isThinking) return;

    const nextAnswers = {
      ...answers,
      [current.id]: opt,
    };
    setAnswers(nextAnswers);

    setReaction(lumiReaction(opt.score));
    setIsThinking(true);
    setTransitionOut(true);

    setTimeout(() => {
      setTransitionOut(false);

      if (index + 1 < totalQuestions) {
        setIndex(index + 1);
        setIsThinking(false);
        setReaction(null);
      } else {
        const score = Object.values(nextAnswers).reduce(
          (sum, a) => sum + a.score,
          0
        );

        sessionStorage.setItem("rivva_quiz_score", String(score));
        sessionStorage.setItem("rivva_quiz_max", String(maxScore));
        sessionStorage.setItem(
          "rivva_quiz_answers",
          JSON.stringify(nextAnswers)
        );

        router.push("/quiz/results");
      }
    }, 900);
  }

  const voiceText = useMemo(() => {
    if (!current) return "";
    return `Question ${index + 1}. ${current.prompt}`;
  }, [current, index]);

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-16">
      <div className="mb-8">
        <LumiOrb />
      </div>

      <div
        className={`w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl
        transition-all duration-300 ease-out
        ${transitionOut ? "opacity-0 translate-y-3 scale-[0.98]" : "opacity-100 translate-y-0 scale-100"}
      `}
      >
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-white/70">
            Question {index + 1} of {totalQuestions}
          </p>
          <p className="text-sm text-white/70">{progress}%</p>
        </div>

        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <button
            onClick={goBack}
            disabled={isThinking || index === 0}
            className={`text-sm px-3 py-1 rounded-lg border transition
              ${
                isThinking || index === 0
                  ? "border-white/10 text-white/40 cursor-not-allowed"
                  : "border-white/15 text-white/80 hover:bg-white/10"
              }`}
          >
            ← Back
          </button>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-white/70 select-none">
              <input
                type="checkbox"
                checked={voiceOn}
                onChange={() => setVoiceOn(v => !v)}
                className="accent-purple-400"
              />
              Lumi Voice
            </label>

            {voiceOn && <LumiVoiceButton text={voiceText} />}
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold leading-snug mb-5">
          {current.prompt}
        </h1>

        {reaction && !isThinking && (
          <div className="mb-4 text-left">
            <div className="inline-block bg-white/10 border border-white/15 rounded-2xl px-4 py-2 text-sm text-white/90 animate-[fadeIn_0.25s_ease-out]">
              {reaction}
            </div>
          </div>
        )}

        {isThinking && (
          <TypingBubble className="mb-6" label="Lumi is processing your vibe…" />
        )}

        <div className="grid grid-cols-1 gap-3">
          {current.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => pickOption(opt)}
              disabled={isThinking}
              className={`text-left px-5 py-4 rounded-2xl border transition flex items-center justify-between
                ${
                  isThinking
                    ? "bg-white/5 border-white/10 opacity-60 cursor-not-allowed"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-[0.99]"
                }`}
            >
              <span>{opt.text}</span>
              <span className="text-white/40 text-xs">tap</span>
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-white/50 mt-6">
        Your answers stay private. Lumi just uses them to read your vibe.
      </p>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(3px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
