"use client";

import { FormEvent, useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      setStatus("loading");
      setMessage("");

      await addDoc(collection(db, "early_access_signups"), {
        email: email.trim().toLowerCase(),
        createdAt: serverTimestamp(),
        source: "landing_page",
      });

      setStatus("success");
      setMessage("You’re in. We’ll let you know when Rivva is ready.");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Something went wrong. Please try again in a moment.");
    }
  };

  return (
    <main className="page">
      <section className="card">
        <div className="logo-row">
          <div className="logo-icon">
            <div className="logo-heartline" />
          </div>
          <div>
            <div className="logo-text">rivva</div>
            <div style={{ fontSize: "0.7rem", color: "#9ca3af" }}>
              connection made smarter
            </div>
          </div>
        </div>

        <div className="chip">
          <span className="chip-dot" />
          <span>AI-guided dating for emotionally intelligent adults</span>
        </div>

        <h1 className="hero">
          <span className="hero-gradient">Connection Made Smarter.</span>
        </h1>
        <p className="sub">
          Rivva helps you meet someone who actually gets you — with Lumi, your
          AI friend for better conversations, better matches, and better
          decisions in dating.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              className="email"
              type="email"
              placeholder="Enter your email to get early access"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
            />
            <button
              className="cta"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Saving..." : "Get Early Access"}
            </button>
          </div>
          <div className="helper-text-wrapper">
            {status === "success" && (
              <p className="helper-text helper-success">{message}</p>
            )}
            {status === "error" && (
              <p className="helper-text helper-error">{message}</p>
            )}
            {status === "idle" && (
              <p className="helper-text">
                We’ll only email you about Rivva’s launch. No spam. Ever.
              </p>
            )}
          </div>
        </form>

        <div className="footer">
          <span>
            Built for <strong>meaningful dating</strong>, not endless swiping.
          </span>
          <span>© {new Date().getFullYear()} rivva</span>
        </div>
      </section>
    </main>
  );
}
