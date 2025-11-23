"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import LumiOrb from "@/components/LumiOrb";
import TypingBubble from "@/components/TypingBubble";
import LumiVoiceButton from "@/components/LumiVoiceButton";

type Goals =
  | "serious"
  | "casual"
  | "friends_first"
  | "open_minded";

type Comms =
  | "direct"
  | "gentle"
  | "playful"
  | "slow_burn";

type Boundaries =
  | "need_space"
  | "consistency"
  | "no_games"
  | "honesty";

type OnboardingState = {
  name: string;
  gender: string;
  orientation: string;
  goal: Goals;
  communication: Comms;
  boundaries: Boundaries[];
  completedAt?: string;
};

const GOAL_LABEL: Record<Goals, string> = {
  serious: "Serious relationship",
  casual: "Casual & fun",
  friends_first: "Friends first",
  open_minded: "Open-minded",
};

const COMMS_LABEL: Record<Comms, string> = {
  direct: "Direct & clear",
  gentle: "Gentle & emotionally aware",
  playful: "Playful & flirty",
  slow_burn: "Slow-burn & intentional",
};

const BOUNDARY_LABEL: Record<Boundaries, string> = {
  need_space: "Needs space sometimes",
  consistency: "Consistency over intensity",
  no_games: "No games / mixed signals",
  honesty: "Radical honesty",
};

function buildVibeProfile(d: OnboardingState) {
  const traits: string[] = [];

  // goal-based
  if (d.goal === "serious") traits.push("intentional", "commitment-minded");
  if (d.goal === "casual") traits.push("lighthearted", "go-with-the-flow");
  if (d.goal === "friends_first") traits.push("slow-builder", "trust-first");
  if (d.goal === "open_minded") traits.push("curious", "open-energy");

  // communication-based
  if (d.communication === "direct") traits.push("straight-shooting");
  if (d.communication === "gentle") traits.push("emotionally present");
  if (d.communication === "playful") traits.push("spark-driven");
  if (d.communication === "slow_burn") traits.push("steady-pace");

  // boundary-based
  if (d.boundaries.includes("consistency")) traits.push("stability-seeking");
  if (d.boundaries.includes("honesty")) traits.push("truth-anchored");
  if (d.boundaries.includes("no_games")) traits.push("clarity-demanding");
  if (d.boundaries.includes("need_space")) traits.push("self-regulated");

  // unique + keep it clean
  return Array.from(new Set(traits));
}

export default function OnboardingSummaryPage() {
  const router = useRouter();
  const [data, setData] = useState<OnboardingState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = sessionStorage.getItem("rivva_onboarding");
    if (!raw) {
      router.replace("/onboarding");
      return;
    }
    try {
      setData(JSON.parse(raw));
    } catch {
      router.replace("/onboarding");
      return;
    } finally {
      setLoading(false);
    }
  }, [router]);

  const vibe = useMemo(() => (data ? buildVibeProfile(data) : []), [data]);

  const voiceText = useMemo(() => {
    if (!data) return "";
    return `Alright ${data.name}. Here’s what I learned. You're looking for ${GOAL_LABEL[data.goal]}. 
    Your communication style is ${COMMS_LABEL[data.communication]}. 
    Your boundaries are ${data.boundaries.map(b => BOUNDARY_LABEL[b]).join(", ")}. 
    I’ll use this vibe profile to shape your matches. Ready to continue?`;
  }, [data]);

  if (loading || !data) {
    return (
      <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center justify-center px-6 py-16">
        <TypingBubble label="Lumi is summarizing your vibe…" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-16">
      <div className="mb-8">
        <LumiOrb />
      </div>

      <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Your Rivva Vibe Profile
        </h1>
        <p className="text-white/70 mb-8">
          I’ll tune your matchmaking around this.
        </p>

        {/* Quick facts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-8">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-xs text-white/60 mb-1">Name</p>
            <p className="text-lg font-semibold">{data.name}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-xs text-white/60 mb-1">Goal</p>
            <p className="text-lg font-semibold">{GOAL_LABEL[data.goal]}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-xs text-white/60 mb-1">Communication</p>
            <p className="text-lg font-semibold">{COMMS_LABEL[data.communication]}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-xs text-white/60 mb-1">Boundaries</p>
            <p className="text-sm text-white/80">
              {data.boundaries.map(b => BOUNDARY_LABEL[b]).join(" • ")}
            </p>
          </div>
        </div>

        {/* Vibe tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {vibe.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sm"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Voice */}
        <div className="flex justify-center mb-8">
          <LumiVoiceButton textToSpeak={voiceText} />
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => router.push("/onboarding")}
            className="flex-1 px-6 py-3 rounded-xl bg-white/10 border border-white/20 font-semibold hover:bg-white/15 transition"
          >
            Edit Answers
          </button>
          <button
            onClick={() => router.push("/quiz")}
            className="flex-1 px-6 py-3 rounded-xl bg-purple-600 font-semibold hover:bg-purple-700 transition"
          >
            Continue to Quiz
          </button>
        </div>
      </div>
    </main>
  );
}
