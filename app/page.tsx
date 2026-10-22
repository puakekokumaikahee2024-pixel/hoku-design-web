import type { ReactNode } from "react";
import Image from "next/image";
import { apps, CATEGORY_LABELS } from "@/lib/apps";
import { AppIcon } from "./components/AppIcon";
import { AppList } from "./components/AppList";
import { CeoMessage } from "./components/CeoMessage";
import { Hibiscus, PalmFrond, Waves } from "./components/Decorations";

const NAV_LINKS = [
  { href: "#apps", label: "アプリ" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const STATS = [
  { value: `${apps.length}`, unit: "本", label: "公開アプリ" },
  { value: "iOS", unit: "・Android", label: "対応プラットフォーム" },
  {
    value: `${Object.keys(CATEGORY_LABELS).length}`,
    unit: "つ",
    label: "カテゴリ",
  },
  { value: "2024", unit: "-", label: "活動開始" },
];

const MEMBERS = [
  { role: "代表", title: "元看護師", view: "看護の視点" },
  { role: "開発", title: "理学療法士", view: "リハビリの視点" },
];

const STRENGTHS = [
  {
    icon: "🤝",
    title: "現場を知る二人の視点",
    body: "看護とリハビリ、それぞれの現場で患者さんと向き合ってきた二人。だからこそ気づける「こんなツールがあれば」を、そのままかたちにしています。",
    accent: "from-turquoise to-ocean",
  },
  {
    icon: "📐",
    title: "根拠にもとづく設計",
    body: "評価方法や統計手法は、臨床・研究のスタンダードに沿って実装。現場で安心して使える正確さを大切にしています。",
    accent: "from-tropic to-turquoise",
  },
  {
    icon: "🌺",
    title: "毎日にやさしいデザイン",
    body: "忙しい現場でも迷わない、シンプルで明るいUI。医療から遊びまで、使う人の毎日に寄り添うアプリを届けます。",
    accent: "from-sunset to-rose-400",
  },
];

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col overflow-x-clip">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <AppsSection />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/85 backdrop-blur-lg dark:border-night-700/60 dark:bg-night-950/85">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#" className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Image
            src="/logo.png"
            alt="HOKU Design ロゴ"
            width={44}
            height={44}
            preload
            className="h-11 w-11 shrink-0"
          />
          <span className="font-display text-base font-bold tracking-tight whitespace-nowrap sm:text-lg">
            <span className="text-ocean dark:text-turquoise">HOKU</span>{" "}
            <span className="font-medium text-slate-600 dark:text-slate-300">
              Design
            </span>
          </span>
        </a>
        <ul className="flex items-center text-[13px] font-medium sm:gap-2 sm:text-sm">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-1.5 py-1.5 whitespace-nowrap text-slate-600 transition-colors hover:bg-turquoise/10 hover:text-ocean sm:px-4 dark:text-slate-300 dark:hover:text-turquoise"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* 光と海のグラデーション */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-br from-cyan-50 via-white to-orange-50/70 dark:from-night-900 dark:via-night-950 dark:to-night-950"
      />
      <div
        aria-hidden
        className="absolute -top-24 right-[-10%] -z-10 size-[30rem] rounded-full bg-sunset/35 blur-3xl dark:bg-sunset/12"
      />
      <div
        aria-hidden
        className="absolute top-32 left-[-15%] -z-10 size-[28rem] rounded-full bg-turquoise/30 blur-3xl dark:bg-turquoise/15"
      />
      {/* うっすらヤシの葉 */}
      <PalmFrond className="absolute -top-10 -left-24 -z-10 w-[26rem] rotate-[18deg] text-tropic opacity-[0.12] sm:w-[34rem] dark:text-turquoise dark:opacity-[0.07]" />
      <PalmFrond className="absolute top-6 -right-32 -z-10 w-[24rem] -scale-x-100 -rotate-[8deg] text-teal-600 opacity-[0.09] sm:w-[30rem] dark:text-turquoise dark:opacity-[0.06]" />
      <Stars />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pt-16 pb-32 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pt-24 md:pb-40">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 font-display text-xs font-medium tracking-widest text-ocean ring-1 ring-ocean/15 dark:bg-night-800/70 dark:text-turquoise dark:ring-turquoise/20">
            <span aria-hidden className="text-sunset">
              ★
            </span>
            HOKU — ハワイ語で「星」
          </p>
          <h1 className="mt-6 text-4xl leading-tight font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            臨床の現場から、
            <br />
            <span className="bg-linear-to-r from-ocean via-turquoise to-sunset bg-clip-text text-transparent">
              星のように
            </span>
            <br className="sm:hidden" />
            寄り添うアプリを。
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            HOKU Design は、看護師と理学療法士の二人でつくる小さなアプリスタジオ。
            医療の現場で役立つツールから、毎日を楽しくするゲームまで、
            ひとつひとつ丁寧に届けています。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#apps"
              className="rounded-full bg-ocean px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-ocean/30 transition hover:bg-[#166aa5] hover:shadow-xl"
            >
              アプリを見る
            </a>
            <a
              href="#about"
              className="rounded-full bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:ring-turquoise dark:bg-night-800/80 dark:text-slate-200 dark:ring-night-700"
            >
              HOKU Design について
            </a>
          </div>
        </div>

        <ul
          aria-label="公開中のアプリ"
          className="mx-auto grid w-full max-w-sm grid-cols-4 gap-3 sm:gap-4 md:max-w-md"
        >
          {apps.map((app, i) => (
            <li
              key={app.id}
              className={i % 2 === 1 ? "translate-y-4" : undefined}
            >
              {app.storeUrl ? (
                <a
                  href={app.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${app.name}（App Store）`}
                  className="block transition hover:-translate-y-1"
                >
                  <AppIcon
                    app={app}
                    size={112}
                    sizes="(min-width: 768px) 112px, 22vw"
                    preload
                    className="h-auto w-full"
                  />
                </a>
              ) : (
                <div title={app.name}>
                  <AppIcon
                    app={app}
                    size={112}
                    sizes="(min-width: 768px) 112px, 22vw"
                    preload
                    className="h-auto w-full"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <Waves className="absolute inset-x-0 bottom-0 -z-10 h-24 sm:h-36" />
    </section>
  );
}

function Stars() {
  const stars = [
    "top-[12%] left-[8%]",
    "top-[22%] left-[46%]",
    "top-[8%] left-[70%]",
    "top-[34%] left-[88%]",
    "top-[48%] left-[30%]",
    "top-[18%] left-[24%]",
  ];
  return (
    <div aria-hidden className="absolute inset-0 -z-10 hidden dark:block">
      {stars.map((pos, i) => (
        <span
          key={pos}
          className={`absolute size-1 rounded-full bg-white animate-pulse ${pos}`}
          style={{ animationDelay: `${i * 0.4}s`, opacity: 0.7 }}
        />
      ))}
    </div>
  );
}

function StatsBar() {
  return (
    <section aria-label="数字で見る HOKU Design" className="relative z-10 px-4 sm:px-6">
      <dl className="mx-auto -mt-8 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-3xl bg-slate-200/70 shadow-xl shadow-ocean/5 ring-1 ring-slate-200/70 md:grid-cols-4 dark:bg-night-700 dark:ring-night-700">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="flex flex-col items-center bg-white px-4 py-6 text-center dark:bg-night-900"
          >
            <dt className="order-2 mt-1 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
              {stat.label}
            </dt>
            <dd className="order-1 font-display text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
              {stat.value}
              <span
                className={`ml-0.5 text-base font-semibold sm:text-lg ${i % 2 === 0 ? "text-turquoise" : "text-sunset"}`}
              >
                {stat.unit}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
}) {
  return (
    <div className="relative z-10 mx-auto max-w-2xl text-center">
      <p className="font-display text-sm font-semibold tracking-[0.25em] text-cyan-700 uppercase dark:text-turquoise">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance text-slate-900 sm:text-4xl dark:text-white">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
          {lead}
        </p>
      )}
    </div>
  );
}

function AppsSection() {
  return (
    <section id="apps" className="scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Apps"
          title="アプリ一覧"
          lead="医療・ライフスタイル・ゲーム。現場の課題と日々の楽しさから生まれたアプリたちです。"
        />
        <div className="mt-12">
          <AppList />
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      className="relative isolate scroll-mt-20 overflow-hidden px-4 pt-28 pb-24 sm:px-6 sm:pt-40 sm:pb-32"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-br from-cyan-50 via-teal-50/70 to-orange-50 dark:from-night-900 dark:via-night-900 dark:to-night-800"
      />
      <div
        aria-hidden
        className="absolute -right-32 -bottom-32 -z-10 size-96 rounded-full bg-sunset/25 blur-3xl dark:bg-sunset/10"
      />
      <Waves flip className="absolute inset-x-0 top-0 -z-10 h-16 sm:h-24" />
      <Waves className="absolute inset-x-0 bottom-0 -z-10 h-16 sm:h-24" />
      <Hibiscus className="absolute top-6 -right-4 -z-10 w-16 rotate-12 text-turquoise opacity-15 sm:top-28 sm:right-[8%] sm:w-28 dark:opacity-10" />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title={
            <span className="break-keep">
              看護師と
              <wbr />
              理学療法士が、
              <wbr />
              <br className="hidden sm:inline" />
              二人でつくるアプリ
            </span>
          }
          lead="HOKU Design は、元看護師の妻が代表を務め、理学療法士の夫が開発を担当する二人のアプリスタジオです。看護とリハビリ、医療現場の二つの視点が合わさることで、現場で本当に使えるツールが生まれると考えています。"
        />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          {MEMBERS.map((member, i) => (
            <div key={member.role} className="contents">
              {i > 0 && (
                <span
                  aria-hidden
                  className="font-display text-2xl font-light text-sunset"
                >
                  ×
                </span>
              )}
              <div className="rounded-2xl bg-white/80 px-5 py-3 text-center ring-1 ring-white backdrop-blur dark:bg-night-950/60 dark:ring-night-700">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {member.role}
                </p>
                <p className="mt-0.5 font-bold text-slate-900 dark:text-white">
                  {member.title}
                </p>
                <p className="mt-0.5 text-xs font-medium text-turquoise">
                  {member.view}
                </p>
              </div>
            </div>
          ))}
        </div>
        <CeoMessage />
        <ul className="mt-16 grid gap-6 sm:mt-20 md:grid-cols-3">
          {STRENGTHS.map((item) => (
            <li
              key={item.title}
              className="rounded-3xl bg-white/80 p-7 ring-1 ring-white backdrop-blur dark:bg-night-950/60 dark:ring-night-700"
            >
              <div
                className={`flex size-12 items-center justify-center rounded-2xl bg-linear-135 text-2xl shadow-md ${item.accent}`}
              >
                <span aria-hidden className="brightness-0 invert">
                  {item.icon}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 px-4 pt-10 pb-20 sm:px-6 sm:pt-14 sm:pb-24">
      <div className="relative isolate mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-linear-135 from-ocean via-[#1a9fc9] to-turquoise px-6 py-14 text-center text-white shadow-2xl shadow-ocean/20 sm:px-12 dark:from-night-800 dark:via-ocean/60 dark:to-night-800">
        <div
          aria-hidden
          className="absolute -top-24 -right-16 -z-10 size-72 rounded-full bg-sunset/50 blur-3xl dark:bg-sunset/25"
        />
        <Hibiscus
          accent="rgb(255 255 255 / 0.9)"
          className="absolute -bottom-10 -left-8 -z-10 w-40 -rotate-12 text-white opacity-20 sm:w-52 dark:opacity-10"
        />
        <p className="font-display text-sm font-semibold tracking-[0.25em] text-white/80 uppercase">
          Contact
        </p>
        <h2 className="mt-3 text-2xl font-bold break-keep sm:text-3xl">
          お気軽に
          <wbr />
          お問い合わせください
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
          アプリへのご意見・ご要望、不具合のご報告、
          医療現場向けアプリ開発のご相談など、なんでもお寄せください。
        </p>
        <a
          href="#"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-ocean shadow-lg transition hover:bg-sky-50"
        >
          ✉️ メールで問い合わせる
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative px-4 py-10 sm:px-6">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-turquoise via-ocean to-sunset opacity-70"
      />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt=""
            width={32}
            height={32}
            className="size-8"
          />
          <span className="font-display font-semibold">HOKU Design</span>
        </div>
        <ul className="flex gap-5 text-sm text-slate-500 dark:text-slate-400">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-ocean dark:hover:text-turquoise"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="font-display text-xs text-slate-400">
          © 2024 HOKU Design
        </p>
      </div>
    </footer>
  );
}
