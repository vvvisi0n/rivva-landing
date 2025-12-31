"use client";

import { useEffect } from "react";
import { addAnnouncement } from "@/lib/announcements";

const KEY = "rivva_last_new_member_seed_day";

export default function NewMemberSeeder() {
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const last = localStorage.getItem(KEY);
    if (last === today) return;

    localStorage.setItem(KEY, today);

    // MVP demo payload
    addAnnouncement({
      id: `new-member-${today}`,
      ts: Date.now(),
      title: "New member joined Rivva",
      body: "Say hi if you see them in Discover — and remember: keep it respectful.",
    });
  }, []);

  return null;
}
