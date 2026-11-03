import type { Metadata } from "next";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { apps, CATEGORY_LABELS } from "@/lib/apps";
import { getAnalyticsStats, type InsightStats } from "@/lib/vercel-analytics";
import { AppList } from "../components/AppList";
import { CeoMessage } from "../components/CeoMessage";
import { Constellation } from "../components/Constellation";
import { CountryStrip } from "../components/CountryStrip";
import { HeroCanvas } from "../components/HeroCanvas";
import { ParallaxHero } from "../components/ParallaxHero";
import { Hibiscus, PalmFrond, Waves } from "../components/Decorations";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { Word } from "../components/Words";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    alternates: { canonical: "/" },
    title: t("siteTitle"),
    description: t("siteDescription"),
  };
}

const STATS: { value: string; count?: number; unitKey: string; labelKey: string }[] = [
  { value: `${apps.length}`, count: apps.length, unitKey: "本", labelKey: "apps" },
  { value: "iOS", unitKey: "・Android", labelKey: "platforms" },
  {
    value: `${Object.keys(CATEGORY_LABELS).length}`,
    count: Object.keys(CATEGORY_LABELS).length,
    unitKey: "つ",
    labelKey: "categories",
  },
  { value: "2024", unitKey: "-", labelKey: "since" },
];

