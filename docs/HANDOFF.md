# Dixon Masonry site: handoff guide

Everything you need to take this site from staging to live, and to repoint it at
the client afterwards. Written for someone who did not build it.

The site is currently a **staging build** at `dixon.bhatoya.com`. It is
production quality but deliberately hidden from search engines, and it carries a
small number of placeholders that are designed to be impossible to miss.

Run this at any point to see exactly what is outstanding:

```bash
npm run prelaunch
```

It exits non-zero while anything is unresolved and prints the file and line
number for each one.

---

## Quick reference

| What | Where |
|---|---|
| Every business fact (phone, address, hours, owner) | `src/config/business.ts` |
| Staging switch and canonical domain | `src/config/site.ts` |
| Contact form endpoint | `functions/api/contact.ts` |
| Contact form markup and error copy | `src/components/ContactForm.astro` |
| Reviews, one file each | `src/content/testimonials/` |
| Photos and their alt text | `src/assets/photos/`, `src/lib/photos.ts` |
| Structured data builders | `src/lib/schema.ts` |

---

## 1. Replace the eight placeholder reviews

**File:** `src/content/testimonials/review-1.md` through `review-8.md`

Each file looks like this:

```yaml
---
name: "PLACEHOLDER REVIEWER 1"
town: "PLACEHOLDER TOWN"
date: ""
topic: "general"
quote: "TKTK_REVIEW_1 Replace this whole line with the customer's own words..."
---
```

Replace `name`, `town`, `date` and `quote` with the real review. Use the
customer's own wording. Do not tidy the grammar or shorten it unless the
customer agreed to that edit.

- `town` can be an empty string and it will be omitted.
- `date` can be an empty string and it will be omitted.
- `topic` decides nothing automatically. Pages pull reviews **by filename**, so
  if you rename a file you must update the page that references it.

Where each review currently appears:

| File | Page |
|---|---|
| `review-1`, `review-5` | Homepage |
| `review-2` | Stone Masonry |
| `review-4` | Fireplaces & Chimneys, Restoration & Repair |
| `review-3`, `review-7` | About |
| `review-6` | Contact |
| `review-8` | Not currently placed. Add it to a page or leave it. |

To add a ninth review later, drop a new `.md` file in the same folder and add
its filename to the `slugs` array on whichever page should show it.

**Note on review markup:** the site deliberately emits **no** `Review` or
`AggregateRating` structured data. Reviews collected and shown on a business's
own site about itself are self-serving under Google's review snippet policy,
are not eligible for star ratings in search results, and marking them up can
trigger a manual action. Do not add it.

---

## 2. Replace the placeholder phone number

**File:** `src/components/ContactForm.astro`, near the top.

```js
const FALLBACK_PHONE = "(555) 555-5555";
```

This shows only in the form's error state, as a fallback if the message fails
to send. It is deliberately a fake number so it cannot quietly ship. Replace it
with `(262) 233-0392`, or the client's preferred number.

The real number in the header, footer and contact page comes from
`src/config/business.ts` and is already correct.

---

## 3. Set up Resend

