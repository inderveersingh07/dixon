# Dixon Masonry: SEO plan

Prepared against the supplied SEO brief. Covers the eight requested
deliverables.

## Read this first: what is missing and how to fill it

The brief forbids invented data, and this is a brand new site that has never
been crawled. The following were not supplied and cannot be responsibly guessed.
Every one is marked in place below rather than filled with a plausible number.

| Gap | Why it is missing | How to fill it |
|---|---|---|
| Monthly search volume per keyword | No keyword tool access was provided | Google Keyword Planner (free with an Ads account), or Semrush / Ahrefs Keywords Explorer. Filter to United States, then to Wisconsin if the tool allows. |
| Keyword difficulty | Same | Semrush KD or Ahrefs KD on the same keyword list. |
| Current ranking positions | The site is not live or indexed | Search Console Performance report, from roughly four weeks after launch. |
| Striking distance keywords (positions 6 to 20) | Requires existing rankings | Search Console, filter Average Position between 6 and 20. Not available for at least a quarter. |
| Cannibalization audit | Requires existing rankings | Search Console Pages report per query, once there is data. The 9 page structure below is built to avoid it in the first place. |
| Competitor identification | No competitors were supplied | Search the primary keywords from a Lake Geneva IP or with `&near=Lake+Geneva,WI`, and list who ranks in the local pack and the top 10 organic. Then run their domains through Semrush or Ahrefs. |
| Competitor backlink profiles | Depends on the above | Ahrefs Site Explorer > Backlinks, once competitors are named. |

Everything else below is actionable today.

---

## 1. Keyword map

Nine pages, one primary keyword each, no two pages targeting the same term.
Intent was assigned by what a searcher is trying to do, and should be confirmed
against what actually ranks before any of these are treated as settled.

| URL | Primary keyword | Secondary keywords | Intent | Position | Priority |
|---|---|---|---|---|---|
| `/` | lake geneva stone mason | masonry contractor lake geneva wi, stone artistry wisconsin | Commercial | Not live | 1 |
| `/stone-masonry/` | stone masonry lake geneva | natural stone veneer wisconsin, fieldstone wall, river rock wall | Commercial | Not live | 1 |
| `/fireplaces-chimneys/` | stone fireplace builder lake geneva | river rock fireplace, chimney repair lake geneva, herringbone firebox | Commercial | Not live | 1 |
| `/restoration-repair/` | masonry repair lake geneva wi | tuckpointing lake geneva, brick restoration wisconsin, historic masonry restoration | Commercial | Not live | 1 |
| `/pizza-ovens/` | outdoor pizza oven builder wisconsin | brick pizza oven lake geneva, wood fired oven builder | Commercial | Not live | 2 |
| `/lake-geneva-masonry/` | masonry contractor lake geneva | mason near me, williams bay mason, fontana masonry | Local | Not live | 2 |
| `/contact/` | masonry quote lake geneva | masonry estimate lake geneva | Transactional | Not live | 2 |
| `/gallery/` | stone masonry portfolio | river rock fireplace photos, masonry before and after | Investigational | Not live | 3 |
| `/about/` | dixon masonry | brent dixon mason lake geneva | Navigational | Not live | 3 |

### Intent check, to run before committing

For each primary keyword, search it and look at what ranks:

- **Local pack plus service pages** means a service page can win. Proceed.
- **Only informational articles** means a service page will not win that term.
  Move it to the content plan in section 6 and target a supporting article
  instead.

This matters most for `outdoor pizza oven builder wisconsin`. If that SERP is
full of DIY guides and kit retailers, the service page will not rank for it and
the realistic target becomes the longer tail, for example
`custom brick pizza oven builder lake geneva wi`.

### Why there are no per-town pages

The brief warns that thin duplicated location pages get penalised, and that is
the correct call here. Williams Bay, Fontana and Lake Como have no distinct
photos and no named projects behind them, so three separate pages would be the
same page with the town swapped, which is exactly what doorway page guidance
targets. Instead, `/lake-geneva-masonry/` covers all eight communities with a
genuinely different sentence about each.

Revisit this only when there is real material per town: named projects, local
photos, or a testimonial from that town. At that point a town page has something
to say and earns its place.

