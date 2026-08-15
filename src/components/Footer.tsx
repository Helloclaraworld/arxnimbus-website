import Image from "next/image";

const LINKEDIN_URL = "https://www.linkedin.com/company/arx-nimbus";
const LINKEDIN_PATH =
  "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.97 0 1.78-.78 1.78-1.74V1.74C24 .78 23.19 0 22.22 0z";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/50">
      <div className="mx-auto max-w-6xl px-6 pt-6 pb-8">
        {/* 1단: 로고 + LinkedIn */}
        <div className="flex items-center justify-between gap-6">
          <Image
            src="/logo-arxnimbus.png"
            alt="ArxNimbus"
            width={281}
            height={100}
            className="h-10 w-auto"
          />
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ArxNimbus LinkedIn"
            className="liquid-glass flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:text-[#144992]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d={LINKEDIN_PATH} />
            </svg>
          </a>
        </div>

        {/* 2단: 연락처 + 저작권 */}
        <div className="mt-4 flex flex-col gap-3 border-t border-slate-200/60 pt-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>323 E Wacker Drive, Suite 300, Chicago, IL 60601</span>
            <span aria-hidden="true" className="text-slate-300">
              |
            </span>
            <a
              href="tel:+18884226584"
              className="transition-colors hover:text-[#144992]"
            >
              888-422-6584
            </a>
            <span aria-hidden="true" className="text-slate-300">
              |
            </span>
            <a
              href="mailto:info@arxnimbus.com"
              className="transition-colors hover:text-[#144992]"
            >
              info@arxnimbus.com
            </a>
          </p>
          <p className="shrink-0 text-xs text-slate-400">
            © 2026 ArxNimbus LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
