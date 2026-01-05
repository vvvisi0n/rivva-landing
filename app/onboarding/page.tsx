"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { loadProfile, saveProfile, type UserProfile } from "@/lib/profile";
import { ABOUT_ME_OPTIONS, LOOKING_FOR_OPTIONS } from "@/lib/profileOptions";
import MultiSelectChips from "@/components/MultiSelectChips";
import RivvaOrb from "@/components/RivvaOrb";

export default function OnboardingPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [lookingFor, setLookingFor] = useState<UserProfile["lookingFor"]>("open");
  const [pace, setPace] = useState<UserProfile["pace"]>("balanced");

  const [aboutMeTags, setAboutMeTags] = useState<string[]>([]);
  const [lookingForTags, setLookingForTags] = useState<string[]>([]);

  useEffect(() => {
    const existing = loadProfile();
    if (!existing) return;

    setName(existing.name || "");
    setLookingFor(existing.lookingFor || "open");
    setPace(existing.pace || "balanced");
    setAboutMeTags(existing.aboutMeTags || []);
    setLookingForTags(existing.lookingForTags || []);
  }, []);

  const canContinue = useMemo(() => {
    return name.trim().length >= 2;
  }, [name]);

  function handleContinue() {
    if (!canContinue) return;

    saveProfile({
      name: name.trim(),
      city: "",
      lookingFor,
      pace,
      aboutMeTags,
      lookingForTags,
    });

    router.replace("/matches/preview");
  }

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-12">
      <section className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/50">
              Quick setup
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">
              Let’s start with the basics.
            </h1>
            <p className="text-sm text-white/60 mt-2">
              Rivva uses geolocation in the background, so you don’t have to type your city.
            </p>
          </div>
          <div className="scale-75 rivva-orb">
            <RivvaOrb />
          </div>
        </header>

        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What should Lumi call you?"
              className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-emerald-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">
              What are you looking for?
            </label>
            <select
              value={lookingFor}
              onChange={(e) => setLookingFor(e.target.value as UserProfile["lookingFor"])}
              className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-emerald-400"
            >
              <option value="serious">Serious relationship</option>
              <option value="open">Open to connection</option>
              <option value="casual">Casual / low pressure</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">
              What’s your pacing style?
            </label>
            <select
              value={pace}
              onChange={(e) => setPace(e.target.value as UserProfile["pace"])}
              className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-emerald-400"
            >
              <option value="slow">Slow + intentional</option>
              <option value="balanced">Balanced</option>
              <option value="fast">Fast mover</option>
            </select>
          </div>

          <MultiSelectChips
            label="About me"
            helper="This helps Rivva match your emotional vibe, not just your photos."
            options={ABOUT_ME_OPTIONS}
            value={aboutMeTags}
            onChange={setAboutMeTags}
            max={8}
          />

          <MultiSelectChips
            label="What I’m looking for"
            helper="Tell Rivva what “a good match” actually means to you."
            options={LOOKING_FOR_OPTIONS.map(o => o.id)}
            value={lookingForTags}
            onChange={setLookingForTags}
            max={8}
          />

          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className="w-full rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-emerald-500/40"
          >
            Continue
          </button>
        </div>
      </section>
    </main>
  );
}