---

## 2. Page by page metadata

Every string below is what is live in the build. Character counts verified.

### `/` Homepage

- **Slug:** `/` (root)
- **Title (48):** `Stone Masonry in Lake Geneva, WI | Dixon Masonry`
- **Meta (139):** `Stone masonry and stone artistry for Lake Geneva homes. Fireplaces, chimneys, pizza ovens and restoration, built by hand. Established 2001.`
- **H1:** `Stone masonry for the homes around Lake Geneva`

### `/stone-masonry/`

- **Slug:** `stone-masonry`
- **Title (47):** `Stone Masonry & Stone Artistry | Lake Geneva WI`
- **Meta (155):** `Fieldstone, river rock and natural stone veneer built by hand for Lake Geneva homes. See finished walls, feature walls and exteriors, then request a quote.`
- **H1:** `Stone masonry and stone artistry`

### `/fireplaces-chimneys/`

- **Slug:** `fireplaces-chimneys`
- **Title (45):** `Stone Fireplaces & Chimneys | Lake Geneva, WI`
- **Meta (149):** `Full height river rock fireplaces, herringbone fireboxes and fieldstone chimneys built and repaired around Lake Geneva. See the work and get a quote.`
- **H1:** `Stone fireplaces and chimneys`

### `/restoration-repair/`

- **Slug:** `restoration-repair`
- **Title (46):** `Masonry Restoration & Repair | Lake Geneva, WI`
- **Meta (140):** `Cracked brick, failing column bases and historic facades brought back. See genuine before and after pairs from Lake Geneva area repair jobs.`
- **H1:** `Masonry restoration and repair`

### `/pizza-ovens/`

- **Slug:** `pizza-ovens`
- **Title (48):** `Custom Outdoor Pizza Ovens | Lake Geneva Masonry`
- **Meta (144):** `Wood fired brick pizza ovens built to order for Lake Geneva patios and outdoor kitchens. Talk through your build with the mason who will lay it.`
- **H1:** `Wood fired pizza ovens, built to order`

### `/lake-geneva-masonry/`

- **Slug:** `lake-geneva-masonry`
- **Title (46):** `Lake Geneva Masonry Contractor | Dixon Masonry`
- **Meta (144):** `A mason who works Lake Geneva and the lake homes around it, from Williams Bay to Fontana. Local, insured, established 2001. Call (262) 233-0392.`
- **H1:** `Masonry for Lake Geneva and the lake communities`

### `/contact/`

- **Slug:** `contact`
- **Title (45):** `Contact Dixon Masonry | Lake Geneva, WI Mason`
- **Meta (120):** `Call (262) 233-0392 or send a few details about your stonework project. Brent typically replies within one business day.`
- **H1:** `Tell us about your project`

### `/about/`

- **Slug:** `about`
- **Title (46):** `About Dixon Masonry | Mason in Lake Geneva, WI`
- **Meta (143):** `Brent Dixon has run Dixon Masonry in Lake Geneva since 2001. A family trade, carried on, with stone artistry and a standard that does not move.`
- **H1:** `The mason you will actually be dealing with`

### `/gallery/`

- **Slug:** `gallery`
- **Title (46):** `Stonework Gallery | Dixon Masonry, Lake Geneva`
- **Meta (131):** `Photographs of fireplaces, chimneys, stone veneer, patios and masonry repairs built by Dixon Masonry around Lake Geneva, Wisconsin.`
- **H1:** `Stonework gallery`

All titles sit between 45 and 48 characters, inside the 40 to 60 target with
room for a brand suffix. All meta descriptions are under 160. Each H1 is unique,
appears once, and reads as a signpost rather than a keyword string.

---

## 3. Technical fix list

Ranked by severity. Items 1 to 4 must be done before or at launch.

### Severity: blocker

**1. The site is noindexed and must stay that way until the domain is final.**
Affected: every URL.
Why: the build is parked on `dixon.bhatoya.com`, which is not its permanent
home. If Google indexes it there, the client's real domain later competes with
an already indexed copy of itself.
Fix: leave `STAGING = true` in `src/config/site.ts` until launch day, then set
it to `false` and update `SITE_ORIGIN` in the same file. See HANDOFF step 6.

