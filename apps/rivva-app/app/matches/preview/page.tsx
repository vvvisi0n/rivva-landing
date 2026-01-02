import { Suspense } from "react";
import PreviewClient from "./PreviewClient";

export const dynamic = "force-dynamic";

export default function MatchesPreviewPage() {
  return (
    <Suspense fallback={<div className="p-6 text-white/70">Loading preview…</div>}>
      <PreviewClient />
    </Suspense>
  );
}
