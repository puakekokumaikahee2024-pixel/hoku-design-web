import type { CSSProperties, ReactNode } from "react";

/**
 * 見出しの文節リビール用の1区切り。i 番目の順で現れる（CSS: [data-reveal="words"] .word / .hero-words .word）。
 * inline-block なので、区切りの途中では改行されない。
 */
export function Word({
  i,
  className = "",
  children,
}: {
  i: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`word inline-block ${className}`}
      style={{ "--i": i } as CSSProperties}
    >
      {children}
    </span>
  );
}