**2. `SITE_ORIGIN` still points at the staging domain.**
Affected: canonical tags, Open Graph URLs, `BreadcrumbList` items, `LocalBusiness`
url, sitemap.
Why: canonical tags pointing at a different hostname than the one being served
tell Google the real domain is a duplicate.
Fix: same file, same moment as item 1.

**3. There is no Google Business Profile.**
Affected: not a page issue, a business issue.
Why: for a residential trade in a market this size, the local pack is where the
customers are. No profile means no local pack, no map result and no star
ratings, regardless of how well the site is built.
Fix: HANDOFF step 9.

**4. Contact form will not deliver until Resend is configured.**
Affected: `/contact/`, and the CTA on all nine pages.
Why: every lead is lost silently. The visitor sees the error state and most will
not call instead.
Fix: HANDOFF steps 3 and 4. Test with a real submission before announcing the
site.

### Severity: high

**5. No analytics or Search Console.**
Affected: whole site.
Why: without them there is no way to know which of the nine pages earns anything,
and section 8 cannot be executed.
Fix: HANDOFF step 8. Define the contact form submit as a GA4 conversion; note
that the form currently fires no event, so a `gtag` call must be added in the
success branch of `src/components/ContactForm.astro`.

**6. Canonical hostname is not enforced.**
Affected: `example.com` versus `www.example.com`.
Why: serving both without a redirect splits ranking signals across two
addresses.
Fix: HANDOFF step 7, item 4.

### Severity: medium

**7. `/pizza-ovens/` has no photographs of the service it sells.**
Affected: `/pizza-ovens/`.
Why: a service page with no proof converts poorly and has weaker topical signals
than the three pages around it. This is a content gap, not a defect; the page is
otherwise complete.
Fix: photograph the next oven build. Until then the page carries arch and
firebrick work from other jobs, labelled honestly rather than implied to be
ovens.

**8. Only one photograph exists of anyone doing the work.**
Affected: `/about/`, and experience signals site-wide.
Why: the brief calls for demonstrating experience and trust with real photos of
real people. There is one crew photo in 211 originals and no portrait of Brent.
Fix: an hour with a camera on any active job. Two or three shots of Brent
working would strengthen `/about/` more than any copy change.

**9. No testimonials are live.**
Affected: `/`, `/about/`, `/contact/`, two service pages.
Why: eight real reviews exist but the wording was not supplied, so the
components currently render obvious placeholders.
Fix: HANDOFF step 1.

### Severity: low, already handled, listed so nobody "fixes" them

- **Images.** All 56 are descriptively named, carry hand written alt text under
  125 characters, and are served as AVIF and WebP with a JPEG fallback at
  multiple widths. The build fails if a photo has no alt text.
- **Broken links.** There are none. Every internal link is generated from
  `src/config/business.ts` or a photo registry, so a bad path fails the build
  rather than shipping.
- **Duplicate content.** No page duplicates another. No pagination, no tag
  archives, no faceted URLs, so nothing needs blocking or canonicalising.
- **Mobile.** Single column under 768px, 44px minimum tap targets, no horizontal
  scroll at 320px, tap to call in the header.
- **Core Web Vitals.** No web fonts, no render blocking JavaScript, CSS inlined,
  explicit width and height on every image so there is no layout shift, and the
  theme is stamped before first paint. Run PageSpeed Insights on the live URL
  after launch and record the numbers; do not trust a local measurement.
- **404 handling.** `/404.astro` returns a real 404 with links to all nine
  pages. Nothing redirects to the homepage.

---

## 4. Internal linking plan

Every link below is already built. Listed so it can be audited and extended.

Rules applied: descriptive anchors only, never "click here" or "read more";
every page within two clicks of the homepage; no orphans; every non-money page
points at a money page.

