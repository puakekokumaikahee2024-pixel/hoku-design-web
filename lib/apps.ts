export type AppCategory = "medical" | "lifestyle" | "game";

export type Platform = "iOS" | "macOS" | "Android";

export type AppStatus = "released" | "in-review";

export type AppInfo = {
  /** 一意なID（key・アンカー用） */
  id: string;
  /** 個別ページのURL（/apps/[slug]） */
  slug: string;
  name: string;
  /** 名前の後ろに付く短い説明（例: 統計解析） */
  tagline?: string;
  description: string;
  category: AppCategory;
  platforms: Platform[];
  /** 審査中などでまだ無い場合は省略 */
  version?: string;
  status: AppStatus;
  /** App Store のURL（審査中などで未定なら省略） */
  storeUrl?: string;
  /** Google Play のURL（Android 版を公開しているものだけ） */
  playStoreUrl?: string;
  /** アイコン画像（public/ からのパス。正方形） */
  iconSrc: string;
};

export const CATEGORY_LABELS: Record<AppCategory, string> = {
  medical: "医療",
  lifestyle: "ライフスタイル",
  game: "ゲーム",
};

export const apps: AppInfo[] = [
  {
    id: "rehastats",
    slug: "rehastats",
    name: "RehaStats",
    tagline: "統計解析",
    description:
      "リハビリテーション研究のための統計解析アプリ。臨床データの検定や集計を、iPhone・Mac からすばやく。",
    category: "medical",
    platforms: ["iOS", "macOS"],
    version: "2.0.0",
    status: "released",
    storeUrl: "https://apps.apple.com/jp/app/rehastats-%E7%B5%B1%E8%A8%88%E8%A7%A3%E6%9E%90/id6762046167",
    iconSrc: "/icons/rehastats.jpg",
  },
  {
    id: "6mwt-guide",
    slug: "6mwt-guide",
    name: "6MWT Guide",
    description:
      "6分間歩行試験（6MWT）の計測・評価アプリ。予測値の自動計算、VO2・METs換算、800項目以上の活動データベースを収録。",
    category: "medical",
    platforms: ["iOS", "Android"],
    version: "1.2.0",
    status: "released",
    storeUrl: "https://apps.apple.com/jp/app/6mwt-guide/id6766694418",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.hiroshiadachi.sixmwtguide",
    iconSrc: "/icons/6mwt-guide.png",
  },
  {
    id: "6min-walking",
    slug: "6mw-record",
    name: "6分間ウォーキング記録",
    description:
      "6分間歩行の結果から、予測歩行距離と運動強度（VO2・METs・RPP）を計算。オフラインでも使えます。",
    category: "medical",
    platforms: ["iOS", "Android"],
    version: "1.6.2",
    status: "released",
    storeUrl: "https://apps.apple.com/jp/app/6%E5%88%86%E9%96%93%E3%82%A6%E3%82%A9%E3%83%BC%E3%82%AD%E3%83%B3%E3%82%B0%E8%A8%98%E9%8C%B2-6mw-%E8%A8%98%E9%8C%B2-%E5%88%86%E6%9E%90/id6761879946",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.hiroshiadachi.sixminutewalk",
    iconSrc: "/icons/6mw-record.jpg",
  },
  {
    id: "clinstats",
    slug: "clinstats",
    name: "Clinstats",
    description:
      "臨床研究のための統計ツール。現場で集めたデータを、その場で分析できます。",
    category: "medical",
    platforms: ["iOS", "macOS", "Android"],
    version: "2.0.0",
    status: "released",
    storeUrl: "https://apps.apple.com/jp/app/clinstats/id6764431688",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.hokudesign.clinstats",
    iconSrc: "/icons/clinstats.jpg",
  },
  {
    id: "pinline",
    slug: "pinline",
    name: "Pinline",
    tagline: "旅行スケジュール",
    description:
      "旅の予定をピンでつなぐスケジュールアプリ。行きたい場所と時間をひと目で整理。",
    category: "lifestyle",
    platforms: ["iOS"],
    version: "1.0.5",
    status: "released",
    storeUrl: "https://apps.apple.com/jp/app/pinline/id6773246094",
    iconSrc: "/icons/pinline.png",
  },
  {
    id: "waverun",
    slug: "waverun",
    name: "WaveRun",
    tagline: "モーターボートレース",
    description:
      "ハワイを舞台にした3Dボートレースゲーム。ブイゲートを順番に通過して、制限時間内のゴールを目指そう。",
    category: "game",
    platforms: ["iOS"],
    version: "1.0",
    status: "released",
    storeUrl: "https://apps.apple.com/jp/app/waverun/id6799413773",
    iconSrc: "/icons/waverun.jpg",
  },
  {
    id: "mogrow",
    slug: "mogrow",
    name: "MOGROW",
    tagline: "レシート育成RPG",
    description:
      "レシートを読み込んでキャラクターを育てる育成RPG。毎日の買い物が冒険に変わる。",
    category: "game",
    platforms: ["iOS"],
    version: "1.0.2",
    status: "released",
    storeUrl: "https://apps.apple.com/jp/app/mogrow/id6818719932",
    iconSrc: "/icons/mogrow.png",
  },
  {
    id: "wangan-murders",
    slug: "wangan",
    name: "湾岸連続殺人事件",
    tagline: "ミステリ",
    description:
      "湾岸エリアで起きた連続殺人事件の謎を追う本格ミステリゲーム。",
    category: "game",
    platforms: ["iOS"],
    status: "in-review",
    iconSrc: "/icons/wangan.png",
  },
];

export function getAppBySlug(slug: string): AppInfo | undefined {
  return apps.find((app) => app.slug === slug);
}
