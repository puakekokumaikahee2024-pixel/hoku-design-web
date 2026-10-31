import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["ja", "en", "es", "de", "zh-TW", "ko"],
  defaultLocale: "ja",
  // Default locale (Japanese) has no prefix: /apps/clinstats
  // Other locales have prefix: /en/apps/clinstats
  localePrefix: "as-needed",
});

export const { useRouter, usePathname } = createNavigation(routing);