| Source | Target | Anchor text |
|---|---|---|
| `/` | `/stone-masonry/` | Stone Masonry |
| `/` | `/fireplaces-chimneys/` | Fireplaces & Chimneys |
| `/` | `/pizza-ovens/` | Pizza Ovens |
| `/` | `/restoration-repair/` | Restoration & Repair |
| `/` | `/about/` | Read more about Brent Dixon and how he works |
| `/` | `/gallery/` | View the full stonework gallery |
| `/` | `/lake-geneva-masonry/` | See the full list of areas served |
| `/` | `/contact/` | Request a masonry quote |
| `/stone-masonry/` | `/fireplaces-chimneys/` | fireplace or chimney |
| `/stone-masonry/` | `/contact/` | Request a masonry quote |
| `/fireplaces-chimneys/` | `/restoration-repair/` | masonry restoration and repair |
| `/pizza-ovens/` | `/stone-masonry/` | stonework |
| `/restoration-repair/` | `/gallery/` | via gallery groups |
| every service page | `/lake-geneva-masonry/` | Lake Geneva and the surrounding lake communities |
| every service page | the other three services | the service name |
| `/gallery/` > Fireplaces | `/fireplaces-chimneys/` | stone fireplaces and chimneys |
| `/gallery/` > Chimneys | `/fireplaces-chimneys/` | chimney building and repair |
| `/gallery/` > Stone veneer | `/stone-masonry/` | stone masonry and stone artistry |
| `/gallery/` > Exteriors | `/stone-masonry/` | stone masonry for exteriors |
| `/gallery/` > Patios | `/stone-masonry/` | stonework around the house |
| `/gallery/` > Brick detail | `/pizza-ovens/` | custom brickwork and pizza ovens |
| `/gallery/` > Restoration | `/restoration-repair/` | masonry restoration and repair |
| `/gallery/` > Historic | `/restoration-repair/` | historic masonry restoration |
| `/about/` | `/lake-geneva-masonry/` | See the full list of areas served |
| `/about/` | `/gallery/` | look through the stonework gallery |
| `/lake-geneva-masonry/` | all four services | the service name |
| `/contact/` | `/lake-geneva-masonry/` | Lake Geneva and the surrounding lake communities |
| footer, every page | all four services, gallery, about, area, contact | descriptive labels |

### As articles get published

Every article from section 6 must link to at least one money page in its body,
with a descriptive anchor. Add a link back from the most relevant service page
only when the article genuinely helps that page's reader, not reciprocally by
default.

---

## 5. Structured data

All JSON-LD is generated from `src/lib/schema.ts` and emitted as a single
`@graph` per page. Values come from `src/config/business.ts`, so there is one
source of truth and the markup cannot drift from what is on screen.

Validate every page with the Rich Results Test after launch, when the URLs are
publicly reachable.

### Emitted on every page

- `LocalBusiness` (also typed `GeneralContractor`), `@id` `<origin>/#business`
- `WebSite`, publisher pointing at the business `@id`
- `BreadcrumbList`, on every page except the homepage

### `LocalBusiness`, as built

```json
{
  "@type": ["LocalBusiness", "GeneralContractor"],
  "@id": "https://dixon.bhatoya.com/#business",
  "name": "Dixon Masonry",
  "url": "https://dixon.bhatoya.com/",
  "telephone": "+12622330392",
  "email": "info@bhatoya.com",
  "foundingDate": "2001",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "W6805 Beloit Rd.",
    "addressLocality": "Lake Geneva",
    "addressRegion": "WI",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 42.5917,
    "longitude": -88.4334
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "08:00",
    "closes": "17:00"
  }],
  "areaServed": [{ "@type": "City", "name": "Lake Geneva" }],
  "founder": { "@type": "Person", "name": "Brent Dixon" }
}
```

Sunday is absent on purpose. "By appointment or survey only" has no clean
representation in `openingHoursSpecification`, and an incorrect value is worse
than an omitted one. It appears in visible copy in the footer and on
`/contact/` and `/lake-geneva-masonry/`.

The `geo` coordinates are approximate for Lake Geneva. Refine them to the actual
yard once the client is comfortable publishing that precisely.

### Per page type

| Page | Additional types |
|---|---|
| `/stone-masonry/`, `/fireplaces-chimneys/`, `/pizza-ovens/`, `/restoration-repair/` | `Service` with `provider` referencing the business `@id`, plus `FAQPage` |
| `/lake-geneva-masonry/` | `FAQPage` |
| `/about/` | `Person` for Brent Dixon, `worksFor` referencing the business |
| `/gallery/`, `/contact/`, `/` | base graph only |

