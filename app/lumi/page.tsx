"use client";

import { useState } from "react";

export default function LumiPage() {
  const [email, setEmail] = useState("");

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-extrabold text-purple-700 mb-4">
        Lumi
      </h1>

      <p className="text-slate-600 max-w-xl mb-8">
        Lumi is Rivva&apos;s AI dating companion. This page is a temporary placeholder.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(`Thanks, ${email || "friend"}!`);
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
          className="flex-1 p-3 border rounded-xl"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold"
        >
          Notify Me
        </button>
      </form>
    </main>
  );
}
