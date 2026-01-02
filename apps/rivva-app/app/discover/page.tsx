import Link from "next/link";

export const metadata = { title: "Discover. Rivva" };

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/65">
      {children}
    </span>
  );
}

export default function DiscoverPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-16 pb-20 text-white">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Pill>Discover</Pill>
          <Pill>beta</Pill>
        </div>

        <h1 className="mt-5 text-3xl font-semibold tracking-tight">Opening soon.</h1>

        <p className="mt-3 text-sm text-white/70 leading-relaxed">
          We are finalizing the first wave before opening discovery.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/matches" className="inline-flex items-center justify-center rounded-2xl px-4 py-2 bg-white text-black text-sm font-medium">
            View matches
          </Link>
          <Link href="/quiz" className="inline-flex items-center justify-center rounded-2xl px-4 py-2 border border-white/15 bg-white/5 text-white text-sm font-medium">
            Take the quiz
          </Link>
          <Link href="/" className="inline-flex items-center justify-center rounded-2xl px-4 py-2 border border-white/15 bg-white/5 text-white text-sm font-medium">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
