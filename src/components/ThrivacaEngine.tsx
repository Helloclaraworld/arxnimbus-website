"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const INPUTS = [
  "Loss Data",
  "Breach Patterns",
  "Current Controls",
  "Active CVEs",
  "Asset Status",
  "Threat Intel",
];

const OUTPUTS = [
  "$ EBITDA at Risk",
  "Exposure by Business Function",
  "Optimized Mitigation Strategy",
];

/* 입력/출력 사이를 흐르는 데이터 입자 (lg 전용) */
function FlowLane({ active }: { active: boolean }) {
  const dots = [
    { top: 30, delay: 0.0, dur: 2.8, c: "#144992" },
    { top: 42, delay: 0.6, dur: 3.0, c: "#27a9dd" },
    { top: 50, delay: 1.1, dur: 2.6, c: "#144992" },
    { top: 58, delay: 0.3, dur: 3.1, c: "#27a9dd" },
    { top: 70, delay: 0.9, dur: 2.9, c: "#144992" },
  ];
  return (
    <div className="relative hidden h-44 flex-1 lg:block" aria-hidden="true">
      {/* 베이스 연결선 */}
      <div className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-[#144992]/15 via-[#27a9dd]/30 to-[#144992]/15" />
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{
            top: `${d.top}%`,
            left: "2%",
            opacity: 0,
            background: d.c,
            boxShadow: `0 0 6px ${d.c}`,
            animation: active
              ? `arx-flow ${d.dur}s linear ${d.delay}s infinite`
              : "none",
          }}
        />
      ))}
    </div>
  );
}

/* 모바일에서 섹션 사이 흐름 표시 */
function MobileArrow() {
  return (
    <div className="flex justify-center py-1 lg:hidden" aria-hidden="true">
      <span className="text-xl text-[#27a9dd]">↓</span>
    </div>
  );
}

function Engine({ active }: { active: boolean }) {
  return (
    <div className="relative mx-auto grid shrink-0 place-items-center">
      {/* 회전하는 브랜드 글로우 */}
      <div
        className={`absolute -inset-5 rounded-[2.8rem] opacity-60 blur-lg ${
          active ? "arx-spin" : ""
        }`}
        style={{
          background:
            "conic-gradient(from 0deg, #144992, #27a9dd, #144992, #27a9dd, #144992)",
        }}
      />
      {/* 엔진 다크 카드 */}
      <div className="relative w-44 rounded-[2rem] bg-gradient-to-br from-[#0b2a52] to-[#11418a] px-6 py-9 text-center shadow-2xl ring-1 ring-white/10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#27a9dd]">
          Engine
        </p>
        <p className="mt-3 font-display text-xl font-bold leading-tight text-white">
          ARX
          <br />
          ACTUARIAL
          <br />
          <span className="text-[#7cc9ec]">+ AI</span>
        </p>
        <div className="mx-auto mt-4 h-px w-12 bg-white/15" />
        <p className="mt-3 text-[11px] font-medium text-white/55">Since 2016</p>
      </div>
    </div>
  );
}

export default function ThrivacaEngine() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="platform"
      className="relative scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-6 py-28 sm:py-36">
        {/* 제목 + 부제 */}
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            The <span className="font-display">Thrivaca</span> AI Engine
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500">
            Nine years of AI, not nine months. Built and validated since 2016.
          </p>
        </Reveal>

        {/* 다이어그램 */}
        <div className="mt-20 flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-0">
          {/* INPUTS */}
          <Reveal className="lg:w-[200px] lg:shrink-0">
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-slate-400 lg:text-right">
              Inputs
            </p>
            <div className="flex flex-col gap-2.5">
              {INPUTS.map((label, i) => (
                <div
                  key={label}
                  className="liquid-glass flex items-center justify-between gap-3 rounded-xl px-4 py-2.5"
                >
                  <span className="text-sm font-medium text-slate-700">
                    {label}
                  </span>
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{
                      background: i % 2 ? "#27a9dd" : "#144992",
                    }}
                  />
                </div>
              ))}
            </div>
          </Reveal>

          <FlowLane active={active} />
          <MobileArrow />

          {/* ENGINE */}
          <Reveal delay={120}>
            <Engine active={active} />
          </Reveal>

          <FlowLane active={active} />
          <MobileArrow />

          {/* OUTPUT */}
          <Reveal delay={240} className="lg:w-[210px] lg:shrink-0">
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-slate-400 lg:text-left">
              Actionable Intel
            </p>
            <div className="flex flex-col gap-2.5">
              {OUTPUTS.map((label, i) => (
                <div
                  key={label}
                  className="liquid-glass flex items-center gap-3 rounded-xl px-4 py-2.5"
                  style={{ borderColor: "rgba(39,169,221,0.35)" }}
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{
                      background: i % 2 ? "#27a9dd" : "#144992",
                    }}
                  />
                  <span className="text-sm font-semibold text-slate-800">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
