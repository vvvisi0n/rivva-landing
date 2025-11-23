"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import LumiOrb from "@/components/LumiOrb";
import LumiVoiceButton from "@/components/LumiVoiceButton";

type Traits = {
  emotional: number;
  playful: number;
  adventurous: number;
  grounded: number;
};

type AnswerMap = Record<
  string,
  { id: string; text: string; traits?: Partial<Traits> }
>;

const PROFILE_COPY: Record<
  keyof Traits,
  {
    title: string;
    subtitle: string;
    description: string;
    strengths: string[];
    needs: string[];
    matchesWith: string[];
    lumiLine: string;
  }
> = {
  emotional: {
    title: "The Emotional Connector",
    subtitle: "You fall for feeling, safety, and depth.",
    description:
      "You’re wired for real connection. You notice tone, presence, and how someone makes you feel. Your best relationships are emotionally safe, consistent, and mutually caring.",
    strengths: [
      "Deep empathy",
      "Clear emotional instincts",
      "Loyal + warm partner energy",
    ],
    needs: [
      "Emotional reciprocity",
      "Consistency",
      "Communication that feels human",
    ],
    matchesWith: ["Grounded Builders", "Playful Sparklers"],
    lumiLine:
      "Your vibe is emotional clarity. You don’t just date — you bond.",
  },
  playful: {
    title: "The Playful Spark",
    subtitle: "You connect through laughter, ease, and chemistry.",
    description:
      "You’re at your best when dating feels light and alive. Play is your language — you bond through humor, teasing, and shared joy. You want a partner who brings fun without being shallow.",
    strengths: [
      "Magnetic charm",
      "Keeps love fun",
      "Natural flirt energy",
    ],
    needs: ["Mutual effort", "Curiosity", "A partner who can vibe"],
    matchesWith: ["Emotional Connectors", "Adventurous Explorers"],
    lumiLine:
      "Your vibe is playful electricity. If it’s not fun, it’s not you.",
  },
  adventurous: {
    title: "The Adventurous Explorer",
    subtitle: "You fall for momentum, passion, and novelty.",
    description:
      "You’re driven by experience. You want a relationship that feels like movement — travel, new spots, bold conversations, and high spark. You need someone who grows with you, not someone who slows you down.",
    strengths: [
      "Bold romantic energy",
      "Creates memorable moments",
      "High passion capacity",
    ],
    needs: ["Excitement", "Freedom", "A partner who embraces life"],
    matchesWith: ["Playful Sparklers", "Emotional Connectors"],
    lumiLine:
      "Your vibe is forward motion. You want love that evolves.",
  },
  grounded: {
    title: "The Grounded Builder",
    subtitle: "You fall for stability, clarity, and real-world alignment.",
    description:
      "You don’t want chaos. You want a relationship that works in real life — steady communication, consistent effort, shared values, and feelings that grow naturally over time.",
    strengths: [
      "Reliable partner energy",
      "Clear boundaries",
      "Strong long-term radar",
    ],
    needs: ["Consistency", "Trust", "Someone who shows up"],
    matchesWith: ["Emotional Connectors", "Adventurous Explorers"],
    lumiLine:
      "Your vibe is secure structure. You build love that lasts.",
  },
};

export default function QuizResultsPage() {
  const router = useRouter();
  const [totals, setTotals] = useState<Traits | null>(null);
  const [profile, setProfile] = useState<keyof Traits | null>(null);
  const [answers, setAnswers] = useState<AnswerMap | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const rawTotals = sessionStorage.getItem("rivva_quiz_totals");
      const rawProfile = sessionStorage.getItem("rivva_quiz_profile");
      const rawAnswers = sessionStorage.getItem("rivva_quiz_answers");

      if (rawTotals) setTotals(JSON.parse(rawTotals));
      if (rawProfile) setProfile(rawProfile as keyof Traits);
      if (rawAnswers) setAnswers(JSON.parse(rawAnswers));
    } catch (e) {
      console.error(e);
    } finally {
      setMounted(true);
    }
  }, []);

  const maxVal = useMemo(() => {
    if (!totals) return 1;
    return Math.max(...Object.values(totals), 1);
  }, [totals]);

  if (!mounted) return null;

  if (!totals || !profile) {
    return (
      <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-8">
          <LumiOrb />
        </div>
        <h1 className="text-3xl font-bold">No results found</h1>
        <p className="text-white/70 mt-3">
          Looks like your quiz data isn’t here. Try again.
        </p>
        <button
          onClick={() => router.push("/quiz")}
          className="mt-8 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:opacity-90 transition"
        >
          Retake Quiz
        </button>
      </main>
    );
  }

  const copy = PROFILE_COPY[profile];

  const orderedTraits = (Object.entries(totals) as [keyof Traits, number][])
    .sort((a, b) => b[1] - a[1]);

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-16">
      {/* Orb */}
      <div className="mb-8">
        <LumiOrb />
      </div>

      {/* Result Card */}
      <div className="w-full max-w-3xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-xl results-fade">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-white/70">Your Rivva Profile</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-1">
              {copy.title}
            </h1>
            <p className="text-white/80 mt-2">{copy.subtitle}</p>
          </div>

          <div className="shrink-0">
            <LumiVoiceButton textToSpeak={copy.lumiLine} />
          </div>
        </div>

        <p className="mt-6 text-white/75 leading-relaxed">
          {copy.description}
        </p>

        {/* Trait Bars */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Your Emotional Blueprint
          </h2>

          <div className="space-y-3">
            {orderedTraits.map(([k, v]) => {
              const pct = Math.round((v / maxVal) * 100);
              const label =
                k === "emotional"
                  ? "Emotional"
                  : k === "playful"
                  ? "Playful"
                  : k === "adventurous"
                  ? "Adventurous"
                  : "Grounded";

              return (
                <div key={k}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-white/80">{label}</span>
                    <span className="text-white/60">{pct}%</span>
                  </div>
                  <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strengths / Needs */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="font-semibold mb-3">Strengths</h3>
            <ul className="text-sm text-white/75 space-y-2">
              {copy.strengths.map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="font-semibold mb-3">You Need</h3>
            <ul className="text-sm text-white/75 space-y-2">
              {copy.needs.map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="font-semibold mb-3">You Match With</h3>
            <ul className="text-sm text-white/75 space-y-2">
              {copy.matchesWith.map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick recap of answers (optional but nice) */}
        {answers && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-3">Your Answers</h2>
            <div className="space-y-2 text-sm text-white/75">
              {Object.entries(answers).map(([qid, a]) => (
                <div
                  key={qid}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                >
                  <span className="text-white/60 mr-2">{qid.toUpperCase()}:</span>
                  <span>{a.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => router.push("/quiz")}
            className="flex-1 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:opacity-90 transition"
          >
            Retake Quiz
          </button>

          <button
            onClick={() => router.push("/")}
            className="flex-1 px-6 py-3 rounded-xl bg-white/10 border border-white/20 font-semibold hover:bg-white/15 transition"
          >
            Back to Home
          </button>
        </div>

        <p className="text-xs text-white/50 mt-4">
          Want Lumi to refine this over time? Join early access on the home page.
        </p>
      </div>

      {/* global fade */}
      <style jsx global>{`
        @keyframes resultsFade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .results-fade {
          animation: resultsFade 0.45s ease;
        }
      `}</style>
    </main>
  );
}
