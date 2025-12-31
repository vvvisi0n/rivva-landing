"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import OnboardingGate from "@/components/OnboardingGate";
import RivvaOrb from "@/components/RivvaOrb";
import MultiSelectChips from "@/components/MultiSelectChips";

import { saveProfile, loadProfile, type UserProfile } from "@/lib/profile";
import { ABOUT_ME_OPTIONS, LOOKING_FOR_OPTIONS } from "@/lib/profileOptions";

export default function QuickSetupPage() {
  const router = useRouter();

  const existing = useMemo(() => loadProfile(), []);

  const [name, setName] = useState("");
  const [lookingFor, setLookingFor] = useState<UserProfile["lookingFor"]>("open");
  const [pace, setPace] = useState<UserProfile["pace"]>("balanced");

  const [aboutMeTags, setAboutMeTags] = useState<string[]>([]);
  const [lookingForTags, setLookingForTags] = useState<string[]>([]);

  useEffect(() => {
    if (!existing) return;

    setName(existing.name ?? "");
    setLookingFor(existing.lookingFor ?? "open");
    setPace(existing.pace ?? "balanced");

    setAboutMeTags(existing.aboutMeTags ?? []);
    setLookingForTags(existing.lookingForTags ?? []);
  }, [existing]);

  const canContinue =
    name.trim().length >= 2 &&
    aboutMeTags.length >= 2 &&
    lookingForTags.length >= 1;

  function handleContinue() {
    const profile: UserProfile = {
      name: name.trim(),
      lookingFor,
      pace,
      quizTier: existing?.quizTier,
      aboutMeTags,
      lookingForTags,
    };

    saveProfile(profile);
    router.push("/matches/preview");
  }

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-12">
      <section className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <Link href="/onboarding" className="text-sm text-white/70 hover:text-white">
            ← Back
          </Link>
          <div className="scale-75 rivva-orb">
            <RivvaOrb />
          </div>
        </header>

        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">
              Let’s start with the basics.
            </h1>
            <p className="text-sm text-white/60 mt-2">
              Rivva uses geolocation in the background, so you don’t have to type your city.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="What should Lumi call you?"
                className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-emerald-400"
              />
            </div>

            <MultiSelectChips
              label="About Me"
              options={ABOUT_ME_OPTIONS.map(o => o.id)}
              value={aboutMeTags}
              onChange={setAboutMeTags}
              max={8}/>

            <MultiSelectChips
              label="What I’m Looking For"
              options={LOOKING_FOR_OPTIONS.map(o => o.id)}
              value={lookingForTags}
              onChange={setLookingForTags}
              max={6}/>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                What are you looking for? (mode)
              </label>
              <select
                value={lookingFor}
                onChange={(e) =>
                  setLookingFor(e.target.value as UserProfile["lookingFor"])
                }
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

            <button
              onClick={handleContinue}
              disabled={!canContinue}
              className="w-full rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-emerald-500/40"
            >
              Continue
            </button>

            {!canContinue && (
              <p className="text-xs text-white/50">
                Add at least 2 About Me tags + 1 Looking For tag to continue.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
