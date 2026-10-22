import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative px-4 py-10 sm:px-6">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-turquoise via-ocean to-sunset opacity-70"
      />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt=""
            width={32}
            height={32}
            className="size-8"
          />
          <span className="font-display font-semibold">HOKU Design</span>
        </div>
        <ul className="flex gap-5 text-sm text-slate-500 dark:text-slate-400">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors hover:text-ocean dark:hover:text-turquoise"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="font-display text-xs text-slate-400">
          © 2024 HOKU Design
        </p>
      </div>
    </footer>
  );
}
