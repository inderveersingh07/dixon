/**
 * Single source of truth for every business fact on the site.
 *
 * Nothing here is duplicated in markup. If a phone number, address or hour
 * needs changing, change it here and it updates the header, footer, contact
 * page and the LocalBusiness schema at once.
 */

export const business = {
  name: "Dixon Masonry",
  legalName: "Dixon Masonry",
  owner: {
    firstName: "Brent",
    lastName: "Dixon",
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    jobTitle: "Owner and Mason",
  },

  foundedYear: 2001,

  tagline: "Stone masonry and stone artistry for the homes around Lake Geneva.",

  phone: {
    display: "(262) 233-0392",
    /** E.164, for tel: links and schema. */
    e164: "+12622330392",
  },

  /**
   * The only address used anywhere on this site, by direction.
   * At handoff this becomes the client's address. See docs/HANDOFF.md step 5.
   */
  email: "info@bhatoya.com",

  address: {
    street: "W6805 Beloit Rd.",
    locality: "Lake Geneva",
    region: "WI",
    regionName: "Wisconsin",
    country: "US",
  },

  /**
   * Approximate coordinates for Lake Geneva, WI. Used for LocalBusiness geo.
   * Refine to the exact yard location if the client is comfortable publishing it.
   */
  geo: {
    latitude: 42.5917,
    longitude: -88.4334,
  },

  hours: {
    /** Machine readable, for openingHoursSpecification. */
    spec: [
      {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    /** Human readable, for the footer and contact page. */
    display: [
      { label: "Monday to Saturday", value: "8:00am to 5:00pm" },
      { label: "Sunday", value: "By appointment or survey only" },
    ],
  },

  /**
   * Towns actively served. Does not travel into Illinois.
   * Used for areaServed in schema and for the service area page copy.
   */
  serviceArea: [
    "Lake Geneva",
    "Williams Bay",
    "Fontana-on-Geneva Lake",
    "Lake Como",
    "Delavan",
    "Walworth",
    "Linn",
    "Elkhorn",
  ],

  insured: true,
} as const;

/** Services, in navigation order. Drives the nav, the footer and the homepage cards. */
export const services = [
  {
    slug: "stone-masonry",
    title: "Stone Masonry",
    navLabel: "Stone Masonry",
    blurb:
      "Fieldstone, river rock and natural stone veneer, laid by hand and fitted stone by stone.",
  },
  {
    slug: "fireplaces-chimneys",
    title: "Fireplaces & Chimneys",
    navLabel: "Fireplaces & Chimneys",
    blurb:
      "Full height fireplaces, herringbone fireboxes and chimneys built new or brought back.",
  },
  {
    slug: "pizza-ovens",
    title: "Pizza Ovens",
    navLabel: "Pizza Ovens",
    blurb:
      "Wood fired brick ovens built to order for patios and outdoor kitchens.",
  },
  {
    slug: "restoration-repair",
    title: "Restoration & Repair",
    navLabel: "Restoration & Repair",
    blurb:
      "Cracked brick, failing column bases and tired facades, repaired to match.",
  },
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];
