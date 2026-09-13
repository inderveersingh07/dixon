/**
 * JSON-LD builders.
 *
 * Rules followed here:
 *  - Only describe content that is actually visible on the page.
 *  - One LocalBusiness identity, referenced by @id everywhere else.
 *  - No Review or AggregateRating anywhere. Reviews collected and displayed on
 *    a business's own site about itself are self-serving under Google's review
 *    snippet policy, are not eligible for review rich results, and marking them
 *    up risks a manual action.
 */
import { business } from "../config/business";
import { absoluteUrl, SITE_ORIGIN } from "../config/site";

export const ORG_ID = `${SITE_ORIGIN}/#business`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: business.address.street,
  addressLocality: business.address.locality,
  addressRegion: business.address.region,
  addressCountry: business.address.country,
};

/**
 * The canonical business identity. Emitted once per page.
 * Sunday is deliberately absent: "by appointment only" has no clean
 * representation in openingHoursSpecification, so it lives in visible copy.
 */
export function localBusiness() {
  return {
    "@type": ["LocalBusiness", "GeneralContractor"],
    "@id": ORG_ID,
    name: business.name,
    legalName: business.legalName,
    url: SITE_ORIGIN + "/",
    telephone: business.phone.e164,
    email: business.email,
    foundingDate: String(business.foundedYear),
    description: business.tagline,
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    areaServed: business.serviceArea.map((name) => ({
      "@type": "City",
      name,
      containedInPlace: {
        "@type": "State",
        name: business.address.regionName,
      },
    })),
    openingHoursSpecification: business.hours.spec.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    founder: {
      "@type": "Person",
      name: business.owner.fullName,
    },
    logo: absoluteUrl("/favicon-512.png"),
    image: absoluteUrl("/og-default.jpg"),
  };
}

export function website() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_ORIGIN + "/",
    name: business.name,
    publisher: { "@id": ORG_ID },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbs(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function service(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    serviceType: opts.name,
    provider: { "@id": ORG_ID },
    areaServed: business.serviceArea.map((name) => ({ "@type": "City", name })),
  };
}

export function person() {
  return {
    "@type": "Person",
    name: business.owner.fullName,
    jobTitle: business.owner.jobTitle,
    worksFor: { "@id": ORG_ID },
  };
}

export interface QA {
  q: string;
  a: string;
}

export function faqPage(items: QA[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** Wraps whatever blocks a page supplies into a single @graph document. */
export function graph(nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
