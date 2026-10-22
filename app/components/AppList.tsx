"use client";

import Link from "next/link";
import { useState } from "react";
import {
  apps,
  CATEGORY_LABELS,
  type AppCategory,
  type AppInfo,
} from "@/lib/apps";
import { AppIcon } from "./AppIcon";
import { CATEGORY_BADGE } from "./category-badge";

type Filter = "all" | AppCategory;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "すべて" },
  ...(Object.keys(CATEGORY_LABELS) as AppCategory[]).map((value) => ({
    value,
    label: CATEGORY_LABELS[value],
  })),
];

export function AppList() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible =
    filter === "all" ? apps : apps.filter((app) => app.category === filter);

  return (
    <div>
      <div
        role="group"
        aria-label="カテゴリで絞り込み"
        data-reveal="heading"
        className="flex flex-wrap justify-center gap-2"
      >
        {FILTERS.map(({ value, label }) => {
          const count =
            value === "all"
              ? apps.length
              : apps.filter((app) => app.category === value).length;
          const active = filter === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise ${
                active
                  ? "bg-linear-to-r from-ocean to-turquoise text-white shadow-md shadow-ocean/20"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-ocean hover:ring-turquoise dark:bg-night-800 dark:text-slate-300 dark:ring-night-700 dark:hover:text-turquoise"
              }`}
            >
              {label}
              <span
                className={`ml-1.5 font-display text-xs ${active ? "text-white/80" : "text-slate-400"}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((app) => (
          <li key={app.id} data-reveal>
            <AppCard app={app} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function AppCard({ app }: { app: AppInfo }) {
  const inReview = app.status === "in-review";

  return (
    <article
      id={app.id}
      className="group flex h-full scroll-mt-24 flex-col rounded-3xl bg-white/80 p-6 ring-1 ring-slate-200/80 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ocean/10 hover:ring-turquoise/60 dark:bg-night-900/80 dark:ring-night-700 dark:hover:shadow-turquoise/5"
    >
      <div className="flex items-start gap-4">
        <AppIcon app={app} size={64} />
        <div className="min-w-0 flex-1">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_BADGE[app.category]}`}
          >
            {CATEGORY_LABELS[app.category]}
          </span>
          <h3 className="mt-1.5 font-display text-lg leading-snug font-semibold break-words text-slate-900 dark:text-white">
            {app.name}
          </h3>
          {app.tagline && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {app.tagline}
            </p>
          )}
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {app.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
        {app.platforms.map((p) => (
          <span
            key={p}
            className="rounded-md bg-slate-100 px-2 py-1 font-display font-medium text-slate-600 dark:bg-night-800 dark:text-slate-300"
          >
            {p}
          </span>
        ))}
        {app.version && (
          <span className="font-display text-slate-400">v{app.version}</span>
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-4 border-t border-slate-100 pt-4 dark:border-night-700">
        <Link
          href={`/apps/${app.slug}`}
          className="text-sm font-medium text-slate-500 underline-offset-4 transition-colors hover:text-ocean hover:underline dark:text-slate-400 dark:hover:text-turquoise"
        >
          詳しく見る
        </Link>
        {inReview || !app.storeUrl ? (
          <span className="inline-flex items-center gap-2 text-sm font-medium text-sunset">
            <span className="size-2 animate-pulse rounded-full bg-sunset" />
            審査中 — 近日公開
          </span>
        ) : (
          <div className="flex flex-col items-end gap-1.5">
            <StoreLink href={app.storeUrl} label="App Store で見る" />
            {app.playStoreUrl && (
              <StoreLink href={app.playStoreUrl} label="Google Play で見る" />
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function StoreLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-ocean transition-colors hover:text-turquoise dark:text-turquoise dark:hover:text-sky-300"
    >
      {label}
      <span
        aria-hidden
        className="transition-transform group-hover:translate-x-0.5"
      >
        →
      </span>
    </a>
  );
}
