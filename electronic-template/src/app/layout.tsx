import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-geist-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HexBytes | Premium Electronics Store",
  description: "Your one-stop shop for the latest gadgets and electronics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased text-secondary`}
      >
        <div className="grain-overlay" />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
