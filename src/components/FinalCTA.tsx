"use client";

import Reveal from "./Reveal";
import Aurora from "./Aurora";

export default function FinalCTA() {
  return (
    <section id="demo" className="relative scroll-mt-24">
      {/* 은은한 오로라 배경 */}
      <Aurora />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-28 sm:py-36">
        <Reveal>
          <div className="liquid-glass relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] px-8 py-14 text-center sm:px-12 sm:py-16">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Stop guessing.{" "}
              <span className="bg-gradient-to-r from-[#144992] to-[#27a9dd] bg-clip-text text-transparent">
                Start quantifying.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
              Translate cyber, AI, and digital risk into defensible dollar
              impact.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="mailto:info@arxnimbus.com"
                className="inline-flex items-center justify-center rounded-full bg-[#144992] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0f3a76]"
              >
                Book a Demo
              </a>
              <a
                href="#platform"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/70 px-7 py-3.5 text-sm font-semibold text-slate-700 backdrop-blur transition-colors hover:border-[#144992] hover:text-[#144992]"
              >
                See the AI Engine
              </a>
            </div>

            <p className="mt-8 text-xs text-slate-400">
              NIST-approved methodology
              <span className="mx-2 text-slate-300">·</span>
              35% of S&amp;P 500 analyzed
              <span className="mx-2 text-slate-300">·</span>
              Within 7% forecast accuracy
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
