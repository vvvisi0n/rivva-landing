"use client";

import Link from "next/link";
import LumiOrb from "@/components/LumiOrb";

export default function FinishPage() {
  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-10">
        <LumiOrb />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-3">
        You’re in. 🖤
      </h1>

      <p className="text-white/75 max-w-xl leading-relaxed mb-8">
        I’ve got your foundation. Next, I’ll use your profile + quiz vibe to
        build your compatibility blueprint.
      </p>

      <Link
        href="/dashboard"
        className="px-7 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 text-black font-semibold hover:opacity-90 transition active:scale-[0.98]"
      >
        Go to your Lumi Dashboard
      </Link>
    </main>
  );
}
