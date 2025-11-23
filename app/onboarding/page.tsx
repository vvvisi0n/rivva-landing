"use client";

import { useRouter } from "next/navigation";
import LumiOrb from "@/components/LumiOrb";
import LumiVoiceButton from "@/components/LumiVoiceButton";

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-8">
        <LumiOrb />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-3">
        Welcome to Lumi
      </h1>

      <p className="text-white/75 max-w-xl leading-relaxed">
        I’m Lumi — your emotional-intelligence dating companion.  
        I’ll help you find matches that feel right, not random.
      </p>

      <div className="mt-6">
        <LumiVoiceButton textToSpeak="Welcome to Lumi. Let’s tune your dating vibe and get you closer to real connection." />
      </div>

      <div className="mt-10 w-full max-w-md flex flex-col gap-3">
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:opacity-90 transition"
        >
          Go to Home
        </button>

        <button
          onClick={() => router.push("/quiz")}
          className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 font-semibold hover:bg-white/15 transition"
        >
          Retake the Quiz
        </button>
      </div>

      <p className="text-xs text-white/50 mt-6">
        Onboarding steps coming next (profile, preferences, boundaries, goals).
      </p>
    </main>
  );
}
