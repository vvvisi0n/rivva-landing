"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LumiOrb from "@/components/LumiOrb";
import TypingBubble from "@/components/TypingBubble";
import LumiVoiceButton from "@/components/LumiVoiceButton";

type Option = { id: string; text: string; score: number };
type AnswersMap = Record<string, Option>;

type Tier = {
  key: "low" | "mid" | "high";
  title: string;
  subtitle: string;
  lumiSummary: string;
  traits: string[];
  colorClass: string;
};

const TIERS: Tier[] = [
  {
    key: "low",
    title: "Explorer Energy",
    subtitle: "You connect through curiosity and momentum.",
    lumiSummary:
      "You’re still calibrating what *really* feels right — and that’s a strength. You move toward chemistry first, then decide if it has legs. Lumi would help you spot patterns early so excitement doesn’t turn into confusion.",
    traits: [
      "You’re led by spark + spontaneity",
      "You value fun and freedom early on",
      "You warm up emotionally over time",
    ],
    colorClass: "from-fuchsia-500 to-cyan-400",
  },
  {
    key: "mid",
    title: "Balanced Connector",
    subtitle: "You want chemistry *and* clarity.",
    lumiSummary:
      "You’re the sweet spot: heart + logic. You don’t chase only vibes or only stability — you want both. Lumi would help you filter for people who feel easy, consistent, and *actually aligned* with you.",
    traits: [
      "You seek emotional comfort + attraction",
      "You like steady pacing",
      "You want conversations that flow naturally",
    ],
    colorClass: "from-purple-500 to-sky-400",
  },
  {
    key: "high",
    title: "Deep Bond Builder",
    subtitle: "You connect through emotional safety and meaning.",
    lumiSummary:
      "You’re built for real partnership. You want depth, clarity, and someone who feels safe to grow with. Lumi would help you find emotionally steady people who can meet you there.",
    traits: [
      "You prioritize emotional safety",
      "You want shared values",
      "You’re oriented toward long-term love",
    ],
    colorClass: "from-indigo-500 to-purple-400",
  },
];

function getTier(score: number): Tier {
  if (score <= 5) return TIERS[0];
  if (score <= 9) return TIERS[1];
  return TIERS[2];
}

// Answer-based reads
const ANSWER_READS: Record<string, Record<string, string>> = {
  q1: {
    a: "You’re tuned into energy first — you can *feel* compatibility before you can explain it.",
    b: "Shared values are your anchor. You want alignment early, not surprises later.",
    c: "Attraction matters, and you’re honest about it. Chemistry is part of safety for you.",
    d: "Conversation flow is your first filter. If it’s easy to talk, you feel open fast.",
  },
  q2: {
    a: "Thoughtful dates hit you deep. You want to feel chosen, not just entertained.",
    b: "You’re at your best when things feel alive and a little unpredictable.",
    c: "Low-pressure starts help you relax into someone naturally.",
    d: "You love a first date that feels like a real exchange — not small talk.",
  },
  q3: {
    a: "You don’t let tension sit. Clarity makes you feel close.",
    b: "You regulate before responding. You value calm truth over heat.",
    c: "Conflict drains you, so you avoid it unless it’s worth it.",
    d: "You soften stress with humor. You prefer repair over intensity.",
  },
  q4: {
    a: "Emotional safety is your foundation. Without it, nothing else matters.",
    b: "You want a relationship that levels both of you up.",
    c: "You need excitement in love — passion keeps you engaged.",
    d: "Being understood is everything. You want your inner world seen.",
  },
};

function buildPersonalInsights(answers: AnswersMap | null) {
  if (!answers) return [];
  const reads: string[] = [];

  for (const qId of Object.keys(answers)) {
    const a = answers[qId];
    const read = ANSWER_READS[qId]?.[a.id];
    if (read) reads.push(read);
  }
  return reads;
}

