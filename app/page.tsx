"use client";

import { useState } from "react";
import Link from "next/link";

import HeroGlow from "./HeroGlow";
import LumiOrb from "./LumiOrb";
import LumiAvatar from "./LumiAvatar";
import LumiTyping from "./LumiTyping";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("saving");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("done");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <main className="relative overflow-hidden min-h-screen flex flex-col items-center justify-start px-6 pt-44 text-center bg-[#0b0b14] text-white">
      {/* Glow background */}
      <HeroGlow />

      {/* Floating Lumi hologram */}
      <LumiAvatar />

      {/* Orb */}
      <div className="mb-10 z-10">
        <LumiOrb />
      </div>

      {/* LOGO */}
      <h1 className="text-7xl md:text-8xl font-extrabold text-white drop-shadow-sm mb-3 tracking-tight z-10">
        Rivva
      </h1>

      {/* Lumi’s animated intro */}
      <div className="z-10">
        <LumiTyping />
      </div>

      {/* TAGLINES */}
      <p className="text-xl text-white/80 font-medium mt-6 z-10">
        Connection made smarter.
      </p>
      <p className="text-lg text-white/70 italic mt-2 z-10">
        Where emotional intelligence meets attraction.
      </p>
      <p className="text-xl text-purple-300 font-semibold mt-4 z-10">
        Finally… an end to endless swiping.
      </p>

      {/* QUIZ CTA */}
      <section className="mt-14 z-10 w-full max-w-3xl">
        <div className="rounded-3xl bg-white/5 border border-white/10 p-8 shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Take the Lumi Compatibility Quiz
          </h2>
          <p className="text-white/75 leading-relaxed mb-6">
            In 60 seconds, Lumi learns your relationship vibe and gives you a
            compatibility read — the kind that feels human, not random.
          </p>

          <Link
            href="/quiz"
            className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 text-black font-semibold hover:opacity-90 transition"
          >
            Start Quiz
          </Link>

          <p className="text-xs text-white/50 mt-3">
            No signup required.
          </p>
        </div>
      </section>

      {/* Meet Lumi */}
      <div className="max-w-xl text-center mt-16 z-10">
        <h2 className="text-2xl font-bold text-white mb-4">Meet Lumi</h2>
        <p className="text-white/70 leading-relaxed">
          Your personal AI dating coach. Lumi learns your emotional patterns,
          communication style, and values to help you meet people who actually
          feel right — not random.
        </p>

        <p className="text-white/70 leading-relaxed mt-4">
          Rivva uses emotional intelligence and real compatibility — not endless
          swipes — to match you with people who fit your energy, not just your
          photos.
        </p>
      </div>

      {/* WHY RIVVA WORKS */}
      <section className="mt-24 max-w-5xl w-full z-10">
        <h2 className="text-3xl font-bold text-white mb-4">
          Why Rivva Works
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
          Under the hood, Rivva combines emotional intelligence, behavioral
          signals, and communication analysis to build a compatibility profile
          that feels human — not like a random swipe match.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 text-left">
          <div className="p-6 rounded-2xl bg-white/5 shadow-md border border-white/10 hover:bg-white/10 transition">
            <h3 className="text-lg font-semibold text-white">
              Emotional Intelligence Graph
            </h3>
            <p className="text-white/70 text-sm mt-2">
              Lumi maps how you respond to emotional scenarios — pacing,
              boundaries, affection — then finds people whose patterns align
              with yours.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 shadow-md border border-white/10 hover:bg-white/10 transition">
            <h3 className="text-lg font-semibold text-white">
              Communication Signals
            </h3>
            <p className="text-white/70 text-sm mt-2">
              Rivva pays attention to tone, curiosity, empathy, humor, and how
              conversations actually feel over time.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 shadow-md border border-white/10 hover:bg-white/10 transition">
            <h3 className="text-lg font-semibold text-white">
              Continuous Learning
            </h3>
            <p className="text-white/70 text-sm mt-2">
              As you interact, Lumi refines your compatibility blueprint — who
              energizes you, who drains you, and what “right” feels like.
            </p>
          </div>
        </div>
      </section>

      {/* EARLY ACCESS CTA */}
      <h3 className="text-2xl font-semibold text-white mt-20 mb-3 z-10">
        Join the Rivva Early Access
      </h3>

      <p className="text-white/70 mb-6 max-w-md z-10">
        Be the first to experience intelligent matchmaking powered by emotional
        understanding.
      </p>

      {/* WAITLIST FORM */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 w-full max-w-md z-10"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 p-3 border border-white/10 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm text-white placeholder:text-white/40"
        />

        <button
          type="submit"
          disabled={status === "saving"}
          className={`px-6 py-3 rounded-xl font-semibold transition shadow-md ${
            status === "saving"
              ? "bg-white/20 cursor-not-allowed text-white/70"
              : "bg-white text-black hover:bg-white/90"
          }`}
        >
          {status === "saving"
            ? "Saving..."
            : status === "done"
            ? "Saved!"
            : "Join Waitlist"}
        </button>
      </form>

      {status === "error" && (
        <p className="text-red-400 mt-3 z-10">Something went wrong.</p>
      )}

      <p className="text-xs text-white/50 mt-4 mb-24 z-10">
        No spam. Just launch updates and early access.
      </p>
    </main>
  );
}