`FAQPage` is generated from the same array that renders the visible accordion,
so the markup and the page can never disagree.

### What is deliberately absent

**No `Review` and no `AggregateRating`, anywhere.** Reviews collected and
displayed on a business's own site about itself are self-serving under Google's
review snippet policy. They are not eligible for review rich results, and
marking them up risks a manual action. Star ratings in search come from the
Google Business Profile instead, which is another reason section 3 item 3 leads
the backlog.

---

## 6. Content plan

Ten pieces, each tied to a mapped keyword and a money page. Ordered by expected
return. Volume and difficulty must be confirmed per the gap table before
committing to the order.

| # | Working title | Target term | Intent | Links to |
|---|---|---|---|---|
| 1 | What masonry repair actually costs around Lake Geneva | masonry repair cost wisconsin | Commercial investigation | `/restoration-repair/` |
| 2 | How to tell if your chimney needs repointing or rebuilding | chimney repointing vs rebuilding | Informational | `/fireplaces-chimneys/` |
| 3 | Fieldstone, river rock or ledgestone: choosing stone for a Wisconsin home | types of stone veneer wisconsin | Commercial investigation | `/stone-masonry/` |
| 4 | What a full height stone fireplace involves, start to finish | stone fireplace installation process | Informational | `/fireplaces-chimneys/` |
| 5 | Why mortar matters more than brick on an old building | historic mortar repointing | Informational | `/restoration-repair/` |
| 6 | Planning a wood fired pizza oven: size, base and curing | pizza oven planning guide | Informational | `/pizza-ovens/` |
| 7 | Stepped cracking in brick: what it means and what it costs to fix | stair step cracks in brick wall | Informational | `/restoration-repair/` |
| 8 | Flagstone, bluestone and brick: choosing a patio surface | flagstone vs bluestone patio | Commercial investigation | `/stone-masonry/` |
| 9 | When to build masonry in a Wisconsin winter, and when not to | masonry cold weather construction | Informational | `/lake-geneva-masonry/` |
| 10 | Questions to ask a mason before you hire one | how to choose a masonry contractor | Commercial investigation | `/contact/` |

### How to write them

- Each answers one question completely and stops. No padding to a word count.
- A definition or direct answer in the first two sentences under the relevant
  heading, so it is extractable for featured snippets and AI overviews.
- Specs and comparisons as lists or tables, not prose.
- A short FAQ block at the end where it fits naturally, reusing the `FAQ`
  component so the `FAQPage` markup comes for free.
- Real photographs from `src/assets/photos/` rather than stock.
- At least one descriptive link to the mapped money page in the body.

Numbers 1, 2 and 7 are the strongest starting three. Each matches a problem
someone searches at the exact moment they are deciding to call a mason, and each
feeds the repair page, which has the most genuine photographic proof behind it.

---

## 7. Thirty day backlog

Ordered. Effort is rough working time, impact is relative to the others.

| # | Task | Effort | Impact | Owner |
|---|---|---|---|---|
| 1 | Claim and fully populate the Google Business Profile | 2h plus postcard wait | Very high | Agency with client |
| 2 | Collect the eight review texts and replace the placeholders | 1h | High | Client, then agency |
| 3 | Set up Resend, configure Pages env vars, send a real test submission | 1h | High, blocks all leads | Agency |
| 4 | Replace the placeholder fallback phone number | 5m | High, small effort | Agency |
| 5 | Confirm the final domain, set `STAGING = false` and `SITE_ORIGIN`, deploy | 30m | High | Agency |
| 6 | Connect the custom domain, force one canonical hostname | 1h | High | Agency |
| 7 | Search Console and Bing, submit the sitemap | 45m | High, enables everything in section 8 | Agency |
| 8 | GA4 with a contact form conversion event | 1h | High | Agency |
| 9 | Run the intent check in section 1 on all nine primary keywords | 2h | Medium, may reorder the map | Agency |
| 10 | Identify the three real competitors and pull their keyword and backlink profiles | 3h | Medium, unblocks off page work | Agency |
| 11 | Pull volume and difficulty, complete the keyword map | 2h | Medium | Agency |
| 12 | PageSpeed Insights on the live URLs, record the baseline | 30m | Medium | Agency |
| 13 | Photograph Brent working, two or three usable frames | 1h | Medium, strengthens trust signals | Client |
| 14 | Ask past customers for Google reviews | ongoing | High over time | Client |
| 15 | Publish article 1 from the content plan | 4h | Medium, compounds | Agency |
| 16 | List on Bing Places, Apple Maps, Facebook, Yelp, BBB, Angi with identical NAP | 3h | Medium | Agency |
| 17 | Publish articles 2 and 7 | 8h | Medium | Agency |
| 18 | Photograph a completed pizza oven and fill that gap | 1h when one exists | Medium | Client |

