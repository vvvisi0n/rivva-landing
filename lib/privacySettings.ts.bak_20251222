export type QuietHours = {
  enabled: boolean;
  start: string; // "22:00"
  end: string;   // "08:00"
};

export type PrivacySettings = {
  // UI / vibe
  showRivvaOrb: boolean;

  // Presence
  hideOnlineStatus: boolean;
  hideReadReceipts: boolean;

  // Privacy
  screenshotProtection: boolean; // MVP: UI + warnings (true prevention is platform-limited)
  travelMode: boolean;

  // Experience
  lowStimulationMode: boolean; // also affects motion + visual intensity
  boundaryReminders: boolean;

  // Messaging
  messageKeywordFilter: boolean;
  filteredKeywords: string[];

  // Quiet hours
  quietHours: QuietHours;

  // Notifications (MVP)
  notifyNewUsers: boolean;
};

const KEY = "rivva_privacy_settings";

export const DEFAULT_PRIVACY: PrivacySettings = {
  showRivvaOrb: false,

  hideOnlineStatus: false,
  hideReadReceipts: false,

  screenshotProtection: false,
  travelMode: false,

  lowStimulationMode: false,
  boundaryReminders: true,

  messageKeywordFilter: true,
  filteredKeywords: ["nudes", "cashapp", "venmo", "paypal", "telegram", "whatsapp"],

  quietHours: { enabled: false, start: "22:00", end: "08:00" },

  notifyNewUsers: false,
};

function safeParse(raw: string | null) {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Partial<PrivacySettings>;
  } catch {
    return null;
  }
}

export function loadPrivacySettings(): PrivacySettings {
  if (typeof window === "undefined") return DEFAULT_PRIVACY;
  const raw = localStorage.getItem(KEY);
  const parsed = safeParse(raw);
  return { ...DEFAULT_PRIVACY, ...(parsed ?? {}) };
}

export function savePrivacySettings(next: PrivacySettings) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function patchPrivacySettings(patch: Partial<PrivacySettings>) {
  const cur = loadPrivacySettings();
  const next = { ...cur, ...patch };
  savePrivacySettings(next);
  return next;
}



/** Helpers for Quiet Hours */
function timeToMinutes(t: string) {
  const [hh, mm] = t.split(":").map((x) => Number(x));
  return hh * 60 + mm;
}

export function isInQuietHours(now: Date, start: string, end: string) {
  const cur = now.getHours() * 60 + now.getMinutes();
  const s = timeToMinutes(start);
  const e = timeToMinutes(end);

  // same-day window
  if (s < e) return cur >= s && cur < e;
  // crosses midnight
  return cur >= s || cur < e;
}

/** Convenience: checks current time against saved Quiet Hours setting */
export function isQuietHoursNow(p: PrivacySettings) {
  if (!p.quietHours?.enabled) return false;
  return isInQuietHours(new Date(), p.quietHours.start, p.quietHours.end);
}
/** Back-compat name (some components call this) */
export function getPrivacySettings(): PrivacySettings {
  return loadPrivacySettings();
}
