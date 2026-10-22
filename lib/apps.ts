export type AppCategory = "medical" | "lifestyle" | "game";

export type Platform = "iOS" | "macOS" | "Android";

export type AppStatus = "released" | "in-review";

export type AppInfo = {
  /** 一意なID（key・アンカー用） */
  id: string;
  name: string;
  /** 名前の後ろに付く短い説明（例: 統計解析） */
  tagline?: string;
  description: string;
  category: AppCategory;
  platforms: Platform[];
  /** 審査中などでまだ無い場合は省略 */
  version?: string;
  status: AppStatus;
  /** App Store / Google Play のURL（審査中などで未定なら省略） */
  storeUrl?: string;
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
    name: "6MWT Guide",
    description:
      "6分間歩行試験（6MWT）の実施をサポートするガイドアプリ。手順の確認から測定までをスムーズに。",
    category: "medical",
    platforms: ["iOS"],
    version: "1.2.0",
    status: "released",
    storeUrl: "https://apps.apple.com/jp/app/6mwt-guide/id6766694418",
    iconSrc: "/icons/6mwt-guide.png",
  },
  {
    id: "6min-walking",
    name: "6分間ウォーキング記録",
    description:
      "6分間のウォーキングを手軽に記録。日々の歩行距離の変化を振り返れます。",
    category: "medical",
    platforms: ["iOS"],
    version: "1.6.2",
    status: "released",
    storeUrl: "https://apps.apple.com/jp/app/6%E5%88%86%E9%96%93%E3%82%A6%E3%82%A9%E3%83%BC%E3%82%AD%E3%83%B3%E3%82%B0%E8%A8%98%E9%8C%B2-6mw-%E8%A8%98%E9%8C%B2-%E5%88%86%E6%9E%90/id6761879946",
    iconSrc: "/icons/6mw-record.jpg",
  },
  {
    id: "clinstats",
    name: "Clinstats",
    description:
      "臨床研究のための統計ツール。現場で集めたデータを、その場で分析できます。",
    category: "medical",
    platforms: ["iOS", "macOS"],
    version: "2.0.0",
    status: "released",
    storeUrl: "https://apps.apple.com/jp/app/clinstats/id6764431688",
    iconSrc: "/icons/clinstats.jpg",
  },
  {
    id: "pinline",
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
    name: "WaveRun",
    tagline: "モーターボートレース",
    description:
      "波を切って駆け抜けるモーターボートレースゲーム。ライバルをかわしてゴールを目指そう。",
    category: "game",
    platforms: ["iOS"],
    version: "1.0",
    status: "released",
    storeUrl: "https://apps.apple.com/jp/app/waverun/id6799413773",
    iconSrc: "/icons/waverun.jpg",
  },
  {
    id: "mogrow",
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
