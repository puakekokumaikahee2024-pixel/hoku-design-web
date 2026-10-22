import type { MetadataRoute } from "next";
import { apps } from "@/lib/apps";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/tools/6mwt`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...apps.map((app) => ({
      url: `${SITE_URL}/apps/${app.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
