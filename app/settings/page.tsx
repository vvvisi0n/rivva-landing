"use client";

import Link from "next/link";
import OnboardingGate from "@/components/OnboardingGate";
import LumiOrb from "@/components/LumiOrb";

function Card({
  title,
  desc,
  href,
}: {
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl hover:bg-white/10 transition"
    >
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-xs text-white/60 mt-1">{desc}</p>
      <p className="text-xs text-white/50 mt-4">Open →</p>
    </Link>
  );
}

export default function SettingsHomePage() {
  return (
    <OnboardingGate>
      <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-12">
        <section className="max-w-4xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-white/60 text-sm mt-1">
                Control your experience. Everything here is opt-in.
              </p>
            </div>

            <div className="scale-75">
              <LumiOrb />
            </div>
          </header>

          <div className="grid md:grid-cols-2 gap-4">
            <Card
              title="Profile"
              desc="About me, what I’m looking for, and your own words."
              href="/settings/profile"
            />

            <Card
              title="Accessibility"
              desc="Auto-speak, low-friction UI, and calm modes."
              href="/settings/accessibility"
            />

            <Card
              title="Privacy"
              desc="Hide online/read receipts, low-stimulation mode, message filters, quiet hours, new-user alerts."
              href="/settings/privacy"
            />

            <Card
              title="Privacy & Safety"
              desc="Blocking, reporting, anti-abuse protections, and messaging safety."
              href="/settings/privacy-safety"
            />

            <Card
              title="Notifications"
              desc="Push + email notifications and in-app sounds."
              href="/settings/notifications"
            />

            <Card
              title="Account"
              desc="Account basics (MVP placeholders)."
              href="/settings/account"
            />

            <Card
              title="Discovery"
              desc="Discovery preferences (MVP placeholders)."
              href="/settings/discovery"
            />

            <Card
              title="Support & Legal"
              desc="Help, privacy, and terms (MVP placeholders)."
              href="/settings/support-legal"
            />
          </div>

          <div className="mt-8">
            <Link href="/" className="text-sm text-white/60 hover:text-white">
              ← Back home
            </Link>
          </div>
        </section>
      </main>
    </OnboardingGate>
  );
}
