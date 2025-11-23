"use client";

import Link from "next/link";
import LumiOrb from "@/components/LumiOrb";

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-10">
        <LumiOrb />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Hey, I’m Lumi ✨
      </h1>

      <p className="text-white/75 max-w-xl leading-relaxed mb-8">
        I’m your AI dating companion. Before Rivva matches you with anyone,
        I want to learn what *actually feels right* for you — beyond photos.
      </p>

      <div className="w-full max-w-md flex flex-col gap-3">
        <Link
          href="/onboarding/profile"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 text-black font-semibold hover:opacity-90 transition active:scale-[0.98]"
        >
          Let’s set up your profile
        </Link>

        <Link
          href="/quiz"
          className="px-6 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition active:scale-[0.98]"
        >
          Take the compatibility quiz first
        </Link>
      </div>

      <p className="text-xs text-white/50 mt-6">
        Takes about 45 seconds.
      </p>
    </main>
  );
}
