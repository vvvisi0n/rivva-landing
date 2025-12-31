"use client";

import Link from "next/link";
import OnboardingGate from "@/components/OnboardingGate";
import RivvaOrb from "@/components/RivvaOrb";

export default function AccountSettings() {
  return (
    <OnboardingGate>
      <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-12">
        <section className="max-w-3xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <Link href="/settings" className="text-sm text-white/70 hover:text-white">
              ← Settings
            </Link>
            <div className="scale-75 rivva-orb">
              <RivvaOrb />
            </div>
          </header>

          <h1 className="text-3xl font-bold">Account</h1>
          <p className="text-white/60 text-sm mt-2">
            Next: log out placeholder, active sessions placeholder, deactivate/delete account placeholders.
          </p>
        </section>
      </main>
    </OnboardingGate>
  );
}
