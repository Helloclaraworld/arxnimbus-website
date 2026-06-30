import Reveal from "./Reveal";
import Marquee from "./Marquee";

const STANDARDS = [
  "US Strategic Command",
  "MITRE",
  "University of Chicago",
  "NIST",
  "Society of Actuaries",
];

const CUSTOMERS = [
  "Quest Diagnostics",
  "PNC",
  "General Dynamics",
  "Cummins",
  "Sentara Health",
  "Affirm",
];

function Chip({ name }: { name: string }) {
  return (
    <span className="liquid-glass-chip inline-flex items-center whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold text-slate-500 transition-colors hover:text-[#144992]">
      {name}
    </span>
  );
}

export default function TrustBar() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-6 py-28 sm:py-32">
        {/* 1. 기관 신뢰 — 왼쪽으로 흐름 */}
        <Reveal>
          <p className="mx-auto max-w-2xl text-center text-sm font-medium text-slate-500">
            Developed with, and trusted by, the institutions that set the
            standard.
          </p>
        </Reveal>
        <Reveal delay={120} className="mt-8">
          <Marquee
            items={STANDARDS}
            renderItem={(name) => <Chip name={name} />}
            speed={34}
          />
        </Reveal>

        {/* 구분선 */}
        <div className="mx-auto my-14 h-px max-w-xs bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* 2. 고객사 신뢰 — 오른쪽으로 흐름 */}
        <Reveal>
          <p className="mx-auto max-w-2xl text-center text-sm font-medium text-slate-500">
            Trusted by enterprises and insurers covering{" "}
            <span className="font-semibold text-[#144992]">
              35% of the S&amp;P 500
            </span>
          </p>
        </Reveal>
        <Reveal delay={120} className="mt-8">
          <Marquee
            items={CUSTOMERS}
            renderItem={(name) => <Chip name={name} />}
            reverse
            speed={34}
          />
        </Reveal>
      </div>
    </section>
  );
}
