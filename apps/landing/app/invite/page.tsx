"use client";

import Link from "next/link";
import { useState } from "react";

export default function InvitePage() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-white">
      <Link href="/" className="text-sm text-white/70 hover:text-white">Back</Link>

      <h1 className="mt-8 text-4xl font-semibold tracking-tight">Request an Invite</h1>
      <p className="mt-4 text-white/70 leading-relaxed max-w-2xl">
        Leave your email. We will invite in small waves to protect the experience.
      </p>

      <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 max-w-xl">
        {done ? (
          <div>
            <p className="text-sm font-semibold">Request received.</p>
            <p className="mt-2 text-sm text-white/70">
              You are on the list. If a slot opens, you will get an invite.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <label className="text-sm text-white/80">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-white/20"
              required
              type="email"
            />
            <button
              type="submit"
              className="w-full rounded-2xl bg-white text-black px-4 py-3 text-sm font-semibold hover:bg-white/90 transition"
            >
              Request invite
            </button>

            <p className="text-xs text-white/50">
              No spam. No noise. Only an invite if space opens.
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
