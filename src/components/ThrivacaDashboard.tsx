"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ----------------------------- 데이터 / 상수 ----------------------------- */

const SCORE_MIN = 599;
const SCORE_MAX = 713;
const SCORE_FINAL = 690;

const METRICS = [
  { label: "Net Risk Exposure", value: 7_379_187_260, color: "#144992" },
  { label: "Accessible ROI", value: 4_921_917_902, color: "#27a9dd" },
  { label: "Available EBITDA Assurance", value: 1_230_479_476, color: "#1f7fb0" },
] as const;

// 타임라인(초)
const T_SCORE: [number, number] = [0.4, 2.6]; // 599 → 690 카운트업
const T_PAN = 3.0; // 카메라 패닝 시작 (gauge → overview)
const T_CARD_REVEAL = [3.5, 4.1, 4.7]; // 카드 등장 시점
const T_CARD_COUNT: [number, number][] = [
  [3.6, 4.9],
  [4.2, 5.5],
  [4.8, 6.1],
]; // 카드별 0 → 값 카운트업
const T_END = 6.4;

/* ------------------------------ 헬퍼 함수 ------------------------------ */

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const span = (e: number, [s, en]: [number, number]) => clamp((e - s) / (en - s));
const fmtUSD = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

/* --------------------------- T-Score 게이지 --------------------------- */

const GA_START = 225; // 호 시작 각도(12시=0, 시계방향)
const GA_SWEEP = 270; // 270° 게이지 (하단 열림)
const CX = 120;
const CY = 122;
const R = 90;

function polar(rr: number, angle: number): [number, number] {
  const a = ((angle - 90) * Math.PI) / 180;
  return [CX + rr * Math.cos(a), CY + rr * Math.sin(a)];
}

