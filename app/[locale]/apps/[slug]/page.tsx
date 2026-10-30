import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { APP_DETAILS, type PricePlan } from "@/lib/app-details";
import { getLocalizedAppDetail } from "@/lib/app-details-i18n";
import {
  apps,
  CATEGORY_LABELS,
  getAppBySlug,
  type AppInfo,
} from "@/lib/apps";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { AppIcon } from "../../../components/AppIcon";
import { CATEGORY_BADGE } from "../../../components/category-badge";
import { PalmFrond, Sparkle, Waves } from "../../../components/Decorations";
import { SiteFooter } from "../../../components/SiteFooter";
import { SiteHeader } from "../../../components/SiteHeader";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return apps.flatMap((app) =>
    ["ja", "en", "es", "de", "zh-TW", "ko"].map((locale) => ({
      locale,
      slug: app.slug,
    }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const app = getAppBySlug(slug);
  const detail = APP_DETAILS[slug];
  if (!app || !detail) return {};

  const localizedDetail = getLocalizedAppDetail(slug, detail, locale);
  const title = `${app.name} | ${localizedDetail.seoPurpose} | ${SITE_NAME}`;
  const url = `/apps/${app.slug}`;
  return {
    title,
    description: localizedDetail.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: localizedDetail.seoDescription,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: app.iconSrc, alt: `${app.name}` }],
    },
    twitter: { card: "summary", title, description: localizedDetail.seoDescription },
  };
}

