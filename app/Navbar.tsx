"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0b0b14]/80 backdrop-blur-md border-b border-white/10">
      <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400" />
          <span className="text-white font-extrabold tracking-tight text-xl">
            Rivva
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/quiz"
            className="text-white/80 hover:text-white transition"
          >
            Quiz
          </Link>

          <Link
            href="/#early-access"
            className="text-white/80 hover:text-white transition"
          >
            Early Access
          </Link>

          <Link
            href="/#why"
            className="text-white/80 hover:text-white transition"
          >
            Why Rivva
          </Link>

          <Link
            href="/quiz"
            className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition"
          >
            Start Quiz
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white/90 p-2 rounded-lg border border-white/10 bg-white/5"
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0b0b14]">
          <div className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-4 text-sm">
            <Link
              href="/quiz"
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white transition"
            >
              Quiz
            </Link>

            <Link
              href="/#early-access"
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white transition"
            >
              Early Access
            </Link>

            <Link
              href="/#why"
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white transition"
            >
              Why Rivva
            </Link>

            <Link
              href="/quiz"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition w-fit"
            >
              Start Quiz
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
