# Dixon Masonry

Marketing site for Dixon Masonry, a stone mason in Lake Geneva, Wisconsin.
Astro, static output, deployed to Cloudflare Pages with one Pages Function for
the contact form.

**Currently a staging build.** It is production quality but noindexed while it
lives on the agency domain, and it carries a small number of deliberate
placeholders. See [`docs/HANDOFF.md`](docs/HANDOFF.md) before launching.

```bash
npm install
npm run dev          # localhost:4321. The contact form 404s here, see below.
npm run build
npm run prelaunch    # what is still outstanding before launch
```

## Deploying

Cloudflare Pages, connected to this repository.

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Functions directory | `functions` (picked up automatically) |

Environment variables are set in the Pages dashboard, not in this repo. See
HANDOFF steps 3 and 4.

## Testing the contact form locally

The endpoint is a Cloudflare Pages Function, so the Astro dev server does not
run it. Use Wrangler against a build:

```bash
npm run build
npx wrangler pages dev dist --binding RESEND_API_KEY=your_key_here
```

## Layout

```
src/
  config/business.ts     every business fact, single source of truth
  config/site.ts         STAGING switch and canonical origin
  lib/photos.ts          photo registry and alt text, enforced at build
  lib/schema.ts          JSON-LD builders
  components/            header, footer, gallery, form, FAQ, testimonials
  layouts/               Base and ServicePage
  pages/                 nine pages plus 404 and robots.txt
  content/testimonials/  one markdown file per review
  assets/photos/         56 photos, 1920px, by category
  assets/logo/           light, dark and favicon source
functions/api/contact.ts Resend-backed contact endpoint
scripts/                 pre-launch gate
docs/                    handoff guide, SEO plan, photo provenance
```

## Conventions worth knowing

- **Business facts live in `src/config/business.ts`.** Nothing is hardcoded in
  markup. Change the phone number there and it updates the header, footer,
  contact page, tel: links and the structured data at once.
- **Photos go through `src/lib/photos.ts`.** The build fails if a photo has no
  alt text, or if the alt text runs over 125 characters. This is deliberate.
- **No `Review` or `AggregateRating` schema.** Explained in HANDOFF.
- **No web fonts.** Georgia plus the system UI stack, so no download, no flash
  and no layout shift.
- **`STAGING` in `src/config/site.ts` is the launch switch.** It drives the
  robots meta tag, `robots.txt` and sitemap generation together.

## Documentation

- [`docs/HANDOFF.md`](docs/HANDOFF.md) launch checklist and how to repoint
  everything at the client
- [`docs/seo-plan.md`](docs/seo-plan.md) keyword map, metadata, technical fixes,
  internal linking, schema, content plan, backlog and measurement
- [`docs/photo-manifest.csv`](docs/photo-manifest.csv) maps every photo back to
  its original file
