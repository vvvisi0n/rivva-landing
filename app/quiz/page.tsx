"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import LumiOrb from "@/components/LumiOrb";
import TypingBubble from "@/components/TypingBubble";
import LumiVoiceButton from "@/components/LumiVoiceButton";

type Traits = {
  emotional: number;
  playful: number;
  adventurous: number;
  grounded: number;
};

type Option = {
  id: string;
  text: string;
  traits: Partial<Traits>;
};

type Question = {
  id: string;
  prompt: string;
  options: Option[];
};

const QUESTIONS: Question[] = [
  {
    id: "q1",
    prompt: "When you meet someone new, what pulls you in first?",
    options: [
      { id: "a", text: "Their energy / vibe", traits: { playful: 2, emotional: 1 } },
      { id: "b", text: "How they think + speak", traits: { grounded: 2, emotional: 1 } },
      { id: "c", text: "Physical attraction", traits: { adventurous: 1, playful: 1 } },
      { id: "d", text: "The conversation flow", traits: { emotional: 2, grounded: 1 } },
    ],
  },
  {
    id: "q2",
    prompt: "Your ideal first date is…",
    options: [
      { id: "a", text: "Something thoughtful + personal", traits: { emotional: 2, grounded: 1 } },
      { id: "b", text: "Fun + spontaneous", traits: { playful: 2, adventurous: 1 } },
      { id: "c", text: "Low-pressure chill hang", traits: { grounded: 2 } },
      { id: "d", text: "Deep talk over coffee", traits: { emotional: 2, grounded: 1 } },
    ],
  },
  {
    id: "q3",
    prompt: "If you like someone, you usually…",
    options: [
      { id: "a", text: "Show it openly", traits: { emotional: 2 } },
      { id: "b", text: "Flirt/play around", traits: { playful: 2 } },
      { id: "c", text: "Wait and watch", traits: { grounded: 2 } },
      { id: "d", text: "Make a bold move", traits: { adventurous: 2, playful: 1 } },
    ],
  },
  {
    id: "q4",
    prompt: "When conflict pops up, your instinct is to…",
    options: [
      { id: "a", text: "Talk it out asap", traits: { emotional: 2, grounded: 1 } },
      { id: "b", text: "Take space then return calm", traits: { grounded: 2 } },
      { id: "c", text: "Avoid it if possible", traits: { playful: 1 } },
      { id: "d", text: "Use humor to soften it", traits: { playful: 2 } },
    ],
  },
  {
    id: "q5",
    prompt: "A relationship feels right when…",
    options: [
      { id: "a", text: "You feel emotionally safe", traits: { emotional: 2 } },
      { id: "b", text: "You grow together", traits: { grounded: 1, emotional: 1 } },
      { id: "c", text: "It’s exciting + passionate", traits: { adventurous: 2, playful: 1 } },
      { id: "d", text: "You feel deeply understood", traits: { emotional: 2, grounded: 1 } },
    ],
  },
  {
    id: "q6",
    prompt: "On a weekend with your person, you’d rather…",
    options: [
      { id: "a", text: "Stay in and connect", traits: { emotional: 2, grounded: 1 } },
      { id: "b", text: "Go somewhere new", traits: { adventurous: 2 } },
      { id: "c", text: "Do something light + fun", traits: { playful: 2 } },
      { id: "d", text: "Handle some life stuff together", traits: { grounded: 2 } },
    ],
  },
  {
    id: "q7",
    prompt: "What drains you fastest in dating?",
    options: [
      { id: "a", text: "Inconsistency", traits: { grounded: 2 } },
      { id: "b", text: "Dry conversations", traits: { playful: 2 } },
      { id: "c", text: "Emotional coldness", traits: { emotional: 2 } },
      { id: "d", text: "Too much routine", traits: { adventurous: 2 } },
    ],
  },
  {
    id: "q8",
    prompt: "Your love language vibe is closest to…",
    options: [
      { id: "a", text: "Words + emotional presence", traits: { emotional: 2 } },
      { id: "b", text: "Play + laughter", traits: { playful: 2 } },
      { id: "c", text: "Acts of care + reliability", traits: { grounded: 2 } },
      { id: "d", text: "Adventure + shared experiences", traits: { adventurous: 2 } },
    ],
  },
  {
    id: "q9",
    prompt: "When someone likes you, you want them to…",
    options: [
      { id: "a", text: "Be clear about it", traits: { grounded: 2 } },
      { id: "b", text: "Show effort", traits: { grounded: 1, emotional: 1 } },
      { id: "c", text: "Keep it exciting", traits: { adventurous: 2 } },
      { id: "d", text: "Make you feel seen", traits: { emotional: 2 } },
    ],
  },
  {
    id: "q10",
    prompt: "Your best relationships usually start with…",
    options: [
      { id: "a", text: "A strong emotional click", traits: { emotional: 2 } },
      { id: "b", text: "A playful spark", traits: { playful: 2 } },
      { id: "c", text: "A steady build", traits: { grounded: 2 } },
      { id: "d", text: "A wild unexpected moment", traits: { adventurous: 2, playful: 1 } },
    ],
  },
];

