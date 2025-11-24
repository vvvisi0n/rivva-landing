import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Rivva",
  description: "AI dating companion powered by emotional intelligence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
