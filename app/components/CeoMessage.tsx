// 代表メッセージ。サイトの中でこのブロックだけ、ハワイアンテイストを全面に出す。

import Image from "next/image";
import { useId } from "react";
import ceoPhoto from "@/public/ceo.png";
import { Hibiscus, Monstera, PalmFrond, Plumeria, Sparkle } from "./Decorations";
import { Word } from "./Words";

const PARAGRAPHS = [
  "看護師として医療の現場に立っていた頃、本当に必要なものほど手の届くところにない、と感じる場面に何度も出会いました。だからこそ HOKU Design では、使う人の声に耳を傾け、「現場の人が本当に必要としているもの」をいちばん大切にしています。",
  "HOKU は、ハワイ語で「星」という意味です。かつてハワイの航海者たちは、夜空の星を頼りに果てしない大海原を渡りました。私たちのアプリも、使う人の進む先をそっと照らす、道しるべのような存在でありたいと願っています。",
  "医療のアプリから旅のスケジュール、そしてゲームまで。手がける分野が幅広いのは、仕事の時間にも、ほっとひと息つく時間にも、日常のすべての場面に小さな灯りを届けたいと思っているからです。これからも一つひとつ、心を込めてお届けします。",
];

/** 夜空の星 → 夕焼けへ散らすきらめき（位置・大きさ・遅延） */
const SPARKLES = [
  "top-[6%] left-[46%] w-4 [animation-delay:0s]",
  "top-[12%] left-[8%] w-3 [animation-delay:1.2s]",
  "top-[4%] right-[14%] w-5 [animation-delay:0.6s]",
  "top-[22%] right-[6%] w-2.5 [animation-delay:2s]",
  "top-[40%] left-[4%] w-2.5 [animation-delay:1.6s]",
  "bottom-[30%] right-[3%] w-3.5 [animation-delay:0.9s]",
  "bottom-[8%] left-[38%] w-3 [animation-delay:2.4s]",
];