export default async function AppPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const app = getAppBySlug(slug);
  const detail = APP_DETAILS[slug];
  if (!app || !detail) notFound();

  const localizedDetail = getLocalizedAppDetail(slug, detail, locale);
  const t = await getTranslations({ locale, namespace: "appDetail" });
  const tCat = await getTranslations({ locale, namespace: "categories" });

  const storeUrls = [app.storeUrl, app.playStoreUrl].filter(
    (url): url is string => Boolean(url),
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: localizedDetail.seoDescription,
    url: `${SITE_URL}/apps/${app.slug}`,
    image: `${SITE_URL}${app.iconSrc}`,
    applicationCategory: detail.schemaCategory,
    operatingSystem: app.platforms.join(", "),
    inLanguage: locale,
    ...(app.version && { softwareVersion: app.version }),
    ...(storeUrls.length > 0 && { downloadUrl: storeUrls, installUrl: storeUrls }),
    ...(detail.plans && { offers: detail.plans.map(toOffer) }),
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  const categoryLabel = tCat(app.category as "medical" | "lifestyle" | "game");

  return (
    <div className="relative flex flex-1 flex-col overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />
      <main className="flex-1">
        <AppHero app={app} catchcopy={localizedDetail.catchcopy} t={t} categoryLabel={categoryLabel} />

        <div className="mx-auto max-w-4xl space-y-20 px-4 pt-14 pb-24 sm:px-6 sm:pt-20">
          <Section eyebrow="Overview" title={t("overview")}>
            <p className="leading-loose text-slate-700 dark:text-slate-300">
              {localizedDetail.overview.join("")}
            </p>
          </Section>

          <Section eyebrow="Features" title={t("features")}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {localizedDetail.features.map((feature, i) => (
                <li
                  key={feature.title}
                  className="rounded-2xl bg-white p-6 ring-1 ring-slate-200/80 dark:bg-night-900 dark:ring-night-700"
                >
                  <p className="font-display text-xs font-semibold tracking-widest text-turquoise">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-bold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                  {feature.body && (
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {feature.body}
                    </p>
                  )}
                  {feature.items && (
                    <ul className="mt-2 space-y-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {feature.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span aria-hidden className="text-turquoise">・</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </Section>

          <Section eyebrow="For you" title={t("forYou")}>
            <ul className="grid gap-3 md:grid-cols-3">
              {localizedDetail.audience.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-2xl bg-linear-to-br from-cyan-50 to-orange-50/60 p-5 text-sm leading-relaxed text-slate-700 ring-1 ring-turquoise/15 dark:from-night-900 dark:to-night-800 dark:text-slate-200 dark:ring-night-700"
                >
                  <Sparkle className="mt-0.5 w-4 shrink-0 text-sunset" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section eyebrow="Requirements" title={t("requirements")}>
            <dl className="divide-y divide-slate-100 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200/80 dark:divide-night-700 dark:bg-night-900 dark:ring-night-700">
              <SpecRow label={t("os")}>{app.platforms.join(" / ")}</SpecRow>
              <SpecRow label={t("version")}>
                {app.version ? `v${app.version}` : "—"}
              </SpecRow>
              <SpecRow label={t("category")}>{categoryLabel}</SpecRow>
              {detail.languages && (
                <SpecRow label={t("languages")}>{detail.languages}</SpecRow>
              )}
              {localizedDetail.pricing && (
                <SpecRow label={t("pricing")}>{localizedDetail.pricing}</SpecRow>
              )}
              <SpecRow label={t("availability")}>
                {app.status === "released"
                  ? t("availabilityReleased")
                  : t("availabilityReview")}
              </SpecRow>
            </dl>
            <ul className="mt-3 space-y-1 text-xs text-slate-400">
              {detail.requirementsNote && <li>{detail.requirementsNote}</li>}
              <li>{t("latestOsNote")}</li>
            </ul>
          </Section>

          <Section eyebrow="More apps" title={t("moreApps")}>
            <ul className="grid gap-4 sm:grid-cols-3">
              {relatedApps(app).map((other) => (
                <li key={other.id}>
                  <Link
                    href={`/apps/${other.slug}`}
                    className="flex h-full items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200/80 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ocean/10 hover:ring-turquoise/60 sm:flex-col sm:items-start dark:bg-night-900 dark:ring-night-700"
                  >
                    <AppIcon app={other} size={56} className="size-14" />
                    <span className="min-w-0">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${CATEGORY_BADGE[other.category]}`}>
                        {CATEGORY_LABELS[other.category]}
                      </span>
                      <span className="mt-1 block font-bold break-words text-slate-900 dark:text-white">
                        {other.name}
                      </span>
                      {other.tagline && (
                        <span className="block text-xs text-slate-500 dark:text-slate-400">
                          {other.tagline}
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>

          <p className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:text-ocean hover:ring-turquoise dark:bg-night-800 dark:text-slate-200 dark:ring-night-700 dark:hover:text-turquoise"
            >
              {t("backToTop")}
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function toOffer(plan: PricePlan) {
  return {
    "@type": "Offer",
    name: plan.name,
    price: plan.price,
    priceCurrency: plan.currency,
    ...(plan.billing === "monthly" && {
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: plan.price,
        priceCurrency: plan.currency,
        billingDuration: "P1M",
      },
    }),
  };
}

function relatedApps(app: AppInfo) {
  const others = apps.filter((a) => a.id !== app.id);
  return [
    ...others.filter((a) => a.category === app.category),
    ...others.filter((a) => a.category !== app.category),
  ].slice(0, 3);
}

function AppHero({
  app,
  catchcopy,
  t,
  categoryLabel,
}: {
  app: AppInfo;
  catchcopy: string;
  t: ReturnType<typeof useTranslations<"appDetail">>;
  categoryLabel: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-br from-cyan-50 via-white to-orange-50/70 dark:from-night-900 dark:via-night-950 dark:to-night-950" />
      <div aria-hidden className="absolute -top-24 right-[-10%] -z-10 size-96 rounded-full bg-sunset/25 blur-3xl dark:bg-sunset/10" />
      <PalmFrond className="absolute -top-10 -right-28 -z-10 w-[22rem] -scale-x-100 rotate-6 text-teal-600 opacity-[0.08] sm:w-[28rem] dark:text-turquoise dark:opacity-[0.05]" />

      <div className="mx-auto max-w-4xl px-4 pt-8 pb-28 sm:px-6 sm:pb-36">
        <nav aria-label="breadcrumb" className="text-xs text-slate-500 dark:text-slate-400">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="/" className="hover:text-ocean dark:hover:text-turquoise">{t("breadcrumbHome")}</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/#apps" className="hover:text-ocean dark:hover:text-turquoise">{t("breadcrumbApps")}</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-slate-700 dark:text-slate-200">{app.name}</li>
          </ol>
        </nav>

        <div className="mt-10 flex flex-col items-center gap-8 text-center sm:flex-row sm:items-center sm:text-left">
          <AppIcon app={app} size={160} preload className="h-auto w-32 sm:w-40" />
          <div className="min-w-0">
            <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_BADGE[app.category]}`}>
              {categoryLabel}
            </span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight break-words text-slate-900 sm:text-4xl dark:text-white">
              {app.name}
              {app.tagline && (
                <span className="mt-1 block text-base font-medium text-slate-500 sm:text-lg dark:text-slate-400">
                  {app.tagline}
                </span>
              )}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-700 dark:text-slate-200">
              {catchcopy}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              {app.storeUrl ? (
                <a
                  href={app.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-ocean px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-ocean/30 transition hover:bg-[#166aa5] hover:shadow-xl"
                >
                  {t("viewOnAppStore")}
                  <span aria-hidden>↗</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-sunset/10 px-5 py-3 text-sm font-medium text-orange-700 ring-1 ring-sunset/30 dark:text-sunset">
                  <span className="size-2 animate-pulse rounded-full bg-sunset" />
                  {t("availabilityReview")}
                </span>
              )}
              {app.playStoreUrl && (
                <a
                  href={app.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ocean shadow-lg shadow-ocean/10 ring-1 ring-ocean/20 transition hover:ring-ocean/50 hover:shadow-xl dark:bg-night-800 dark:text-turquoise dark:ring-turquoise/30"
                >
                  {t("viewOnGooglePlay")}
                  <span aria-hidden>↗</span>
                </a>
              )}
              <span className="font-display text-xs text-slate-400">
                {app.platforms.join(" · ")}
                {app.version && ` · v${app.version}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Waves className="absolute inset-x-0 bottom-0 -z-10 h-16 sm:h-24" />
    </section>
  );
}

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section>
      <p className="font-display text-xs font-semibold tracking-[0.25em] text-cyan-700 uppercase dark:text-turquoise">
        {eyebrow}
      </p>
      <h2 className="mt-2 mb-6 text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
      {children}
    </section>
  );
}

function SpecRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-4 px-5 py-4 text-sm sm:grid-cols-[10rem_1fr]">
      <dt className="text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className="font-medium text-slate-800 dark:text-slate-100">{children}</dd>
    </div>
  );
}
