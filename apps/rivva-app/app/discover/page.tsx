import Link from "next/link";

export default function DiscoverPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-16 pb-20 text-white">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl">
        <p className="text-xs uppercase tracking-widest text-white/50">Discover</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Opening soon</h1>
        <p className="mt-4 text-sm text-white/70 leading-relaxed">
          We’re finalizing the first wave: profile signals → ranking → match preview.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/matches"
            className="rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-white/90 transition"
          >
            View matches
          </Link>
          <Link
            href="/profile"
            className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition"
          >
            Edit profile
          </Link>
        </div>
      </div>
    </main>
  );
}
