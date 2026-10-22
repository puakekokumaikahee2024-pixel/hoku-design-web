import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/85 backdrop-blur-lg dark:border-night-700/60 dark:bg-night-950/85">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Image
            src="/logo.png"
            alt="HOKU Design ロゴ"
            width={44}
            height={44}
            preload
            className="h-11 w-11 shrink-0"
          />
          <span className="font-display text-base font-bold tracking-tight whitespace-nowrap sm:text-lg">
            <span className="text-ocean dark:text-turquoise">HOKU</span>{" "}
            {/* ナビが4項目あるため、狭い画面では Design を省く */}
            <span className="font-medium text-slate-600 max-[420px]:hidden dark:text-slate-300">
              Design
            </span>
          </span>
        </Link>
        <ul className="flex items-center text-[13px] font-medium sm:gap-2 sm:text-sm">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-1.5 py-1.5 whitespace-nowrap text-slate-600 transition-colors hover:bg-turquoise/10 hover:text-ocean sm:px-4 dark:text-slate-300 dark:hover:text-turquoise"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
