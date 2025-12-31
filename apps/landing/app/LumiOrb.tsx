"use client";

import { useEffect, useRef } from "react";

export default function LumiOrb() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.02;
      const y = (e.clientY - window.innerHeight / 2) * 0.02;
      orb.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={orbRef}
      className="
        w-44 h-44 rounded-full
        bg-gradient-to-br from-purple-400 via-purple-600 to-purple-800
        shadow-[0px_0px_80px_40px_rgba(147,51,234,0.35)]
        opacity-90 blur-[2px]
        animate-floating
        absolute top-10 right-10
        pointer-events-none
        select-none
      "
    ></div>
  );
}