export default function QuizResultsPage() {
  const router = useRouter();

  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswersMap | null>(null);
  const [thinking, setThinking] = useState(true);

  useEffect(() => {
    const rawScore = sessionStorage.getItem("rivva_quiz_score");
    const rawAnswers = sessionStorage.getItem("rivva_quiz_answers");

    if (!rawScore || !rawAnswers) {
      setThinking(false);
      setScore(null);
      setAnswers(null);
      return;
    }

    try {
      const parsedScore = Number(rawScore);
      const parsedAnswers = JSON.parse(rawAnswers) as AnswersMap;
      setScore(parsedScore);
      setAnswers(parsedAnswers);
    } catch (e) {
      console.error(e);
      setScore(null);
      setAnswers(null);
    } finally {
      const t = setTimeout(() => setThinking(false), 700);
      return () => clearTimeout(t);
    }
  }, []);

  const tier = useMemo(() => {
    if (score == null) return null;
    return getTier(score);
  }, [score]);

  const personalInsights = useMemo(
    () => buildPersonalInsights(answers),
    [answers]
  );

  function retake() {
    sessionStorage.removeItem("rivva_quiz_score");
    sessionStorage.removeItem("rivva_quiz_answers");
    router.push("/quiz");
  }

  const voiceText = tier
    ? [
        `Okay, here’s what I’m seeing.`,
        `You read as a ${tier.title}. ${tier.subtitle}`,
        tier.lumiSummary,
        personalInsights.length
          ? `A few specific things from your answers: ${personalInsights.join(
              " "
            )}`
          : "",
      ]
        .filter(Boolean)
        .join(" ")
    : "I can’t see your results right now. Let’s retake the quiz and I’ll read your vibe again.";

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-16">
      <div className="mb-6">
        <LumiOrb />
      </div>

      <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl text-center">
        {thinking && (
          <TypingBubble
            className="mb-6"
            label="Lumi is analyzing your vibe…"
          />
        )}

        {!thinking && !tier && (
          <>
            <h1 className="text-3xl font-bold mb-3">No Results Found</h1>
            <p className="text-white/70 mb-8">
              Looks like your quiz data isn’t here (maybe you refreshed).
              Just retake it and Lumi will re-read your vibe.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={retake}
                className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
              >
                Retake Quiz
              </button>
              <Link
                href="/"
                className="px-6 py-3 rounded-xl bg-white/10 border border-white/15 font-semibold hover:bg-white/15 transition"
              >
                Back Home
              </Link>
            </div>
          </>
        )}

        {!thinking && tier && score != null && (
          <>
            {/* Score badge */}
            <div
              className={`inline-flex items-center justify-center px-4 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${tier.colorClass} text-black mb-4`}
            >
              Your score: {score}/12
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
              {tier.title}
            </h1>
            <p className="text-white/75 mb-6">{tier.subtitle}</p>

            {/* Lumi summary */}
            <div className="text-left bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-semibold mb-2">Lumi’s Read</h2>
              <p className="text-white/80 leading-relaxed">
                {tier.lumiSummary}
              </p>
            </div>

            {/* Personalized insights */}
            {personalInsights.length > 0 && (
              <div className="text-left bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-semibold mb-3">
                  What your answers reveal
                </h3>
                <ul className="space-y-2 text-white/80">
                  {personalInsights.map((ins, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-purple-300">•</span>
                      <span>{ins}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Traits */}
            <div className="text-left mb-8">
              <h3 className="text-lg font-semibold mb-3">
                Your relationship vibe
              </h3>
              <ul className="space-y-2 text-white/80">
                {tier.traits.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="text-purple-300">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Voice */}
            <div className="mb-8 flex justify-center">
              <LumiVoiceButton text={voiceText} />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={retake}
                className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
              >
                Retake Quiz
              </button>
              <Link
                href="/"
                className="px-6 py-3 rounded-xl bg-white/10 border border-white/15 font-semibold hover:bg-white/15 transition"
              >
                Back Home
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
