import type { PrivacySettings } from "@/lib/privacySettings";

const KEY_LAST_SHOWN = "rivva_new_user_banner_last_shown"; // ISO date: YYYY-MM-DD

function todayKey(d = new Date()) {
  // Local date (good enough for MVP)
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Quiet hours helper (MVP)
 * - start/end are "HH:MM"
 * - supports ranges that cross midnight
 */
export function isInQuietHours(p: PrivacySettings, d = new Date()) {
  if (!p.quietHours?.enabled) return false;

  const [sh, sm] = p.quietHours.start.split(":").map(Number);
  const [eh, em] = p.quietHours.end.split(":").map(Number);

  const start = sh * 60 + sm;
  const end = eh * 60 + em;
  const now = d.getHours() * 60 + d.getMinutes();

  // If start < end (e.g. 22:00 → 08:00 is NOT this case, that crosses midnight)
  if (start < end) {
    return now >= start && now < end;
  }

  // Crosses midnight (e.g. 22:00 → 08:00)
  return now >= start || now < end;
}

export function shouldShowNewUserBanner() {
  if (typeof window === "undefined") return false;
  const last = localStorage.getItem(KEY_LAST_SHOWN);
  return last !== todayKey();
}

export function markNewUserBannerShown() {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_LAST_SHOWN, todayKey());
}
