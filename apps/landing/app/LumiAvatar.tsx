"use client";

import { useEffect, useRef } from "react";

export default function LumiAvatar() {
  const avatarRef = useRef<HTMLDivElement>(null);

  // Parallax movement
  useEffect(() => {
    const div = avatarRef.current;
    if (!div) return;

    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.003;
      const y = (e.clientY - window.innerHeight / 2) * 0.003;
      div.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={avatarRef}
      className="
        w-48 h-48 rounded-full
        bg-gradient-to-br from-purple-300 via-purple-500 to-purple-800
        opacity-90 shadow-[0_0_80px_25px_rgba(147,51,234,0.25)]
        animate-holoFloat
        flex items-center justify-center
        absolute top-20 left-1/2 -translate-x-1/2
        pointer-events-none select-none
      "
    >
      {/* Hologram inner core */}
      <div
        className="
          w-32 h-32 rounded-full
          bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.9),rgba(255,255,255,0.2),transparent_70%)]
          animate-holoPulse opacity-60
        "
      ></div>
    </div>
  );
}
