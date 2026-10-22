import type { Metadata } from "next";
import { Kaisei_Decol, Noto_Sans_JP, Outfit, Pacifico } from "next/font/google";
import { SITE_NAME, SITE_URL } from "@/lib/site";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${outfit.variable} ${pacifico.variable} ${kaiseiDecol.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans text-slate-800 dark:bg-night-950 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
