"use client";

import Link from "next/link";
import { useState } from "react";

export default function InvitePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/invite", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-16">
      <section className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-white/60 hover:text-white">
          ← Back
        </Link>

        <p className="mt-10 text-xs tracking-[0.22em] text-white/55 uppercase">
          Access
        </p>

        <h1 className="mt-4 text-4xl sm:text-5xl font-semibold leading-[1.02] tracking-tight">
          Rivva opens quietly.
        </h1>

        <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl">
          Rivva is built for people who value clarity over chaos.
          <br />
          Alignment over volume.
          <br />
          Presence without pressure.
        </p>

        <p className="mt-6 text-white/65 leading-relaxed max-w-2xl">
          We invite people in small waves to preserve the experience.
          <br />
          If Rivva feels aligned, leave your email.
          <br />
          We’ll reach out when access opens.
        </p>

        <div className="mt-10 rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl">
          {status !== "ok" ? (
            <form onSubmit={onSubmit} className="space-y-4">
              <label className="block text-sm text-white/80">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="mt-2 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-400/60 placeholder:text-white/40"
                />
              </label>

              <button
                type="submit"
                disabled={status === "loading"}
                className={
                  "w-full px-6 py-3 rounded-2xl font-semibold transition " +
                  (status === "loading"
                    ? "bg-white/10 text-white/50 border border-white/10 cursor-not-allowed"
                    : "bg-white text-black hover:bg-white/90")
                }
              >
                {status === "loading" ? "Requesting…" : "Request an invitation"}
              </button>

              <p className="text-xs text-white/45">
                No spam. No noise. Just a thoughtful introduction.
              </p>

              {status === "error" && (
                <p className="text-xs text-rose-200">
                  Something didn’t go through. Try again in a moment.
                </p>
              )}
            </form>
          ) : (
            <div>
              <p className="text-lg font-semibold">You’re on the list.</p>
              <p className="mt-2 text-sm text-white/70">
                We’ll reach out when access opens.
              </p>
            </div>
          )}
        </div>

        <div className="mt-10 grid gap-3">
          <p className="text-sm font-semibold">What to expect</p>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
              <p className="text-sm font-semibold">No endless swiping</p>
              <p className="text-xs text-white/60 mt-1">Less noise. Better signal.</p>
            </div>

            <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
              <p className="text-sm font-semibold">No attention games</p>
              <p className="text-xs text-white/60 mt-1">No manufactured urgency.</p>
            </div>

            <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
              <p className="text-sm font-semibold">Quiet by default</p>
              <p className="text-xs text-white/60 mt-1">Rivva stays calm until it matters.</p>
            </div>
          </div>
        </div>

        <p className="mt-14 text-xs text-white/40">
          Rivva is not here to perform intelligence.
          <br />
          It’s here to apply it. quietly.
        </p>
      </section>
    </main>
  );
}
