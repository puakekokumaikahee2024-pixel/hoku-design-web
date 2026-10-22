import type { AppCategory } from "@/lib/apps";

export const CATEGORY_BADGE: Record<AppCategory, string> = {
  medical:
    "bg-ocean/10 text-ocean dark:bg-ocean/20 dark:text-sky-300",
  lifestyle:
    "bg-sunset/15 text-orange-700 dark:bg-sunset/20 dark:text-sunset",
  game: "bg-tropic/15 text-green-700 dark:bg-tropic/20 dark:text-green-300",
};
