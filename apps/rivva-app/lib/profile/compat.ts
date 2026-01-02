import { loadProfile } from "../profile";

export function getQuizTier() {
  const p = loadProfile() as any;
  return (p?.quizTier ?? null) as ("A" | "B" | "C" | "D" | "E" | null);
}

export function getLookingFor() {
  const p = loadProfile() as any;
  return (p?.lookingFor ?? null) as (string | null);
}

export function getAboutMeTags() {
  const p = loadProfile() as any;
  return (p?.aboutMeTags ?? []) as string[];
}

export function getLookingForTags() {
  const p = loadProfile() as any;
  return (p?.lookingForTags ?? []) as string[];
}
