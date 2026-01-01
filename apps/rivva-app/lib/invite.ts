export type InviteRequest = {
  id: string;
  email: string;
  source?: string;
  createdAt: string;
};

const KEY = "rivva_invite_requests_v1";

function readAll(): InviteRequest[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? (JSON.parse(raw) as InviteRequest[]) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function writeAll(next: InviteRequest[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function submitInviteRequest(input: { email: string; source?: string }) {
  if (typeof window === "undefined") return;

  const email = input.email.trim().toLowerCase();
  const evt: InviteRequest = {
    id: `inv_${Math.random().toString(16).slice(2)}`,
    email,
    createdAt: new Date().toISOString(),
  };

  const curr = readAll();
  writeAll([evt, ...curr]);

  return evt;
}
