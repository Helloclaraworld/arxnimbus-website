"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import Reveal from "./Reveal";

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

/* -------------- 1. CORE — peer 벤치마킹 분포 (내 위치 하이라이트) -------------- */

// 결정적 peer 분포 (SSR/CSR 일치)
const PEERS: [number, number][] = [
  [48, 120], [66, 96], [80, 142], [96, 112], [110, 150], [116, 84],
  [128, 126], [134, 160], [146, 100], [156, 136], [162, 74], [170, 118],
  [178, 150], [186, 94], [150, 56], [120, 178], [92, 168], [200, 132],
  [205, 162], [210, 104], [60, 158], [138, 92],
];
const YOU: [number, number] = [240, 98];
const AXIS_Y = 190;

function CoreBenchmark({ active }: { active: boolean }) {
  const reduce = usePrefersReducedMotion();
  return (
    <svg viewBox="0 0 290 212" className="w-full">
      {/* 점수 축 */}
      <line x1={18} y1={AXIS_Y} x2={272} y2={AXIS_Y} stroke="#e2e8f0" strokeWidth={1.5} />
      <text x={18} y={206} fontSize="10" fill="#94a3b8">
        Lower score
      </text>
      <text x={272} y={206} fontSize="10" fill="#94a3b8" textAnchor="end">
        Higher score
      </text>

      {/* peer 점들 */}
      {PEERS.map((p, i) => (
        <circle
          key={i}
          cx={p[0]}
          cy={p[1]}
          r={4}
          fill="#cbd5e1"
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
            opacity: active ? 0.9 : 0,
            transform: active ? "scale(1)" : "scale(.3)",
            transition: reduce
              ? "none"
              : `opacity .45s ease ${i * 26}ms, transform .45s cubic-bezier(.22,1,.36,1) ${i * 26}ms`,
          }}
        />
      ))}

      {/* 내 위치 → 축 연결선 */}
      <line
        x1={YOU[0]}
        y1={YOU[1]}
        x2={YOU[0]}
        y2={AXIS_Y}
        stroke="#27a9dd"
        strokeWidth={1.5}
        strokeDasharray="3 3"
        style={{
          opacity: active ? 0.65 : 0,
          transition: reduce ? "none" : "opacity .5s ease .85s",
        }}
      />

      {/* 펄스 링 */}
      {active && !reduce && (
        <circle
          cx={YOU[0]}
          cy={YOU[1]}
          r={9}
          fill="none"
          stroke="#27a9dd"
          strokeWidth={1.5}
          className="arx-pulse"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      )}

      {/* 내 점 (하이라이트) */}
      <circle
        cx={YOU[0]}
        cy={YOU[1]}
        r={8}
        fill="url(#coreGrad)"
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          opacity: active ? 1 : 0,
          transform: active ? "scale(1)" : "scale(0)",
          transition: reduce ? "none" : "all .5s cubic-bezier(.22,1,.36,1) .8s",
        }}
      />

      {/* 라벨 */}
      <g
        style={{
          opacity: active ? 1 : 0,
          transition: reduce ? "none" : "opacity .5s ease 1s",
        }}
      >
        <text x={YOU[0]} y={YOU[1] - 18} textAnchor="middle" fontSize="13" fontWeight={700} fill="#144992">
          You
        </text>
        <text x={YOU[0]} y={YOU[1] - 5} textAnchor="middle" fontSize="9" fontWeight={600} fill="#27a9dd">
          Top decile
        </text>
      </g>

      <defs>
        <linearGradient id="coreGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#144992" />
          <stop offset="1" stopColor="#27a9dd" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ------------- 2. UNIFY — 흩어진 노드 → 허브로 수렴 + 빛 흐름 ------------- */

const UNIFY_HUB: [number, number] = [214, 105];
const UNIFY_NODES: [number, number][] = [
  [26, 38], [22, 92], [28, 150], [46, 192],
  [72, 26], [68, 74], [80, 128], [82, 182],
  [120, 50], [124, 104], [118, 158], [160, 92],
];

