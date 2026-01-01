import Link from "next/link";

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-sm text-white/70 hover:text-white transition">
      {label}
    </Link>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0b0b14]/55 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-white">
          Rivva<span className="text-white/50">beta</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/how-it-works" label="How it works" />
          <NavLink href="/privacy" label="Privacy" />
          <NavLink href="/invite" label="Request invite" />
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/invite" className="rivva-btn rivva-btn-ghost">
            Request invite
          </Link>
        </div>
      </div>
    </header>
  );
}