export function CeoMessage() {
  return (
    <article
      aria-labelledby="ceo-message-heading"
      className="relative isolate mt-16 overflow-hidden rounded-[2.5rem] bg-[linear-gradient(165deg,#03244a_0%,#0b6fa0_30%,#1fb2c6_55%,#ffb35c_80%,#ff6f3c_100%)] px-5 py-12 text-white shadow-2xl shadow-ocean/30 sm:mt-20 sm:px-10 sm:py-16 lg:px-14 dark:bg-[linear-gradient(165deg,#020c18_0%,#063a5c_35%,#0c6f86_58%,#a8541e_85%,#7a2e14_100%)] dark:shadow-black/40"
    >
      <Backdrop />

      <div className="grid items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10 lg:gap-16">
        <figure data-reveal className="mx-auto w-full max-w-[19rem] md:max-w-none">
          <TapaFrame />
          <figcaption className="mt-6 text-center [text-shadow:0_1px_8px_rgb(0_0_0/0.45)]">
            <p className="font-display text-2xl font-semibold tracking-[0.2em] text-amber-100">
              MIHO ADACHI
            </p>
            <p className="mt-1.5 text-sm text-white">
              HOKU Design 代表・元看護師
            </p>
          </figcaption>
        </figure>

        <div
          data-reveal
          className="relative rounded-[2rem] bg-[#031b33]/45 p-6 ring-1 ring-white/15 backdrop-blur-sm sm:p-9 dark:bg-[#020c18]/55">
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-script text-2xl text-amber-200 sm:text-3xl">
              ʻŌlelo Aloha
            </span>
            <span className="font-display text-xs font-semibold tracking-[0.3em] text-white/75 uppercase">
              Message
            </span>
          </p>
          <h3
            id="ceo-message-heading"
            data-reveal="words"
            className="mt-3 font-decol text-3xl font-bold tracking-wide [text-shadow:0_2px_12px_rgb(0_0_0/0.35)] sm:text-4xl"
          >
            <Word i={0}>代表</Word>
            <Word i={1}>メッセージ</Word>
          </h3>
          <WaveRule />

          <div className="mt-6 space-y-5 text-[15px] leading-loose text-white/95 sm:text-base">
            {PARAGRAPHS.map((text) => (
              <p key={text.slice(0, 12)}>{text}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-end gap-1 border-t border-white/20 pt-6 text-right">
            <p className="text-sm text-white/85">HOKU Design 代表</p>
            <p className="flex items-baseline gap-3">
              <span className="font-display text-xl font-semibold tracking-[0.2em]">
                MIHO ADACHI
              </span>
              <Plumeria className="w-6 self-center text-white" />
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

/** 背景の光・葉・花・波・星 */
function Backdrop() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      {/* 夕日の光と、海のきらめき */}
      <div className="absolute -right-24 -bottom-32 size-[28rem] rounded-full bg-[#ffb74d]/60 blur-3xl dark:bg-[#ff8a3d]/30" />
      <div className="absolute top-1/3 -left-20 size-80 rounded-full bg-turquoise/30 blur-3xl dark:bg-turquoise/15" />

      {/* 葉のシルエット */}
      <PalmFrond className="absolute -top-6 -right-24 w-[22rem] rotate-[160deg] text-[#021a33]/45 sm:w-[30rem] dark:text-black/45" />
      <PalmFrond className="absolute -bottom-10 -left-28 w-[20rem] -rotate-12 text-[#3a1a0a]/30 sm:w-[26rem] dark:text-black/40" />
      <Monstera className="absolute -bottom-16 -right-10 w-48 -rotate-[30deg] text-[#2b1206]/35 sm:w-64 dark:text-black/45" />
      <Monstera className="absolute -top-14 -left-14 w-40 rotate-[150deg] text-[#011b30]/50 sm:w-52 dark:text-black/50" />

      {/* 花 */}
      <Hibiscus
        accent="#ffe082"
        className="absolute right-[38%] -bottom-6 w-20 rotate-12 text-[#ff5a5f]/70 sm:w-24"
      />
      <Plumeria className="absolute top-[30%] right-3 w-10 -rotate-12 text-white/80 sm:w-12" />

      {/* 波のライン */}
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-20 w-full sm:h-28"
      >
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M0 ${50 + i * 22}C150 ${20 + i * 22} 300 ${80 + i * 22} 450 ${50 + i * 22}S750 ${20 + i * 22} 900 ${50 + i * 22}S1150 ${80 + i * 22} 1200 ${50 + i * 22}`}
            fill="none"
            stroke="white"
            strokeOpacity={0.35 - i * 0.08}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* 星（HOKU） */}
      {SPARKLES.map((pos) => (
        <Sparkle
          key={pos}
          className={`absolute text-amber-100 drop-shadow-[0_0_6px_rgb(255_255_255/0.8)] motion-safe:animate-pulse ${pos}`}
        />
      ))}
    </div>
  );
}

/** タパ柄のボーダーで囲み、四隅にレイの花を添えた写真 */
function TapaFrame() {
  const patternId = useId();
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-[2.75rem] p-3 shadow-2xl shadow-black/40">
        <svg aria-hidden className="absolute inset-0 size-full">
          <defs>
            <pattern
              id={patternId}
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect width="20" height="20" fill="#f7e8c9" />
              <path d="M0 20L10 9L20 20Z" fill="#7a3a17" />
              <path d="M0 0L5 5L10 0Z" fill="#e8742c" />
              <path d="M10 0L15 5L20 0Z" fill="#7a3a17" />
              <circle cx="10" cy="16" r="1.6" fill="#f7e8c9" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
        {/* スクロールに応じて少しずつ拡大（MotionController）。はみ出しは外側の角丸で切る */}
        <div className="relative overflow-hidden rounded-[2.25rem]">
          <div data-zoom>
            <Image
              src={ceoPhoto}
              alt="ハワイの海を背景にした代表 MIHO ADACHI のポートレート"
              sizes="(min-width: 1024px) 400px, (min-width: 768px) 38vw, 19rem"
              placeholder="blur"
              className="block aspect-[3/4] w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* レイ（花飾り）: 左上と右下に花を重ねる */}
      <div aria-hidden className="absolute -top-5 -left-4 sm:-left-6">
        <Hibiscus
          accent="#ffe082"
          className="w-16 -rotate-12 text-[#ef4b5c] drop-shadow-lg sm:w-20"
        />
        <Plumeria className="absolute top-10 left-12 w-11 rotate-12 text-white drop-shadow-md sm:top-12 sm:left-14 sm:w-12" />
        <Plumeria
          center="#ffb74d"
          className="absolute -top-1 left-14 w-9 -rotate-6 text-[#ffd1dc] drop-shadow-md sm:left-16 sm:w-10"
        />
      </div>
      <div aria-hidden className="absolute -right-4 -bottom-5 sm:-right-6">
        <Plumeria className="w-12 rotate-6 text-white drop-shadow-lg sm:w-14" />
        <Plumeria
          center="#ffb74d"
          className="absolute -top-8 right-8 w-10 -rotate-12 text-[#ffd1dc] drop-shadow-md sm:right-10 sm:w-11"
        />
        <Hibiscus
          accent="#ffe082"
          className="absolute -top-3 right-16 w-14 rotate-[30deg] text-[#ff7043] drop-shadow-lg sm:right-20 sm:w-16"
        />
      </div>
    </div>
  );
}

/** 見出し下の波線 + 星 */
function WaveRule() {
  return (
    <div aria-hidden className="mt-4 flex items-center gap-2 text-amber-200">
      <svg viewBox="0 0 120 12" className="h-3 w-28">
        <path
          d="M0 6Q10 0 20 6T40 6T60 6T80 6T100 6T120 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <Sparkle className="w-3.5" />
    </div>
  );
}
