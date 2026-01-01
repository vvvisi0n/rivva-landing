import Link from "next/link";

export const metadata = {
  title: "Matches. Rivva",
};

export default function MatchesPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 pt-16 pb-24">
      <div className="rounded-2xl bg-black/30 border border-white/10 p-8">
        <h1 className="text-2xl font-semibold tracking-tight">Matches</h1>
        <p className="mt-3 text-sm text-white/65 leading-relaxed">
          This space is being prepared. Rivva will surface fewer matches. Better ones.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/invite" className="inline-flex items-center justify-center rounded-xl bg-white text-black px-4 py-2 text-sm font-medium">
            Request invite
          </Link>
          <Link href="/" className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10">
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
