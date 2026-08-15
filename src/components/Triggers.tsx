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
      <div className="mx-auto max-w-4xl px-6 py-28 sm:py-36">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            When leadership needs the number.
          </h2>
          <p className="mx-auto mt-4 text-base text-slate-500">
            AI exposure becomes urgent when someone has to defend it.
          </p>
        </Reveal>

        {/* 왼쪽 정렬 가로 행 — 아이콘은 타일 없이 단독, Arx Aqua */}
        <div
          ref={ref}
          className="mx-auto mt-16 flex max-w-2xl flex-col gap-12 sm:mt-20 sm:gap-14"
        >
          {TRIGGERS.map(({ Icon, label, text }, i) => (
            <div
              key={label}
              className="flex items-center gap-5 sm:gap-7"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(16px)",
                transition: reduce
                  ? "none"
                  : `opacity .55s ease ${i * 0.12}s, transform .55s cubic-bezier(.22,1,.36,1) ${i * 0.12}s`,
              }}
            >
              <Icon
                className="h-8 w-8 shrink-0 text-[#27a9dd] sm:h-10 sm:w-10"
                strokeWidth={1.25}
                aria-hidden="true"
              />
              <div>
                <p className="text-lg font-semibold text-slate-900">{label}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">
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
