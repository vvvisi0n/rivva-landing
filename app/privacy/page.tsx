import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-16">
      <section className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-white/60 hover:text-white">
          ← Back
        </Link>

        <h1 className="mt-8 text-3xl font-semibold tracking-tight">
          Privacy is the baseline.
        </h1>

        <p className="mt-3 text-white/70 leading-relaxed">
          Rivva is designed around restraint.
          <br />
          When you’re visible. When you’re reachable. When the app stays quiet.
        </p>

        <div className="mt-10 grid gap-4">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
            <p className="text-sm font-semibold">Quiet by default</p>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              No unnecessary alerts. No manufactured urgency. No noise pretending to be value.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
            <p className="text-sm font-semibold">Controls that matter</p>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              Presence and pacing settings are built in. You decide the temperature of the experience.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
