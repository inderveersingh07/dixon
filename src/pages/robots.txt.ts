import type { APIRoute } from "astro";
import { STAGING, SITE_ORIGIN } from "../config/site";

/**
 * While STAGING is true this disallows everything, so the build cannot be
 * indexed under the agency domain and create a duplicate of the client's
 * eventual site. Flipping STAGING in src/config/site.ts opens it up and turns
 * the sitemap back on.
 */
const staging = `# Staging build. Not for indexing.
User-agent: *
Disallow: /
`;

const live = `User-agent: *
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap-index.xml
`;

export const GET: APIRoute = () =>
  new Response(STAGING ? staging : live, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
