export type UserProfile = {
  name: string;
  city: string;
  lookingFor: "serious" | "open" | "casual";
  pace: "slow" | "balanced" | "fast";
  quizTier?: "spark" | "anchor" | "empath" | "magnetic";
};

const PROFILE_KEY = "rivva_profile";

export function saveProfile(p: UserProfile) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
}

export function loadProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(PROFILE_KEY);
  return raw ? (JSON.parse(raw) as UserProfile) : null;
}

export function saveQuizTier(tier: UserProfile["quizTier"]) {
  if (typeof window === "undefined") return;
  const existing = loadProfile() ?? {
    name: "",
    city: "",
    lookingFor: "open",
    pace: "balanced",
  };

  saveProfile({ ...existing, quizTier: tier });
}
