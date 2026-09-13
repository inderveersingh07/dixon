#!/usr/bin/env node
/**
 * Pre-launch gate.
 *
 * Run `npm run prelaunch` before taking the site live. It fails if anything
 * that is only acceptable on staging is still in the source.
 *
 * This is the safety net that stops placeholder review text, the fake fallback
 * phone number, or the staging noindex from reaching a live site.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const scanDirs = ["src", "functions", "public"];
const skipDirs = new Set(["node_modules", "dist", ".astro", ".git", ".wrangler"]);

/** Each rule is a thing that must not survive to launch. */
const rules = [
  {
    id: "placeholder-reviews",
    pattern: /TKTK_REVIEW_\d+/,
    message:
      "Placeholder review text is still present. Replace it with the customer's own words in src/content/testimonials/.",
  },
  {
    id: "placeholder-names",
    pattern: /PLACEHOLDER (REVIEWER|TOWN)/,
    message:
      "Placeholder reviewer names are still present in src/content/testimonials/.",
  },
  {
    id: "fallback-phone",
    pattern: /\(555\)\s*555-5555/,
    message:
      "The placeholder phone number is still in the contact form error message. Replace it in src/components/ContactForm.astro.",
  },
  {
    id: "generic-tktk",
    pattern: /TKTK_[A-Z_]+/,
    message: "An unresolved TKTK placeholder is still in the source.",
  },
  {
    id: "wrong-email",
    pattern: /noreply@bhatoya\.com|dixonmasonry@gmail\.com/,
    message:
      "An address that should not appear on this build was found. Only info@bhatoya.com is used until the handoff swaps it.",
  },
];

const exts = new Set([".astro", ".ts", ".js", ".mjs", ".md", ".mdx", ".css", ".json", ".txt"]);

function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const entry of entries) {
    if (skipDirs.has(entry)) continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      yield* walk(full);
    } else if (exts.has(full.slice(full.lastIndexOf(".")))) {
      yield full;
    }
  }
}

const hits = [];

for (const dir of scanDirs) {
  for (const file of walk(join(root, dir))) {
    // The rules list itself obviously contains every pattern.
    if (file.includes("prelaunch-check")) continue;

    const lines = readFileSync(file, "utf8").split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const rule of rules) {
        if (rule.pattern.test(line)) {
          hits.push({
            rule,
            file: relative(root, file).replace(/\\/g, "/"),
            line: i + 1,
            text: line.trim().slice(0, 110),
          });
        }
      }
    });
  }
}

// STAGING must be off before launch.
const siteConfig = readFileSync(join(root, "src/config/site.ts"), "utf8");
const stagingOn = /export const STAGING\s*=\s*true/.test(siteConfig);

console.log("");
console.log("Dixon Masonry pre-launch check");
console.log("------------------------------");

if (stagingOn) {
  console.log("");
  console.log("  STAGING is true.");
  console.log("  The site emits noindex and a disallowing robots.txt.");
  console.log("  Set STAGING = false in src/config/site.ts to go live.");
}

if (hits.length === 0 && !stagingOn) {
  console.log("");
  console.log("  Nothing outstanding. Clear to launch.");
  console.log("");
  process.exit(0);
}

// Group by rule so the output reads as a task list, not a log dump.
const grouped = new Map();
for (const hit of hits) {
  if (!grouped.has(hit.rule.id)) grouped.set(hit.rule.id, { rule: hit.rule, items: [] });
  grouped.get(hit.rule.id).items.push(hit);
}

for (const { rule, items } of grouped.values()) {
  console.log("");
  console.log(`  ${rule.message}`);
  for (const item of items.slice(0, 10)) {
    console.log(`    ${item.file}:${item.line}`);
  }
  if (items.length > 10) {
    console.log(`    ...and ${items.length - 10} more`);
  }
}

console.log("");
console.log(
  `  ${hits.length} item(s) outstanding${stagingOn ? ", plus STAGING is still true" : ""}.`,
);
console.log("  See docs/HANDOFF.md.");
console.log("");

// Exit 1 so this can gate a deploy if anyone wires it into CI.
process.exit(1);