const EMPTY_TRAITS: Traits = {
  emotional: 0,
  playful: 0,
  adventurous: 0,
  grounded: 0,
};

export default function QuizPage() {
  const router = useRouter();
  const totalQuestions = QUESTIONS.length;

  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Option>>({});
  const [isThinking, setIsThinking] = useState(false);

  const current = QUESTIONS[index];
  const selectedForCurrent = answers[current.id];

  const progress = useMemo(
    () => Math.round((index / totalQuestions) * 100),
    [index, totalQuestions]
  );

  function startQuiz() {
    setStarted(true);
  }

  function addTraits(base: Traits, inc: Partial<Traits>) {
    return {
      emotional: base.emotional + (inc.emotional ?? 0),
      playful: base.playful + (inc.playful ?? 0),
      adventurous: base.adventurous + (inc.adventurous ?? 0),
      grounded: base.grounded + (inc.grounded ?? 0),
    };
  }

  function goBack() {
    if (isThinking) return;
    if (index === 0) return;
    setIndex((i) => i - 1);
  }

  function pickOption(opt: Option) {
    if (isThinking) return;

    const nextAnswers = { ...answers, [current.id]: opt };
    setAnswers(nextAnswers);

    // Lumi “thinking” micro-pause
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);

      if (index + 1 < totalQuestions) {
        setIndex((i) => i + 1);
      } else {
        const totals = Object.values(nextAnswers).reduce((acc, a) => {
          return addTraits(acc, a.traits);
        }, EMPTY_TRAITS);

        const topTrait = (Object.entries(totals) as [keyof Traits, number][])
          .sort((a, b) => b[1] - a[1])[0][0];

        sessionStorage.setItem("rivva_quiz_totals", JSON.stringify(totals));
        sessionStorage.setItem("rivva_quiz_profile", topTrait);
        sessionStorage.setItem("rivva_quiz_answers", JSON.stringify(nextAnswers));

        router.push("/quiz/results");
      }
    }, 700);
  }

  if (!started) {
    return (
      <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-8">
          <LumiOrb />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Lumi’s Compatibility Scan
        </h1>

        <p className="mt-4 text-white/75 max-w-xl leading-relaxed">
          I’ll ask a few quick questions to read your emotional vibe — how you
          connect, communicate, and what feels “right” for you.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <LumiVoiceButton textToSpeak="I’m Lumi. Answer honestly, and I’ll map your vibe in seconds." />
          <span className="text-sm text-white/70">Hear Lumi explain it</span>
        </div>

        <button
          onClick={startQuiz}
          className="mt-10 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-400 text-black font-semibold text-lg hover:opacity-90 transition shadow-lg"
        >
          Start Quiz
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-16">
      <div className="mb-8">
        <LumiOrb />
      </div>

      <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">
        {/* Top row: back + progress */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={goBack}
            disabled={index === 0 || isThinking}
            className={`text-sm px-3 py-1 rounded-lg border transition
              ${
                index === 0 || isThinking
                  ? "opacity-40 border-white/10 cursor-not-allowed"
                  : "border-white/20 hover:bg-white/10"
              }`}
          >
            ← Back
          </button>

          <div className="text-sm text-white/70">
            Question {index + 1} of {totalQuestions} • {progress}%
          </div>
        </div>

        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-8">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Animated question block */}
        <div key={current.id} className="quiz-fade">
          <h1 className="text-2xl md:text-3xl font-semibold leading-snug mb-6">
            {current.prompt}
          </h1>

          {isThinking && (
            <TypingBubble className="mb-6" label="Lumi is processing your vibe…" />
          )}

          <div className="grid grid-cols-1 gap-3">
            {current.options.map((opt) => {
              const isSelected = selectedForCurrent?.id === opt.id;

              return (
                <button
                  key={opt.id}
                  onClick={() => pickOption(opt)}
                  disabled={isThinking}
                  className={`text-left px-5 py-4 rounded-2xl border transition
                    ${
                      isThinking
                        ? "bg-white/5 border-white/10 opacity-60 cursor-not-allowed"
                        : isSelected
                        ? "bg-white/15 border-white/40 shadow-md"
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                    }`}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Simple fade/slide animation (no plugins needed) */}
      <style jsx global>{`
        @keyframes quizFade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .quiz-fade {
          animation: quizFade 0.35s ease;
        }
      `}</style>
    </main>
  );
}
