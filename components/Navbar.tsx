"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { loadProfile, type UserProfile } from "@/lib/profile";
import useLumiVoice from "@/components/useLumiVoice";
import { RivvaColors } from "@/lib/theme/rivvaTheme";

const vibeColor: Record<string, string> = {
  spark: "from-pink-400 to-purple-500",
  anchor: "from-emerald-400 to-cyan-500",
  empath: "from-purple-400 to-indigo-500",
  magnetic: "from-amber-400 to-pink-500",
};

const PUBLIC_ROUTES = ["/", "/invite", "/privacy", "/how-it-works"];

export default function Navbar() {
  const pathname = usePathname() || "/";
  const isPublic = PUBLIC_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"));

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { isSpeaking } = useLumiVoice();

  useEffect(() => {
    setProfile(loadProfile());
    const onStorage = () => setProfile(loadProfile());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const tier = profile?.quizTier;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/25 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="relative flex items-center gap-2">
            <span
              className={[
                "inline-block h-2.5 w-2.5 rounded-full",
                "bg-violet-400/70",
                "transition-all duration-300",
                isSpeaking ? RivvaColors.accent.lumi.glow : "",
                isSpeaking ? "scale-110" : "scale-100 opacity-70",
              ].join(" ")}
              aria-label={isSpeaking ? "Lumi active" : "Lumi idle"}
              title={isSpeaking ? "Lumi active" : "Lumi idle"}
            />
            <span className="text-xl font-extrabold tracking-tight text-white">Rivva</span>
          </span>

          <span className="text-xs text-white/50">beta</span>
        </Link>

        <div className="flex items-center gap-4">
          {!!tier && !isPublic && (
            <div className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${vibeColor[tier]} text-black font-semibold`}>
              {tier}
            </div>
          )}

          {isPublic ? (
            <>
              <Link href="/how-it-works" className="text-sm text-white/70 hover:text-white transition">
                How it works
              </Link>
              <Link href="/privacy" className="text-sm text-white/70 hover:text-white transition">
                Privacy
              </Link>
              <Link
                href="/invite"
                className="text-sm rounded-xl bg-white text-black px-3 py-2 font-semibold hover:bg-white/90 transition"
              >
                Request invite
              </Link>
            </>
          ) : (
            <>
              <Link href="/discover" className="text-sm text-white/70 hover:text-white transition">
                Discover
              </Link>
              <Link href="/inbox" className="text-sm text-white/70 hover:text-white transition">
                Inbox
              </Link>
              <Link href="/settings" className="text-sm text-white/70 hover:text-white transition">
                Settings
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
