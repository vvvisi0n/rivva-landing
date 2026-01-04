export type InviteRequest = {
  email: string;
  source?: string;
};

export async function submitInviteRequest(input: InviteRequest): Promise<{ ok: boolean }> {
  // MVP: store locally + best-effort POST if an API exists later
  if (typeof window !== "undefined") {
    try {
      const key = "rivva.invite.requests.v1";
      const existing = JSON.parse(localStorage.getItem(key) || "[]") as InviteRequest[];
      existing.push({ email: input.email, source: input.source ?? "rivva-app" });
      localStorage.setItem(key, JSON.stringify(existing));
    } catch {}
  }

  try {
    // Optional: if you add an API route later, this will start working automatically.
    await fetch("/api/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
  } catch {}

  return { ok: true };
}
