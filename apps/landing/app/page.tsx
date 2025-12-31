"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0b0b14] text-white">
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          {/* Left: Hero */}
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.22em] text-white/55 uppercase">
              Rivva
            </p>

            <h1 className="mt-4 text-5xl sm:text-6xl font-semibold leading-[1.02] tracking-tight">
              Dating, with intention.
            </h1>

            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              Rivva applies intelligence quietly.
              <br />
              So connection feels clearer, calmer, and more human.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-black font-semibold hover:bg-white/90 transition"
              >
                Start the quiz
              </Link>

              <Link
                href="/discover"
                className="inline-flex items-center justify-center rounded-2xl bg-white/10 border border-white/10 px-6 py-3 text-white font-semibold hover:bg-white/15 transition"
              >
                Explore discover
              </Link>
            </div>

            <p className="mt-3 text-xs text-white/45">
              No theatrics. No noise. Just a better signal.
            </p>
          </div>

          {/* Right: Principles */}
          <div id="how" />

          <div className="rounded-3xl bg-white/5 border border-white/10 p-7 shadow-xl">
            <p className="text-sm font-semibold">What Rivva does differently</p>
            <p className="mt-2 text-sm text-white/60 leading-relaxed">
              Built for people who prefer clarity over chaos.
            </p>

            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
                <p className="text-sm font-semibold">Alignment first</p>
                <p className="text-xs text-white/60 mt-1">
                  Understand fit before conversation begins.
                </p>
              </div>

              <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
                <p className="text-sm font-semibold">Calm communication</p>
                <p className="text-xs text-white/60 mt-1">
                  Boundaries. Pace. Tone. Less guessing.
                </p>
              </div>

              <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
                <p className="text-sm font-semibold">Privacy as a standard</p>
                <p className="text-xs text-white/60 mt-1">
                  When you’re visible. When you’re reachable. When the app stays quiet.
                </p>
              </div>
            </div>

            <p className="mt-6 text-xs text-white/45">
              Everything is intentional. Nothing is performative.
            </p>
          </div>
        </div>

        {/* Bottom: Who it’s for */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-xl font-semibold">Who Rivva is for</h2>

          <div className="mt-4 grid gap-2 text-sm text-white/70">
            <p>• You value emotional intelligence.</p>
            <p>• You prefer calm over chaos.</p>
            <p>• You take connection seriously.</p>
            <p>• You know attention is not the same as interest.</p>
          </div>

          <p className="mt-6 text-sm text-white/60">
            If that sounds like you, you’re welcome here.
          </p>

          <p className="mt-10 text-xs text-white/40">
            Rivva is not here to perform intelligence.
            <br />
            It’s here to apply it. quietly.
          </p>
        </div>
      </section>
    </main>
  );
}
