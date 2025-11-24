"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LumiOrb from "@/components/LumiOrb";
import { loadProfile, saveProfile, UserProfile } from "@/lib/profile";

export default function OnboardingPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [lookingFor, setLookingFor] =
    useState<UserProfile["lookingFor"]>("open");
  const [pace, setPace] = useState<UserProfile["pace"]>("balanced");

  useEffect(() => {
    const existing = loadProfile();
    if (existing) {
      setName(existing.name || "");
      setCity(existing.city || "");
      setLookingFor(existing.lookingFor || "open");
      setPace(existing.pace || "balanced");
    }
  }, []);

  function handleContinue() {
    const profile: UserProfile = {
      name: name.trim(),
      city: city.trim(),
      lookingFor,
      pace,
      quizTier: loadProfile()?.quizTier,
    };

    saveProfile(profile);
    router.push("/matches");
  }

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-16">
      <div className="mb-6">
        <LumiOrb />
      </div>

      <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Quick Setup</h1>
        <p className="text-white/70 mb-8">
          Lumi uses this to tune your matches.
        </p>

        <label className="block text-sm text-white/70 mb-2">Your name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Victor"
          className="w-full mb-6 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/40"
        />

        <label className="block text-sm text-white/70 mb-2">City</label>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="e.g. Atlanta"
          className="w-full mb-6 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/40"
        />

        <label className="block text-sm text-white/70 mb-2">
          What are you looking for?
        </label>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {(["serious", "open", "casual"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setLookingFor(v)}
              className={`px-3 py-2 rounded-xl border text-sm transition
                ${
                  lookingFor === v
                    ? "bg-white text-black border-white"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
            >
              {v === "serious" ? "Serious" : v === "open" ? "Open" : "Casual"}
            </button>
          ))}
        </div>

        <label className="block text-sm text-white/70 mb-2">
          Relationship pace
        </label>
        <div className="grid grid-cols-3 gap-2 mb-8">
          {(["slow", "balanced", "fast"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setPace(v)}
              className={`px-3 py-2 rounded-xl border text-sm transition
                ${
                  pace === v
                    ? "bg-white text-black border-white"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
            >
              {v === "slow" ? "Slow" : v === "balanced" ? "Balanced" : "Fast"}
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-white/90 transition"
        >
          Continue to Matches
        </button>
      </div>
    </main>
  );
}
