import Link from "next/link";
import type { CSSProperties } from "react";
import { apps, type AppCategory, type AppInfo } from "@/lib/apps";
import { AppIcon } from "./AppIcon";

// ヒーローの「アプリの星座」。8つのアイコンを星として散りばめ、細い線で結ぶ。
// 左上に医療の4つ（四角形）、右に旅のライフスタイル、右下にゲームの3つ（三角形）。
// 座標は正方形の枠に対する % で、アイコンの中心を表す。

const POSITIONS: Record<string, { x: number; y: number }> = {
  rehastats: { x: 16, y: 17 },
  clinstats: { x: 45, y: 11 },
  "6mwt-guide": { x: 22, y: 46 },
  "6mw-record": { x: 51, y: 38 },
  pinline: { x: 83, y: 27 },
  waverun: { x: 72, y: 61 },
  mogrow: { x: 41, y: 79 },
  wangan: { x: 84, y: 85 },
};

/** 星座の線（slug の組） */
const LINKS: [string, string][] = [
  ["rehastats", "clinstats"],
  ["rehastats", "6mwt-guide"],
  ["6mwt-guide", "6mw-record"],
  ["clinstats", "6mw-record"],
  ["6mw-record", "pinline"],
  ["pinline", "waverun"],
  ["waverun", "mogrow"],
  ["waverun", "wangan"],
  ["mogrow", "wangan"],
];

const GLOW: Record<AppCategory, string> = {
  medical: "bg-turquoise/45 dark:bg-turquoise/35",
  lifestyle: "bg-sunset/50 dark:bg-sunset/35",
  game: "bg-sky-400/40 dark:bg-sky-400/30",
};

export function Constellation({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-square ${className}`}>
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full overflow-visible [filter:drop-shadow(0_0_3px_rgb(45_200_216/0.55))]"
      >
        {LINKS.map(([from, to], i) => {
          const a = POSITIONS[from];
          const b = POSITIONS[to];
          return (
            <line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              vectorEffect="non-scaling-stroke"
              strokeWidth={1.25}
              strokeLinecap="round"
              className="constellation-line stroke-ocean/40 dark:stroke-turquoise/50"
              style={{ "--i": i } as CSSProperties}
            />
          );
        })}
      </svg>

      <ul aria-label="公開中のアプリ">
        {apps.map((app, i) => {
          const pos = POSITIONS[app.slug];
          return (
            <li
              key={app.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <Star app={app} index={i} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Star({ app, index }: { app: AppInfo; index: number }) {
  const body = (
    <>
      {/* 星のグロー（ゆっくり明滅、ホバーで明るく） */}
      <span
        aria-hidden
        className={`constellation-glow absolute -inset-3 -z-10 rounded-full blur-xl transition-opacity duration-300 group-hover:animate-none group-hover:opacity-100 group-focus-visible:animate-none group-focus-visible:opacity-100 ${GLOW[app.category]}`}
        style={{ "--i": index } as CSSProperties}
      />
      <AppIcon
        app={app}
        size={72}
        preload
        className="size-14 brightness-[0.92] saturate-[0.9] transition duration-300 group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-100 group-focus-visible:scale-110 group-focus-visible:brightness-110 sm:size-16 md:size-[4.5rem]"
      />
      {/* アプリ名（ホバー・フォーカスで表示） */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 translate-y-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-slate-800 opacity-0 shadow-md ring-1 ring-slate-200 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 dark:bg-night-800/90 dark:text-white dark:ring-night-700"
      >
        {app.name}
      </span>
    </>
  );

  const base = "group relative isolate flex rounded-[22%] outline-none focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

  // 審査中のアプリには個別ページへのリンクを付けない
  if (app.status === "in-review") {
    return (
      <div className={base} title={`${app.name}（近日公開）`}>
        {body}
      </div>
    );
  }
  return (
    <Link href={`/apps/${app.slug}`} aria-label={`${app.name} の詳細`} className={base}>
      {body}
    </Link>
  );
}
