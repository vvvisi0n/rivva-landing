"use client";

import { useEffect, useState } from "react";
import { getAnnouncements, isSeen, markSeen } from "@/lib/announcements";

export default function NewMemberToast() {
  const [item, setItem] = useState<ReturnType<typeof getAnnouncements>[number] | null>(null);

  useEffect(() => {
    const pick = () => {
      const all = getAnnouncements();
      const firstUnseen = all.find((a) => !isSeen(a.id));
      setItem(firstUnseen ?? null);
    };

    pick();
    window.addEventListener("storage", pick);
    return () => window.removeEventListener("storage", pick);
  }, []);

  if (!item) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
      <div className="mx-auto max-w-lg rounded-3xl bg-[#0b0b14] border border-white/10 p-4 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">{item.title}</p>
            {item.body && <p className="text-xs text-white/70 mt-1">{item.body}</p>}
          </div>
          <button
            type="button"
            onClick={() => {
              markSeen(item.id);
              setItem(null);
            }}
            className="text-xs text-white/70 hover:text-white"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
