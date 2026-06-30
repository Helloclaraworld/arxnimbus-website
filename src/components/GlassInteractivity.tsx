"use client";

import { useEffect } from "react";

/**
 * .liquid-glass 위에서 마우스가 움직이면 해당 패널의 --gx/--gy 변수를 갱신해
 * CSS의 specular 하이라이트(::after)가 마우스를 따라오게 한다.
 * - 단일 위임 리스너(window)로 패널이 몇 개든 가볍게 처리
 * - prefers-reduced-motion 시 비활성화
 */
export default function GlassInteractivity() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const card = target?.closest?.(".liquid-glass") as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
      card.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return null;
}
