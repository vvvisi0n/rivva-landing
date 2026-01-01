import Link from "next/link";

export default function QuizPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-16 pb-20">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl">
        <p className="text-xs uppercase tracking-widest text-white/50">Quiz</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">Not open yet</h1>
        <p className="mt-4 text-sm text-white/70 leading-relaxed">
          The quiz is part of invite onboarding. We are polishing it before launch.
        </p>
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
