"use client";

import { useState } from "react";
import BlockReportModal from "@/components/BlockReportModal";

type Props = {
  matchId: string;
  matchName: string;
  contextText?: string;
  className?: string;
};

export default function ChatSafetyButton({
  matchId,
  matchName,
  contextText,
  className,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ??
          "px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold text-white/80 hover:bg-white/15 transition"
        }
      >
        Safety
      </button>

      <BlockReportModal
        open={open}
        onClose={() => setOpen(false)}
        matchId={matchId}
        matchName={matchName}
        contextText={contextText}
      />
    </>
  );
}
