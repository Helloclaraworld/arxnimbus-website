/**
 * 페이지 전체에 깔리는 은은하게 움직이는 브랜드 그라데이션 블롭.
 * - 흰 베이스 위에 Blue → Aqua → Teal → Purple 흐름으로 색이 변함 (보라는 포인트로 살짝)
 * - 섹션마다 위치/색조가 달라 스크롤 시 변화감
 * - glass 카드들이 이 배경을 비춰 유리 느낌이 살아남
 * - CSS 그라데이션 + transform 애니메이션(경량), prefers-reduced-motion 시 정지(globals.css)
 */
const blob = (color: string) =>
  `radial-gradient(circle at center, ${color} 0%, transparent 70%)`;

const BLUE = "#144992";
const AQUA = "#27a9dd";
const TEAL = "#68c6d1";
const PURPLE = "#8c52ff";

export default function BackgroundFX() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* 위 → 아래로 Blue → Aqua → Teal → Purple 흐름 */}
      <div
        className="arx-blob arx-blob-1 left-[-12%] top-[1%] h-[42rem] w-[42rem] opacity-[0.20]"
        style={{ background: blob(AQUA) }}
      />
      <div
        className="arx-blob arx-blob-2 right-[-14%] top-[14%] h-[48rem] w-[48rem] opacity-[0.18]"
        style={{ background: blob(BLUE) }}
      />
      <div
        className="arx-blob arx-blob-1 left-[-10%] top-[34%] h-[40rem] w-[40rem] opacity-[0.16]"
        style={{ background: blob(TEAL) }}
      />
      <div
        className="arx-blob arx-blob-2 right-[-12%] top-[50%] h-[46rem] w-[46rem] opacity-[0.20]"
        style={{ background: blob(AQUA) }}
      />
      {/* 보라 — 포인트로 아주 살짝 */}
      <div
        className="arx-blob arx-blob-1 left-[-8%] top-[64%] h-[40rem] w-[40rem] opacity-[0.12]"
        style={{ background: blob(PURPLE) }}
      />
      <div
        className="arx-blob arx-blob-2 right-[-12%] top-[78%] h-[44rem] w-[44rem] opacity-[0.16]"
        style={{ background: blob(TEAL) }}
      />
      <div
        className="arx-blob arx-blob-1 left-[-12%] top-[90%] h-[42rem] w-[42rem] opacity-[0.16]"
        style={{ background: blob(BLUE) }}
      />
    </div>
  );
}
