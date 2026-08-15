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

const TITLE = "ArxNimbus | AI and Cyber Risk Quantification";
const DESCRIPTION =
  "Quantify cyber and AI exposure in financial terms. Actuarial risk intelligence built on NIST-aligned methodology, trusted by enterprises and insurers.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // title/description 만으로는 og:/twitter: 태그가 생성되지 않아 명시적으로 선언
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "ArxNimbus",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
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
