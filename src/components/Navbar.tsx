"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Platform", href: "#platform", id: "platform" },
  { label: "Products", href: "#products", id: "products" },
  { label: "Results", href: "#results", id: "results" },
  { label: "About", href: "#about", id: "about" }, // Stakeholders(Buyer) 섹션
];

// scroll spy 대상 (실제 존재하는 섹션만)
const SPY_IDS = ["platform", "products", "results", "about"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = SPY_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      // 뷰포트 중앙 근처에 온 섹션을 active 로
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 sm:px-6">
      <nav
        className={`liquid-glass mx-auto flex max-w-6xl items-center justify-between gap-8 rounded-2xl px-5 transition-all duration-300 lg:gap-12 ${
          scrolled ? "liquid-glass--solid py-2.5" : "py-3.5"
        }`}
      >
        {/* 로고 → 맨 위 */}
        <Link
          href="#top"
          className="flex shrink-0 items-center"
          aria-label="ArxNimbus — 맨 위로"
        >
          <Image
            src="/logo-arxnimbus.png"
            alt="ArxNimbus"
            width={281}
            height={100}
            preload
            className="h-9 w-auto md:h-10"
          />
        </Link>

        {/* 메뉴 (데스크탑) */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const active = activeId === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? "font-semibold text-[#144992]"
                    : "text-slate-600 hover:text-[#144992]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* CTA → 최종 CTA 섹션 */}
        <a
          href="#demo"
          className="rounded-full bg-[#144992] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0f3a76]"
        >
          Book Demo
        </a>
      </nav>
    </header>
  );
}
