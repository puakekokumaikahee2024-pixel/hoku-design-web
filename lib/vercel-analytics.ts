"use cache";

import { cacheLife } from "next/cache";

const BASE = "https://api.vercel.com/v1/query/web-analytics";

export type InsightStats = {
  totalPageViews: number;
  uniqueVisitors: number;
  countriesCount: number;
};

export async function getAnalyticsStats(): Promise<InsightStats | null> {
  cacheLife("hours");

  const token = process.env.HOKU_VERCEL_TOKEN;
  const projectId = process.env.HOKU_VERCEL_PROJECT_ID;
  if (!token || !projectId) {
    console.log("[analytics] token or projectId missing");
    return null;
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const until = new Date();
  const since = new Date(until.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sinceStr = since.toISOString();
  const untilStr = until.toISOString();

  try {
    const countUrl =
      `${BASE}/visits/count` +
      `?projectId=${encodeURIComponent(projectId)}` +
      `&since=${encodeURIComponent(sinceStr)}` +
      `&until=${encodeURIComponent(untilStr)}`;

    const countRes = await fetch(countUrl, { headers });
    console.log("[analytics] countRes.status:", countRes.status);
    if (!countRes.ok) {
      console.log("[analytics] countRes error:", await countRes.text());
      return null;
    }

    const countJson = (await countRes.json()) as {
      data: { pageviews?: number; visitors?: number };
    };
    const totalPageViews = countJson.data?.pageviews ?? 0;
    const uniqueVisitors = countJson.data?.visitors ?? 0;

    const aggUrl =
      `${BASE}/visits/aggregate` +
      `?projectId=${encodeURIComponent(projectId)}` +
      `&by=${encodeURIComponent(JSON.stringify(["country"]))}` +
      `&since=${encodeURIComponent(sinceStr)}` +
      `&until=${encodeURIComponent(untilStr)}` +
      `&limit=100`;

    console.log("[analytics] aggUrl:", aggUrl.replace(projectId, "***"));
    const aggRes = await fetch(aggUrl, { headers });
    console.log("[analytics] aggRes.status:", aggRes.status);

    let countriesCount = 0;
    if (aggRes.ok) {
      const aggJson = (await aggRes.json()) as { data: unknown };
      console.log("[analytics] aggJson:", JSON.stringify(aggJson).slice(0, 500));
      countriesCount = Array.isArray(aggJson.data) ? aggJson.data.length : 0;
    } else {
      console.log("[analytics] aggRes error:", await aggRes.text());
    }

    return { totalPageViews, uniqueVisitors, countriesCount };
  } catch (e) {
    console.log("[analytics] exception:", e);
    return null;
  }
}
