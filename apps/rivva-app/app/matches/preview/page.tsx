"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Profile = {
  name: string;
  lookingFor: "serious" | "open" | "casual";
};

const KEY = "rivva_profile_v1";

function loadProfile(): Profile | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Profile) : null;
  } catch {
    return null;
  }
}

function intentLabel(v: Profile["lookingFor"]) {
  if (v === "serious") return "Serious relationship";
  if (v === "casual") return "Casual. Low pressure.";
  return "Open to connection";
}

export default function MatchesPreviewPage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  const headline = useMemo(() => {
    if (!profile?.name) return "Your first match preview";
    return `Hi ${profile.name}. Here’s your first match preview.`;
  }, [profile]);

  if (!profile) {
    return (
      <main className="mx-auto max-w-3xl px-6 pt-16 pb-24">
        <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
          <h1 className="text-2xl font-semibold">No profile yet.</h1>
          <p className="mt-2 text-sm text-white/65">Start onboarding so Rivva can match your pacing.</p>
          <div className="mt-6">
            <Link href="/onboarding" className="inline-flex rounded-full bg-white text-black px-5 py-3 text-sm font-semibold hover:bg-white/90">
              Go to onboarding
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 pt-16 pb-24">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wider text-white/50">First match</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{headline}</h1>
          <p className="mt-3 text-sm text-white/65">
            Intent. {intentLabel(profile.lookingFor)}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-full bg-white text-black px-5 py-3 text-sm font-semibold hover:bg-white/90">
              Request full access
            </button>
            <Link href="/onboarding" className="rounded-full bg-white/10 border border-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/15">
              Edit setup
            </Link>
          </div>

          <p className="mt-6 text-xs text-white/55">
            This is a preview build. We’ll tighten matching after we lock the flow.
          </p>
        </div>

        <div className="w-full lg:w-[420px]">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Match card</p>
              <span className="text-xs text-white/55">Preview</span>
            </div>

            <div className="mt-5 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-5">
              <p className="text-lg font-semibold">Ari. 29</p>
              <p className="mt-1 text-sm text-white/65">Calm. Intentional. Clear communicator.</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-black/30 border border-white/10 px-3 py-1 text-xs text-white/70">Pacing aligned</span>
                <span className="rounded-full bg-black/30 border border-white/10 px-3 py-1 text-xs text-white/70">Low drama</span>
                <span className="rounded-full bg-black/30 border border-white/10 px-3 py-1 text-xs text-white/70">Intentional dating</span>
              </div>

              <p className="mt-4 text-sm text-white/70 leading-relaxed">
                “I’m here for something real. I like slow mornings, honest conversations, and people who keep their word.”
              </p>

              <div className="mt-5 flex gap-3">
                <button className="flex-1 rounded-2xl bg-white text-black px-4 py-2.5 text-sm font-semibold hover:bg-white/90">
                  Like
                </button>
                <button className="flex-1 rounded-2xl bg-white/10 border border-white/10 px-4 py-2.5 text-sm font-semibold hover:bg-white/15">
                  Pass
                </button>
              </div>
            </div>

            <p className="mt-5 text-xs text-white/55">
              Next. We’ll replace this with the real matching engine and real profiles.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
