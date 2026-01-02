export type UserProfile = {
  
  quizTier?: "A" | "B" | "C" | "D" | "E";
id: string;
  name: string;
  age?: number;
  city?: string;
  intent?: "dating" | "serious" | "friendship";
  aboutMeTags?: string[];
  lookingForTags?: string[];
  boundaries?: string[];
};

const KEY = "rivva_profile_v1";

export function loadProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

export function saveProfile(next: UserProfile) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(next));
}

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
