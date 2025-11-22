"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import EmotionalRadarChart from "@/components/EmotionalRadarChart";
import LumiTypingBubble from "@/components/LumiTypingBubble";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const score = searchParams.get("score") || "0";
  const numericScore = Number(score);

  const [copied, setCopied] = useState(false);

  // ✅ Generate stable share URL on client
  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("score", String(numericScore));
    return url.toString();
  }, [numericScore]);

  const resultText = useMemo(() => {
    if (numericScore >= 80) {
      return "You’re a deeply intuitive connector with strong emotional intelligence. You match well with partners who value depth and honesty.";
    } else if (numericScore >= 50) {
      return "You’re balanced, thoughtful, and emotionally aware. You match well with partners who communicate clearly and consistently.";
    } else {
      return "You’re independent, analytical, and careful about who you connect with. You match well with partners who value stability and clarity.";
    }
  }, [numericScore]);

  const shareMessage = `I just got a Rivva compatibility score of ${numericScore}% 💜✨. Try it here:`;

  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "My Rivva Compatibility Profile",
          text: `${shareMessage} ${shareUrl}`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(`${shareMessage} ${shareUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  }

  const twitterShare = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareMessage
  )}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 p-8 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-5xl font-bold text-purple-700 text-center mt-4">
        Your Rivva Compatibility Profile
      </h1>

      {/* Score Badge */}
      <div className="mt-6 bg-white shadow-md rounded-full px-8 py-4 text-3xl font-bold text-purple-800">
        Score: {numericScore}%
      </div>

      {/* Summary Box */}
      <div className="mt-6 max-w-2xl text-center text-lg text-purple-900 leading-relaxed bg-white/80 shadow-lg rounded-2xl p-6 backdrop-blur">
        {resultText}
      </div>

      {/* ⭐ Lumi Typing Bubble */}
      <div className="mt-10">
        <LumiTypingBubble />
      </div>

      {/* 🌈 Emotional Radar Chart */}
      <div className="mt-12 w-full flex justify-center">
        <EmotionalRadarChart />
      </div>

      {/* ✅ SHARE SECTION */}
      <section className="mt-12 w-full max-w-xl bg-white/90 shadow-lg rounded-2xl p-6 text-center backdrop-blur">
        <h2 className="text-2xl font-bold text-purple-700">
          Share your results
        </h2>
        <p className="text-slate-600 mt-2">
          Let friends compare their energy with yours.
        </p>

        <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
          {/* Native Share / Copy fallback */}
          <button
            onClick={handleShare}
            className="px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl shadow-md transition"
          >
            Share Results
          </button>

          {/* Twitter share */}
          <a
            href={twitterShare}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white border border-purple-300 hover:bg-purple-50 text-purple-800 font-bold rounded-xl shadow-sm transition"
          >
            Share on X
          </a>

          {/* Copy link */}
          <button
            onClick={handleCopyLink}
            className="px-6 py-3 bg-white border border-purple-300 hover:bg-purple-50 text-purple-800 font-bold rounded-xl shadow-sm transition"
          >
            Copy Link
          </button>
        </div>

        {copied && (
          <p className="text-green-600 font-medium mt-3">Link copied ✅</p>
        )}
      </section>

      {/* Continue Button */}
      <div className="mt-12">
        <a
          href="/"
          className="px-8 py-4 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-xl shadow-md transition"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}
