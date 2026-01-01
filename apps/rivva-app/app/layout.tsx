import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Rivva",
  description: "Dating, with intention.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-white">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-48 left-1/2 h-[620px] w-[980px] -translate-x-1/2 rounded-full blur-3xl opacity-30 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400" />
          <div className="absolute -bottom-72 right-[-280px] h-[640px] w-[640px] rounded-full blur-3xl opacity-15 bg-gradient-to-tr from-cyan-400 to-violet-600" />
          <div className="absolute -bottom-72 left-[-280px] h-[640px] w-[640px] rounded-full blur-3xl opacity-10 bg-gradient-to-tr from-fuchsia-500 to-violet-600" />
          <div className="rivva-glow" />
        </div>

        <Navbar />
        {children}
      </body>
    </html>
  );
}
