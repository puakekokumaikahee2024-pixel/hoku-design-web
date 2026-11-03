"use cache";

import { cacheLife } from "next/cache";

const BASE = "https://api.vercel.com/v1/query/web-analytics";

export type CountryStat = {
  /** ISO 3166-1 alpha-2 の国コード (例: "JP") */
  code: string;
  visitors: number;
  pageviews: number;
};

export type InsightStats = {
  totalPageViews: number;
  uniqueVisitors: number;
  countriesCount: number;
  countries: CountryStat[];
};

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function getAnalyticsStats(): Promise<InsightStats | null> {
  cacheLife("hours");

  const token = process.env.HOKU_VERCEL_TOKEN;
  const projectId = process.env.HOKU_VERCEL_PROJECT_ID;
  if (!token || !projectId) return null;

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const until = new Date();

  try {
    // --- 累計のページビュー / 訪問者 ---
    const countUrl =
      `${BASE}/visits/count` + `?projectId=${encodeURIComponent(projectId)}`;

    const countRes = await fetch(countUrl, { headers });
    if (!countRes.ok) return null;

    const countJson = (await countRes.json()) as {
      data?: { pageviews?: number; visitors?: number };
    };
    const totalPageViews = countJson.data?.pageviews ?? 0;
    const uniqueVisitors = countJson.data?.visitors ?? 0;

    // --- 国別の内訳 ---
    // by は JSON 配列ではなく素の文字列 ("country") を渡す。
    // Hobby プランは集計の参照期間が短いため、30日 → 7日 → 1日 の順に試す。
    let countries: CountryStat[] = [];

    for (const days of [30, 7, 1]) {
      const since = new Date(until.getTime() - days * 24 * 60 * 60 * 1000);

      const aggUrl =
        `${BASE}/visits/aggregate` +
        `?projectId=${encodeURIComponent(projectId)}` +
        `&since=${encodeURIComponent(ymd(since))}` +
        `&until=${encodeURIComponent(ymd(until))}` +
        `&by=country` +
        `&limit=100`;

      const aggRes = await fetch(aggUrl, { headers });
      if (!aggRes.ok) continue;

      const aggJson = (await aggRes.json()) as { data?: unknown };
      if (!Array.isArray(aggJson.data)) continue;

      const rows = aggJson.data as Array<{
        country?: unknown;
        visitors?: unknown;
        pageviews?: unknown;
      }>;

      countries = rows
        .map((row) => ({
          code: typeof row.country === "string" ? row.country.toUpperCase() : "",
          visitors: typeof row.visitors === "number" ? row.visitors : 0,
          pageviews: typeof row.pageviews === "number" ? row.pageviews : 0,
        }))
        // "Others" など国コードでない行は除外する
        .filter((row) => /^[A-Z]{2}$/.test(row.code))
        .sort((a, b) => b.visitors - a.visitors || b.pageviews - a.pageviews);

      if (countries.length > 0) break;
    }

    return {
      totalPageViews,
      uniqueVisitors,
      countriesCount: countries.length,
      countries,
    };
  } catch {
    return null;
  }
}
