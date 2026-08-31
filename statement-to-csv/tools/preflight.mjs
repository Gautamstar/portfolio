#!/usr/bin/env node
// Can this site take money yet?
//
//   node tools/preflight.mjs
//
// Exits non-zero while anything still blocks a sale, so it is safe to wire into
// a deploy step. Checks the things that silently cost you a customer, not style.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const exists = (f) => fs.existsSync(path.join(ROOT, f));

const blockers = [];
const warnings = [];
const ok = [];

const app = read("assets/app.js");
const build = read("tools/build-pages.mjs");

/* ---- things that stop money arriving ---- */
const buyUrl = /buyUrl:\s*"([^"]*)"/.exec(app)?.[1] ?? "";
if (buyUrl.includes("REPLACE_WITH") || !buyUrl.startsWith("http")) {
  blockers.push([
    "No checkout link",
    "CONFIG.buyUrl in assets/app.js is still a placeholder. Every Buy button on the site goes nowhere, so nobody can pay you.",
    "Create a Stripe Payment Link (Payment links → one-off → $29) and paste the URL in."
  ]);
} else ok.push(`Checkout points at ${new URL(buyUrl).host}`);

const email = /supportEmail:\s*"([^"]*)"/.exec(app)?.[1] ?? "";
if (email.includes("REPLACE_WITH") || !email.includes("@")) {
  blockers.push([
    "No support address",
    "CONFIG.supportEmail in assets/app.js is still a placeholder. A buyer whose key does not arrive has no way to reach you, and their next move is a chargeback.",
    "Put in a real inbox you actually read."
  ]);
} else ok.push(`Support reaches ${email}`);

const salt = /salt:\s*"([^"]*)"/.exec(app)?.[1] ?? "";
if (salt === "siq-2026-v1" || salt.length < 10) {
  blockers.push([
    "Default licence salt",
    "The salt shipped with the template is public. Anyone who reads it can mint working keys for your product.",
    "Replace CONFIG.salt with a random string, once, before your first sale."
  ]);
} else ok.push("Licence salt is not the shipped default");

/* ---- things that cost you customers quietly ---- */
if (!exists("thanks.html")) {
  warnings.push([
    "No post-purchase page",
    "Point the Stripe Payment Link's confirmation at thanks.html so a buyer knows the key is coming by email rather than wondering if they were scammed."
  ]);
} else ok.push("Post-purchase page exists (point Stripe's confirmation at it)");

const site = /const SITE = "([^"]*)"/.exec(build)?.[1] ?? "";
if (site.includes("github.io")) {
  warnings.push([
    "Canonical URLs point at GitHub Pages",
    `Every page tells Google its canonical home is ${site}. Fine while that is the real address; change SITE in tools/build-pages.mjs and rebuild once you have a domain.`
  ]);
} else ok.push(`Canonical base is ${site}`);

/* ---- generated output in step with its sources ---- */
const pages = fs.readdirSync(ROOT).filter((f) => f.endsWith("-statement-to-csv.html"));
const bankCount = JSON.parse(read("tools/banks.json")).banks.length;
if (pages.length !== bankCount) {
  warnings.push([
    "Landing pages are stale",
    `banks.json lists ${bankCount} institutions but ${pages.length} pages exist. Run: node tools/build-pages.mjs`
  ]);
} else ok.push(`${pages.length} landing pages, in step with banks.json`);

const stale = pages.filter((f) => read(f).includes("support@example.com"));
if (stale.length) {
  warnings.push([`${stale.length} pages carry a hardcoded support address`, "Rebuild: node tools/build-pages.mjs"]);
}

/* ---- licence round trip actually works ---- */
try {
  const { execFileSync } = await import("node:child_process");
  const key = execFileSync("node", [path.join(ROOT, "tools/genkey.mjs"), "1"], { encoding: "utf8" }).trim();
  execFileSync("node", [path.join(ROOT, "tools/genkey.mjs"), "--check", key], { encoding: "utf8" });
  ok.push("Licence keys issue and validate against the live salt");
} catch {
  blockers.push([
    "Licence keys do not round-trip",
    "genkey.mjs issued a key the validator rejected. You would be selling keys that do not work.",
    "Check that CONFIG.salt in assets/app.js is readable and unchanged since the keys were issued."
  ]);
}

/* ---- report ---- */
const bold = (s) => `[1m${s}[0m`;
console.log("");
for (const line of ok) console.log(`  [32m✓[0m ${line}`);
if (warnings.length) {
  console.log(`\n${bold("Worth fixing")}`);
  for (const [t, b] of warnings) console.log(`  [33m![0m ${bold(t)}\n    ${b}`);
}
if (blockers.length) {
  console.log(`\n${bold("Blocking your first sale")}`);
  for (const [t, why, fix] of blockers) console.log(`  [31m✗[0m ${bold(t)}\n    ${why}\n    → ${fix}`);
  console.log(`\n${blockers.length} thing${blockers.length > 1 ? "s" : ""} between you and taking money.\n`);
  process.exit(1);
}
console.log(`\n${bold("Ready to sell.")} Nothing is blocking a payment.\n`);