function UnifyConverge({ active }: { active: boolean }) {
  const reduce = usePrefersReducedMotion();
  const [hx, hy] = UNIFY_HUB;
  const dist = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1]);

  return (
    <svg viewBox="0 0 290 210" className="w-full">
      {/* 연결선 (그려짐) */}
      {UNIFY_NODES.map((n, i) => {
        const len = dist(n, UNIFY_HUB);
        return (
          <line
            key={`l${i}`}
            x1={n[0]}
            y1={n[1]}
            x2={hx}
            y2={hy}
            stroke="#27a9dd"
            strokeWidth={1.25}
            strokeLinecap="round"
            opacity={0.4}
            strokeDasharray={len}
            strokeDashoffset={active ? 0 : len}
            style={{
              transition: reduce ? "none" : `stroke-dashoffset .7s ease ${0.2 + i * 0.07}s`,
            }}
          />
        );
      })}

      {/* 빛 점이 노드 → 허브로 흐름 */}
      {active &&
        !reduce &&
        UNIFY_NODES.map((n, i) => (
          <circle key={`f${i}`} r={2} fill="#27a9dd">
            <animateMotion
              dur="1.5s"
              begin={`${0.8 + i * 0.09}s`}
              repeatCount="indefinite"
              path={`M ${n[0]} ${n[1]} L ${hx} ${hy}`}
            />
          </circle>
        ))}

      {/* 노드 */}
      {UNIFY_NODES.map((n, i) => (
        <circle
          key={`n${i}`}
          cx={n[0]}
          cy={n[1]}
          r={4.5}
          fill="#144992"
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
            transform: active ? "scale(1)" : "scale(0)",
            transition: reduce
              ? "none"
              : `transform .45s cubic-bezier(.34,1.56,.64,1) ${i * 60}ms`,
          }}
        />
      ))}

      {/* 수렴 허브 (빛남) */}
      {active && !reduce && (
        <circle cx={hx} cy={hy} r={14} fill="none" stroke="#27a9dd" strokeWidth={1.5} className="arx-pulse" />
      )}
      <circle
        cx={hx}
        cy={hy}
        r={15}
        fill="url(#unifyGlow)"
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          transform: active ? "scale(1)" : "scale(0)",
          transition: reduce ? "none" : "transform .6s cubic-bezier(.34,1.56,.64,1) .9s",
        }}
      />
      <text
        x={hx}
        y={hy + 32}
        textAnchor="middle"
        fontSize="10"
        fontWeight={700}
        fill="#144992"
        style={{ opacity: active ? 1 : 0, transition: reduce ? "none" : "opacity .5s ease 1.2s" }}
      >
        1 metric
      </text>

      <defs>
        <radialGradient id="unifyGlow">
          <stop offset="0" stopColor="#27a9dd" />
          <stop offset="0.7" stopColor="#144992" />
          <stop offset="1" stopColor="#144992" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ------------- 3. AIQ — 신경망: 층층이 연결 + 데이터 흐름 → $ ------------- */

const AIQ_L0: [number, number][] = [55, 95, 135, 175].map((y) => [34, y] as [number, number]);
const AIQ_L1: [number, number][] = [40, 77, 113, 150, 186].map((y) => [104, y] as [number, number]);
const AIQ_L2: [number, number][] = [40, 77, 113, 150, 186].map((y) => [176, y] as [number, number]);
const AIQ_OUT: [number, number] = [252, 113];

type Conn = { a: [number, number]; b: [number, number]; layer: number };
const AIQ_CONNS: Conn[] = [];
AIQ_L0.forEach((a) => AIQ_L1.forEach((b) => AIQ_CONNS.push({ a, b, layer: 0 })));
AIQ_L1.forEach((a) => AIQ_L2.forEach((b) => AIQ_CONNS.push({ a, b, layer: 1 })));
AIQ_L2.forEach((a) => AIQ_CONNS.push({ a, b: AIQ_OUT, layer: 2 }));

const AIQ_FLOWS = [
  [AIQ_L0[0], AIQ_L1[1], AIQ_L2[2], AIQ_OUT],
  [AIQ_L0[1], AIQ_L1[3], AIQ_L2[1], AIQ_OUT],
  [AIQ_L0[2], AIQ_L1[2], AIQ_L2[4], AIQ_OUT],
  [AIQ_L0[3], AIQ_L1[4], AIQ_L2[3], AIQ_OUT],
  [AIQ_L0[1], AIQ_L1[0], AIQ_L2[0], AIQ_OUT],
].map((pts) => "M " + pts.map((p) => `${p[0]} ${p[1]}`).join(" L "));

