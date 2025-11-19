import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rivva – Connection Made Smarter",
  description: "The intelligent dating app powered by emotional understanding.",
};

<nav className="absolute top-6 left-6 z-50">
  <a href="/lumi" className="text-purple-700 font-semibold hover:underline">
    Meet Lumi
  </a>
</nav>


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Scroll progress bar */}
        <div id="progress-bar"></div>

        {/* Sticky Navbar (Client Component) */}
        <Navbar />

        {/* Page content starts lower so navbar doesn’t cover it */}
        <div className="pt-24">{children}</div>
      </body>
    </html>
  );
}
