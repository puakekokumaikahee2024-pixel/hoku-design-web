const BASE = "https://api.vercel.com/v1/query/web-analytics";

export type InsightStats = {
  totalPageViews: number;
  uniqueVisitors: number;
  countriesCount: number;
};

export async function getAnalyticsStats(): Promise<InsightStats | null> {
  const token = process.env.HOKU_VERCEL_TOKEN;
  const projectId = process.env.HOKU_VERCEL_PROJECT_ID;
  if (!token || !projectId) return null;

  // 過去30日
  const until = new Date();
  const since = new Date(until.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sinceStr = since.toISOString();
  const untilStr = until.toISOString();

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    // 合計PV・訪問者数
    const countUrl = `${BASE}/visits/count?projectId=${encodeURIComponent(projectId)}&since=${encodeURIComponent(sinceStr)}&until=${encodeURIComponent(untilStr)}`;
    const countRes = await fetch(countUrl, {
      headers,
      next: { revalidate: 3600 },
    });
    if (!countRes.ok) return null;
    const countJson = (await countRes.json()) as {
      data: { pageviews?: number; visitors?: number };
    };
    const totalPageViews = countJson.data?.pageviews ?? 0;
    const uniqueVisitors = countJson.data?.visitors ?? 0;

    // 国別（最大100件取得してユニーク国数をカウント）
    const aggUrl = `${BASE}/visits/aggregate?projectId=${encodeURIComponent(projectId)}&by=${encodeURIComponent(JSON.stringify(["country"]))}&since=${encodeURIComponent(sinceStr)}&until=${encodeURIComponent(untilStr)}&limit=100`;
    const aggRes = await fetch(aggUrl, {
      headers,
      next: { revalidate: 3600 },
    });
    let countriesCount = 0;
    if (aggRes.ok) {
      const aggJson = (await aggRes.json()) as { data: unknown[] };
      countriesCount = Array.isArray(aggJson.data) ? aggJson.data.length : 0;
    }

    return { totalPageViews, uniqueVisitors, countriesCount };
  } catch {
    return null;
  }
}
