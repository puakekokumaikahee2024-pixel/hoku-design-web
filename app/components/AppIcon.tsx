import Image from "next/image";
import type { AppInfo } from "@/lib/apps";

type Props = {
  app: AppInfo;
  /** 表示サイズ(px)。width/height 属性になる */
  size: number;
  /** レスポンシブに伸縮させる場合の sizes。固定サイズなら省略 */
  sizes?: string;
  /** ファーストビューに出るものだけ true */
  preload?: boolean;
  className?: string;
};

export function AppIcon({ app, size, sizes, preload, className = "" }: Props) {
  return (
    <Image
      src={app.iconSrc}
      alt={`${app.name} のアイコン`}
      width={size}
      height={size}
      sizes={sizes ?? `${size}px`}
      preload={preload}
      className={`aspect-square shrink-0 rounded-[22%] object-cover shadow-md shadow-slate-900/10 ring-1 ring-black/5 dark:shadow-black/30 dark:ring-white/10 ${className}`}
    />
  );
}
