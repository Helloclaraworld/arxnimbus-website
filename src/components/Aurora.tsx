/**
 * Aurora mesh 그라데이션 배경.
 * - 4개의 부드러운 색 덩어리(blob)가 천천히 흐물거리며 형태가 morph (회전 아님)
 * - 겹치며 색이 섞이는 mesh gradient 느낌 (Blue → Aqua → Teal → Purple)
 * - radial 마스크로 가장자리가 자연스럽게 페이드 → 잘리지 않음
 * - 텍스트 뒤 배경 전용, 낮은 투명도로 가독성 우선
 * - prefers-reduced-motion 시 정적(globals.css)
 */
// 모든 가장자리(상하좌우)가 직선 경계 없이 투명해지도록, 경계 이전에 완전히 페이드
const fade =
  "radial-gradient(ellipse 80% 72% at 50% 48%, #000 0%, #000 20%, transparent 60%)";

export default function Aurora({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ maskImage: fade, WebkitMaskImage: fade }}
    >
      <div
        className="aurora-blob aurora-a"
        style={{ background: "radial-gradient(circle, #14499247 0%, transparent 66%)" }}
      />
      <div
        className="aurora-blob aurora-b"
        style={{ background: "radial-gradient(circle, #27a9dd4d 0%, transparent 66%)" }}
      />
      <div
        className="aurora-blob aurora-c"
        style={{ background: "radial-gradient(circle, #68c6d147 0%, transparent 66%)" }}
      />
      <div
        className="aurora-blob aurora-d"
        style={{ background: "radial-gradient(circle, #8c52ff2e 0%, transparent 66%)" }}
      />
    </div>
  );
}
