"use client";

import Link from "next/link";
import { useState } from "react";
import { getBrowserLocation } from "@/lib/geo";
import { patchProfile } from "@/lib/profile";

export default function GeoOnboardingPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState<string>("");

  async function enable() {
    setStatus("loading");
    setMsg("");
    try {
      const p = await getBrowserLocation();
      patchProfile({ geo: { lat: p.lat, lng: p.lng, radiusMiles: 30 } as any });
      setStatus("ok");
      setMsg("Location saved. You’re ready.");
    } catch (e: any) {
      setStatus("err");
      setMsg(e?.message ?? "Could not get location. You can still use Rivva, but matching will be less accurate.");
    }
  }

  return (
    <main className="mx-auto max-w-xl px-6 pt-16 pb-20 text-white">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="text-xs uppercase tracking-widest text-white/50">Onboarding</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Enable location</h1>
        <p className="mt-4 text-sm text-white/70 leading-relaxed">
          Rivva uses your location to surface nearby matches. You can change your radius anytime.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={enable}
            className="rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-white/90 transition disabled:opacity-60"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Requesting…" : "Enable location"}
          </button>

          <Link
            href="/matches"
            className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition"
          >
            Skip for now
          </Link>
        </div>

        {!!msg && (
          <p className="mt-6 text-sm text-white/70">{msg}</p>
        )}

        {status === "ok" && (
          <div className="mt-6">
            <Link
              href="/matches"
              className="inline-flex rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-white/90 transition"
            >
              Continue to matches
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
