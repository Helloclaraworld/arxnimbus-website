import { Fragment } from "react";
import Reveal from "./Reveal";
import ParticleNetwork from "./ParticleNetwork";

const STEPS = [
  {
    num: "01",
    title: "CONNECT",
    desc: "Connect your existing security tools and AI systems. No replacement required.",
    color: "#144992",
  },
  {
    num: "02",
    title: "QUANTIFY",
    desc: "Our actuarial AI translates exposure into dollars, not scores.",
    color: "#1f7fb0",
  },
  {
    num: "03",
    title: "DECIDE",
    desc: "Every stakeholder gets one defensible number they can act on.",
    color: "#27a9dd",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Stripe식 네트워크 파티클 배경 */}
      <ParticleNetwork className="-z-10" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-28 sm:py-36">
        {/* 제목 + 부제 */}
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            From fragmented data to financial clarity.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500">
            One engine. One measurement. Every stakeholder aligned.
          </p>
        </Reveal>

        {/* 3단계 — 카드 높이/폭 동일 (items-stretch + h-full) */}
        <div className="mt-20 flex flex-col items-stretch gap-6 lg:flex-row lg:gap-0">
          {STEPS.map((step, i) => (
            <Fragment key={step.num}>
              {/* 단계 카드 — 왼→오 순차 등장 */}
              <Reveal delay={i * 180} className="flex lg:flex-1">
                <div className="liquid-glass liquid-glass--hover group relative flex h-full w-full flex-col overflow-hidden rounded-2xl p-7">
                  {/* hover 시 상단 Arx 액센트 바 */}
                  <span className="absolute left-7 top-0 h-1 w-12 origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#144992] to-[#27a9dd] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  <span
                    className="inline-block text-4xl font-bold tabular-nums transition-transform duration-300 group-hover:scale-105"
                    style={{ color: step.color }}
                  >
                    {step.num}
                  </span>
                  <h3 className="mt-4 text-lg font-bold tracking-wide text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {step.desc}
                  </p>
                </div>
              </Reveal>

              {/* 연결 화살표 (마지막 단계 제외) */}
              {i < STEPS.length - 1 && (
                <Reveal
                  delay={i * 180 + 90}
                  className="flex shrink-0 items-center justify-center py-2 lg:px-4 lg:py-0"
                >
                  <span className="rotate-90 text-2xl font-light text-slate-300 lg:rotate-0">
                    →
                  </span>
                </Reveal>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
