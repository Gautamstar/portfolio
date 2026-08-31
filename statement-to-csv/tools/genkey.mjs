#!/usr/bin/env node
// Issue licence keys for Statement to CSV.
//
//   node tools/genkey.mjs                        one key
//   node tools/genkey.mjs 20                     twenty keys
//   node tools/genkey.mjs --for buyer@email.com  a key bound to a buyer, so you
//                                                can tell later which key leaked
//
// The salt is read from assets/app.js, so there is nothing to keep in sync.
// Changing it there invalidates every key you have already sold.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// The salt lives in assets/app.js so the page and this script can never drift
// apart. A key that validates here is a key the page accepts, by construction.
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appJs = fs.readFileSync(path.join(ROOT, "assets/app.js"), "utf8");
const found = /salt:\s*"([^"]+)"/.exec(appJs);
if (!found) {
  console.error("Could not read the salt from assets/app.js. Has the CONFIG block been renamed?");
  process.exit(1);
}
const SALT = found[1];

const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // Crockford-ish: no I, L, O, U

function h32(s) {
  let h1 = 0x811c9dc5 >>> 0;
  let h2 = 0x01000193 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h1 = (h1 ^ s.charCodeAt(i)) >>> 0;
    h1 = Math.imul(h1, 16777619) >>> 0;
    h2 = (Math.imul(h2 ^ s.charCodeAt(i), 2246822519) + i) >>> 0;
  }
  let v = (BigInt(h1) << 32n) | BigInt(h2);
  let out = "";
  for (let i = 0; i < 5; i++) {
    out = ALPHABET[Number(v & 31n)] + out;
    v >>= 5n;
  }
  return out;
}

function block(seed) {
  let out = "";
  for (let i = 0; i < 5; i++) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return out;
}

function makeKey() {
  const a = block();
  const b = block();
  return `SIQ-${a}-${b}-${h32(a + b + SALT)}`;
}

function valid(key) {
  const m = /^SIQ-([0-9A-HJKMNP-TV-Z]{5})-([0-9A-HJKMNP-TV-Z]{5})-([0-9A-HJKMNP-TV-Z]{5})$/
    .exec(String(key || "").trim().toUpperCase());
  return !!m && h32(m[1] + m[2] + SALT) === m[3];
}

const args = process.argv.slice(2);

// --check KEY : verify a key a customer says isn't working
const checkAt = args.indexOf("--check");
if (checkAt !== -1) {
  const key = args[checkAt + 1];
  console.log(valid(key) ? `VALID    ${key}` : `INVALID  ${key}`);
  process.exit(valid(key) ? 0 : 1);
}

const forAt = args.indexOf("--for");
const buyer = forAt !== -1 ? args[forAt + 1] : null;
const count = Math.max(1, parseInt(args.find((a) => /^\d+$/.test(a)) || "1", 10));

const issued = [];
for (let i = 0; i < count; i++) issued.push(makeKey());

if (buyer) {
  const stamp = new Date().toISOString().slice(0, 10);
  for (const k of issued) console.log(`${stamp},${buyer},${k}`);
  console.error(`\nAppend those lines to licences.csv so you keep a record of who has what.`);
} else {
  for (const k of issued) console.log(k);
}

// sanity: never ship a key the page will reject
for (const k of issued) {
  if (!valid(k)) {
    console.error(`BUG: generated an invalid key (${k}). Do not send it.`);
    process.exit(1);
  }
}
