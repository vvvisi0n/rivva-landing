"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import LumiOrb from "@/components/LumiOrb";

type FormState = {
  name: string;
  age: string;
  gender: string;
  lookingFor: string;
  intent: string;
  ageMin: string;
  ageMax: string;
};

const DEFAULT: FormState = {
  name: "",
  age: "",
  gender: "",
  lookingFor: "",
  intent: "",
  ageMin: "22",
  ageMax: "40",
};

export default function ProfileSetupPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(DEFAULT);
  const [saving, setSaving] = useState(false);

  function update(k: keyof FormState, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function isValid() {
    return (
      form.name.trim() &&
      form.age.trim() &&
      form.gender &&
      form.lookingFor &&
      form.intent
    );
  }

  async function next() {
    if (!isValid() || saving) return;

    setSaving(true);

    sessionStorage.setItem("rivva_profile", JSON.stringify(form));

    setTimeout(() => {
      setSaving(false);
      router.push("/onboarding/finish");
    }, 500);
  }

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-14">
      <div className="mb-8">
        <LumiOrb />
      </div>

      <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-3xl p-7 shadow-xl">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          Let me learn your basics
        </h1>
        <p className="text-white/70 text-sm mb-8">
          This helps me personalize your matches and advice.
        </p>

        <div className="grid grid-cols-1 gap-5">
          <label className="grid gap-2">
            <span className="text-sm text-white/80">First name</span>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g., Victor"
              className="input"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-white/80">Age</span>
            <input
              value={form.age}
              onChange={(e) => update("age", e.target.value)}
              placeholder="e.g., 29"
              type="number"
              min="18"
              className="input"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-white/80">You identify as</span>
            <select
              value={form.gender}
              onChange={(e) => update("gender", e.target.value)}
              className="input"
            >
              <option value="">Select one</option>
              <option value="male">Man</option>
              <option value="female">Woman</option>
              <option value="nonbinary">Non-binary</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-white/80">You’re looking for</span>
            <select
              value={form.lookingFor}
              onChange={(e) => update("lookingFor", e.target.value)}
              className="input"
            >
              <option value="">Select one</option>
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="everyone">Everyone</option>
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-white/80">Relationship intent</span>
            <select
              value={form.intent}
              onChange={(e) => update("intent", e.target.value)}
              className="input"
            >
              <option value="">Select one</option>
              <option value="serious">Serious relationship</option>
              <option value="open">Open to serious</option>
              <option value="casual">Casual / exploring</option>
            </select>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="grid gap-2">
              <span className="text-sm text-white/80">Age min</span>
              <input
                value={form.ageMin}
                onChange={(e) => update("ageMin", e.target.value)}
                type="number"
                min="18"
                className="input"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm text-white/80">Age max</span>
              <input
                value={form.ageMax}
                onChange={(e) => update("ageMax", e.target.value)}
                type="number"
                min="18"
                className="input"
              />
            </label>
          </div>
        </div>

        <button
          onClick={next}
          disabled={!isValid() || saving}
          className={`mt-8 w-full px-6 py-3 rounded-xl font-semibold transition active:scale-[0.98]
            ${
              !isValid() || saving
                ? "bg-white/10 text-white/40 cursor-not-allowed"
                : "bg-white text-black hover:bg-white/90"
            }`}
        >
          {saving ? "Saving..." : "Continue"}
        </button>
      </div>
    </main>
  );
}
