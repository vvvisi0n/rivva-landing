import Link from "next/link";
import { ThreadMeta, formatThreadTime } from "@/lib/inbox";

export default function InboxRow({ t }: { t: ThreadMeta }) {
  return (
    <Link
      href={`/chat/${t.matchId}`}
      className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
    >
      <div className="flex items-center gap-3 min-w-0">
        {t.avatar ? (
          <img
            src={t.avatar}
            alt={t.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-white/10" />
        )}

        <div className="min-w-0">
          <div className="flex items-center">
            <h3 className="font-semibold truncate">{t.name}</h3>
            {t.lastActive && (
              <span className="text-xs text-white/50 ml-2 shrink-0">
                {formatThreadTime(t.lastActive)}
              </span>
            )}
          </div>

          <p className="text-sm text-white/60 truncate">
            {t.lastMessage ?? "Start a conversation"}
          </p>
        </div>
      </div>

      {t.unread && (
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
      )}
    </Link>
  );
}