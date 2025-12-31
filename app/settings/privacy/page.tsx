"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import OnboardingGate from "@/components/OnboardingGate";
import FoundingOrb from "@/components/FoundingOrb";

import {
  DEFAULT_PRIVACY,
  loadPrivacySettings,
  savePrivacySettings,
  type PrivacySettings,
} from "@/lib/privacySettings";

import { MOCK_MATCHES } from "@/lib/matches";

const KEY_TS = "rivva_new_user_joined_ts";
const KEY_ID = "rivva_new_user_joined_id";

function Card({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl">
      <p className="text-sm font-semibold">{title}</p>
      {desc && <p className="text-xs text-white/60 mt-1">{desc}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Toggle({
  label,
  desc,
  value,
  onChange,
}: {
  label: string;
  desc?: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        {desc && <p className="text-xs text-white/60 mt-1">{desc}</p>}
      </div>

      <button
        type="button"
        onClick={() => onChange(!value)}
        className={
          "h-9 w-16 rounded-full border transition relative " +
          (value ? "bg-white/15 border-white/20" : "bg-black/30 border-white/10")
        }
        aria-pressed={value}
      >
        <span
          className={
            "absolute top-1/2 -translate-y-1/2 h-7 w-7 rounded-full transition " +
            (value ? "left-8 bg-white" : "left-1 bg-white/50")
          }
        />
      </button>
    </div>
  );
}

function timeToMinutes(t: string) {
  const [hh, mm] = t.split(":").map((x) => Number(x));
  return hh * 60 + mm;
}

function isInQuietHours(now: Date, start: string, end: string) {
  const cur = now.getHours() * 60 + now.getMinutes();
  const s = timeToMinutes(start);
  const e = timeToMinutes(end);

  if (s < e) return cur >= s && cur < e;
  return cur >= s || cur < e;
}

export default function PrivacySettingsPage() {
  const [p, setP] = useState<PrivacySettings>(DEFAULT_PRIVACY);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setP(loadPrivacySettings());
  }, []);

  function patch(next: Partial<PrivacySettings>) {
    const merged = { ...p, ...next };
    setP(merged);
    savePrivacySettings(merged);
    setSaved(true);
    setTimeout(() => setSaved(false), 800);
  }

  const quietActive = useMemo(() => {
    if (!p.quietHours.enabled) return false;
    return isInQuietHours(new Date(), p.quietHours.start, p.quietHours.end);
  }, [p.quietHours.enabled, p.quietHours.start, p.quietHours.end]);

  return (
    <OnboardingGate>
      <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-12">
        <section className="max-w-3xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <Link href="/settings" className="text-sm text-white/70 hover:text-white">
              ← Back to settings
            </Link>
            <div className="scale-75">
              <FoundingOrb />
            </div>
          </header>

          <h1 className="text-3xl font-bold mb-2">Privacy</h1>
          <p className="text-white/60 text-sm mb-8">
            Control what you see, what others see, and how intense the experience feels.
          </p>

          <div className="space-y-4">
            <Card title="Experience">
              <div className="space-y-5">
                <Toggle
                  label="Show Rivva orb"
                  desc="If the orb feels intense, turn it off — everything still works."
                  value={p.showRivvaOrb}
                  onChange={(v) => patch({ showRivvaOrb: v })}
                />

                <Toggle
                  label="Low-Stimulation Mode"
                  desc="Reduces motion/animation and keeps the UI calmer."
                  value={p.lowStimulationMode}
                  onChange={(v) => patch({ lowStimulationMode: v })}
                />
              </div>
            </Card>

            <Card title="Presence">
              <div className="space-y-5">
                <Toggle
                  label="Hide online status"
                  value={p.hideOnlineStatus}
                  onChange={(v) => patch({ hideOnlineStatus: v })}
                />
                <Toggle
                  label="Hide read receipts"
                  value={p.hideReadReceipts}
                  onChange={(v) => patch({ hideReadReceipts: v })}
                />
              </div>
            </Card>

            <Card
              title="Safety + messaging"
              desc="MVP toggles. We’ll connect these to deeper protections next."
            >
              <div className="space-y-5">
                <Toggle
                  label="Message keyword filtering"
                  desc="Warns/blocks certain messages (scam/off-platform pressure + discrimination signals)."
                  value={p.messageKeywordFilter}
                  onChange={(v) => patch({ messageKeywordFilter: v })}
                />

                <Toggle
                  label="Boundary reminders"
                  desc="Gentle nudges when conversations escalate too fast (coming next)."
                  value={p.boundaryReminders}
                  onChange={(v) => patch({ boundaryReminders: v })}
                />
              </div>
            </Card>

            <Card title="Quiet hours" desc="Suppresses certain banners while quiet hours are active.">
              <Toggle
                label="Enable quiet hours"
                value={p.quietHours.enabled}
                onChange={(v) => patch({ quietHours: { ...p.quietHours, enabled: v } })}
              />

              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <label className="text-sm text-white/80">
                  Start
                  <input
                    type="time"
                    value={p.quietHours.start}
                    onChange={(e) =>
                      patch({ quietHours: { ...p.quietHours, start: e.target.value } })
                    }
                    className="mt-2 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-400/60"
                  />
                </label>

                <label className="text-sm text-white/80">
                  End
                  <input
                    type="time"
                    value={p.quietHours.end}
                    onChange={(e) =>
                      patch({ quietHours: { ...p.quietHours, end: e.target.value } })
                    }
                    className="mt-2 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-400/60"
                  />
                </label>
              </div>

              {p.quietHours.enabled && (
                <p className={"text-xs mt-3 " + (quietActive ? "text-emerald-200" : "text-white/60")}>
                  {quietActive ? "Quiet hours are active right now." : "Quiet hours are not active right now."}
                </p>
              )}
            </Card>

            <Card title="Notifications">
              <Toggle
                label="Notify me when someone new joins"
                desc="Shows a banner you can tap to view the new person."
                value={p.notifyNewUsers}
                onChange={(v) => patch({ notifyNewUsers: v })}
              />
            </Card>

            <div className="flex items-center gap-3">
              {saved && <p className="text-sm text-emerald-200">Saved ✓</p>}
              <Link href="/settings" className="text-sm text-white/60 hover:text-white">
                Back to settings
              </Link>
            </div>

            <p className="text-xs text-white/50">
              Note: These settings are stored locally for now (MVP). We’ll back them with a real database later.
            </p>

            {process.env.NODE_ENV !== "production" && (
              <div className="rounded-3xl bg-white/5 border border-white/10 p-4">
                <p className="text-sm font-semibold">Dev tools</p>
                <p className="text-xs text-white/60 mt-1">
                  Test the “new user joined” banner instantly (click → opens their profile).
                </p>

                <button
                  type="button"
                  onClick={() => {
                    const pick = MOCK_MATCHES[Math.floor(Math.random() * MOCK_MATCHES.length)];
                    localStorage.setItem(KEY_ID, pick.id);
                    localStorage.setItem(KEY_TS, String(Date.now()));
                    window.dispatchEvent(new Event("storage"));
                  }}
                  className="mt-3 px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-white/90 transition"
                >
                  Simulate new user join
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </OnboardingGate>
  );
}
