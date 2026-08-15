"use client";

import Reveal from "./Reveal";
import { useInView, usePrefersReducedMotion } from "./useScrollReveal";

const ROLES = [
  { role: "CEO", color: "#144992", text: "Protect EBITDA while scaling digital transformation." },
  { role: "CFO / CRO", color: "#1f7fb0", text: "Turn digital exposure into financial governance." },
  { role: "Board / Audit", color: "#27a9dd", text: "Govern AI and cyber exposure in dollars." },
  { role: "CISO", color: "#68c6d1", text: "Make security measurable, fundable, board-relevant." },
  { role: "AI Governance Leader", color: "#8c52ff", text: "Show which AI initiatives can scale with confidence." },
];

export default function Stakeholders() {
  const [ref, inView] = useInView(0.25);
  const reduce = usePrefersReducedMotion();

  return (
    <section id="about" className="relative scroll-mt-24">
      <div className="mx-auto max-w-4xl px-6 py-28 sm:py-36">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Not who owns security. Who&apos;s accountable when exposure hits
            EBITDA.
          </h2>
          <p className="mx-auto mt-4 text-base text-slate-500">
            One number every stakeholder can act on.
          </p>
        </Reveal>

        {/* 박스 없이 페이지 위에 바로. CTA 섹션만 박스로 남겨 대비를 만듦 */}
        <div ref={ref} className="mt-14">
          {ROLES.map((r, i) => (
            <div
              key={r.role}
              className="flex flex-col gap-1 border-t border-slate-200/60 py-5 first:border-t-0 sm:flex-row sm:items-center sm:gap-8"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(14px)",
                transition: reduce
                  ? "none"
                  : `opacity .55s ease ${i * 0.1}s, transform .55s cubic-bezier(.22,1,.36,1) ${i * 0.1}s`,
              }}
            >
              <span
                className="shrink-0 font-display text-lg font-bold sm:w-56"
                style={{ color: r.color }}
              >
                {r.role}
              </span>
              <span className="text-slate-600">{r.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
