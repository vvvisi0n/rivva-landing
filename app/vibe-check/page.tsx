"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import OnboardingGate from "@/components/OnboardingGate";
import LumiOrb from "@/components/LumiOrb";

type VibeEntry = {
  date: string;
  mood: string;
  energy: number; // 1-5
  note?: string;
};

const STORAGE_KEY = "rivva_vibe_entries";

const MOODS = ["calm", "excited", "anxious", "open", "tired", "hopeful"];

export default function VibeCheckPage() {
  const [entries, setEntries] = useState<VibeEntry[]>([]);
  const [mood, setMood] = useState("calm");
  const [energy, setEnergy] = useState(3);
  const [note, setNote] = useState("");
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setEntries(JSON.parse(raw));
    } catch {}
  }, []);

  function saveAll(next: VibeEntry[]) {
    setEntries(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }

  function submit() {
    const entry: VibeEntry = {
      date: today,
      mood,
      energy,
      note: note.trim() || undefined,
    };

    const next = [entry, ...entries.filter((e) => e.date !== today)];
    saveAll(next);
    setNote("");
  }

  return (
    <OnboardingGate>
      <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-12">
        <section className="max-w-3xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <Link href="/matches" className="text-sm text-white/70 hover:text-white">
              ← Back to matches
            </Link>
            <div className="scale-75">
              <LumiOrb />
            </div>
          </header>

          <h1 className="text-3xl font-bold mb-2">Daily Vibe Check</h1>
          <p className="text-white/60 text-sm mb-6">
            Lumi tracks pattern changes over time — this takes 15 seconds.
          </p>

          {/* Form card */}
          <div className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl">
            <p className="text-sm text-white/80 mb-2">Today’s mood</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {MOODS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`px-3 py-1.5 rounded-xl text-sm border transition
                    ${mood === m
                      ? "bg-white text-black border-white"
                      : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                    }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <p className="text-sm text-white/80 mb-2">Energy level</p>
            <div className="flex gap-2 mb-5">
              {[1,2,3,4,5].map((n) => (
                <button
                  key={n}
                  onClick={() => setEnergy(n)}
                  className={`h-10 w-10 rounded-xl font-semibold border transition
                    ${energy === n
                      ? "bg-gradient-to-r from-purple-500 to-cyan-400 text-black border-transparent"
                      : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                    }`}
                >
                  {n}
                </button>
              ))}
            </div>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Optional: what’s on your mind?"
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/40 resize-none mb-4"
            />

            <button
              onClick={submit}
              className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
            >
              Save today’s vibe
            </button>

            <p className="text-xs text-white/50 mt-3">
              Saved locally. We’ll connect this to your account later.
            </p>
          </div>

          {/* History */}
          {entries.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-3">Recent vibes</h2>
              <div className="flex flex-col gap-3">
                {entries.slice(0,5).map((e) => (
                  <div
                    key={e.date}
                    className="rounded-2xl bg-white/5 border border-white/10 p-4"
                  >
                    <p className="text-sm font-semibold">
                      {e.date} · {e.mood} · energy {e.energy}/5
                    </p>
                    {e.note && (
                      <p className="text-sm text-white/70 mt-1">{e.note}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </OnboardingGate>
  );
}
