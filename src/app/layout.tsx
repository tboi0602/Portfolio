import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { SunriseRay } from "@/components/sunrise-ray";
import { CursorGlow } from "@/components/cursor-glow";
import { PageIntro } from "@/components/page-intro";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Huynh Tan Tai | Fullstack Developer",
  description:
    "Fullstack developer building modern web products with great user experience. Portfolio of Huynh Tan Tai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-[#fafafa]">
        <PageIntro />
        <Navbar />
        <SunriseRay />
        <CursorGlow />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
