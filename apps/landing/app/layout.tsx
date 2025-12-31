import "./globals.css";
import Navbar from "@/components/Navbar";
import PrivacyApplier from "@/components/PrivacyApplier";

export const metadata = {
  title: "Rivva",
  description: "Dating, with intention.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0b0b14] text-white">
        <Navbar />
        <PrivacyApplier />
        {children}
      </body>
    </html>
  );
}
