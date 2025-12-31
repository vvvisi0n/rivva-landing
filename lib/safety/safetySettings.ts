export type SafetySettings = {
  verifiedOnly: boolean;

  // Reporter-side immediate protection (does NOT punish the other user globally)
  blockImmediatelyWhenReporting: boolean;

  // Informational only for now (we’ll enforce server-side later)
  trustWeightedEscalationEnabled: boolean;
};

const KEY = "rivva_safety_settings_v1";

const DEFAULTS: SafetySettings = {
  verifiedOnly: false,
  blockImmediatelyWhenReporting: true,
  trustWeightedEscalationEnabled: true,
};

export function getSafetySettings(): SafetySettings {
  if (typeof window === "undefined") return DEFAULTS;

  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULTS;

    const parsed = JSON.parse(raw) as Partial<SafetySettings>;
    return { ...DEFAULTS, ...parsed };
  } catch {
    return DEFAULTS;
  }
}

export function setSafetySettings(next: Partial<SafetySettings>) {
  if (typeof window === "undefined") return;

  const current = getSafetySettings();
  const merged = { ...current, ...next };
  localStorage.setItem(KEY, JSON.stringify(merged));

  // Trigger same-tab listeners too
  window.dispatchEvent(new Event("storage"));
}

export function resetSafetySettings() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("storage"));
}
