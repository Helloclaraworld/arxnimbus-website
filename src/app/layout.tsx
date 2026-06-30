import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import BackgroundFX from "@/components/BackgroundFX";
import GlassInteractivity from "@/components/GlassInteractivity";

// 워드마크(Thrivaca 등)용 — 그대로 유지
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ArxNimbus — Quantify cyber and AI exposure. In dollars.",
  description:
    "The Thrivaca AI Engine turns your security and AI exposure data into financial intelligence your board can act on. It's not magic. It's math.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jost.variable} h-full antialiased`}>
      <head>
        {/* 본문/헤드라인 폰트: General Sans (Söhne 무료 대체) — Fontshare CDN */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@300,400,500,600,700&display=swap"
        />
      </head>
      <body className="relative flex min-h-full flex-col bg-[#f6f9fc] text-slate-900">
        <BackgroundFX />
        <GlassInteractivity />
        {children}
      </body>
    </html>
  );
}
