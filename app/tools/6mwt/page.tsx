import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { PalmFrond, Waves } from "../../components/Decorations";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { Calculator } from "./Calculator";

const TITLE = "6分間歩行試験（6MWT）予測値計算ツール | HOKU Design";
const DESCRIPTION =
  "6分間歩行試験（6MWT）の予測値（基準値）を Enright式 で計算できる無料ツール。年齢・性別・身長・体重から6分間歩行距離の予測値を求め、実測距離との達成率を表示します。6分間歩行試験の目的や予測値・達成率の見方も解説。リハビリ・看護に携わる医療従事者向け。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/6mwt" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/tools/6mwt",
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
  },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "6分間歩行試験（6MWT）予測値計算ツール",
  description: DESCRIPTION,
  url: `${SITE_URL}/tools/6mwt`,
  applicationCategory: "MedicalApplication",
  operatingSystem: "Web",
  inLanguage: "ja",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: 0, priceCurrency: "JPY" },
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};

export default function SixMwtToolPage() {
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
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-linear-to-br from-cyan-50 via-white to-orange-50/70 dark:from-night-900 dark:via-night-950 dark:to-night-950"
          />
          <PalmFrond className="absolute -top-10 -left-28 -z-10 w-[22rem] rotate-12 text-tropic opacity-[0.1] sm:w-[28rem] dark:text-turquoise dark:opacity-[0.05]" />
          <div className="mx-auto max-w-4xl px-4 pt-8 pb-24 sm:px-6 sm:pb-32">
            <nav aria-label="パンくずリスト" className="text-xs text-slate-500 dark:text-slate-400">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="hover:text-ocean dark:hover:text-turquoise">
                    ホーム
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-slate-700 dark:text-slate-200">
                  6MWT 予測値計算ツール
                </li>
              </ol>
            </nav>
            <p className="mt-10 font-display text-xs font-semibold tracking-[0.25em] text-cyan-700 uppercase dark:text-turquoise">
              Free tool
            </p>
            <h1 className="mt-2 text-3xl leading-snug font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              6分間歩行試験（6MWT）
              <wbr />
              予測値計算ツール
            </h1>
            <p className="mt-4 max-w-2xl leading-relaxed text-slate-600 dark:text-slate-300">
              年齢・性別・身長・体重から、6分間歩行距離の予測値（基準値）を Enright式 で計算します。
              実測の歩行距離を入れると、予測値に対する達成率がわかります。
            </p>
          </div>
          <Waves className="absolute inset-x-0 bottom-0 -z-10 h-16 sm:h-24" />
        </section>

        <div className="mx-auto max-w-4xl px-4 pt-6 pb-24 sm:px-6">
          <Calculator />

          <article className="mt-20 rounded-3xl bg-white p-6 ring-1 ring-slate-200/80 sm:p-10 dark:bg-night-900 dark:ring-night-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              6分間歩行試験とは
            </h2>
            <div className="mt-4 space-y-8 leading-loose text-slate-700 dark:text-slate-300">
              <ExplainSection title="概要と目的">
                6分間歩行試験（6MWT：6-Minute Walk Test）は、平坦な直線コースを6分間でできるだけ長い距離を歩き、
                その距離（6分間歩行距離：6MWD）を測定する検査です。特別な機器を使わず、日常生活に近い「歩く」動作で、
                心肺機能を含む運動耐容能（どのくらい体を動かせるか）を評価することを目的としています。
              </ExplainSection>
              <ExplainSection title="予測値（Enright式）の意味">
                歩ける距離は、年齢・性別・身長・体重によって変わります。そのため測定した距離は、
                同じ条件の健康な人が歩けると見込まれる距離、つまり予測値（基準値）と比べて評価します。
                Enright式は、健康な成人を対象とした研究（Enright &amp; Sherrill, 1998）から導かれた代表的な予測式で、
                このツールでもこの式を使っています。
              </ExplainSection>
              <ExplainSection title="達成率の見方">
                達成率は、実測の歩行距離を予測値で割り、パーセントで表したものです。100%に近いほど同年代・同体格の基準に近く、
                低いほど運動耐容能が低下している可能性を示します。ただし、体調や測定環境、コースの長さによっても結果は変わるため、
                一度の数値だけで判断せず、経過の変化とあわせて見ることが大切です。
              </ExplainSection>
              <ExplainSection title="どんな場面で使われるか">
                心不全や慢性閉塞性肺疾患（COPD）などの心肺疾患の評価、心臓リハビリテーションや呼吸リハビリテーションの効果判定、
                手術前後の体力評価など、医療やリハビリテーションの現場で広く用いられています。実施の際は、
                検査前後の血圧・脈拍・SpO₂ や自覚症状を確認し、安全に配慮して行います。
              </ExplainSection>
            </div>
            <h3 className="mt-10 font-bold text-slate-900 dark:text-white">このツールで使っている式</h3>
            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <li>
                予測歩行距離（Enright式）男性：7.57 × 身長(cm) − 5.02 × 年齢 − 1.76 × 体重(kg) − 309
              </li>
              <li>
                予測歩行距離（Enright式）女性：2.11 × 身長(cm) − 2.29 × 体重(kg) − 5.78 × 年齢 + 667
              </li>
              <li>達成率（%）＝ 実測の歩行距離 ÷ 予測歩行距離 × 100</li>
            </ul>
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function ExplainSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2">{children}</p>
    </section>
  );
}
