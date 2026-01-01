"use client";

import { useEffect, useState } from "react";
import { loadProfile, saveProfile, type UserProfile } from "@/lib/profile";
import Link from "next/link";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs uppercase tracking-widest text-white/50">{children}</p>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-white/20"
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="mt-2 w-full min-h-[120px] rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-white/20"
    />
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/65">{children}</span>;
}

function parseTags(s: string) {
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, 24);
}

export default function ProfilePage() {
  const [p, setP] = useState<UserProfile>({
    id: "me",
    name: "You",
    intent: "serious",
    city: "New York",
    aboutMeTags: ["calm", "intentional", "emotionally intelligent"],
    lookingForTags: ["consistency", "clear communication", "emotional safety"],
    boundaries: ["no off platform pressure", "no chaos"],
  });

  const [aboutRaw, setAboutRaw] = useState("");
  const [lookingRaw, setLookingRaw] = useState("");
  const [boundRaw, setBoundRaw] = useState("");
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    const existing = loadProfile();
    if (existing) {
      setP(existing);
      setAboutRaw((existing.aboutMeTags ?? []).join(", "));
      setLookingRaw((existing.lookingForTags ?? []).join(", "));
      setBoundRaw((existing.boundaries ?? []).join(", "));
    } else {
      setAboutRaw((p.aboutMeTags ?? []).join(", "));
      setLookingRaw((p.lookingForTags ?? []).join(", "));
      setBoundRaw((p.boundaries ?? []).join(", "));
    }
  }, []);

  function persist() {
    const next: UserProfile = {
      ...p,
      aboutMeTags: parseTags(aboutRaw),
      lookingForTags: parseTags(lookingRaw),
      boundaries: parseTags(boundRaw),
    };
    saveProfile(next);
    setP(next);
    setSaved("Saved.");
    setTimeout(() => setSaved(null), 1200);
  }

  return (
    <main className="mx-auto max-w-3xl px-6 pt-16 pb-20">
      <div className="flex items-center justify-between gap-4">
        <div>
          <FieldLabel>Profile</FieldLabel>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Control your matching signal</h1>
          <p className="mt-3 text-sm text-white/70">
            The matcher reads these inputs. Tight inputs create better matches.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/matches" className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition">
            Matches
          </Link>
          <button
            onClick={persist}
            className="rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-white/90 transition"
          >
            Save
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <FieldLabel>Name</FieldLabel>
          <Input value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} placeholder="Your name" />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 grid gap-6 md:grid-cols-2">
          <div>
            <FieldLabel>City</FieldLabel>
            <Input value={p.city ?? ""} onChange={(e) => setP({ ...p, city: e.target.value })} placeholder="City" />
          </div>
          <div>
            <FieldLabel>Intent</FieldLabel>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["dating", "serious", "friendship"] as const).map((x) => (
                <button
                  key={x}
                  onClick={() => setP({ ...p, intent: x })}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    p.intent === x ? "bg-white text-black border-white" : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {x}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <FieldLabel>About me tags. Comma separated</FieldLabel>
          <Textarea value={aboutRaw} onChange={(e) => setAboutRaw(e.target.value)} placeholder="calm, intentional, emotionally intelligent" />
          <div className="mt-3 flex flex-wrap gap-2">
            {parseTags(aboutRaw).map((t) => <Chip key={t}>{t}</Chip>)}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <FieldLabel>Looking for tags. Comma separated</FieldLabel>
          <Textarea value={lookingRaw} onChange={(e) => setLookingRaw(e.target.value)} placeholder="consistency, clear communication, emotional safety" />
          <div className="mt-3 flex flex-wrap gap-2">
            {parseTags(lookingRaw).map((t) => <Chip key={t}>{t}</Chip>)}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <FieldLabel>Dealbreakers and boundaries. Comma separated</FieldLabel>
          <Textarea value={boundRaw} onChange={(e) => setBoundRaw(e.target.value)} placeholder="no chaos, no off platform pressure, no love bombing" />
          <div className="mt-3 flex flex-wrap gap-2">
            {parseTags(boundRaw).map((t) => <Chip key={t}>{t}</Chip>)}
          </div>
        </div>

        {saved && (
          <p className="text-sm text-white/70">{saved}</p>
        )}
      </div>
    </main>
  );
}
