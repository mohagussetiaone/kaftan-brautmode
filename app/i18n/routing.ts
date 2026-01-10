import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  // pathnames: {
  //   "/project/[projectId]": {
  //     en: "/en/project/[projectId]",
  //     id: "/id/project/[projectId]",
  //   },
  // },
});