const STRENGTH_KEYS = ["1", "2", "3"] as const;

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const analytics = await getAnalyticsStats();
  return (
    <div className="relative flex flex-1 flex-col overflow-x-clip">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <StatsBar analytics={analytics} />
        <HokuIslandsSpotlight />
        <AppsSection />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  const t = useTranslations("hero");
  return (
    <ParallaxHero className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="parallax-layer pointer-events-none absolute inset-0 -z-10 [--depth:0.2]"
      >
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-cyan-50 via-white to-orange-50/70 dark:from-night-900 dark:via-night-950 dark:to-night-950" />
        <div className="absolute -top-24 right-[-10%] -z-10 size-[30rem] rounded-full bg-sunset/35 blur-3xl dark:bg-sunset/12" />
        <div className="absolute top-32 left-[-15%] -z-10 size-[28rem] rounded-full bg-turquoise/30 blur-3xl dark:bg-turquoise/15" />
        <HeroCanvas className="absolute inset-0 size-full" />
      </div>
      <div
        aria-hidden
        className="parallax-layer pointer-events-none absolute inset-0 -z-10 [--depth:0.35]"
      >
        <PalmFrond className="absolute -top-10 -left-24 -z-10 w-[26rem] rotate-[18deg] text-tropic opacity-[0.12] sm:w-[34rem] dark:text-turquoise dark:opacity-[0.07]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pt-16 pb-32 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pt-24 md:pb-40">
        <div className="parallax-layer [--depth:0.05]">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 font-display text-xs font-medium tracking-widest text-ocean ring-1 ring-ocean/15 dark:bg-night-800/70 dark:text-turquoise dark:ring-turquoise/20">
            <span aria-hidden className="text-sunset">★</span>
            {t("badge")}
          </p>
          <h1 className="hero-words mt-6 text-4xl leading-tight font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            <Word i={0}>{t("line1")}</Word>
            <br />
            <Word i={1} className="bg-linear-to-r from-ocean via-turquoise to-sunset bg-clip-text text-transparent">
              {t("line2")}
            </Word>
            <br className="sm:hidden" />
            <Word i={2}>{t("line3")}</Word>
            <Word i={3}>{t("line4")}</Word>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            {t("lead")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#apps"
              className="rounded-full bg-ocean px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-ocean/30 transition hover:bg-[#166aa5] hover:shadow-xl"
            >
              {t("cta")}
            </a>
            <a
              href="#about"
              className="rounded-full bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:ring-turquoise dark:bg-night-800/80 dark:text-slate-200 dark:ring-night-700"
            >
              {t("ctaAbout")}
            </a>
          </div>
        </div>

        <div className="parallax-layer mx-auto w-full max-w-sm [--depth:-0.08] md:max-w-md">
          <Constellation />
        </div>
      </div>

      <Waves className="absolute inset-x-0 bottom-0 -z-10 h-24 sm:h-36" />
    </ParallaxHero>
  );
}

function StatsBar({ analytics }: { analytics: InsightStats | null }) {
  const t = useTranslations("stats");
  const colsClass = analytics
    ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7"
    : "grid-cols-2 md:grid-cols-4";
  const analyticsStats = analytics
    ? [
        { value: analytics.uniqueVisitors.toLocaleString(), labelKey: "visitors", unitKey: "人" },
        { value: analytics.totalPageViews.toLocaleString(), labelKey: "pageviews", unitKey: "PV" },
        { value: String(analytics.countriesCount), labelKey: "countries", unitKey: "ヵ国" },
      ]
    : [];
  const allStats = [...STATS, ...analyticsStats];
  return (
    <section aria-label="HOKU Design" className="relative z-10 px-4 sm:px-6">
      <dl
        data-reveal="fade"
        className={`mx-auto -mt-8 grid max-w-5xl gap-px overflow-hidden rounded-3xl bg-slate-200/70 shadow-xl shadow-ocean/5 ring-1 ring-slate-200/70 dark:bg-night-700 dark:ring-night-700 ${colsClass}`}
      >
        {allStats.map((stat, i) => (
          <div
            key={stat.labelKey}
            className="flex flex-col items-center bg-white px-4 py-6 text-center dark:bg-night-900"
          >
            <dt className="order-2 mt-1 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
              {t(stat.labelKey as "apps" | "platforms" | "categories" | "since" | "visitors" | "pageviews" | "countries")}
            </dt>
            <dd className="order-1 font-display text-3xl font-bold text-slate-900 tabular-nums sm:text-4xl dark:text-white">
              {"count" in stat && stat.count !== undefined ? (
                <span data-count-to={stat.count} suppressHydrationWarning>
                  {stat.value}
                </span>
              ) : (
                stat.value
              )}
              <span
                className={`ml-0.5 text-base font-semibold sm:text-lg ${i % 2 === 0 ? "text-turquoise" : "text-sunset"}`}
              >
                {stat.unitKey}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      {analytics && <CountryStrip countries={analytics.countries} />}
    </section>
  );
}

function HokuIslandsSpotlight() {
  const t = useTranslations("hokuIslands");
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div
          className="relative isolate overflow-hidden rounded-[2rem] bg-linear-135 from-[#0abfbc]/10 via-cyan-50 to-orange-50/60 ring-1 ring-[#0abfbc]/20 dark:from-[#0abfbc]/10 dark:via-night-900 dark:to-night-800 dark:ring-[#0abfbc]/15"
        >
          {/* 背景デコレーション */}
          <div
            aria-hidden
            className="absolute -top-20 -right-20 -z-10 size-72 rounded-full bg-[#0abfbc]/20 blur-3xl dark:bg-[#0abfbc]/10"
          />
          <div
            aria-hidden
            className="absolute -bottom-16 -left-16 -z-10 size-56 rounded-full bg-sunset/20 blur-3xl dark:bg-sunset/10"
          />

          <div className="grid items-center gap-0 md:grid-cols-[1fr_1.1fr]">
            {/* 画像 */}
            <div className="relative h-56 overflow-hidden rounded-t-[2rem] md:h-full md:min-h-72 md:rounded-l-[2rem] md:rounded-tr-none">
              <Image
                src="/hoku-islands-hero.png"
                alt="Hoku Islands — ハワイ旅行者向けスポット共有マップ"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#0abfbc]/10 md:bg-linear-to-l" />
            </div>

            {/* テキスト */}
            <div className="px-8 py-10 sm:px-10 sm:py-12">
              <p className="font-display text-xs font-semibold tracking-[0.25em] text-[#0abfbc] uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                {t("title")}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                {t("lead")}
              </p>

              {/* Tech badges */}
              <div className="mt-6 flex flex-wrap gap-2">
                {["Next.js", "Supabase", "Mapbox"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200 dark:bg-night-800/80 dark:text-slate-300 dark:ring-night-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a
                href="https://hoku-islands.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0abfbc] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0abfbc]/30 transition hover:bg-[#08a8a5] hover:shadow-xl"
              >
                {t("cta")}
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  lead,
  wordReveal = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  wordReveal?: boolean;
}) {
  return (
    <div className="relative z-10 mx-auto max-w-2xl text-center">
      <p
        data-reveal="heading"
        className="font-display text-sm font-semibold tracking-[0.25em] text-cyan-700 uppercase dark:text-turquoise"
      >
        {eyebrow}
      </p>
      <h2
        data-reveal={wordReveal ? "words" : "heading"}
        className="mt-3 text-3xl font-bold tracking-tight text-balance text-slate-900 sm:text-4xl dark:text-white"
      >
        {title}
      </h2>
      {lead && (
        <p
          data-reveal="heading"
          className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300"
        >
          {lead}
        </p>
      )}
    </div>
  );
}

function AppsSection() {
  const t = useTranslations("appsSection");
  return (
    <section id="apps" className="scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          lead={t("lead")}
        />
        <div className="mt-12">
          <AppList />
        </div>
      </div>
    </section>
  );
}

function About() {
  const t = useTranslations("about");
  const STRENGTHS = STRENGTH_KEYS.map((k) => ({
    icon: k === "1" ? "🤝" : k === "2" ? "📐" : "🌺",
    accent: k === "1" ? "from-turquoise to-ocean" : k === "2" ? "from-tropic to-turquoise" : "from-sunset to-rose-400",
    title: t(`strength${k}Title` as "strength1Title" | "strength2Title" | "strength3Title"),
    body: t(`strength${k}Body` as "strength1Body" | "strength2Body" | "strength3Body"),
  }));

  return (
    <section
      id="about"
      className="relative isolate scroll-mt-20 overflow-hidden px-4 pt-28 pb-24 sm:px-6 sm:pt-40 sm:pb-32"
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-br from-cyan-50 via-teal-50/70 to-orange-50 dark:from-night-900 dark:via-night-900 dark:to-night-800" />
      <div aria-hidden className="absolute -right-32 -bottom-32 -z-10 size-96 rounded-full bg-sunset/25 blur-3xl dark:bg-sunset/10" />
      <Waves flip className="absolute inset-x-0 top-0 -z-10 h-16 sm:h-24" />
      <Waves className="absolute inset-x-0 bottom-0 -z-10 h-16 sm:h-24" />
      <Hibiscus className="absolute top-6 -right-4 -z-10 w-16 rotate-12 text-turquoise opacity-15 sm:top-28 sm:right-[8%] sm:w-28 dark:opacity-10" />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t("eyebrow")}
          wordReveal
          title={
            <span className="break-keep">
              <Word i={0}>{t("titlePart1")}</Word>
              <wbr />
              <Word i={1}>{t("titlePart2")}</Word>
              <wbr />
              <br className="hidden sm:inline" />
              <Word i={2}>{t("titlePart3")}</Word>
            </span>
          }
          lead={t("lead")}
        />
        <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          {[
            { role: t("ceoRole"), title: t("ceoTitle"), view: t("ceoView") },
            { role: t("devRole"), title: t("devTitle"), view: t("devView") },
          ].map((member, i) => (
            <div key={member.role} className="contents">
              {i > 0 && (
                <span aria-hidden className="font-display text-2xl font-light text-sunset">×</span>
              )}
              <div className="rounded-2xl bg-white/80 px-5 py-3 text-center ring-1 ring-white backdrop-blur dark:bg-night-950/60 dark:ring-night-700">
                <p className="text-xs text-slate-500 dark:text-slate-400">{member.role}</p>
                <p className="mt-0.5 font-bold text-slate-900 dark:text-white">{member.title}</p>
                <p className="mt-0.5 text-xs font-medium text-turquoise">{member.view}</p>
              </div>
            </div>
          ))}
        </div>
        <CeoMessage />
        <ul className="mt-16 grid gap-6 sm:mt-20 md:grid-cols-3">
          {STRENGTHS.map((item) => (
            <li key={item.title} data-reveal className="rounded-3xl bg-white/80 p-7 ring-1 ring-white backdrop-blur dark:bg-night-950/60 dark:ring-night-700">
              <div className={`flex size-12 items-center justify-center rounded-2xl bg-linear-135 text-2xl shadow-md ${item.accent}`}>
                <span aria-hidden className="brightness-0 invert">{item.icon}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  const t = useTranslations("contact");
  return (
    <section id="contact" className="scroll-mt-20 px-4 pt-10 pb-20 sm:px-6 sm:pt-14 sm:pb-24">
      <div data-reveal className="relative isolate mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-linear-135 from-ocean via-[#1a9fc9] to-turquoise px-6 py-14 text-center text-white shadow-2xl shadow-ocean/20 sm:px-12 dark:from-night-800 dark:via-ocean/60 dark:to-night-800">
        <div aria-hidden className="absolute -top-24 -right-16 -z-10 size-72 rounded-full bg-sunset/50 blur-3xl dark:bg-sunset/25" />
        <Hibiscus accent="rgb(255 255 255 / 0.9)" className="absolute -bottom-10 -left-8 -z-10 w-40 -rotate-12 text-white opacity-20 sm:w-52 dark:opacity-10" />
        <p className="font-display text-sm font-semibold tracking-[0.25em] text-white/80 uppercase">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 text-2xl font-bold break-keep sm:text-3xl">{t("title")}</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">{t("lead")}</p>
        <a href="#" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-ocean shadow-lg transition hover:bg-sky-50">
          {t("button")}
        </a>
      </div>
    </section>
  );
}
