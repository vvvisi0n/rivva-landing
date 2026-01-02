import { Suspense } from "react";
import PreviewClient from "./PreviewClient";

export const dynamic = "force-dynamic";

export default function MatchPreviewPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-3xl px-6 py-10 text-white">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <p className="text-sm text-white/70">Loading preview.</p>
          </div>
        </main>
      }
    >
      <PreviewClient />
    </Suspense>
  );
}
