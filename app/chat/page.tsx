"use client";

import Link from "next/link";
import OnboardingGate from "@/components/OnboardingGate";
import { MOCK_MATCHES } from "@/lib/matches";

export default function ChatIndex() {
  return (
    <OnboardingGate>
      <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-12">
        <section className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Chats</h1>
          <p className="text-white/60 text-sm mb-6">
            Your conversations live here.
          </p>

          <div className="space-y-3">
            {MOCK_MATCHES.map((m) => (
              <Link
                key={m.id}
                href={`/chat/${m.id}`}
                className="block rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition"
              >
                <p className="font-semibold">{m.name}</p>
                <p className="text-xs text-white/60">{m.city}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </OnboardingGate>
  );
}
