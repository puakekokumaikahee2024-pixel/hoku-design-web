"use client";

import { useEffect, useRef } from "react";

// ヒーロー背景の Canvas。海面の波・水面のきらめき・瞬く星をゆっくり描く。
// - ライト: 明るい海と陽光 / ダーク: 夜の海と星空（prefers-color-scheme に追従）
// - 画面外では止める（IntersectionObserver）、動きを減らす設定では1枚だけ描いて止める
// - 粒子数は画面の広さに比例させ、スマホでは少なく・フレームも間引く

type Palette = {
  waves: string[];
  sparkle: string;
  star: string;
  /** 星は空（上半分）にどれだけはっきり出すか */
  starAlpha: number;
  sparkleAlpha: number;
};

const LIGHT: Palette = {
  // ターコイズ → オーシャンブルーの順に手前へ
  waves: ["rgba(45,200,216,0.10)", "rgba(45,200,216,0.13)", "rgba(27,127,196,0.10)", "rgba(27,127,196,0.14)"],
  sparkle: "255,255,255",
  star: "255,167,38", // サンセットオレンジの陽光の粒
  starAlpha: 0.35,
  sparkleAlpha: 0.9,
};

const DARK: Palette = {
  waves: ["rgba(27,127,196,0.10)", "rgba(27,127,196,0.14)", "rgba(45,200,216,0.08)", "rgba(45,200,216,0.12)"],
  sparkle: "180,240,255",
  star: "255,255,255",
  starAlpha: 0.85,
  sparkleAlpha: 0.75,
};

type Wave = { amp: number; length: number; speed: number; phase: number; base: number };
type Particle = { x: number; y: number; r: number; vx: number; freq: number; phase: number };

const WAVES: Wave[] = [
  { amp: 10, length: 620, speed: 0.12, phase: 0, base: 0.58 },
  { amp: 14, length: 480, speed: -0.09, phase: 1.7, base: 0.66 },
  { amp: 9, length: 760, speed: 0.07, phase: 3.1, base: 0.74 },
  { amp: 12, length: 540, speed: -0.11, phase: 4.4, base: 0.82 },
];

/** 1 万 px² あたりの粒子数 */
const STAR_DENSITY = 0.055;
const SPARKLE_DENSITY = 0.035;
const MAX_STARS = 90;
const MAX_SPARKLES = 55;

export function HeroCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dark = window.matchMedia("(prefers-color-scheme: dark)");
    let palette = dark.matches ? DARK : LIGHT;
    let width = 0;
    let height = 0;
    let narrow = false;
    let stars: Particle[] = [];
    let sparkles: Particle[] = [];
    let frame = 0;
    let visible = false;
    let lastDraw = 0;

    const random = (min: number, max: number) => min + Math.random() * (max - min);

    const seed = () => {
      const area = (width * height) / 10000;
      const scale = narrow ? 0.5 : 1;
      stars = Array.from({ length: Math.min(MAX_STARS, Math.round(area * STAR_DENSITY * scale)) }, () => ({
        x: random(0, width),
        // 星は空側（上 65%）に多め、一部は水面の反射として下にも
        y: Math.random() < 0.8 ? random(0, height * 0.6) : random(height * 0.6, height),
        r: random(0.6, 1.6),
        vx: 0,
        freq: random(0.3, 1.1),
        phase: random(0, Math.PI * 2),
      }));
      sparkles = Array.from({ length: Math.min(MAX_SPARKLES, Math.round(area * SPARKLE_DENSITY * scale)) }, () => ({
        x: random(0, width),
        y: random(height * 0.56, height * 0.95),
        r: random(1, 2.4),
        vx: random(4, 12) * (Math.random() < 0.5 ? -1 : 1),
        freq: random(0.4, 1.2),
        phase: random(0, Math.PI * 2),
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      narrow = width < 768;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const drawWave = (wave: Wave, t: number, color: string) => {
      const step = narrow ? 12 : 8;
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width + step; x += step) {
        const y =
          height * wave.base +
          Math.sin((x / wave.length) * Math.PI * 2 + wave.phase + t * wave.speed) * wave.amp +
          Math.sin((x / (wave.length * 0.43)) * Math.PI * 2 + t * wave.speed * 1.6) * wave.amp * 0.3;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    const draw = (t: number, dt: number) => {
      ctx.clearRect(0, 0, width, height);

      WAVES.forEach((wave, i) => drawWave(wave, t, palette.waves[i]));

      for (const star of stars) {
        const twinkle = 0.35 + 0.65 * Math.abs(Math.sin(t * star.freq + star.phase)) ** 3;
        ctx.globalAlpha = palette.starAlpha * twinkle;
        ctx.fillStyle = `rgb(${palette.star})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const s of sparkles) {
        s.x += s.vx * dt;
        if (s.x < -10) s.x = width + 10;
        if (s.x > width + 10) s.x = -10;
        const glint = Math.max(0, Math.sin(t * s.freq + s.phase));
        if (glint < 0.05) continue;
        // 水面の反射は横長の光にする
        ctx.globalAlpha = palette.sparkleAlpha * glint ** 2;
        ctx.fillStyle = `rgb(${palette.sparkle})`;
        ctx.beginPath();
        ctx.ellipse(s.x, s.y, s.r * 2.6, s.r * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const start = performance.now();
    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      // スマホは 30fps 程度に間引く
      if (narrow && now - lastDraw < 32) return;
      const dt = Math.min(0.1, (now - (lastDraw || now)) / 1000);
      lastDraw = now;
      draw((now - start) / 1000, dt);
    };
    const play = () => {
      if (frame || !visible || reduceMotion.matches) return;
      lastDraw = 0;
      frame = requestAnimationFrame(loop);
    };
    const pause = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    /** 動きを減らす設定・リサイズ・テーマ変更時の1枚描き */
    const drawStill = () => draw(12, 0);

    resize();
    drawStill();
    canvas.dataset.ready = "";

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else pause();
    });
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      resize();
      if (!frame) drawStill();
    });
    ro.observe(canvas);

    const onTheme = () => {
      palette = dark.matches ? DARK : LIGHT;
      if (!frame) drawStill();
    };
    const onMotion = () => {
      if (reduceMotion.matches) {
        pause();
        drawStill();
      } else {
        play();
      }
    };
    dark.addEventListener("change", onTheme);
    reduceMotion.addEventListener("change", onMotion);

    return () => {
      pause();
      io.disconnect();
      ro.disconnect();
      dark.removeEventListener("change", onTheme);
      reduceMotion.removeEventListener("change", onMotion);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none opacity-0 transition-opacity duration-1000 data-ready:opacity-100 ${className}`}
    />
  );
}
