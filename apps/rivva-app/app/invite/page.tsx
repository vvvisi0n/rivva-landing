"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { submitInviteRequest } from "@/lib/invite";

function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim().toLowerCase());
}

export default function InvitePage() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const ok = useMemo(() => isValidEmail(email), [email]);

  function onSubmit() {
    setErr(null);
    const v = email.trim().toLowerCase();
    if (!isValidEmail(v)) {
      setErr("Enter a valid email.");
      return;
    }
    submitInviteRequest({ email: v });
    setDone(true);
  }

  return (
    <main className="mx-auto max-w-2xl px-6 pt-16 pb-20">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl">
        <p className="text-xs uppercase tracking-widest text-white/50">Invite only</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">Request access</h1>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          Rivva opens in small waves. If you leave your email, you get first access when your wave opens.
        </p>

        {!done ? (
          <div className="mt-8 space-y-3">
            <label className="block text-sm text-white/70">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-white/20"
              inputMode="email"
              autoComplete="email"
            />

            {err && <p className="text-sm text-red-300">{err}</p>}

            <button
              onClick={onSubmit}
              disabled={!ok}
              className="mt-2 inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition
                bg-white text-black hover:bg-white/90 disabled:opacity-40 disabled:hover:bg-white"
            >
              Request invite
            </button>

            <p className="text-xs text-white/55">
              No spam. No newsletter. Just access.
            </p>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-5">
            <p className="text-sm font-semibold text-white">Saved.</p>
            <p className="mt-1 text-sm text-white/70">
              You are on the list. When your wave opens, you will get access.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/" className="rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-white/90 transition">
                Back home
              </Link>
              <Link href="/how-it-works" className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition">
                How it works
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
