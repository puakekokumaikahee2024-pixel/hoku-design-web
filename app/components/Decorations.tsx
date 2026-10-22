// 装飾用のSVG（ヤシの葉・ハイビスカス・波）。すべて aria-hidden。

type Point = [number, number];

const round = (n: number) => Math.round(n * 10) / 10;

/** 1枚のヤシの葉（中央の茎に沿って小葉を並べる）を生成する */
function buildFrond() {
  const p0: Point = [0, 0];
  const c: Point = [140, -120];
  const p2: Point = [340, -60];
  const at = (t: number): Point => [
    (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * c[0] + t ** 2 * p2[0],
    (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * c[1] + t ** 2 * p2[1],
  ];
  const tangent = (t: number): Point => [
    2 * (1 - t) * (c[0] - p0[0]) + 2 * t * (p2[0] - c[0]),
    2 * (1 - t) * (c[1] - p0[1]) + 2 * t * (p2[1] - c[1]),
  ];

  const leaflets: string[] = [];
  const xs: number[] = [];
  const ys: number[] = [];
  const count = 24;
  for (let i = 0; i < count; i++) {
    const t = 0.08 + (0.9 * i) / (count - 1);
    const [px, py] = at(t);
    const [tx, ty] = tangent(t);
    const base = Math.atan2(ty, tx);
    const length = 50 + 130 * Math.sin(Math.PI * Math.min(t * 1.15, 1));
    for (const side of [1, -1]) {
      const a = base + side * 0.95;
      const dir: Point = [Math.cos(a), Math.sin(a)];
      const perp: Point = [-dir[1], dir[0]];
      const w = length * 0.07;
      // 先端を少し垂らす
      const tip: Point = [px + dir[0] * length, py + dir[1] * length + length * 0.3];
      const mid: Point = [px + dir[0] * length * 0.5, py + dir[1] * length * 0.5 + length * 0.08];
      leaflets.push(
        `M${round(px)} ${round(py)}Q${round(mid[0] + perp[0] * w)} ${round(mid[1] + perp[1] * w)} ${round(tip[0])} ${round(tip[1])}Q${round(mid[0] - perp[0] * w)} ${round(mid[1] - perp[1] * w)} ${round(px)} ${round(py)}Z`,
      );
      xs.push(tip[0]);
      ys.push(tip[1]);
    }
  }

  const pad = 8;
  const minX = Math.min(0, ...xs) - pad;
  const minY = Math.min(c[1], ...ys) - pad;
  const maxX = Math.max(p2[0], ...xs) + pad;
  const maxY = Math.max(0, ...ys) + pad;
  return {
    leaflets: leaflets.join(""),
    stem: `M0 0Q${c[0]} ${c[1]} ${p2[0]} ${p2[1]}`,
    viewBox: `${round(minX)} ${round(minY)} ${round(maxX - minX)} ${round(maxY - minY)}`,
  };
}

const FROND = buildFrond();

export function PalmFrond({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox={FROND.viewBox}
      fill="currentColor"
      className={`pointer-events-none ${className}`}
    >
      <path d={FROND.leaflets} />
      <path d={FROND.stem} fill="none" stroke="currentColor" strokeWidth={5} strokeLinecap="round" />
    </svg>
  );
}

const PETAL =
  "M0 0C-22 -8 -34 -36 -22 -54C-14 -64 -4 -58 0 -62C4 -58 14 -64 22 -54C34 -36 22 -8 0 0Z";

export function Hibiscus({
  className = "",
  accent = "var(--color-sunset)",
}: {
  className?: string;
  /** めしべ・中心の色 */
  accent?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="-66 -66 132 132"
      className={`pointer-events-none ${className}`}
    >
      {[0, 72, 144, 216, 288].map((r) => (
        <path key={r} d={PETAL} transform={`rotate(${r})`} fill="currentColor" />
      ))}
      <circle r="12" fill={accent} opacity="0.55" />
      <path d="M0 0Q12 -20 30 -44" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      {[
        [30, -44],
        [36, -40],
        [26, -50],
        [34, -48],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill={accent} />
      ))}
    </svg>
  );
}

/** 2層の波 + 下地（surface）で区切る。flip で上端用に上下反転 */
export function Waves({
  className = "",
  surface = "fill-white dark:fill-night-950",
  flip = false,
}: {
  className?: string;
  surface?: string;
  flip?: boolean;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
      className={`pointer-events-none w-full ${flip ? "-scale-y-100" : ""} ${className}`}
    >
      <path
        d="M0 70C240 140 480 10 720 60S1200 130 1440 50V160H0Z"
        className="fill-turquoise/35 dark:fill-turquoise/15"
      />
      <path
        d="M0 105C300 50 520 160 820 105S1260 60 1440 115V160H0Z"
        className="fill-ocean/25 dark:fill-ocean/30"
      />
      <path
        d="M0 135C260 112 560 168 900 135S1300 118 1440 140V160H0Z"
        className={surface}
      />
    </svg>
  );
}
