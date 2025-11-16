"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || email.trim() === "") return;

    setStatus("saving");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("done");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Subscribe error:", error);
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-bold mb-4">Rivva</h1>
      <p className="text-lg text-gray-600 mb-8">
        Be the first to know when we launch.
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
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          type="submit"
          disabled={status === "saving"}
          className={`px-6 py-3 rounded-lg text-white font-semibold ${
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
        <p className="text-red-500 mt-3">Something went wrong. Try again.</p>
      )}
    </main>
  );
}
