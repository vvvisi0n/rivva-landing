"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import OnboardingGate from "@/components/OnboardingGate";
import RivvaOrb from "@/components/RivvaOrb";
import { loadProfile, saveProfile, type UserProfile } from "@/lib/profile";

type Intent = UserProfile["lookingFor"];

function Chip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "text-xs px-3 py-1 rounded-full border transition " +
        (active
          ? "bg-white text-black border-white"
          : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white")
      }
    >
      {label}
    </button>
  );
}

export default function DiscoverySettingsPage() {
  const [intent, setIntent] = useState<Intent>("open");
  const [distanceMiles, setDistanceMiles] = useState<number>(25);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const p = loadProfile();
    if (p?.lookingFor) setIntent(p.lookingFor);
    if (typeof p?.distanceMiles === "number") setDistanceMiles(p.distanceMiles);
  }, []);

  function persist(next: Partial<UserProfile>) {
    const existing =
      loadProfile() ?? ({
        name: "",
        city: "",
        lookingFor: "open",
        pace: "balanced",
      } satisfies UserProfile);

    saveProfile({ ...existing, ...next });
    setSaved(true);
    setTimeout(() => setSaved(false), 900);
  }

  return (
    <OnboardingGate>
      <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-12">
        <section className="max-w-3xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <Link href="/settings" className="text-sm text-white/70 hover:text-white">
              ← Back to Settings
            </Link>
            <div className="scale-75 rivva-orb">
              <RivvaOrb />
            </div>
          </header>

          <h1 className="text-3xl font-bold mb-2">Discovery</h1>
          <p className="text-white/60 text-sm mb-8">
            Control who you see. This is local-only for now.
          </p>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl space-y-8">
            <div>
              <p className="text-sm font-semibold">Intent mode</p>
              <p className="text-xs text-white/60 mt-1">
                This changes how Discover prioritizes profiles.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <Chip
                  active={intent === "serious"}
                  label="Serious"
                  onClick={() => {
                    setIntent("serious");
                    persist({ lookingFor: "serious" });
                  }}
                />
                <Chip
                  active={intent === "open"}
                  label="Open"
                  onClick={() => {
                    setIntent("open");
                    persist({ lookingFor: "open" });
                  }}
                />
                <Chip
                  active={intent === "casual"}
                  label="Casual"
                  onClick={() => {
                    setIntent("casual");
                    persist({ lookingFor: "casual" });
                  }}
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold">Distance radius (stub)</p>
              <p className="text-xs text-white/60 mt-1">
                Rivva will use geolocation. This slider will matter once real profiles load.
              </p>

              <div className="mt-4 rounded-2xl bg-black/30 border border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Miles</span>
                  <span className="text-sm font-semibold">{distanceMiles} mi</span>
                </div>

                <input
                  type="range"
                  min={1}
                  max={100}
                  value={distanceMiles}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setDistanceMiles(v);
                    persist({ distanceMiles: v });
                  }}
                  className="mt-3 w-full"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link
                href="/discover"
                className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
              >
                Go to Discover
              </Link>

              {saved && <span className="text-xs text-green-300">Saved ✓</span>}
            </div>
          </div>
        </section>
      </main>
    </OnboardingGate>
  );
}
