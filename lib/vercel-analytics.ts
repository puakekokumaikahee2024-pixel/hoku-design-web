"use cache";

import { cacheLife } from "next/cache";

const BASE = "https://api.vercel.com/v1/query/web-analytics";

export type InsightStats = {
  totalPageViews: number;
  uniqueVisitors: number;
  countriesCount: number;
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
    let countriesCount = 0;

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
      if (Array.isArray(aggJson.data)) {
        countriesCount = aggJson.data.length;
        break;
      }
    }

    return { totalPageViews, uniqueVisitors, countriesCount };
  } catch {
    return null;
  }
}
