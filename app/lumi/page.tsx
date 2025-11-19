"use client";

import { useState } from "react";
import HeroGlow from "./HeroGlow";
import LumiOrb from "./LumiOrb";
import LumiAvatar from "./LumiAvatar";
import LumiTyping from "./LumiTyping";

export default function Home() {
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
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <main className="relative overflow-hidden min-h-screen flex flex-col items-center justify-start px-6 pt-48 text-center bg-[#f7f7ff]">
      {/* ⭐ Beautiful AI Glow (behind Lumi & hero text) */}
      <HeroGlow />

      {/* ⭐ Floating Lumi hologram */}
      <LumiAvatar />

      {/* ⭐ Aura Orb */}
      <LumiOrb />

      {/* LOGO */}
      <h1 className="text-7xl font-extrabold text-purple-700 drop-shadow-sm mb-3 tracking-tight z-10">
        Rivva
      </h1>

      {/* Lumi’s animated intro */}
      <LumiTyping />

      {/* TAGLINES */}
      <p className="text-xl text-slate-700 font-medium mt-6 z-10">
        Connection made smarter.
      </p>

      <p className="text-lg text-slate-600 italic mt-2 z-10">
        Where emotional intelligence meets attraction.
      </p>

      <p className="text-xl text-purple-600 font-semibold mt-4 z-10">
        Finally… an end to endless swiping.
      </p>

      {/* Lumi intro */}
      <div className="max-w-xl text-center mt-12 z-10">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Meet Lumi</h2>
        <p className="text-slate-600 leading-relaxed">
          Your personal AI dating coach. Lumi learns your emotional patterns,
          communication style, and values to help you meet people who actually
          feel right — not random.
        </p>

        <p className="text-slate-600 leading-relaxed mt-4">
          Rivva uses emotional intelligence and real compatibility — not endless
          swipes — to match you with people who fit your energy, not just your
          photos.
        </p>
      </div>

      {/* 🧠 WHY RIVVA WORKS – SCIENCE SECTION */}
      <section className="mt-24 max-w-5xl w-full z-10">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">
          Why Rivva Works
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Under the hood, Rivva combines emotional intelligence, behavioral
          signals, and communication analysis to build a compatibility profile
          that feels human — not like a random swipe match.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 text-left">
          <div className="p-6 rounded-2xl bg-white shadow-md border border-purple-100 hover:shadow-xl hover:-translate-y-1 transition">
            <h3 className="text-lg font-semibold text-purple-700">
              Emotional Intelligence Graph
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              Lumi maps how you respond to different emotional scenarios —
              attachment style, pacing, affection, boundaries — then looks for
              people whose emotional patterns complement yours.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white shadow-md border border-purple-100 hover:shadow-xl hover:-translate-y-1 transition">
            <h3 className="text-lg font-semibold text-purple-700">
              Communication Signals
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              Instead of just profile prompts, Rivva pays attention to tone,
              curiosity, empathy, humor, and how conversations actually feel
              over time.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white shadow-md border border-purple-100 hover:shadow-xl hover:-translate-y-1 transition">
            <h3 className="text-lg font-semibold text-purple-700">
              Continuous Learning
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              As you interact, Lumi refines your compatibility blueprint —
              learning who drains you, who energizes you, and what “right”
              actually feels like for you.
            </p>
          </div>
        </div>

        <div className="mt-10 max-w-lg mx-auto text-sm text-slate-500">
          Rivva doesn’t just ask, “Who do you like?” — it quietly studies{" "}
          how you connect, respond, and feel, then uses that emotional
          fingerprint to find better matches over time.
        </div>
      </section>

      {/* EARLY ACCESS CTA */}
      <h3 className="text-2xl font-semibold text-purple-700 mt-20 mb-3 z-10">
        Join the Rivva Early Access
      </h3>

      <p className="text-slate-600 mb-6 max-w-md z-10">
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
          className="flex-1 p-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
        />

        <button
          type="submit"
          disabled={status === "saving"}
          className={`px-6 py-3 rounded-xl text-white font-semibold transition shadow-md ${
            status === "saving"
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
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
        <p className="text-red-500 mt-3 z-10">Something went wrong.</p>
      )}

      <p className="text-xs text-slate-500 mt-4 mb-20 z-10">
        No spam. Just launch updates and early access.
      </p>
    </main>
  );
}
