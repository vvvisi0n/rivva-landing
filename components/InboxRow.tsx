"use client";

import Link from "next/link";
import { ThreadMeta, formatThreadTime } from "@/lib/inbox";

export default function InboxRow({ t }: { t: ThreadMeta }) {
  return (
    <Link
      href={`/chat/${t.id}`}
      className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-white/5 transition border border-transparent hover:border-white/10"
    >
      <img
        src={t.avatar}
        alt={t.name}
        className="w-12 h-12 rounded-full object-cover"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold truncate">{t.name}</h3>
          <span className="text-xs text-white/50 ml-2 shrink-0">
            {formatThreadTime(t.lastTs)}
          </span>
        </div>

        <p className="text-sm text-white/70 truncate">
          {t.lastText}
        </p>
      </div>

      {t.unread && (
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
      )}
    </Link>
  );
}
