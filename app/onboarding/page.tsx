"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import LumiOrb from "@/components/LumiOrb";
import TypingBubble from "@/components/TypingBubble";
import LumiVoiceButton from "@/components/LumiVoiceButton";
import OnboardingProgress from "@/components/OnboardingProgress";

type Goals =
  | "serious"
  | "casual"
  | "friends_first"
  | "open_minded"
  | "";

type Comms =
  | "direct"
  | "gentle"
  | "playful"
  | "slow_burn"
  | "";

type Boundaries =
  | "need_space"
  | "consistency"
  | "no_games"
  | "honesty"
  | "";

type OnboardingState = {
  name: string;
  gender: string;
  orientation: string;
  goal: Goals;
  communication: Comms;
  boundaries: Boundaries[];
};

const TOTAL_STEPS = 4;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isThinking, setIsThinking] = useState(false);

  const [data, setData] = useState<OnboardingState>({
    name: "",
    gender: "",
    orientation: "",
    goal: "",
    communication: "",
    boundaries: [],
  });

  function nextStep() {
    if (isThinking) return;
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      setStep((s) => Math.min(TOTAL_STEPS, s + 1));
    }, 700);
  }

  function prevStep() {
    if (isThinking) return;
    setStep((s) => Math.max(1, s - 1));
  }

  function toggleBoundary(b: Boundaries) {
    setData((d) => {
      const exists = d.boundaries.includes(b);
      return {
        ...d,
        boundaries: exists
          ? d.boundaries.filter((x) => x !== b)
          : [...d.boundaries, b],
      };
    });
  }

  const canContinue = useMemo(() => {
    if (step === 1) return data.name.trim().length >= 2;
    if (step === 2) return !!data.gender && !!data.orientation;
    if (step === 3) return !!data.goal;
    if (step === 4) return !!data.communication && data.boundaries.length > 0;
    return false;
  }, [step, data]);

  function finish() {
    const payload = {
      ...data,
      completedAt: new Date().toISOString(),
    };
    sessionStorage.setItem("rivva_onboarding", JSON.stringify(payload));
    router.push("/quiz");
  }

  const voiceText = useMemo(() => {
    if (step === 1) return "First, tell me your name so I can personalize your experience.";
    if (step === 2) return "How do you identify, and who are you open to dating?";
    if (step === 3) return "What are you looking for right now?";
    return "How should people love you? Pick your communication style and your boundaries.";
  }, [step]);

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-12">
      {/* Orb */}
      <div className="mb-6">
        <LumiOrb />
      </div>

      {/* Progress */}
      <OnboardingProgress step={step} total={TOTAL_STEPS} />

      {/* Card */}
      <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">
        {/* Step titles */}
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          {step === 1 && "Let’s start simple"}
          {step === 2 && "Your identity & preferences"}
          {step === 3 && "Your relationship goal"}
          {step === 4 && "Your communication + boundaries"}
        </h1>
        <p className="text-white/70 mb-6">
          {step === 1 && "This helps Lumi talk to you like a real person."}
          {step === 2 && "So Rivva matches your world accurately."}
          {step === 3 && "We’ll tune your vibe toward what you want now."}
          {step === 4 && "So your matches feel safe, aligned, and easy."}
        </p>

        {isThinking && (
          <TypingBubble className="mb-6" label="Lumi is tuning your profile…" />
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <label className="text-sm text-white/70">What should I call you?</label>
            <input
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Your first name"
              className="w-full p-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <p className="text-sm text-white/70 mb-2">You identify as:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {["Man", "Woman", "Non-binary"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setData({ ...data, gender: g })}
                    className={`px-4 py-3 rounded-xl border transition
                      ${data.gender === g
                        ? "bg-purple-600 border-purple-400"
                        : "bg-white/5 border-white/10 hover:bg-white/10"}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-white/70 mb-2">You’re open to dating:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {["Men", "Women", "Everyone"].map((o) => (
                  <button
                    key={o}
                    onClick={() => setData({ ...data, orientation: o })}
                    className={`px-4 py-3 rounded-xl border transition
                      ${data.orientation === o
                        ? "bg-purple-600 border-purple-400"
                        : "bg-white/5 border-white/10 hover:bg-white/10"}`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: "serious", label: "A serious relationship" },
              { id: "casual", label: "Something casual & fun" },
              { id: "friends_first", label: "Friends first, then see" },
              { id: "open_minded", label: "Open-minded, feel it out" },
            ].map((g) => (
              <button
                key={g.id}
                onClick={() => setData({ ...data, goal: g.id as Goals })}
                className={`text-left px-5 py-4 rounded-2xl border transition
                  ${data.goal === g.id
                    ? "bg-purple-600 border-purple-400"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"}`}
              >
                {g.label}
              </button>
            ))}
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="space-y-8">
            <div>
              <p className="text-sm text-white/70 mb-2">
                Your communication style:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: "direct", label: "Direct & clear" },
                  { id: "gentle", label: "Gentle & emotionally aware" },
                  { id: "playful", label: "Playful & flirty" },
                  { id: "slow_burn", label: "Slow-burn & intentional" },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() =>
                      setData({ ...data, communication: c.id as Comms })
                    }
                    className={`px-4 py-3 rounded-xl border transition
                      ${data.communication === c.id
                        ? "bg-purple-600 border-purple-400"
                        : "bg-white/5 border-white/10 hover:bg-white/10"}`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-white/70 mb-2">
                Pick your boundaries (choose at least 1):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: "need_space", label: "I need space sometimes" },
                  { id: "consistency", label: "Consistency over intensity" },
                  { id: "no_games", label: "No games, no mixed signals" },
                  { id: "honesty", label: "Radical honesty always" },
                ].map((b) => {
                  const active = data.boundaries.includes(b.id as Boundaries);
                  return (
                    <button
                      key={b.id}
                      onClick={() => toggleBoundary(b.id as Boundaries)}
                      className={`px-4 py-3 rounded-xl border transition text-left
                        ${active
                          ? "bg-purple-600 border-purple-400"
                          : "bg-white/5 border-white/10 hover:bg-white/10"}`}
                    >
                      {b.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Voice */}
        <div className="mt-8 flex justify-center">
          <LumiVoiceButton textToSpeak={voiceText} />
        </div>

        {/* Nav buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="flex-1 px-6 py-3 rounded-xl bg-white/10 border border-white/20 font-semibold hover:bg-white/15 transition"
            >
              Back
            </button>
          )}

          {step < TOTAL_STEPS && (
            <button
              onClick={nextStep}
              disabled={!canContinue}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition
                ${canContinue
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-purple-400/40 cursor-not-allowed"}`}
            >
              Continue
            </button>
          )}

          {step === TOTAL_STEPS && (
            <button
              onClick={finish}
              disabled={!canContinue}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition
                ${canContinue
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-purple-400/40 cursor-not-allowed"}`}
            >
              Finish Setup
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
