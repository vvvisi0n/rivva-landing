export type QuizTier = "A" | "B" | "C" | "D" | "E";

export type UserProfile = {
  id: string;
  name: string;

  age?: number;

  // If you switch to geo-only later, keep city optional anyway.
  city?: string;

  // Geo is optional for now (MVP), but ready for later.
  geo?: { lat: number; lng: number; radiusMiles?: number };

  intent?: "dating" | "serious" | "friendship";

  quizTier?: QuizTier;

  aboutMeTags?: string[];
  lookingForTags?: string[];
  boundaries?: string[];
};

const PROFILE_KEY = "rivva.profile.v1";

export function saveProfile(next: UserProfile) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
}

export function loadProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? (JSON.parse(raw) as UserProfile) : null;
  } catch {
    return null;
  }
}

export function patchProfile(patch: Partial<UserProfile>) {
  const current = loadProfile() ?? ({ id: "local", name: "You" } as UserProfile);
  const merged = { ...current, ...patch } as UserProfile;
  saveProfile(merged);
  return merged;
}
