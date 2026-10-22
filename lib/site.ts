/** 公開URL。独自ドメインに移るときは NEXT_PUBLIC_SITE_URL で上書きする */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hoku-design-web.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "HOKU Design";

export const NAV_LINKS = [
  { href: "/#apps", label: "アプリ" },
  { href: "/tools/6mwt", label: "ツール" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];
