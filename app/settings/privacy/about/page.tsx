"use client";

import Link from "next/link";
import OnboardingGate from "@/components/OnboardingGate";
import RivvaOrb from "@/components/RivvaOrb";

export default function PrivacyAboutPage() {
  return (
    <OnboardingGate>
      <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-12">
        <section className="max-w-3xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <Link href="/settings/privacy" className="text-sm text-white/70 hover:text-white">
              ← Back to Privacy
            </Link>
            <div className="scale-75 rivva-orb">
              <RivvaOrb />
            </div>
          </header>

          <h1 className="text-3xl font-bold mb-2">About Privacy</h1>
          <p className="text-white/60 text-sm mb-8">
            Rivva is designed to protect people first — while preventing feature abuse.
          </p>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl space-y-4">
            <div>
              <p className="text-sm font-semibold">Your control</p>
              <p className="text-sm text-white/70 mt-1">
                You can hide online status, hide receipts, enable Low-Stimulation Mode, and turn on safety guardrails.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold">Anti-abuse (important)</p>
              <p className="text-sm text-white/70 mt-1">
                Reporting protects you immediately, but platform action should require evidence-backed patterns (to prevent revenge reports).
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold">Screenshot protection</p>
              <p className="text-sm text-white/70 mt-1">
                True prevention depends on platform support. Our MVP focuses on deterrence + user education.
              </p>
            </div>
          </div>
        </section>
      </main>
    </OnboardingGate>
  );
}
