import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-16 pb-20">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl">
        <p className="text-xs uppercase tracking-widest text-white/50">Privacy</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">Quiet by default</h1>
        <p className="mt-4 text-sm text-white/70 leading-relaxed">
          Rivva is designed to minimize exposure. You control when you are visible, when you are reachable, and how much the app interrupts your day.
        </p>

        <div className="mt-6 space-y-3 text-sm text-white/70">
          <p>We do not sell personal data.</p>
          <p>We avoid dark patterns and manufactured urgency.</p>
          <p>We keep defaults conservative. You opt in to louder behavior.</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/invite" className="rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-white/90 transition">
            Request invite
          </Link>
          <Link href="/" className="rounded-2xl bg-white/10 border border-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition">
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
