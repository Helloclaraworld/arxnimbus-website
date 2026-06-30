"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * 스크롤하여 화면에 들어오면 아래에서 위로 부드럽게 fade-in 되는 래퍼.
 * - 한 번 나타나면 다시 사라지지 않음 (observer disconnect)
 * - prefers-reduced-motion 시 애니메이션 없이 즉시 표시
 * - delay 로 요소별 stagger 가능
 *
 * 앞으로 추가할 모든 섹션/요소를 <Reveal>...</Reveal> 로 감싸면 동일한 등장 효과가 적용됨.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : `translateY(${y}px)`,
        transition:
          "opacity 650ms cubic-bezier(0.22,1,0.36,1), transform 650ms cubic-bezier(0.22,1,0.36,1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