function AIQNeural({ active }: { active: boolean }) {
  const reduce = usePrefersReducedMotion();
  const nodes = [...AIQ_L0, ...AIQ_L1, ...AIQ_L2];

  return (
    <svg viewBox="0 0 290 210" className="w-full">
      {/* 연결선 (층별 순차 활성화) */}
      {AIQ_CONNS.map((c, i) => (
        <line
          key={i}
          x1={c.a[0]}
          y1={c.a[1]}
          x2={c.b[0]}
          y2={c.b[1]}
          stroke={c.layer === 2 ? "#27a9dd" : "#144992"}
          strokeWidth={c.layer === 2 ? 1.4 : 0.9}
          style={{
            opacity: active ? (c.layer === 2 ? 0.4 : 0.16) : 0,
            transition: reduce ? "none" : `opacity .5s ease ${0.3 + c.layer * 0.35}s`,
          }}
        />
      ))}

      {/* 데이터 빛 점이 layer를 통과 */}
      {active &&
        !reduce &&
        AIQ_FLOWS.map((d, i) => (
          <circle key={i} r={2.4} fill="#27a9dd">
            <animateMotion dur="2.2s" begin={`${0.8 + i * 0.22}s`} repeatCount="indefinite" path={d} />
          </circle>
        ))}

      {/* 노드 (층별 등장) */}
      {nodes.map((n, i) => {
        const layer = i < 4 ? 0 : i < 9 ? 1 : 2;
        return (
          <circle
            key={i}
            cx={n[0]}
            cy={n[1]}
            r={4}
            fill="#fff"
            stroke="#144992"
            strokeWidth={2}
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              opacity: active ? 1 : 0,
              transform: active ? "scale(1)" : "scale(.3)",
              transition: reduce ? "none" : `all .4s cubic-bezier(.34,1.56,.64,1) ${layer * 0.3}s`,
            }}
          />
        );
      })}

      {/* 출력 → $ 변환 */}
      {active && !reduce && (
        <circle cx={AIQ_OUT[0]} cy={AIQ_OUT[1]} r={13} fill="none" stroke="#27a9dd" strokeWidth={1.5} className="arx-pulse" />
      )}
      <g
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          opacity: active ? 1 : 0,
          transform: active ? "scale(1)" : "scale(.3)",
          transition: reduce ? "none" : "all .5s cubic-bezier(.34,1.56,.64,1) 1.1s",
        }}
      >
        <circle cx={AIQ_OUT[0]} cy={AIQ_OUT[1]} r={14} fill="url(#aiqGrad)" />
        <text x={AIQ_OUT[0]} y={AIQ_OUT[1] + 5} textAnchor="middle" fontSize="15" fontWeight={800} fill="#fff">
          $
        </text>
      </g>
      <text
        x={AIQ_OUT[0]}
        y={AIQ_OUT[1] + 32}
        textAnchor="middle"
        fontSize="10"
        fontWeight={700}
        fill="#144992"
        style={{ opacity: active ? 1 : 0, transition: reduce ? "none" : "opacity .5s ease 1.4s" }}
      >
        EBITDA $
      </text>

      <defs>
        <linearGradient id="aiqGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#144992" />
          <stop offset="1" stopColor="#27a9dd" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ------------- 4. INSURE — 막대 출렁 + 손실률 곡선 하락 → 안정선 ------------- */

const INSURE_BARS = [58, 70, 52, 78, 63, 72, 56, 74];
const INSURE_CURVE: [number, number][] = [
  [22, 58], [58, 78], [96, 100], [134, 120], [172, 134], [212, 142], [268, 145],
];
const STABLE_Y = 145;

