"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import LumiOrb from "@/components/LumiOrb";
import TypingBubble from "@/components/TypingBubble";
import LumiVoiceButton from "@/components/LumiVoiceButton";

import { getTier, buildShareText } from "@/lib/quiz";

export default function QuizResultsPage() {
  const [score, setScore] = useState<number | null>(null);
  const [isThinking, setIsThinking] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("rivva_quiz_score");
    const s = raw ? Number(raw) : 0;
    setScore(s);

    // tiny Lumi “processing” moment
    const t = setTimeout(() => setIsThinking(false), 900);
    return () => clearTimeout(t);
  }, []);

  const tier = useMemo(() => {
    return getTier(score ?? 0);
  }, [score]);

  const shareText = useMemo(() => buildShareText(tier), [tier]);

  async function copyShare() {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-14">
      <div className="max-w-3xl mx-auto">
        {/* header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="mb-4">
            <LumiOrb />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Your Lumi Compatibility Read
          </h1>
          <p className="text-white/70 mt-2">
            No labels for labels’ sake — just your connection style.
          </p>
        </div>

        {/* processing */}
        {isThinking && (
          <div className="rounded-3xl bg-white/5 border border-white/10 p-8 shadow-xl mb-8">
            <TypingBubble label="Lumi is reading your vibe…" />
          </div>
        )}

        {!isThinking && score !== null && (
          <>
            {/* main result card */}
            <section className="rounded-3xl bg-white/5 border border-white/10 p-8 shadow-xl mb-8">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-sm text-white/60">Your vibe</p>
                  <h2 className="text-2xl md:text-3xl font-bold mt-1">
                    {tier.name}
                  </h2>
                  <p className="text-white/70 mt-2 max-w-xl">
                    {tier.oneLiner}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-white/60">Score</p>
                  <p className="text-4xl font-extrabold mt-1">
                    {score}
                    <span className="text-white/40 text-base">/12</span>
                  </p>
                </div>
              </div>

              {/* Lumi voice */}
              <div className="mt-6 flex items-center gap-3">
                <LumiVoiceButton
                  text={[
                    `Okay… here’s what I’m picking up.`,
                    `You’re ${tier.name.toLowerCase()}.`,
                    tier.oneLiner,
                    `If you want, I can guide you into matches that fit this energy.`
                  ].join(" ")}
                />
                <p className="text-xs text-white/50">
                  Tap to hear Lumi
                </p>
              </div>
            </section>

            {/* Lumi recap */}
            <section className="rounded-3xl bg-white/5 border border-white/10 p-8 shadow-xl mb-8">
              <h3 className="text-xl font-semibold mb-4">
                Lumi’s recap
              </h3>
              <ul className="space-y-2 text-white/80 list-disc list-inside">
                {tier.recap.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                  <h4 className="font-semibold mb-2">Your strengths</h4>
                  <ul className="space-y-1 text-white/75 text-sm list-disc list-inside">
                    {tier.strengths.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                  <h4 className="font-semibold mb-2">Growth edges</h4>
                  <ul className="space-y-1 text-white/75 text-sm list-disc list-inside">
                    {tier.growth.map((g, i) => (
                      <li key={i}>{g}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* share card */}
            <section className="rounded-3xl bg-white/5 border border-white/10 p-8 shadow-xl mb-8">
              <h3 className="text-xl font-semibold mb-3">
                Share your vibe
              </h3>

              <div className="rounded-2xl bg-black/40 border border-white/10 p-5 text-sm whitespace-pre-wrap text-white/80">
                {shareText}
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={copyShare}
                  className="px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
                >
                  {copied ? "Copied!" : "Copy result"}
                </button>

                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl bg-white/10 border border-white/10 font-semibold hover:bg-white/15 transition"
                >
                  Share on X
                </a>
              </div>
            </section>

            {/* matches CTA */}
            <section className="rounded-3xl bg-gradient-to-r from-purple-500/20 to-cyan-400/20 border border-white/10 p-8 shadow-xl mb-8">
              <h3 className="text-2xl font-bold mb-2">
                Want matches that fit this vibe?
              </h3>
              <p className="text-white/80 mb-5">
                Lumi will highlight people whose emotional energy complements yours.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/matches"
                  className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
                >
                  Go to Matches
                </Link>

                <Link
                  href="/inbox"
                  className="px-6 py-3 rounded-xl bg-white/10 border border-white/10 font-semibold hover:bg-white/15 transition"
                >
                  Open Inbox
                </Link>
              </div>
            </section>

            {/* retake */}
            <div className="text-center">
              <Link
                href="/quiz"
                className="text-sm text-white/70 hover:text-white underline underline-offset-4"
              >
                Retake quiz
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
