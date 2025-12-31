"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";

import OnboardingGate from "@/components/OnboardingGate";
import RivvaOrb from "@/components/RivvaOrb";

import { loadProfile, saveProfile, type UserProfile } from "@/lib/profile";
import { ABOUT_ME_GROUPS, LOOKING_FOR_GROUPS, flattenGroups, type OptionGroup } from "@/lib/profileOptions";

function SectionCard({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl">
      <p className="text-sm font-semibold">{title}</p>
      {desc && <p className="text-xs text-white/60 mt-1">{desc}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

function MultiSelectChips({
  title,
  groups,
  selected,
  onChange,
  max = 10,
}: {
  title: string;
  groups: OptionGroup[];
  selected: string[];
  onChange: (next: string[]) => void;
  max?: number;
}) {
  const flat = useMemo(() => flattenGroups(groups), [groups]);

  function toggle(id: string) {
    if (selected.includes(id)) {
      onChange(selected.filter((x) => x !== id));
      return;
    }
    if (selected.length >= max) return;
    onChange([...selected, id]);
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-white/80">{title}</p>
        <p className="text-xs text-white/50">
          {selected.length} / {max}
        </p>
      </div>

      <div className="mt-3 space-y-4">
        {groups.map((g) => (
          <div key={g.group}>
            <p className="text-xs text-white/50 mb-2">{g.group}</p>
            <div className="flex flex-wrap gap-2">
              {g.options.map((o) => {
                const active = selected.includes(o.id);
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => toggle(o.id)}
                    className={
                      "text-xs px-3 py-2 rounded-full border transition " +
                      (active
                        ? "bg-violet-500/20 text-violet-200 border-violet-400/30"
                        : "bg-black/30 text-white/75 border-white/10 hover:bg-white/10")
                    }
                    title={flat.find((x) => x.id === o.id)?.group ?? ""}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {selected.length >= max && (
        <p className="text-[11px] text-amber-200 mt-3">
          You hit the limit. Remove one to add another.
        </p>
      )}
    </div>
  );
}

export default function ProfileSettingsPage() {
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState("");
  const [lookingFor, setLookingFor] = useState<UserProfile["lookingFor"]>("open");
  const [pace, setPace] = useState<UserProfile["pace"]>("balanced");

  const [aboutMeTags, setAboutMeTags] = useState<string[]>([]);
  const [lookingForTags, setLookingForTags] = useState<string[]>([]);

  const [aboutMeText, setAboutMeText] = useState("");
  const [lookingForText, setLookingForText] = useState("");

  useEffect(() => {
    const p = loadProfile();
    if (!p) return;

    setName(p.name ?? "");
    setLookingFor(p.lookingFor ?? "open");
    setPace(p.pace ?? "balanced");

    setAboutMeTags(p.aboutMeTags ?? []);
    setLookingForTags(p.lookingForTags ?? []);

    setAboutMeText(p.aboutMeText ?? "");
    setLookingForText(p.lookingForText ?? "");
  }, []);

  function onSave() {
    const existing = loadProfile();

    const next: UserProfile = {
      name: name.trim(),
      lookingFor,
      pace,
      aboutMeTags,
      lookingForTags,
      aboutMeText: aboutMeText.trim(),
      lookingForText: lookingForText.trim(),
      quizTier: existing?.quizTier,
    };

    saveProfile(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 900);
  }

  return (
    <OnboardingGate>
      <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-12">
        <section className="max-w-3xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <Link href="/settings" className="text-sm text-white/70 hover:text-white">
              ← Back to settings
            </Link>
            <div className="scale-75 rivva-orb">
              <RivvaOrb />
            </div>
          </header>

          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-white/60 text-sm mb-8">
            Make your profile feel human: a few tags + your own words.
          </p>

          <div className="space-y-4">
            <SectionCard title="Basics" desc="Name + relationship intent. Keep it simple for now.">
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="text-sm text-white/80">
                  Display name
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="mt-2 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-400/60 placeholder:text-white/40"
                  />
                </label>

                <label className="text-sm text-white/80">
                  Looking for
                  <select
                    value={lookingFor}
                    onChange={(e) => setLookingFor(e.target.value as UserProfile["lookingFor"])}
                    className="mt-2 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-400/60"
                  >
                    <option value="serious">Serious</option>
                    <option value="open">Open</option>
                    <option value="casual">Casual</option>
                  </select>
                </label>

                <label className="text-sm text-white/80 sm:col-span-2">
                  Pace
                  <select
                    value={pace}
                    onChange={(e) => setPace(e.target.value as UserProfile["pace"])}
                    className="mt-2 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-400/60"
                  >
                    <option value="slow">Slow</option>
                    <option value="balanced">Balanced</option>
                    <option value="fast">Fast</option>
                  </select>
                </label>
              </div>
            </SectionCard>

            <SectionCard
              title="About me"
              desc="Pick a few that actually describe you. You can also write it in your own words."
            >
              <MultiSelectChips
                title="Choose up to 10"
                groups={ABOUT_ME_GROUPS}
                selected={aboutMeTags}
                onChange={setAboutMeTags}
                max={10}
              />

              <div className="mt-5">
                <label className="text-sm text-white/80">
                  Describe yourself (optional)
                  <textarea
                    value={aboutMeText}
                    onChange={(e) => setAboutMeText(e.target.value)}
                    rows={4}
                    placeholder="Example: I’m warm, a little shy at first, and I love simple dates with real conversation."
                    className="mt-2 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-400/60 placeholder:text-white/40 resize-none"
                  />
                </label>
              </div>
            </SectionCard>

            <SectionCard
              title="What I’m looking for"
              desc="This powers better matching and better “Why we matched” explanations."
            >
              <MultiSelectChips
                title="Choose up to 10"
                groups={LOOKING_FOR_GROUPS}
                selected={lookingForTags}
                onChange={setLookingForTags}
                max={10}
              />

              <div className="mt-5">
                <label className="text-sm text-white/80">
                  What are you hoping to find (optional)
                  <textarea
                    value={lookingForText}
                    onChange={(e) => setLookingForText(e.target.value)}
                    rows={4}
                    placeholder="Example: Someone consistent who communicates clearly and wants to build something real."
                    className="mt-2 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-400/60 placeholder:text-white/40 resize-none"
                  />
                </label>
              </div>
            </SectionCard>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onSave}
                className="px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition"
              >
                Save
              </button>

              {saved && <p className="text-sm text-emerald-200">Saved ✓</p>}
            </div>

            <p className="text-xs text-white/50">
              Note: This is stored locally for now (MVP). We’ll back it with a real database later.
            </p>
          </div>
        </section>
      </main>
    </OnboardingGate>
  );
}
