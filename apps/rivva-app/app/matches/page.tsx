import Link from "next/link";

export const metadata = {
  title: "Matches · Rivva",
  description: "Your matches will appear here.",
};

export default function MatchesPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 pt-16 pb-20">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-2xl font-semibold tracking-tight">Matches</h1>
        <p className="mt-3 text-white/70">
          This section is being built. For now, you can continue from Home.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl bg-white text-black px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
