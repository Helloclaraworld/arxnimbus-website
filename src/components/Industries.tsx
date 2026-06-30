"use client";

import {
  HeartPulse,
  Landmark,
  Factory,
  BrainCircuit,
  Handshake,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";
import { useInView, usePrefersReducedMotion } from "./useScrollReveal";

const INDUSTRIES: { Icon: LucideIcon; name: string; text: string }[] = [
  { Icon: HeartPulse, name: "Healthcare", text: "Patient safety, regulatory exposure, connected systems." },
  { Icon: Landmark, name: "Financial Services", text: "Model risk, fraud, regulatory scrutiny." },
  { Icon: Factory, name: "Critical Infrastructure", text: "Operational continuity, public safety, supply chain." },
  { Icon: BrainCircuit, name: "AI-Scaling Enterprises", text: "AI embedded in revenue-critical workflows." },
  { Icon: Handshake, name: "M&A / Private Equity", text: "Hidden digital liabilities, valuation risk." },
];

export default function Industries() {
  const [ref, inView] = useInView(0.2);
  const reduce = usePrefersReducedMotion();

  return (
    <section id="industries" className="relative scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6 py-28 sm:py-36">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Built for industries where exposure is material.
          </h2>
        </Reveal>

        <div
          ref={ref}
          className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5"
        >
          {INDUSTRIES.map(({ Icon, name, text }, i) => (
            <div
              key={name}
              className="flex flex-col items-center text-center"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(16px)",
                transition: reduce
                  ? "none"
                  : `opacity .55s ease ${i * 0.12}s, transform .55s cubic-bezier(.22,1,.36,1) ${i * 0.12}s`,
              }}
            >
              <div className="liquid-glass flex h-16 w-16 items-center justify-center rounded-2xl">
                <Icon className="h-7 w-7 text-[#144992]" strokeWidth={1.75} />
              </div>
              <p className="mt-4 font-semibold text-slate-900">{name}</p>
              <p className="mt-1 max-w-[13rem] text-sm leading-relaxed text-slate-500">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
