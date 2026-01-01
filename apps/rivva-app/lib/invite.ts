export function submitInviteRequest(input: { email: string; source?: string }) {
  if (typeof window === "undefined") return;
  const KEY = "rivva_invite_requests_v1";
  const curr = (() => {
    try {
      const raw = localStorage.getItem(KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  })();

  const next = [
    {
      id: `i_${Math.random().toString(16).slice(2)}`,
      email: input.email.trim().toLowerCase(),
      source: input.source ?? "unknown",
      createdAt: new Date().toISOString(),
    },
    ...curr,
  ];

  localStorage.setItem(KEY, JSON.stringify(next));
  return next[0];
}
