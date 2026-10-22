"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** スマホ幅では動きを半分にする */
const NARROW_FACTOR = 0.5;

/**
 * ヒーロー用のパララックス。スクロール量を CSS 変数 --parallax（px）としてセクションに渡し、
 * 各レイヤーは .parallax-layer と --depth で translate3d に変換する（globals.css）。
 * - scroll は requestAnimationFrame で1フレーム1回に間引く
 * - ヒーローが画面外にある間は scroll を購読しない
 * - prefers-reduced-motion: reduce では何もしない
 */
export function ParallaxHero({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 767px)");
    let frame = 0;
    let visible = false;
    let listening = false;

    const update = () => {
      frame = 0;
      const factor = narrow.matches ? NARROW_FACTOR : 1;
      el.style.setProperty("--parallax", `${Math.max(0, window.scrollY) * factor}`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const start = () => {
      if (listening || !visible || reduceMotion.matches) return;
      listening = true;
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    };
    const stop = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    observer.observe(el);

    const onMotionChange = () => {
      if (reduceMotion.matches) {
        stop();
        el.style.removeProperty("--parallax");
      } else {
        start();
      }
    };
    const onWidthChange = () => {
      if (listening) onScroll();
    };
    reduceMotion.addEventListener("change", onMotionChange);
    narrow.addEventListener("change", onWidthChange);

    return () => {
      stop();
      observer.disconnect();
      reduceMotion.removeEventListener("change", onMotionChange);
      narrow.removeEventListener("change", onWidthChange);
    };
  }, []);

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}
