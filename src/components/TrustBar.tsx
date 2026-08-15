import Image from "next/image";
import Reveal from "./Reveal";
import Marquee from "./Marquee";

type Logo = {
  src: string;
  alt: string;
  /** 투명 여백을 트림한 실제 크기 (캔버스 높이 = 잉크 높이) */
  width: number;
  height: number;
  /**
   * 원본이 "투명 배경 + 단색"이 아니라 "불투명 흰색 면 + 검정 라인아트"인 경우.
   * brightness-0 을 씌우면 흰색 면까지 검정이 되어 통짜 실루엣으로 뭉개지므로 필터 제외.
   */
  noFilter?: boolean;
};

const STANDARDS: Logo[] = [
  {
    src: "/logos/usstratcom.png",
    alt: "United States Strategic Command",
    width: 225,
    height: 224,
    noFilter: true,
  },
  { src: "/logos/mitre.png", alt: "MITRE Corporation", width: 447, height: 126 },
  {
    src: "/logos/uchicago.png",
    alt: "University of Chicago",
    width: 528,
    height: 108,
  },
  {
    src: "/logos/asu.png",
    alt: "Arizona State University School of Technology AI Lab",
    width: 315,
    height: 243,
  },
  { src: "/logos/aiuc1.png", alt: "AIUC-1", width: 316, height: 90 },
  {
    src: "/logos/nist.png",
    alt: "National Institute of Standards and Technology",
    width: 433,
    height: 153,
  },
  {
    src: "/logos/soa.png",
    alt: "Society of Actuaries",
    width: 457,
    height: 143,
  },
];

const CUSTOMERS: Logo[] = [
  {
    src: "/logos/quest.png",
    alt: "Quest Diagnostics",
    width: 985,
    height: 311,
  },
  {
    src: "/logos/falcon.png",
    alt: "Falcon Risk Services",
    width: 466,
    height: 233,
  },
  { src: "/logos/bp.png", alt: "BP", width: 688, height: 916 },
  { src: "/logos/c3ai.png", alt: "C3.ai", width: 393, height: 137 },
  { src: "/logos/gluck.png", alt: "Gluck", width: 408, height: 83 },
  {
    src: "/logos/beacon.png",
    alt: "Beacon Health System",
    width: 330,
    height: 228,
  },
  { src: "/logos/pnc.png", alt: "PNC", width: 462, height: 128 },
  {
    src: "/logos/generaldynamics.png",
    alt: "General Dynamics",
    width: 727,
    height: 44,
  },
  { src: "/logos/affirm.png", alt: "Affirm", width: 406, height: 169 },
  {
    src: "/logos/sentara.png",
    alt: "Sentara Health",
    width: 495,
    height: 149,
  },
  { src: "/logos/cummins.png", alt: "Cummins", width: 204, height: 188 },
];

/**
 * 종횡비로 크기 등급을 자동 결정한다. 로고를 추가해도 분류가 알아서 적용됨.
 *
 * 같은 높이로 두면 글자만 있는 가로형 워드마크는 잉크가 옆으로 퍼져 시각적으로 크게 읽히고,
 * 정사각에 가까운 마크+글자 락업은 반대로 작게 읽힌다. 그래서 가로로 길수록 높이를 낮춘다.
 * 기준점: beacon(1.45) · cummins(1.09) · asu(1.30) 의 시각적 무게에 나머지를 맞춤.
 */
function sizeClass({ width, height }: Logo) {
  const ratio = width / height;
  if (ratio < 1.6) return "h-11 md:h-13"; // A. 정사각형 락업
  if (ratio <= 3.0) return "h-9 md:h-10"; // B. 중간형
  return "h-7 md:h-8"; // C. 가로형 워드마크
}

/**
 * brightness-0 단독 적용 → 원본이 흰색/회색/크림색이든 전부 순검정으로 통일.
 * 알파는 유지되므로 투명 배경 그대로.
 */
function LogoMark({ logo }: { logo: Logo }) {
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      className={`w-auto max-w-[240px] object-contain opacity-60 transition-opacity duration-200 hover:opacity-100 md:max-w-[280px] ${
        logo.noFilter ? "" : "brightness-0"
      } ${sizeClass(logo)}`}
    />
  );
}

export default function TrustBar() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-6 py-28 sm:py-32">
        {/* 1. 기관 신뢰 — 왼쪽으로 흐름 */}
        <Reveal>
          <p className="mx-auto max-w-2xl text-center text-lg font-medium text-slate-500 md:text-xl">
            Developed in coordination with
          </p>
        </Reveal>
        <Reveal delay={120} className="mt-12 md:mt-14">
          <Marquee
            items={STANDARDS}
            renderItem={(logo) => <LogoMark logo={logo} />}
            gapClassName="gap-14 pr-14 md:gap-20 md:pr-20"
            speed={34}
          />
        </Reveal>

        {/* 구분선 */}
        <div className="mx-auto my-14 h-px max-w-xs bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* 2. 고객사 신뢰 — 오른쪽으로 흐름 */}
        <Reveal>
          <p className="mx-auto max-w-2xl text-center text-lg font-medium text-slate-500 md:text-xl">
            Trusted by enterprises and insurers covering{" "}
            <span className="font-semibold text-[#144992]">
              35% of the S&amp;P 500
            </span>
          </p>
        </Reveal>
        <Reveal delay={120} className="mt-12 md:mt-14">
          <Marquee
            items={CUSTOMERS}
            renderItem={(logo) => <LogoMark logo={logo} />}
            gapClassName="gap-14 pr-14 md:gap-20 md:pr-20"
            repeat={1}
            reverse
            speed={34}
          />
        </Reveal>
      </div>
    </section>
  );
}
