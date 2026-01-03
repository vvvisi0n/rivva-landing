export type InviteRequestInput = {
  email: string;
  source?: string;
};

export type InviteRequestResult = {
  ok: boolean;
  message?: string;
};

// MVP: no backend yet. Log + pretend success so UI flows + builds.
export async function submitInviteRequest(
  input: InviteRequestInput
): Promise<InviteRequestResult> {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-console
    console.log("[invite] request", input);
  }
  return { ok: true };
}
