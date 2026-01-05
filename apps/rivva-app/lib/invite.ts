export type InviteRequest = {
  email: string;
  source?: string;
};

const KEY = "rivva.inviteRequests.v1";

export async function submitInviteRequest(input: InviteRequest) {
  // MVP: local persistence only (no backend yet)
  if (typeof window === "undefined") return { ok: true };

  const payload = {
    email: input.email.trim().toLowerCase(),
    source: input.source ?? "rivva-app",
    createdAt: new Date().toISOString(),
  };

  try {
    const raw = localStorage.getItem(KEY);
    const existing = raw ? (JSON.parse(raw) as any[]) : [];
    existing.unshift(payload);
    localStorage.setItem(KEY, JSON.stringify(existing.slice(0, 200)));
  } catch {
    // ignore in MVP
  }

  return { ok: true };
}
