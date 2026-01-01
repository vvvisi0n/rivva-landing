import Link from "next/link";

export const metadata = {
  title: "Matches. Rivva",
  description: "Your matches. Calm. Curated. Intentional.",
};

export default function MatchesPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 pt-12 pb-24">
      <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Matches
        </h1>
        <p className="mt-3 text-white/70 max-w-2xl">
          This page is live so routing is stable. Next, we’ll connect it to real match data and the full match flow.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/" className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition">
            Home
          </Link>
          <Link href="/invite" className="inline-flex items-center rounded-full bg-white text-black px-4 py-2 text-sm hover:opacity-90 transition">
            Invite
          </Link>
        </div>
      </div>
    </main>
  );
}
