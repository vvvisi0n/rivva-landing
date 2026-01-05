"use client";

import { loadProfile } from "@/lib/profile";
import type { Match } from "@/lib/matches";
import { ABOUT_ME_GROUPS, LOOKING_FOR_GROUPS, flattenGroups } from "@/lib/profileOptions";


function idToLabel(id: string): string {
  try {
    const flat = flattenGroups([...(ABOUT_ME_GROUPS as any), ...(LOOKING_FOR_GROUPS as any)] as any);
    const hit = (flat as any[]).find((o) => o?.id === id);
    return (hit?.label ?? id) as string;
  } catch {
    return id;
  }
}

type Props = { match: Match };

function overlap(a: string[], b: string[]) {
  const setB = new Set(b);
  return a.filter((x) => setB.has(x));
}

function toLabelMap(groups: any[]) {
  const flat = flattenGroups(groups);
  const map = new Map<string, string>();
  for (const o of flat) map.set(o.id, o.label);
  return map;
}

export default function WhyThisMatch({ match }: Props) {
  const profile = loadProfile();

  const userAbout = profile?.aboutMeTags ?? [];
  const userLooking = profile?.lookingForTags ?? [];

  const matchAbout = match.aboutMeTags ?? [];
  const matchLooking = match.lookingForTags ?? [];

  const aboutHits = overlap(userAbout, matchAbout);
  const lookingHits = overlap(userLooking, matchLooking);

  const hasAny = aboutHits.length > 0 || lookingHits.length > 0;

  const aboutLabel = toLabelMap(ABOUT_ME_GROUPS);
  const lookingLabel = toLabelMap(LOOKING_FOR_GROUPS);

  const aboutHitLabels = aboutHits.map((id) => aboutLabel.get(id) ?? id);
  const lookingHitLabels = lookingHits.map((id) => lookingLabel.get(id) ?? id);

  return (
    <section
      id="why-match"
      className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Why we matched</h2>
          <p className="text-sm text-white/60 mt-1">
            Transparent alignment based on your “About me” + “Looking for” tags.
          </p>
        </div>

        {typeof match.compatibility === "number" && (
          <div className="rounded-2xl bg-black/30 border border-white/10 px-3 py-2">
            <p className="text-xs text-white/50">Compatibility</p>
            <p className="text-sm font-semibold">{match.compatibility}%</p>
          </div>
        )}
      </div>

      {!profile && (
        <div className="mt-4 rounded-2xl bg-black/30 border border-white/10 p-4">
          <p className="text-sm text-white/70">
            Add tags in Settings → Profile so Rivva can explain your matches.
          </p>
        </div>
      )}

      {profile && !hasAny && (
        <div className="mt-4 rounded-2xl bg-black/30 border border-white/10 p-4">
          <p className="text-sm text-white/70">
            We’ll get sharper as you add more tags in Settings → Profile. For now,
            you’re seeing this profile because of your overall vibe and pacing.
          </p>
        </div>
      )}

      {profile && hasAny && (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
            <p className="text-sm font-semibold">About you both</p>
            <p className="text-xs text-white/50 mt-1">Shared personality signals</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {aboutHitLabels.map((label) => (
                <span
                  key={label}
                  className="text-xs px-3 py-1 rounded-full bg-white text-black font-semibold"
                >
                  {label}
                </span>
              ))}

              {aboutHitLabels.length === 0 && (
                <span className="text-xs text-white/50">No direct overlap yet</span>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
            <p className="text-sm font-semibold">What you want</p>
            <p className="text-xs text-white/50 mt-1">This match aligns with</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {lookingHitLabels.map((label) => (
                <span
                  key={label}
                  className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white"
                >
                  {label}
                </span>
              ))}

              {lookingHitLabels.length === 0 && (
                <span className="text-xs text-white/50">No direct overlap yet</span>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
