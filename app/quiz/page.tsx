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
      { id: "d", text: "You feel deeply understood", score: 3 },
    ],
  },
  {
    id: "q5",
    prompt: "You’re most attracted to people who…",
    options: [
      { id: "a", text: "Feel calm and grounded", score: 3 },
      { id: "b", text: "Challenge you in a good way", score: 2 },
      { id: "c", text: "Bring excitement and spontaneity", score: 1 },
      { id: "d", text: "Make you feel seen instantly", score: 3 },
    ],
  },
  {
    id: "q6",
    prompt: "When someone pulls back emotionally, you usually…",
    options: [
      { id: "a", text: "Check in directly", score: 3 },
      { id: "b", text: "Wait and observe", score: 2 },
      { id: "c", text: "Assume they’re not interested", score: 1 },
      { id: "d", text: "Pull back too", score: 0 },
    ],
  },
  {
    id: "q7",
    prompt: "What do you value most long-term?",
    options: [
      { id: "a", text: "Consistency and loyalty", score: 3 },
      { id: "b", text: "Growth and shared goals", score: 3 },
      { id: "c", text: "Adventure and fun", score: 2 },
      { id: "d", text: "Peace and emotional stability", score: 3 },
    ],
  },
  {
    id: "q8",
    prompt: "If the connection is great but timing is messy, you…",
    options: [
      { id: "a", text: "Try to make it work anyway", score: 2 },
      { id: "b", text: "Step back and protect your peace", score: 3 },
      { id: "c", text: "Keep it casual", score: 1 },
      { id: "d", text: "Let it go if it drains you", score: 3 },
    ],
  },
];

const FEEDBACK: Record<string, Record<string, string>> = {
  q1: {
    a: "Ooo you read energy fast. That’s a strong emotional radar.",
    b: "Values-first. You don’t want random.",
    c: "You notice attraction — normal, just don’t let it lead alone.",
    d: "You care how it *feels* in convo. That’s a real signal.",
  },
  q2: {
    a: "Thoughtful dates = you like intention. Not bad at all.",
    b: "Spontaneous? You like chemistry and momentum.",
    c: "Low pressure = you move best when it’s easy.",
    d: "Deep talk early? You’re wired for realness.",
  },
  q3: {
    a: "Healthy. You don’t let tension rot.",
    b: "Space then calm is mature. Respect.",
    c: "Avoiding conflict can cost you later — I’ll help with that.",
    d: "Humor helps, just don’t use it to dodge the real talk.",
  },
  q4: {
    a: "Emotional safety is your foundation. Solid.",
    b: "You’re built for growth. That’s rare.",
    c: "You want passion — just pair it with stability.",
    d: "Feeling understood is a big love language for you.",
  },
  q5: {
    a: "Grounded partners keep your nervous system soft. Nice.",
    b: "You like someone who sharpens you.",
    c: "You love sparkle — just watch for inconsistency.",
    d: "Being seen quickly matters to you. I get that.",
  },
  q6: {
    a: "Direct check-ins = secure energy.",
    b: "Observing first can be wise — as long as you communicate.",
    c: "You feel shifts deeply. I’ll help you read them clearer.",
    d: "Matching distance is self-protection. Makes sense.",
  },
  q7: {
    a: "You want something steady and loyal. Love that.",
    b: "Growth together is elite relationship thinking.",
    c: "Fun matters to you. Keeps love alive.",
    d: "Peace is priceless. You’re not into chaos.",
  },
  q8: {
    a: "You fight for connection — but protect your heart too.",
    b: "Peace-first. That’s self-respect.",
    c: "Casual works when you don’t want pressure.",
    d: "You don’t stay where you shrink. Good instinct.",
  },
};

export default function QuizPage() {
  const router = useRouter();
  const totalQuestions = QUESTIONS.length;

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Option>>({});
  const [isThinking, setIsThinking] = useState(false);
  const [lumiLine, setLumiLine] = useState<string | null>(null);

  const current = QUESTIONS[index];
  const selected = answers[current.id];

  const progress = useMemo(() => {
    return Math.round((index / totalQuestions) * 100);
  }, [index, totalQuestions]);

  function goBack() {
    if (isThinking) return;
    if (index === 0) return;
    setLumiLine(null);
    setIndex(index - 1);
  }

  function pickOption(opt: Option) {
    if (isThinking) return;

    const nextAnswers = {
      ...answers,
      [current.id]: opt,
    };
    setAnswers(nextAnswers);

    setLumiLine(FEEDBACK[current.id]?.[opt.id] ?? "Noted. I’m tracking your vibe.");

    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);

      if (index + 1 < totalQuestions) {
        setIndex(index + 1);
        setLumiLine(null);
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
    }, 1100);
  }

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-16">
      <div className="mb-8">
        <LumiOrb />
      </div>

      <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-white/70">
            Question {index + 1} of {totalQuestions}
          </p>
          <p className="text-sm text-white/70">{progress}%</p>
        </div>

        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mb-6">
          <button
            onClick={goBack}
            disabled={index === 0 || isThinking}
            className={`text-sm px-3 py-2 rounded-lg border transition ${
              index === 0 || isThinking
                ? "border-white/10 bg-white/5 opacity-50 cursor-not-allowed"
                : "border-white/20 bg-white/5 hover:bg-white/10"
            }`}
          >
            ← Back
          </button>
        </div>

        <div className="flex items-start justify-between gap-3 mb-4">
          <h1 className="text-2xl md:text-3xl font-semibold leading-snug">
            {current.prompt}
          </h1>

          <LumiVoiceButton
            text={current.prompt}
            disabled={isThinking}
            preface="Okay, quick question."
            className="shrink-0"
          />
        </div>

        {lumiLine && (
          <div className="mb-4 text-white/80 text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-3">
            <span className="text-white/60 mr-2">Lumi:</span>
            {lumiLine}
          </div>
        )}

        {isThinking && (
          <TypingBubble className="mb-5" label="Lumi is processing your vibe…" />
        )}

        <div className="grid grid-cols-1 gap-3">
          {current.options.map((opt) => {
            const isSelected = selected?.id === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => pickOption(opt)}
                disabled={isThinking}
                className={`text-left px-5 py-4 rounded-2xl border transition ${
                  isThinking
                    ? "bg-white/5 border-white/10 opacity-60 cursor-not-allowed"
                    : isSelected
                    ? "bg-white/15 border-white/30"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                {opt.text}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
