"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next-intl/navigation";
import { routing } from "@/i18n/routing";
import { useTransition } from "react";

const LOCALES = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "zh-TW", label: "繁體中文", flag: "🇹🇼" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
] as const;

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onLocaleChange(newLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale as typeof routing.locales[number] });
    });
  }

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <div className="relative group">
      <button
        disabled={isPending}
        className="flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-turquoise/10 hover:text-ocean dark:text-slate-300 dark:hover:text-turquoise"
        aria-label="言語を切り替える / Change language"
      >
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="absolute right-0 top-full mt-1 hidden group-hover:block group-focus-within:block z-50">
        <ul className="w-44 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl dark:border-night-700 dark:bg-night-900">
          {LOCALES.map((loc) => (
            <li key={loc.code}>
              <button
                onClick={() => onLocaleChange(loc.code)}
                className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition hover:bg-turquoise/10 ${
                  loc.code === locale
                    ? "font-semibold text-ocean dark:text-turquoise"
                    : "text-slate-700 dark:text-slate-200"
                }`}
              >
                <span>{loc.flag}</span>
                <span>{loc.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
