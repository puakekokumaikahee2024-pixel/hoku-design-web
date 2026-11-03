import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const token = process.env.HOKU_VERCEL_TOKEN;
  const projectId = process.env.HOKU_VERCEL_PROJECT_ID;

  if (!token || !projectId) {
    return NextResponse.json({ error: "env vars missing" });
  }

  const until = new Date();
  const since = new Date(until.getTime() - 30 * 24 * 60 * 60 * 1000);

  const aggUrl =
    `https://api.vercel.com/v1/query/web-analytics/visits/aggregate` +
    `?projectId=${encodeURIComponent(projectId)}` +
    `&by=${encodeURIComponent(JSON.stringify(["country"]))}` +
    `&since=${encodeURIComponent(since.toISOString())}` +
    `&until=${encodeURIComponent(until.toISOString())}` +
    `&limit=100`;

  const res = await fetch(aggUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const text = await res.text();
  return NextResponse.json({
    status: res.status,
    body: JSON.parse(text),
  });
}
