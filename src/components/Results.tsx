"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Reveal from "./Reveal";
import Aurora from "./Aurora";

/* ------------------------------- 공용 훅 ------------------------------- */

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduce;
}

function useInView(threshold = 0.3): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function useCountTo(target: number, active: boolean, reduce: boolean, dur = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setV(target);
      return;
    }
    let raf = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      setV(target * easeOut(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, reduce, dur]);
  return v;
}

/* --------------- UHC 검증 — 밝은 글래스 카드 + 예측↔실제 매칭 --------------- */

function ValidationCard() {
  const [ref, inView] = useInView(0.4);
  const reduce = usePrefersReducedMotion();
  const acc = useCountTo(85, inView, reduce);
  const proj = useCountTo(7.4, inView, reduce);
  const act = useCountTo(6.3, inView, reduce);

  const fadeUp = (delay: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : "translateY(12px)",
    transition: reduce
      ? "none"
      : `opacity .6s ease ${delay}s, transform .6s cubic-bezier(.22,1,.36,1) ${delay}s`,
  });

  const steps = [
    {
      color: "#144992",
      title: "Before the breach",
      text: "ArxNimbus quantified the exposure ahead of the event.",
      icon: (
        <>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ),
    },
    {
      color: "#f59e0b",
      title: "The breach",
      text: `UnitedHealthcare — $${act.toFixed(1)}B actual loss.`,
      icon: (
        <>
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </>
      ),
    },
    {
      color: "#16a34a",
      title: "Validated",
      text: `Projected $${proj.toFixed(1)}B ≈ Actual $${act.toFixed(1)}B.`,
      icon: <path d="M20 6 9 17l-5-5" />,
    },
  ];

  const lineDraw = (axis: "x" | "y") => ({
    transformOrigin: axis === "x" ? "left" : "top",
    transform: inView ? "scale(1)" : axis === "x" ? "scaleX(0)" : "scaleY(0)",
    transition: reduce
      ? "none"
      : `transform 1s cubic-bezier(.22,1,.36,1) .2s`,
  });

  return (
    <div
      ref={ref}
      className="liquid-glass relative mx-auto mt-16 max-w-3xl overflow-hidden rounded-3xl px-8 py-10 text-center ring-1 ring-[#27a9dd]/20 sm:px-12"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(24px)",
        transition:
          "opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1)",
      }}
    >
      {/* 은은한 Arx 틴트 글로우 */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#27a9dd]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#144992]/12 blur-3xl" />

      <p className="relative text-[11px] font-semibold uppercase tracking-widest text-[#27a9dd]">
        Validation · UnitedHealthcare breach
      </p>
      <p className="relative mt-2 bg-gradient-to-r from-[#144992] to-[#27a9dd] bg-clip-text text-5xl font-bold tabular-nums leading-none tracking-tight text-transparent sm:text-6xl">
        {Math.round(acc)}%
      </p>
      <p className="relative mt-2 text-sm font-medium text-slate-500">
        predictive accuracy
      </p>

      {/* 타임라인 */}
      <div className="relative mt-10">
        {/* 연결선 — lg 가로 */}
        <div className="absolute left-[16.6%] right-[16.6%] top-6 hidden h-[2px] overflow-hidden rounded-full lg:block">
          <div
            className="h-full w-full rounded-full bg-gradient-to-r from-[#144992] via-[#f59e0b] to-[#16a34a]"
            style={lineDraw("x")}
          />
        </div>
        {/* 연결선 — 모바일 세로 */}
        <div className="absolute bottom-6 left-6 top-6 w-[2px] overflow-hidden rounded-full lg:hidden">
          <div
            className="h-full w-full rounded-full bg-gradient-to-b from-[#144992] via-[#f59e0b] to-[#16a34a]"
            style={lineDraw("y")}
          />
        </div>

        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="flex flex-row items-start gap-4 text-left lg:flex-col lg:items-center lg:gap-3 lg:text-center"
              style={fadeUp(0.35 + i * 0.25)}
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1"
                style={{ color: s.color, boxShadow: `0 0 0 1px ${s.color}33` }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {s.icon}
                </svg>
              </div>
              <div className="lg:max-w-[15rem]">
                <p className="text-sm font-bold text-slate-900">{s.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  {s.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- 카운트업 ----------------------------- */

type Stat = {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  sub: string;
};

const STATS: Stat[] = [
  { value: 5, suffix: "X", label: "Stronger predictive signal", sub: "vs. traditional scoring models" },
  { value: 4, suffix: "X", label: "Better loss outcomes", sub: "vs. industry averages" },
  { prefix: "Within ", value: 7, suffix: "%", label: "Of actual loss outcomes", sub: "backtested against real breach data" },
  { prefix: "$10–$", value: 144, label: "Risk reduction per $1 invested", sub: "measured across engagements" },
  { value: 60000, suffix: "+", label: "Real-world losses analyzed", sub: "and continuously growing" },
  { value: 580, label: "Industries benchmarked", sub: "NAICS-aligned peer sets" },
];

function StatItem({
  stat,
  active,
  reduce,
}: {
  stat: Stat;
  active: boolean;
  reduce: boolean;
}) {
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setV(stat.value);
      return;
    }
    let raf = 0;
    let start = 0;
    const dur = 1600;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      setV(stat.value * easeOut(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reduce, stat.value]);

  const num =
    stat.value >= 1000
      ? Math.round(v).toLocaleString("en-US")
      : String(Math.round(v));

  return (
    <div
      className="text-center"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "none" : "translateY(20px)",
        transition:
          "opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <p className="bg-gradient-to-r from-[#144992] to-[#27a9dd] bg-clip-text text-4xl font-bold tabular-nums tracking-tight text-transparent sm:text-5xl">
        {stat.prefix}
        {num}
        {stat.suffix}
      </p>
      <p className="mt-3 text-sm font-semibold text-slate-700">{stat.label}</p>
      <p className="mt-1 text-xs text-slate-400">{stat.sub}</p>
    </div>
  );
}

/* ------------------------------- 섹션 ------------------------------- */

export default function Results() {
  const [gridRef, inView] = useInView(0.25);
  const reduce = usePrefersReducedMotion();

  return (
    <section
      id="results"
      className="relative scroll-mt-24"
    >
      {/* Aurora mesh — 섹션 전체에 경계 없이 번지는 배경 */}
      <Aurora />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-28 sm:py-36">
        {/* 제목 */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Proven. Not assumed.
          </h2>
          <p className="mx-auto mt-4 text-base text-slate-500">
            Validated across 60,000+ real-world losses in 580 industries.
            Continuously trained since 2016.
          </p>
        </Reveal>

        {/* 핵심 숫자 그리드 */}
        <div
          ref={gridRef}
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 py-4 lg:grid-cols-3 lg:gap-x-8"
        >
          {STATS.map((stat) => (
            <StatItem
              key={stat.label}
              stat={stat}
              active={inView}
              reduce={reduce}
            />
          ))}
        </div>

        {/* UHC 검증 — 다크 글래스 카드 + 막대 비교 */}
        <ValidationCard />

        {/* 신뢰 라벨 */}
        <Reveal className="mt-8" delay={160}>
          <p className="mx-auto max-w-3xl text-center text-sm text-slate-400">
            NIST-approved methodology
            <span className="mx-2 text-slate-300">·</span>
            35% of S&amp;P 500 analyzed
            <span className="mx-2 text-slate-300">·</span>
            Insurer loss ratios at 1/4 industry average
          </p>
        </Reveal>
      </div>
    </section>
  );
}
