"use client";

import { useEffect, useState } from "react";

const KEY = "rivva_new_user_joined_event";
type Payload = { name: string; ts: number };

export function triggerNewUserJoined(name: string) {
  if (typeof window === "undefined") return;
  const payload: Payload = { name, ts: Date.now() };
  localStorage.setItem(KEY, JSON.stringify(payload));
  window.dispatchEvent(new Event("storage"));
}

export default function NewUserToast() {
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const show = () => {
      try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return;
        const p = JSON.parse(raw) as Payload;

        const seenKey = `rivva_seen_new_user_${p.ts}`;
        if (localStorage.getItem(seenKey)) return;
        localStorage.setItem(seenKey, "1");

        setMsg(`${p.name} just joined Rivva.`);
        setTimeout(() => setMsg(null), 3500);
      } catch {}
    };

    show();
    window.addEventListener("storage", show);
    return () => window.removeEventListener("storage", show);
  }, []);

  if (!msg) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[60] px-4">
      <div className="rounded-2xl bg-black/70 border border-white/10 backdrop-blur-md px-4 py-3 shadow-xl">
        <p className="text-sm text-white/90">{msg}</p>
      </div>
    </div>
  );
}
