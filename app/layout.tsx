import type { Metadata } from "next";
import { Kaisei_Decol, Noto_Sans_JP, Outfit, Pacifico } from "next/font/google";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { MotionController } from "./components/MotionController";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

// 代表メッセージ（ハワイアンブロック）専用の装飾フォント
const pacifico = Pacifico({
  variable: "--font-pacifico",
  weight: "400",
  subsets: ["latin", "latin-ext"],
  preload: false,
});

const kaiseiDecol = Kaisei_Decol({
  variable: "--font-kaisei-decol",
  weight: "700",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "HOKU Design | 臨床の視点で作るアプリ",
  description:
    "HOKU Design は、元看護師の代表と理学療法士の開発者が二人で運営するアプリスタジオです。医療・ライフスタイル・ゲームのアプリを公開しています。",
  openGraph: { siteName: SITE_NAME, locale: "ja_JP", type: "website" },
};

const MOTION_SCRIPT = `(function(){try{if("IntersectionObserver" in window&&!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.setAttribute("data-motion","on")}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${outfit.variable} ${pacifico.variable} ${kaiseiDecol.variable} h-full antialiased`}
      // 下の inline script が描画前に data-motion を付けるため
      suppressHydrationWarning
    >
      <head>
        {/* スクロール演出を有効にしてよい環境だけ印を付ける。印がなければ（JS なし・動きを減らす設定）
            演出用の初期状態（非表示）は一切適用されず、最初から全部見える */}
        <script dangerouslySetInnerHTML={{ __html: MOTION_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-white font-sans text-slate-800 dark:bg-night-950 dark:text-slate-100">
        {children}
        <MotionController />
      </body>
    </html>
  );
}