function arcPath(t0: number, t1: number, rr: number) {
  const a0 = GA_START + GA_SWEEP * t0;
  const a1 = GA_START + GA_SWEEP * t1;
  const [x0, y0] = polar(rr, a0);
  const [x1, y1] = polar(rr, a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${x0} ${y0} A ${rr} ${rr} 0 ${large} 1 ${x1} ${y1}`;
}

// 점수 → 호 위치 비율
const toFrac = (score: number) =>
  clamp((score - SCORE_MIN) / (SCORE_MAX - SCORE_MIN));

// 리스크 구간 (점수 기준)
const ZONES = [
  { from: 599, to: 650, color: "#ef4444" }, // High Risk
  { from: 650, to: 685, color: "#f59e0b" }, // Medium
  { from: 685, to: 713, color: "#22c55e" }, // Low Risk
];

function riskLabel(score: number) {
  if (score >= 685) return { text: "Low Risk", color: "#16a34a" };
  if (score >= 650) return { text: "Medium Risk", color: "#d97706" };
  return { text: "High Risk", color: "#dc2626" };
}

function Gauge({ score }: { score: number }) {
  const frac = toFrac(score);
  const [mx, my] = polar(R, GA_START + GA_SWEEP * frac);
  const risk = riskLabel(score);

  return (
    <svg
      viewBox="0 0 240 235"
      className="h-auto w-[230px] max-w-full sm:w-[250px]"
      role="img"
      aria-label={`T-Score ${Math.round(score)}, ${risk.text}`}
    >
      {/* 배경 트랙 */}
      <path
        d={arcPath(0, 1, R)}
        fill="none"
        stroke="#e8eef5"
        strokeWidth={16}
        strokeLinecap="round"
      />
      {/* 리스크 구간 (초록/노랑/빨강) */}
      {ZONES.map((z, i) => {
        const t0 = toFrac(z.from);
        const t1 = toFrac(z.to);
        const gap = 0.012;
        return (
          <path
            key={i}
            d={arcPath(
              i === 0 ? t0 : t0 + gap,
              i === ZONES.length - 1 ? t1 : t1 - gap,
              R
            )}
            fill="none"
            stroke={z.color}
            strokeWidth={16}
            strokeLinecap="butt"
            opacity={0.92}
          />
        );
      })}
      {/* 채워지는 진행 호 (브랜드 블루) */}
      {frac > 0.001 && (
        <path
          d={arcPath(0, frac, R - 22)}
          fill="none"
          stroke="#144992"
          strokeWidth={7}
          strokeLinecap="round"
        />
      )}
      {/* 현재 점수 마커 */}
      <circle cx={mx} cy={my} r={9} fill="#fff" stroke="#144992" strokeWidth={4} />

      {/* 중앙 숫자 */}
      <text
        x={CX}
        y={CY - 2}
        textAnchor="middle"
        fontSize="52"
        fontWeight={800}
        fill="#0f172a"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {Math.round(score)}
      </text>
      <text
        x={CX}
        y={CY + 22}
        textAnchor="middle"
        fontSize="13"
        fontWeight={600}
        letterSpacing="2"
        fill="#64748b"
      >
        T-SCORE
      </text>
      <text
        x={CX}
        y={CY + 44}
        textAnchor="middle"
        fontSize="13"
        fontWeight={700}
        fill={risk.color}
      >
        {risk.text}
      </text>

      {/* 양 끝 라벨 */}
      <text x={28} y={224} textAnchor="middle" fontSize="11" fontWeight={600} fill="#dc2626">
        599
      </text>
      <text x={212} y={224} textAnchor="middle" fontSize="11" fontWeight={600} fill="#16a34a">
        713
      </text>
    </svg>
  );
}

/* ----------------------------- 메인 컴포넌트 ----------------------------- */

export default function ThrivacaDashboard() {
  const [score, setScore] = useState(SCORE_MIN);
  const [metricVals, setMetricVals] = useState<number[]>([0, 0, 0]);
  const [overview, setOverview] = useState(false);
  const [reveals, setReveals] = useState<boolean[]>([false, false, false]);

  const rafRef = useRef(0);
  const startRef = useRef(0);
  const runningRef = useRef(false);
  const reduceRef = useRef(false);

  const finalize = useCallback(() => {
    setScore(SCORE_FINAL);
    setMetricVals(METRICS.map((m) => m.value));
    setOverview(true);
    setReveals([true, true, true]);
    runningRef.current = false;
  }, []);

  const frame = useCallback(
    (now: number) => {
      const e = (now - startRef.current) / 1000;

      setScore(lerp(SCORE_MIN, SCORE_FINAL, easeInOut(span(e, T_SCORE))));
      setMetricVals(METRICS.map((m, i) => m.value * easeOut(span(e, T_CARD_COUNT[i]))));
      setOverview(e >= T_PAN);
      setReveals(T_CARD_REVEAL.map((t) => e >= t));

      if (e < T_END) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        finalize();
      }
    },
    [finalize]
  );

  const play = useCallback(() => {
    if (runningRef.current || reduceRef.current) return;
    cancelAnimationFrame(rafRef.current);
    runningRef.current = true;
    startRef.current = performance.now();
    setScore(SCORE_MIN);
    setMetricVals([0, 0, 0]);
    setOverview(false);
    setReveals([false, false, false]);
    rafRef.current = requestAnimationFrame(frame);
  }, [frame]);

  useEffect(() => {
    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceRef.current) {
      finalize();
      return;
    }
    play();
    return () => cancelAnimationFrame(rafRef.current);
  }, [play, finalize]);

  return (
    <div
      onMouseEnter={play}
      className="relative flex min-h-[330px] w-full items-center justify-center gap-3 overflow-hidden sm:gap-6"
    >
      {/* 게이지 (close-up → 옆으로 이동) */}
      <div
        className="shrink-0 transition-transform duration-[1100ms] ease-out"
        style={{ transform: overview ? "scale(0.98)" : "scale(1.16)" }}
      >
        <Gauge score={score} />
      </div>

      {/* 리스크 지표 카드 3개 (패닝하며 등장) */}
      <div
        className="shrink-0 overflow-hidden transition-all duration-[1100ms] ease-out"
        style={{
          maxWidth: overview ? 360 : 0,
          opacity: overview ? 1 : 0,
        }}
      >
        <div className="flex w-[340px] flex-col gap-3">
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className="rounded-2xl border border-white/70 bg-white/70 px-4 py-3 shadow-sm ring-1 ring-black/5 backdrop-blur transition-all duration-700 ease-out"
              style={{
                opacity: reveals[i] ? 1 : 0,
                transform: reveals[i] ? "translateX(0)" : "translateX(28px)",
                borderLeft: `4px solid ${m.color}`,
              }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                {m.label}
              </p>
              <p
                className="mt-0.5 whitespace-nowrap text-2xl font-bold tabular-nums"
                style={{ color: m.color }}
              >
                {fmtUSD(metricVals[i])}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
