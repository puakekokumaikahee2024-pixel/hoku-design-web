import type { Metadata } from "next";
import { Noto_Sans_JP, Outfit } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HOKU Design | 臨床の視点で作るアプリ",
  description:
    "HOKU Design は、元看護師の代表と理学療法士の開発者が二人で運営するアプリスタジオです。医療・ライフスタイル・ゲームのアプリを公開しています。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans text-slate-800 dark:bg-night-950 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
