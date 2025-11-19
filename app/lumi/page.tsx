"use client";

import { useState } from "react";

export default function LumiPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] =
    useState<"idle" | "saving" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim()) return;
    setStatus("saving");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("done");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 pt-24 text-center">
      <h1 className="text-6xl font-extrabold text-purple-700 mb-4">Lumi</h1>

      <p className="max-w-xl text-slate-600 mb-8">
        Lumi is Rivva&apos;s AI dating companion. This is a placeholder page
        while we build the full experience.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 p-3 border rounded-xl shadow-sm"
        />

        <button
          type="submit"
          disabled={status === "saving"}
          className={`px-6 py-3 rounded-xl text-white font-semibold transition shadow-md ${
            status === "saving"
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {status === "saving"
            ? "Saving..."
            : status === "done"
            ? "Saved!"
            : "Notify Me"}
        </button>
      </form>

      {status === "error" && (
        <p className="text-red-500 mt-3">Something went wrong.</p>
      )}
    </main>
  );
}
