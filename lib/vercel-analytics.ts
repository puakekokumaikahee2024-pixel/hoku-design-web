import { cacheLife } from "next/cache";

const BASE = "https://vercel.com/api/v1/web/insights";

export type InsightStats = {
  totalPageViews: number;
  uniqueVisitors: number;
  countriesCount: number;
};

async function fetchInsights(
  path: string,
  projectId: string,
  token: string,
): Promise<Record<string, unknown>> {
  const url = `${BASE}/${path}?projectId=${projectId}&period=30d`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Vercel API error: ${res.status}`);
  return res.json() as Promise<Record<string, unknown>>;
}

export async function getAnalyticsStats(): Promise<InsightStats | null> {
  "use cache";
  cacheLife("hours");
  const token = process.env.HOKU_VERCEL_TOKEN;
  const projectId = process.env.HOKU_VERCEL_PROJECT_ID;
  if (!token || !projectId) return null;
  try {
    const [views, countries] = await Promise.all([
      fetchInsights("pageviews", projectId, token),
      fetchInsights("countries", projectId, token),
    ]);
    const totalPageViews =
      typeof views.total === "number" ? views.total : 0;
    const uniqueVisitors =
      typeof views.uniques === "number" ? views.uniques : 0;
    const countriesData = Array.isArray(countries.data) ? countries.data : [];
    const countriesCount = countriesData.length;
    return { totalPageViews, uniqueVisitors, countriesCount };
  } catch {
    return null;
  }
}
