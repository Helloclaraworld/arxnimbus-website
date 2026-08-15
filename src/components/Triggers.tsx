"use client";

import { Gavel, Rocket, FileSearch, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";
import { useInView, usePrefersReducedMotion } from "./useScrollReveal";

const TRIGGERS: { Icon: LucideIcon; name: string; text: string }[] = [
  { Icon: Gavel, name: "Board or audit request", text: "A director asks what the AI program costs if it fails." },
  { Icon: Rocket, name: "Major AI launch or scale-up", text: "Approval requires a defensible financial case." },
  { Icon: FileSearch, name: "Vendor or procurement review", text: "A third-party AI system changes your own exposure." },
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

        <div
          ref={ref}
          className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3"
        >
          {TRIGGERS.map(({ Icon, name, text }, i) => (
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
              <p className="mt-1 max-w-[15rem] text-sm leading-relaxed text-slate-500">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
