import Image from "next/image";
import { LINKEDIN_URL, LinkedInIcon } from "./linkedin";

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
            <LinkedInIcon className="h-4 w-4" />
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