Items 1 to 8 are the launch critical path. Nothing in 9 onward matters if the
form does not deliver or the site stays noindexed.

### On off page work

The brief asks for competitor backlink analysis, unlinked mention reclamation
and outreach prioritisation. None of that can start before item 10, because no
competitors were supplied and a brand new site has no mentions to reclaim.

Realistic early links for a local trade, in rough order of effort to value:

- Suppliers and stone yards, many of which list the contractors who buy from them
- Chamber of commerce and local business associations
- Builders and architects Brent subcontracts for, as a credited trade
- Local press on a visible restoration, the church and storefront jobs are the
  obvious hooks
- Houzz and similar trade directories, which is also where the
  `01-hero` photograph situation originated and is worth handling carefully

Set up a monitor for `Dixon Masonry`, `Brent Dixon` and the bare domain so
mentions can be turned into links as they appear.

---

## 8. Measurement plan

### What to track and where

| Metric | Where | Why |
|---|---|---|
| Contact form submissions | GA4 conversion event, cross checked against the inbox | The only metric that is actually revenue |
| Phone taps | GA4 event on `tel:` links | For a trade, most leads call rather than type |
| Impressions and clicks per page | Search Console Performance | Whether the nine pages are earning anything |
| Average position per primary keyword | Search Console, filtered by query | Progress against the keyword map |
| Indexed page count | Search Console Pages report | All nine should be indexed. Fewer means a problem |
| Local pack visibility | Google Business Profile Insights | Usually the largest single source for a local trade |
| Core Web Vitals | Search Console CWV, PageSpeed Insights | Should stay green given the build |
| CTR against stable impressions | Search Console | The proxy signal for AI overview absorption, see below |

### What good looks like

These are checkpoints, not forecasts. Any specific traffic number would be
invented.

**Day 30.** All nine pages indexed and appearing for the brand name
`Dixon Masonry`. Google Business Profile live and verified. At least one form
submission and one tracked phone tap, confirming measurement works end to end.
Core Web Vitals green. Rankings for competitive non brand terms will not have
moved and should not be expected to.

**Day 60.** Impressions appearing for long tail service terms, most likely the
four or five word variants rather than the head terms. Some primary keywords
visible in Search Console at any position, which is the first real signal. Local
pack impressions accumulating. First articles published and indexed.

**Day 90.** Enough query data for the striking distance analysis that could not
be run at the start: filter Search Console to Average Position 6 to 20 and treat
that list as the next quarter's priority, because those are the cheapest wins
available. Recheck for cannibalization now that pages have query data. Compare
the local pack against the competitors identified in backlog item 10.

### The signal to watch for AI overviews

Search Console does not separate AI overview traffic from classic organic. The
usable proxy is **falling click through rate against stable or rising
impressions**, concentrated on informational queries. If the articles from
section 6 start showing that pattern, they are being read inside the overview
rather than clicked.

That is not necessarily a loss for a local trade, since the business can still
be named in the answer, but it changes what the content should do: state facts
in extractable form, keep the business name adjacent to the claims, and put the
conversion path high on the page rather than at the bottom.

### Review cadence

- **Weekly for the first month.** Form submissions and error rate only. You are
  checking that leads arrive, not that rankings moved.
- **Monthly thereafter.** Search Console, GA4 and Business Profile Insights
  against this document.
- **Quarterly.** Rerun the striking distance and cannibalization checks, refresh
  any page whose impressions are decaying, and reassess whether per town pages
  have earned their place yet.