The contact form sends through [Resend](https://resend.com). Until this is done,
submissions return `{ok:false,error:"send"}` and visitors see the error message.

1. Create a Resend account.
2. **Verify the sending domain.** Resend will not send from an unverified
   domain. Add the DNS records it gives you for `bhatoya.com` (or the client's
   domain, if you are sending from theirs) and wait for verification.
3. Create an API key with send permission. Copy it once; it is not shown again.

The domain being verified is the one in `CONTACT_FROM_EMAIL`. The recipient
address in `CONTACT_TO_EMAIL` does not need verifying and can be any mailbox,
including Gmail.

---

## 4. Set the environment variables in Cloudflare Pages

In the Cloudflare dashboard: **Workers & Pages > your project > Settings >
Environment variables**.

| Variable | Value | Required |
|---|---|---|
| `RESEND_API_KEY` | the key from step 3 | Yes |
| `CONTACT_TO_EMAIL` | where leads are delivered | No, defaults to `info@bhatoya.com` |
| `CONTACT_FROM_EMAIL` | envelope sender, domain must be verified | No, defaults to `info@bhatoya.com` |

Set them for **both Production and Preview**, or the preview deployments will
have a broken form.

**Environment variable changes do not apply to an existing build.** After saving
them, trigger a redeploy (Deployments > the latest one > Retry deployment).

`CONTACT_TO_EMAIL` accepts a comma separated list if you want leads to reach
more than one mailbox:

```
CONTACT_TO_EMAIL=info@bhatoya.com,dixonmasonry@gmail.com
```

---

## 5. Repoint the email to the client

This is a dashboard change with no code edit and no source redeploy.

- **Leads go to the client, sending stays on your domain.** Change
  `CONTACT_TO_EMAIL` to their address. Nothing else changes, because
  `CONTACT_FROM_EMAIL` is still on a domain you have verified. This is the
  simplest handoff and it keeps deliverability under your control.

- **Everything moves to the client's domain.** Verify their domain in Resend
  first, then set both `CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL` to their
  addresses. Do not change `CONTACT_FROM_EMAIL` before their domain verifies, or
  every submission will start failing.

Either way, redeploy after saving.

`reply_to` is always the person who filled in the form, so hitting Reply in the
inbox answers the lead directly rather than the website.

---

## 6. Take the site live

**File:** `src/config/site.ts`

```ts
export const STAGING = true;   // change to false
export const SITE_ORIGIN = "https://dixon.bhatoya.com";  // change to the final domain
```

Setting `STAGING = false` does three things at once:

- removes `<meta name="robots" content="noindex,nofollow">` from every page
- switches `/robots.txt` from `Disallow: /` to allowing crawlers
- turns sitemap generation back on

Then update `SITE_ORIGIN` to the final domain. It feeds canonical tags, Open
Graph URLs and the structured data, so leaving it pointed at the staging domain
after launch would be worse than the noindex it replaced.

Commit, push, and let Pages redeploy.

> **Why this matters.** If the staging site gets indexed under
> `dixon.bhatoya.com`, the client's eventual domain starts life competing with a
> copy of itself that already has history. Leave `STAGING = true` until the day
> the real domain is ready.

---

## 7. Connect the custom domain

1. Cloudflare Pages > your project > **Custom domains** > Set up a domain.
2. Add the domain and follow the DNS instructions.
3. HTTPS is automatic.
4. Decide which hostname is canonical, `example.com` or `www.example.com`, and
   redirect the other to it with a Bulk Redirect or a Page Rule. Serving both
   without a redirect splits your ranking signals between two addresses.

---

## 8. Set up measurement

Do these on launch day, not before. Search Console cannot verify anything useful
about a noindexed staging site.

1. **Google Search Console.** Add the property, verify by DNS, submit
   `https://<domain>/sitemap-index.xml`.
2. **Bing Webmaster Tools.** Add the site and import from Search Console, which
   saves redoing verification.
3. **GA4.** Create the property, add the tag, and define a conversion event for
   contact form submissions. The form dispatches no event today, so if you want
   this tracked, add a `gtag` call in the success branch of
   `src/components/ContactForm.astro`.
4. Confirm indexing about a week later with a `site:<domain>` search. It takes
   time; an empty result on day two means nothing.

---

## 9. Claim the Google Business Profile

**Dixon Masonry has no Google Business Profile.** For a residential mason in a
market this size, this is plausibly worth more than the website. Do it first.

- One profile. Never several.
- Pick one to three categories, not every category that might apply. Masonry
  Contractor is the primary.
- The name, address and phone must match the site **character for character**.
  The site shows `W6805 Beloit Rd.` and `(262) 233-0392`, both from
  `src/config/business.ts`.
- Hours: Monday to Saturday 8:00 to 17:00. Sunday is appointment or survey only,
  which Google has no clean way to express; set Sunday closed and say so in the
  description.
- Upload real photos. There are 56 in `src/assets/photos/` to choose from.
- Ask past customers for reviews there. Reviews on the Google profile do what
  reviews on your own site cannot: they show as stars in search results.

---

## 10. Adding photos later

1. Drop the file in the right category folder under `src/assets/photos/`.
   Resize it to a maximum of 1920px on the long edge first.
2. Add an entry to the `alts` map in `src/lib/photos.ts`, keyed
   `"<category>/<filename without extension>"`.

**The build fails if you skip step 2.** That is deliberate. It also fails if the
alt text is over 125 characters. Describe what is actually in the photograph.

To place it on a page, add its key to the relevant array in that page's file.

### The pizza oven gap

There are no photographs of a finished pizza oven anywhere in the collection.
`/pizza-ovens/` currently shows arch and firebrick work from other jobs, clearly
labelled as such rather than implied to be ovens. When a build is photographed,
add the images and replace that section along with its explanatory note.

---

## Local development

```bash
npm install
npm run dev          # site only, on :4321. The contact form will 404.
npm run build        # production build into dist/
npm run prelaunch    # the launch gate
```

To test the contact form locally you need Wrangler, because the endpoint is a
Cloudflare Pages Function and the Astro dev server does not run it:

```bash
npm run build
npx wrangler pages dev dist --binding RESEND_API_KEY=your_key_here
```

Then submit the form at `http://localhost:8788/contact/`.

### Verifying the form works

With the server running:

```bash
# honeypot filled: 200 {"ok":true} and nothing is sent
curl -s localhost:8788/api/contact -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{"name":"Bot","email":"b@b.com","message":"x","company":"Acme"}'

# missing message: 400 {"ok":false,"error":"validation"}
curl -s localhost:8788/api/contact -H 'Content-Type: application/json' \
  -H 'Accept: application/json' -d '{"name":"A","email":"a@b.com"}'
```

A real submission should arrive at `CONTACT_TO_EMAIL` with Reply addressed to
the submitter, not to the site.

---

## Things that were deliberate

Worth knowing before you "fix" them.

- **No `Review` or `AggregateRating` schema.** See step 1.
- **The honeypot uses `position:absolute;left:-9999px`, not `display:none`.**
  Some bots skip hidden inputs, which would let them past the trap.
- **The form has a real `action` and `method`.** It works with JavaScript
  disabled, in which case the endpoint returns a styled HTML page instead of
  JSON. The fetch handler is an enhancement.
- **`GET /api/contact` returns 404, not 405.** Only `onRequestPost` is exported.
  Adding a generic `onRequest` handler to produce a 405 would shadow the POST
  handler.
- **No web fonts.** Georgia and the system UI stack, so there is no font
  download, no flash of unstyled text and no layout shift. If the client wants a
  branded typeface later, that is the one thing to add carefully.
- **The gallery uses CSS columns, not a grid.** The photo set is 42 landscape
  and 18 portrait, and a fixed ratio grid crops the portraits badly.
- **The homepage hero is cropped to 3/4 from the top.** It keeps the mason, who
  gives the wall its scale, and loses the scaffold plank below him.
