"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PUBLIC_ROUTES = ["/", "/how-it-works", "/privacy", "/invite"];

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={[
        "text-sm transition",
        active ? "text-white" : "text-white/70 hover:text-white",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname() || "/";
  const isPublic = PUBLIC_ROUTES.includes(pathname);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight text-white">Rivva</span>
          <span className="text-xs text-white/50">beta</span>
        </Link>

        {isPublic ? (
          <div className="flex items-center gap-4">
            <NavLink href="/how-it-works">How it works</NavLink>
            <NavLink href="/privacy">Privacy</NavLink>
            <Link
              href="/invite"
              className="text-sm rounded-xl bg-white text-black px-3 py-2 font-semibold hover:bg-white/90 transition"
            >
              Request invite
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm rounded-xl bg-white text-black px-3 py-2 font-semibold hover:bg-white/90 transition"
            >
              Back to landing
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
