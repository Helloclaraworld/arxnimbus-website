import { type ReactNode } from "react";

/**
 * 가로로 천천히 무한 흐르는 마퀴.
 * - reverse=false: 왼쪽으로 흐름 / reverse=true: 오른쪽으로 흐름
 * - 마우스 hover 시 일시정지 (globals.css)
 * - prefers-reduced-motion 시 정지 (globals.css)
 * - 양 끝 흰색 페이드로 깔끔하게 사라지는 느낌
 */
export default function Marquee({
  items,
  renderItem,
  reverse = false,
  speed = 32,
  repeat = 2,
}: {
  items: string[];
  renderItem: (item: string) => ReactNode;
  reverse?: boolean;
  speed?: number;
  repeat?: number;
}) {
  // 짧은 목록도 화면을 채우도록 반복 (seamless loop 보장)
  const sequence = Array.from({ length: repeat }).flatMap(() => items);

  return (
    <div className="arx-marquee relative overflow-hidden py-2">
      <div
        className={`arx-marquee-track ${reverse ? "arx-marquee-reverse" : ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {/* 동일 그룹 2개 → -50% 이동 시 seamless */}
        {[0, 1].map((group) => (
          <div
            key={group}
            className="flex shrink-0 gap-3 pr-3"
            aria-hidden={group === 1}
          >
            {sequence.map((item, i) => (
              <div key={i}>{renderItem(item)}</div>
            ))}
          </div>
        ))}
      </div>

      {/* 양 끝 페이드 */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent sm:w-20" />
    </div>
  );
}
