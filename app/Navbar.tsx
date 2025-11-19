"use client";

export default function Navbar() {
  function scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-[#f7f7ff]/70 backdrop-blur-xl border-b border-purple-200 z-50">
      <nav className="max-w-6xl mx-auto py-4 px-6 flex items-center justify-between">
        <span className="text-3xl font-extrabold text-purple-700 drop-shadow-sm tracking-tight">
          Rivva
        </span>

        <button
          onClick={scrollToBottom}
          className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-md transition"
        >
          Join Early Access
        </button>
      </nav>
    </div>
  );
}
