// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { STAGING, SITE_ORIGIN } from "./src/config/site.ts";

// https://astro.build/config
export default defineConfig({
  site: SITE_ORIGIN,
  output: "static",
  trailingSlash: "always",

  // No sitemap while the site is parked on the agency domain. Flipping STAGING
  // in src/config/site.ts turns it back on.
  integrations: STAGING ? [mdx()] : [mdx(), sitemap()],

  image: {
    // Every source image is already capped at 1920px. These are the widths the
    // layout actually asks for.
    responsiveStyles: true,
  },

  build: {
    inlineStylesheets: "always",
  },
});
