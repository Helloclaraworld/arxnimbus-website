import Image from "next/image";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "The AI Engine", href: "#platform" },
      { label: "Cyber Exposure", href: "#products" },
      { label: "AI Exposure", href: "#products" },
      { label: "Cyber Insurance", href: "#products" },
    ],
  },
  {
    title: "Results",
    links: [
      { label: "Case Studies", href: "#results" },
      { label: "Research", href: "#" },
      { label: "Frameworks", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Contact", href: "mailto:info@arxnimbus.com" },
    ],
  },
];

const SOCIALS: { label: string; href: string; path: string }[] = [
  {
    label: "LinkedIn",
    href: "#",
    path: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.97 0 1.78-.78 1.78-1.74V1.74C24 .78 23.19 0 22.22 0z",
  },
  {
    label: "X",
    href: "#",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.55 15.57V8.43L15.82 12z",
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* 브랜드 (로고에 'Secure the business.' 태그라인 포함) */}
          <div>
            <Image
              src="/logo.webp"
              alt="ArxNimbus — Secure the business."
              width={170}
              height={58}
              className="h-14 w-auto"
              style={{ height: "56px", width: "auto" }}
            />
          </div>

          {/* 링크 컬럼 */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-slate-900">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((li) => (
                  <li key={li.label}>
                    <a
                      href={li.href}
                      className="text-sm text-slate-500 transition-colors hover:text-[#144992]"
                    >
                      {li.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 연락처 */}
        <div className="mt-12 flex flex-col gap-2 border-t border-slate-200/60 pt-8 text-sm text-slate-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
          <span>323 E Wacker Drive, Suite 300, Chicago, IL 60601</span>
          <a href="tel:+18884226584" className="transition-colors hover:text-[#144992]">
            888-422-6584
          </a>
          <a
            href="mailto:info@arxnimbus.com"
            className="transition-colors hover:text-[#144992]"
          >
            info@arxnimbus.com
          </a>
        </div>

        {/* 하단: 저작권 + 소셜 */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200/60 pt-6 sm:flex-row">
          <p className="text-xs text-slate-400">
            © 2026 ArxNimbus LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="liquid-glass flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:text-[#144992]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
