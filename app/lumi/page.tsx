"use client";

import { useState } from "react";

export default function LumiPage() {
  const [email, setEmail] = useState("");

  return (
    <main className="min-h-screen bg-[#f7f7ff] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-extrabold text-purple-700 mb-4">
        Meet Lumi
      </h1>

      <p className="text-slate-600 max-w-xl mb-8">
        Lumi is Rivva&apos;s AI dating companion. This page is a simple
        placeholder while we finish building the full Lumi experience.
      </p>

      <p className="text-slate-500 text-sm mb-4">
        Want to be the first to try Lumi?
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Just a placeholder for now
          alert(`Thanks, ${email || "friend"}! Lumi is coming soon.`);
          setEmail("");
        }}
        className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 p-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md transition"
        >
          Notify Me
        </button>
      </form>
    </main>
  );
}
