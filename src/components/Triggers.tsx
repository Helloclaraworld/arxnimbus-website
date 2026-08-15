"use client";

import {
  Gavel,
  FileSearch,
  CalendarClock,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";
import { useInView, usePrefersReducedMotion } from "./useScrollReveal";

const TRIGGERS: { Icon: LucideIcon; label: string; text: string }[] = [
  {
    Icon: Gavel,
    label: "Board pressure",
    text: "A director asks what the AI program costs if it fails.",
  },
  {
    Icon: FileSearch,
    label: "Procurement review",
    text: "A third-party AI system changes your own exposure.",
  },
  {
    Icon: CalendarClock,
    label: "Regulatory deadline",
    text: "A compliance date forces a defensible number.",
  },
];

export default function Triggers() {
  const [ref, inView] = useInView(0.2);
  const reduce = usePrefersReducedMotion();

  return (
    <section id="triggers" className="relative scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6 py-28 sm:py-36">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            When leadership needs the number.
          </h2>
          <p className="mx-auto mt-4 text-base text-slate-500">
            AI exposure becomes urgent when someone has to defend it.
          </p>
        </Reveal>

        {/* 3칸 그리드 — 산업 섹션(흰색 글래스 5칸)과 구분되는 Arx Blue 틴트 카드 */}
        <div
          ref={ref}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-7"
        >
          {TRIGGERS.map(({ Icon, label, text }, i) => (
            // 바깥: 스크롤 진입 애니메이션 (인라인 transform) / 안쪽: hover (클래스 transform)
            <div
              key={label}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(16px)",
                transition: reduce
                  ? "none"
                  : `opacity .55s ease ${i * 0.12}s, transform .55s cubic-bezier(.22,1,.36,1) ${i * 0.12}s`,
              }}
            >
              {/* Tailwind v4 는 -translate-y 를 transform 이 아니라 translate 속성으로 낸다 */}
              <div className="group h-full rounded-2xl border border-[rgba(39,169,221,0.25)] bg-[rgba(20,73,146,0.05)] p-7 backdrop-blur-md transition-[translate,border-color] duration-[250ms] ease-out hover:-translate-y-1 hover:border-[rgba(39,169,221,0.6)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8">
                <Icon
                  className="h-9 w-9 text-[#27a9dd] transition-transform duration-[250ms] ease-out group-hover:scale-[1.08] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <p className="mt-5 text-lg font-semibold text-slate-900">
                  {label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
