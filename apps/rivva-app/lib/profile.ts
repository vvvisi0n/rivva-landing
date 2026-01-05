export type UserProfile = {
  id: string;
  name: string;

  // Optional profile fields (MVP-safe)
  age?: number;
  city?: string;

  // Geo (for future: geolocation-based matching)
  geo?: { lat: number; lng: number; radiusMiles?: number };

  intent?: "dating" | "serious" | "friendship";
  quizTier?: "A" | "B" | "C" | "D" | "E";
  aboutMeTags?: string[];
  lookingForTags?: string[];
  boundaries?: string[];

  // legacy field (some pages referenced it earlier)
  lookingFor?: string;
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
  const current = loadProfile() ?? ({} as UserProfile);
  const merged = { ...current, ...patch } as UserProfile;
  saveProfile(merged);
  return merged;
}