function InsureBars({ active }: { active: boolean }) {
  const reduce = usePrefersReducedMotion();
  const baseY = 188;
  const bw = 22;
  const gap = 10;
  const x0 = 18;
  const curve = INSURE_CURVE.map((p, i) => `${i ? "L" : "M"} ${p[0]} ${p[1]}`).join(" ");

  return (
    <svg viewBox="0 0 290 210" className="w-full">
      {/* 축 */}
      <line x1={12} y1={baseY} x2={284} y2={baseY} stroke="#e2e8f0" strokeWidth={1.5} />

      {/* 막대 (출렁이며 라이즈) */}
      {INSURE_BARS.map((h, i) => {
        const x = x0 + i * (bw + gap);
        return (
          <rect
            key={i}
            x={x}
            y={baseY - h}
            width={bw}
            height={h}
            rx={5}
            fill="url(#insGrad)"
            style={{
              transformBox: "fill-box",
              transformOrigin: "bottom",
              transform: active ? "scaleY(1)" : "scaleY(0)",
              transition: reduce
                ? "none"
                : `transform .7s cubic-bezier(.34,1.7,.5,1) ${i * 80}ms`,
            }}
          />
        );
      })}

      {/* 안정선 (목표) */}
      <line
        x1={130}
        y1={STABLE_Y}
        x2={282}
        y2={STABLE_Y}
        stroke="#16a34a"
        strokeWidth={1.5}
        strokeDasharray="4 4"
        style={{ opacity: active ? 0.7 : 0, transition: reduce ? "none" : "opacity .5s ease 1.4s" }}
      />

      {/* 손실률 곡선 (하락) */}
      <path
        d={curve}
        fill="none"
        stroke="#144992"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={active ? 0 : 1}
        style={{ transition: reduce ? "none" : "stroke-dashoffset 1.2s cubic-bezier(.6,0,.2,1) .7s" }}
      />

      {/* 안정 도달 점 */}
      <circle
        cx={268}
        cy={145}
        r={5}
        fill="#16a34a"
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          opacity: active ? 1 : 0,
          transform: active ? "scale(1)" : "scale(0)",
          transition: reduce ? "none" : "all .4s cubic-bezier(.34,1.56,.64,1) 1.9s",
        }}
      />
      <text
        x={268}
        y={134}
        textAnchor="end"
        fontSize="10"
        fontWeight={700}
        fill="#16a34a"
        style={{ opacity: active ? 1 : 0, transition: reduce ? "none" : "opacity .5s ease 2s" }}
      >
        optimized
      </text>

      <defs>
        <linearGradient id="insGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#68c6d1" />
          <stop offset="1" stopColor="#144992" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ------------------------------- 데이터 ------------------------------- */

type Product = {
  brand: string;
  suffix: string;
  color: string;
  question: string;
  desc: string;
  Visual: ({ active }: { active: boolean }) => ReactNode;
};

const PRODUCTS: Product[] = [
  {
    brand: "Thrivaca",
    suffix: "CORE",
    color: "#144992",
    question: "Where do we stand today?",
    desc: "Point-in-time cyber exposure baseline. Your T-Score, benchmarked against peers.",
    Visual: CoreBenchmark,
  },
  {
    brand: "Thrivaca",
    suffix: "UNIFY",
    color: "#1f7fb0",
    question: "How do we continuously manage exposure?",
    desc: "Continuous threat exposure management. Turn 50+ security tools into one EBITDA-at-Risk metric.",
    Visual: UnifyConverge,
  },
  {
    brand: "Thrivaca",
    suffix: "AIQ",
    color: "#27a9dd",
    question: "What is AI exposure doing to EBITDA?",
    desc: "The only platform that quantifies AI exposure in dollars. Govern AI with financial clarity, not policy alone.",
    Visual: AIQNeural,
  },
  {
    brand: "Thrivaca",
    suffix: "INSURE",
    color: "#144992",
    question: "Are we transferring risk, or optimizing it?",
    desc: "Price cyber risk with actuarial precision. Improve loss ratios, underwrite with confidence.",
    Visual: InsureBars,
  },
];

/* ------------------------------ 제품 행 ------------------------------ */

function ProductRow({ product, index }: { product: Product; index: number }) {
  const [ref, inView] = useInView(0.35);
  const reversed = index % 2 === 1;
  const { Visual } = product;

  return (
    <div
      ref={ref}
      className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12"
    >
      {/* 텍스트 */}
      <div
        className={reversed ? "lg:order-2" : ""}
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(24px)",
          transition:
            "opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="text-slate-900">{product.brand}</span>
          <span style={{ color: product.color }}>{product.suffix}</span>
        </h3>
        <p className="mt-4 text-lg font-semibold text-slate-700">
          {product.question}
        </p>
        <p className="mt-3 max-w-md text-base leading-relaxed text-slate-500">
          {product.desc}
        </p>
      </div>

      {/* 비주얼 */}
      <div
        className={`relative flex justify-center ${reversed ? "lg:order-1" : ""}`}
      >
        <div className="relative w-full max-w-[300px]">
          <Visual active={inView} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- 섹션 ------------------------------- */

export default function Products() {
  return (
    <section
      id="products"
      className="relative scroll-mt-24"
    >
      <div className="mx-auto max-w-5xl px-6 py-28 sm:py-36">
        {/* 제목 */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Same engine. Different use cases. One financial truth.
          </h2>
          <p className="mx-auto mt-4 text-base text-slate-500">
            Four products. One actuarial AI engine.
          </p>
        </Reveal>

        {/* 제품들 (zigzag) */}
        <div className="mt-24 space-y-24 sm:space-y-32">
          {PRODUCTS.map((product, i) => (
            <ProductRow key={product.suffix} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
