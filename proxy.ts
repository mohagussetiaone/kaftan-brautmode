import createMiddleware from "next-intl/middleware";

const middleware = createMiddleware({
  // Add locales you want in the app
  locales: ["de", "en"],

  // Default locale if no match
  defaultLocale: "de",
  localeDetection: false,
});

export default middleware;

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(de|en)/:path*"],
};
