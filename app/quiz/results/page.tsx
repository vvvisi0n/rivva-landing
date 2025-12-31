"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import RivvaOrb from "@/components/RivvaOrb";
import useLumiVoice from "@/components/useLumiVoice";
import { loadProfile } from "@/lib/profile";

type QuizResult = {
  title: string;
  subtitle: string;
  description: string;
  strengths: string[];
  growth: string[];
};

function safeReadJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function buildFallbackResult(): QuizResult {
  return {
    title: "Compatibility read",
    subtitle: "A calmer signal.",
    description:
      "Rivva is designed to reduce noise and surface alignment. Your results will appear here after you complete the quiz.",
    strengths: ["Clarity", "Intentional pacing", "Emotional awareness"],
    growth: ["Consistency over intensity", "Boundaries that feel natural", "Choosing calm over chaos"],
  };
}

export default function QuizResultsPage() {
  const lumi = useLumiVoice();
  const [result, setResult] = useState<QuizResult | null>(null);

  // Pull what we can from local storage. Keep this resilient.
  useEffect(() => {
    const stored = safeReadJSON<QuizResult>("rivva_quiz_result");
    setResult(stored ?? buildFallbackResult());
  }, []);

  const profile = useMemo(() => loadProfile(), []);

  const voiceScript = useMemo(() => {
    if (!result) return "";
    const name = profile?.name ? `${profile.name}. ` : "";
    return (
      `${name}${result.title}. ` +
      `${result.subtitle}. ` +
      `${result.description} ` +
      `Strengths: ${result.strengths.join(", ")}. ` +
      `Growth edge: ${result.growth.join(", ")}.`
    );
  }, [result, profile?.name]);

  useEffect(() => {
    // Only speak if user opted in elsewhere (we’ll respect your “off by default” rule)
    if (!result) return;
    const autoSpeak = (() => {
      try {
        return localStorage.getItem("rivva_auto_speak") === "1";
      } catch {
        return false;
      }
    })();
    if (!autoSpeak) return;

    if (voiceScript.trim()) lumi.speak(voiceScript);
  }, [lumi, voiceScript, result]);

  if (!result) {
    return (
      <main className="min-h-screen bg-[#0b0b14] text-white flex items-center justify-center px-6 py-16">
        <p className="text-white/70">Loading.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-16">
      <div className="mb-8">
        <RivvaOrb />
      </div>

      <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl text-center">
        <p className="text-white/60 text-sm mb-2">Your compatibility read</p>

        <h1 className="text-3xl md:text-4xl font-semibold mb-2">{result.title}</h1>
        <p className="text-white/80 text-lg mb-6">{result.subtitle}</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left">
          <p className="text-white/80 leading-relaxed">{result.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6 text-left">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="font-semibold mb-2">Strengths</h3>
            <ul className="list-disc list-inside text-white/70 space-y-1">
              {result.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="font-semibold mb-2">Growth edge</h3>
            <ul className="list-disc list-inside text-white/70 space-y-1">
              {result.growth.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/quiz"
            className="px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition"
          >
            Retake quiz
          </Link>

          <Link
            href="/settings/accessibility"
            className="px-6 py-3 rounded-2xl bg-white/10 border border-white/10 text-white font-semibold hover:bg-white/15 transition"
          >
            Auto speak settings
          </Link>
        </div>

        <p className="text-xs text-white/45 mt-4">
          Rivva speaks only if you turn it on. Quiet by default.
        </p>
      </div>
    </main>
  );
}
