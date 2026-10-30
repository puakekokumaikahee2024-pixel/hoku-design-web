import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - ... files in the `public` folder
  // - ... files with an extension (e.g. favicon.ico)
  // - ... Next.js internal paths
  matcher: [
    "/((?!_next|_vercel|.*\\..*).*)",
    // Re-enable robots and sitemaps
    "/robots.txt",
    "/sitemap.xml",
  ],
};
