"use client";

import { useEffect, useState } from "react";
import LumiOrb from "@/components/LumiOrb";
import TypingBubble from "@/components/TypingBubble";

type Profile = {
  name: string;
  age: string;
  gender: string;
  lookingFor: string;
  intent: string;
  ageMin: string;
  ageMax: string;
};

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("rivva_profile");
    if (raw) setProfile(JSON.parse(raw));
  }, []);

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-14">
      <div className="mb-6">
        <LumiOrb />
      </div>

      <div className="w-full max-w-3xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-2">
          Lumi Dashboard
        </h1>

        {!profile ? (
          <TypingBubble label="Loading your vibe profile…" />
        ) : (
          <div className="mt-6 grid gap-4">
            <p className="text-white/80">
              Welcome back, <span className="font-semibold">{profile.name}</span>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs text-white/50 mb-1">Intent</p>
                <p className="text-white/90">{profile.intent}</p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs text-white/50 mb-1">Looking for</p>
                <p className="text-white/90">{profile.lookingFor}</p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs text-white/50 mb-1">Age range</p>
                <p className="text-white/90">
                  {profile.ageMin}–{profile.ageMax}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-purple-500/15 to-cyan-400/10 border border-white/10 p-5 mt-3">
              <p className="text-sm text-white/80">
                Next up: your Compatibility Blueprint + your first Rivva matches.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
