import Link from "next/link";

export const metadata = { title: "Matches. Rivva" };

export default function MatchesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10 text-white">
      <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Matches</h1>
        <p className="mt-2 text-sm text-white/70">
          This is a placeholder page so the route is stable. We will replace it with the real matching UI next.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/" className="inline-flex items-center justify-center rounded-2xl px-4 py-2 bg-white text-black text-sm font-medium">
            Home
          </Link>
          <Link href="/invite" className="inline-flex items-center justify-center rounded-2xl px-4 py-2 border border-white/15 bg-white/5 text-white text-sm font-medium">
            Invite
          </Link>
        </div>
      </div>
    </main>
  );
}
