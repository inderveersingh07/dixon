import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Testimonials.
 *
 * One file per review. Adding a new one is a matter of dropping a file in
 * src/content/testimonials/ and redeploying. See docs/HANDOFF.md step 1.
 *
 * `order` decides which quote appears where. Pages pull by slug, so renaming a
 * file means updating the page that references it.
 */
const testimonials = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/testimonials" }),
  schema: z.object({
    /** Customer name as they are happy to be published. */
    name: z.string(),
    /** Town, or an empty string to omit. */
    town: z.string().default(""),
    /** The review in the customer's own words. Do not paraphrase or tidy. */
    quote: z.string(),
    /** Rough date, e.g. "August 2025". Shown only if present. */
    date: z.string().default(""),
    /** Which job this relates to, used to place it on the right page. */
    topic: z
      .enum(["stone-masonry", "fireplaces-chimneys", "pizza-ovens", "restoration-repair", "general"])
      .default("general"),
  }),
});

export const collections = { testimonials };
