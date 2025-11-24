"use client";

import { useEffect, useState } from "react";

const noteKey = (matchId: string) => `rivva_note_${matchId}`;

export default function LumiMemoryNote({ matchId }: { matchId: string }) {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(noteKey(matchId));
      if (raw) setNote(raw);
    } catch {}
  }, [matchId]);

  function save() {
    try {
      localStorage.setItem(noteKey(matchId), note.trim());
      setSaved(true);
      setTimeout(() => setSaved(false), 1000);
    } catch {}
  }

  return (
    <div className="mt-3 rounded-2xl bg-white/5 border border-white/10 p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-white/60">Lumi memory (private)</p>
        <button
          onClick={save}
          className="text-xs px-2.5 py-1 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition"
        >
          {saved ? "Saved" : "Save note"}
        </button>
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Example: calm communicator, likes jazz, wants kids, feels safe..."
        rows={3}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/40 resize-none"
      />
    </div>
  );
}
