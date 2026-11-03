import { useLocale } from "next-intl";
import type { CountryStat } from "@/lib/vercel-analytics";

/** "JP" → 🇯🇵 (国コード2文字を国旗の絵文字に変換する) */
function flagEmoji(code: string): string | null {
  if (!/^[A-Z]{2}$/.test(code)) return null;
  return String.fromCodePoint(
    ...[...code].map((char) => 127397 + char.charCodeAt(0)),
  );
}

export function CountryStrip({ countries }: { countries: CountryStat[] }) {
  const locale = useLocale();
  if (countries.length === 0) return null;

  // 国名は表示中の言語に合わせて自動で訳される (日本 / Japan / Japón ...)
  let regionNames: Intl.DisplayNames | null = null;
  try {
    regionNames = new Intl.DisplayNames([locale], { type: "region" });
  } catch {
    regionNames = null;
  }

  return (
    <ul className="mx-auto mt-5 flex max-w-5xl flex-wrap items-center justify-center gap-2">
      {countries.map((country) => {
        const flag = flagEmoji(country.code);
        let name = country.code;
        try {
          name = regionNames?.of(country.code) ?? country.code;
        } catch {
          name = country.code;
        }

        return (
          <li
            key={country.code}
            className="inline-flex items-center gap-2 rounded-full bg-white/80 py-1.5 pr-3 pl-2.5 text-sm text-slate-600 ring-1 ring-slate-200/80 backdrop-blur dark:bg-night-900/70 dark:text-slate-300 dark:ring-night-700"
          >
            {flag && (
              <span aria-hidden className="text-base leading-none">
                {flag}
              </span>
            )}
            <span className="font-medium">{name}</span>
            <span className="font-display font-semibold text-ocean tabular-nums dark:text-turquoise">
              {country.visitors.toLocaleString()}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
