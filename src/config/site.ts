/**
 * Site-wide switches.
 *
 * STAGING is the single control that keeps this build out of the search index
 * while it lives on the agency domain. Flipping it to false and redeploying is
 * what takes the site live. See docs/HANDOFF.md step 6.
 *
 * While STAGING is true:
 *   - every page emits <meta name="robots" content="noindex,nofollow">
 *   - /robots.txt disallows everything
 *   - no sitemap is generated
 */
export const STAGING = true;

/**
 * Canonical origin, no trailing slash.
 * Change this to the client's own domain at launch, and change `site` in
 * astro.config.mjs to match.
 */
export const SITE_ORIGIN = "https://dixon.bhatoya.com";

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_ORIGIN + "/").href;
}
