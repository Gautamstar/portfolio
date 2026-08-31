#!/usr/bin/env node
// Generates the per-institution landing pages, the hub that links them, and
// sitemap.xml / robots.txt.
//
//   node tools/build-pages.mjs
//
// Shared chrome (masthead, converter, disclosures, footer) is sliced out of
// index.html at build time rather than duplicated here, so editing the homepage
// updates every landing page on the next build. Run it after any change to
// index.html or tools/banks.json, and commit the generated HTML — the site
// itself stays static with no build step at serve time.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Change this to your own domain before launch. It is what canonical tags and
// the sitemap point at, and getting it wrong is the one mistake here that
// actively costs rankings.
const SITE = "https://gautamstar.github.io/portfolio/statement-to-csv";

const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const data = JSON.parse(fs.readFileSync(path.join(ROOT, "tools/banks.json"), "utf8"));
const banks = data.banks;

/* ---------- pull the shared blocks out of the homepage ---------- */
function slice(startMarker, endMarker, label) {
  const a = html.indexOf(startMarker);
  if (a === -1) throw new Error(`build: could not find the start of ${label} in index.html`);
  const b = html.indexOf(endMarker, a);
  if (b === -1) throw new Error(`build: could not find the end of ${label} in index.html`);
  return html.slice(a, b + endMarker.length);
}
const MASTHEAD = slice('<header class="masthead"', "</header>", "the masthead");
const CONVERTER = slice('<section class="doc">', "</section>", "the converter");
const DISCLOSURES = slice('<div class="disclosures">', "</div>\n</div>", "the disclosures band");
const FOOTER = slice("<footer>", "</footer>", "the footer");
const DIALOG = slice('<dialog id="dlg">', "</dialog>", "the licence dialog");
const PRICING = slice('<section class="band" id="pricing">', "</section>", "the pricing table");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const jsonld = (o) => JSON.stringify(o).replace(/</g, "\\u003c");

const KIND_WORD = { bank: "bank", card: "credit card", broker: "brokerage", fintech: "account" };
const hasBalance = (b) => b.sample.some((r) => r[3] !== "" && r[3] != null);

/* ---------- the questions, part shared and part per-institution ---------- */
function faqs(b) {
  const kind = KIND_WORD[b.kind] || "bank";
  const out = [
    {
      q: `Is my ${b.name} statement uploaded anywhere?`,
      a: `No. The conversion runs inside your browser tab using a PDF engine loaded with the page, and there is no server behind this site to receive a file. You can confirm it: open your browser's network panel before converting and you will see no request carrying the document. Once the page has loaded you can disconnect from the internet and it still works.`
    },
    {
      q: `Which ${b.name} statements does this work with?`,
      a: `Any ${b.name} ${kind} statement saved as a PDF with a text layer, which is what you get when you download one from online banking. It is not written against a fixed ${b.name} template — it reads the layout of the page itself, so it keeps working when the statement design changes. Scanned or photographed statements are images with no text to read and need OCR first.`
    },
    {
      q: `Why not just download CSV from ${b.name}?`,
      a: `Where that covers the period you need, do that instead — it is fewer steps. ${b.native} Converting the statement PDF is the route to periods the direct download will not reach, and it produces a file that matches the statement a lender or accountant has already seen.`
    }
  ];
  if (b.quirks[0]) out.push({ q: b.quirks[0].t + "?", a: b.quirks[0].b });
  return out;
}

function related(b) {
  const same = banks.filter((x) => x.slug !== b.slug && x.region === b.region);
  const rest = banks.filter((x) => x.slug !== b.slug && x.region !== b.region);
  return [...same, ...rest].slice(0, 5);
}

/* ---------- one landing page ---------- */
function page(b) {
  const kind = KIND_WORD[b.kind] || "bank";
  const url = `${SITE}/${b.slug}-statement-to-csv.html`;
  const title = `Convert a ${b.name} statement to CSV — free, and nothing is uploaded`;
  const desc = `Turn a ${b.name} PDF ${kind} statement into a clean CSV or Excel file. Runs entirely in your browser, so the statement never leaves your computer. No account needed.`;
  const f = faqs(b);

  const ld = [
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Statement to CSV", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: "Banks", item: SITE + "/banks.html" },
        { "@type": "ListItem", position: 3, name: b.name, item: url }
      ]
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: f.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } }))
    },
    {
      "@context": "https://schema.org", "@type": "HowTo",
      name: `How to convert a ${b.name} statement to CSV`,
      step: [
        { "@type": "HowToStep", name: "Download the statement", text: b.getpdf },
        { "@type": "HowToStep", name: "Drop it in", text: "Choose the PDF on this page. It is read in your browser and never sent anywhere." },
        { "@type": "HowToStep", name: "Check the columns", text: b.expect },
        { "@type": "HowToStep", name: "Export", text: "Download the CSV or copy the rows straight into a spreadsheet." }
      ]
    }
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%2317376A'/%3E%3Cpath d='M8 7h9l7 7v11H8z' fill='none' stroke='%23fff' stroke-width='1.6'/%3E%3Cpath d='M11 18h10M11 21.5h6' stroke='%23fff' stroke-width='1.6'/%3E%3C/svg%3E">
<link rel="stylesheet" href="assets/app.css">
${ld.map((o) => `<script type="application/ld+json">${jsonld(o)}</script>`).join("\n")}
</head>
<body>

${MASTHEAD}

<main>

<div class="intro">
  <div class="wrap">
    <nav class="crumb" aria-label="Breadcrumb">
      <a href="index.html">Statement / CSV</a> <span>/</span> <a href="banks.html">Banks</a> <span>/</span> <em>${esc(b.name)}</em>
    </nav>
    <div class="intro-grid">
      <div>
        <p class="eyebrow">${esc(b.region)} · ${esc(kind)} statement</p>
        <h1>Convert a ${esc(b.name)} statement to CSV</h1>
        <p class="lede">Drop your ${esc(b.name)} PDF below and take back a clean spreadsheet. The conversion happens inside this browser tab — <strong>the statement is never transmitted anywhere</strong>, which matters more than usual for a document that lists everything you spent.</p>
      </div>
      <dl class="assurances">
        <div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 3l7.5 3.2v5.6c0 4.6-3.1 8.3-7.5 9.4-4.4-1.1-7.5-4.8-7.5-9.4V6.2L12 3z"/><path d="M9 12.2l2.2 2.2L15.4 10"/></svg>
          <div><dt>Nothing is uploaded</dt><dd>Open your network panel while you convert. No request carries the file, because none is made.</dd></div>
        </div>
        <div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="15" rx="1"/><path d="M3.5 9.5h17M9 9.5v10"/></svg>
          <div><dt>Built for this layout</dt><dd>${esc(b.expect)}</dd></div>
        </div>
        <div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.2v5.1l3.3 1.9"/></svg>
          <div><dt>Free to try on a real file</dt><dd>Convert your own statement and see every parsed row before deciding whether to pay for anything.</dd></div>
        </div>
      </dl>
    </div>
  </div>
</div>

<div class="wrap">
${CONVERTER}
</div>

<section class="band">
  <div class="wrap">
    <p class="eyebrow">The layout</p>
    <h2>What a ${esc(b.name)} statement prints</h2>
    <p class="lede">This is the shape these statements most commonly take. Your file may differ — step 2 above always shows you what was actually found, which is the only thing that matters.</p>
    <div class="layout-grid">
      <table class="spec">
        <tbody>
          <tr><th>Columns</th><td>${b.layout.columns.map((c) => `<code>${esc(c)}</code>`).join(" ")}</td></tr>
          <tr><th>Dates</th><td>${esc(b.layout.dates)}</td></tr>
          <tr><th>Numbers</th><td>${esc(b.layout.numbers)}</td></tr>
          <tr><th>Expect</th><td>${esc(b.expect)}</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <p class="eyebrow">The output</p>
    <h2>What you get back</h2>
    <p class="lede">Three rows from a ${esc(b.name)} statement, as they come out of the converter. Dates are shown as printed — normalising them to ISO is one dropdown.</p>
    <div class="samplewrap">
      <table class="sample-out">
        <thead><tr><th>Date</th><th>Description</th><th class="n">Amount</th>${hasBalance(b) ? '<th class="n">Balance</th>' : ""}</tr></thead>
        <tbody>
          ${b.sample.map((r) => `<tr><td class="d">${esc(r[0])}</td><td>${esc(r[1])}</td><td class="n${String(r[2]).startsWith("-") ? " neg" : ""}">${esc(r[2])}</td>${hasBalance(b) ? `<td class="n">${esc(r[3])}</td>` : ""}</tr>`).join("\n          ")}
        </tbody>
      </table>
    </div>
    <p class="stat" style="margin-top:14px">Descriptions that wrapped across two printed lines are rejoined into one row, so reference numbers and foreign-currency detail survive into the file rather than being lost.</p>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <p class="eyebrow">Worth knowing</p>
    <h2>Specific to ${esc(b.name)} statements</h2>
    <p class="lede">Every institution prints something that trips up a naive conversion. These are the ones that come up with ${esc(b.name)}.</p>
    <div class="quirks">
      ${b.quirks.map((q) => `<div class="quirk"><h3>${esc(q.t)}</h3><p>${esc(q.b)}</p></div>`).join("\n      ")}
    </div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <p class="eyebrow">Getting the file</p>
    <h2>Downloading the statement</h2>
    <p class="lede">${esc(b.getpdf)} You need the PDF itself rather than a screenshot or a printout, because the conversion reads the text layer inside the file.</p>
    <p class="lede" style="margin-bottom:0">${esc(b.native)}</p>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <p class="eyebrow">Questions</p>
    <h2>About ${esc(b.name)} conversions</h2>
    ${f.map((x) => `<details class="faq"><summary>${esc(x.q)}</summary><p>${esc(x.a)}</p></details>`).join("\n    ")}
  </div>
</section>

${PRICING}

<section class="band">
  <div class="wrap">
    <p class="eyebrow">Other institutions</p>
    <h2>Converting statements from elsewhere</h2>
    <ul class="related">
      ${related(b).map((r) => `<li><a href="${r.slug}-statement-to-csv.html">${esc(r.name)}<span>${esc(r.region)} · ${esc(KIND_WORD[r.kind] || "bank")}</span></a></li>`).join("\n      ")}
      <li><a href="banks.html">All institutions<span>The full list</span></a></li>
    </ul>
  </div>
</section>

</main>

${DISCLOSURES}
${FOOTER}
${DIALOG}

<script src="vendor/pdf.min.js"></script>
<script src="assets/app.js"></script>
</body>
</html>
`;
}


/* ---------- the page a buyer lands on after paying ---------- */
function thanks() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Thank you — your licence key is on its way</title>
<meta name="robots" content="noindex">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%2317376A'/%3E%3Cpath d='M8 7h9l7 7v11H8z' fill='none' stroke='%23fff' stroke-width='1.6'/%3E%3Cpath d='M11 18h10M11 21.5h6' stroke='%23fff' stroke-width='1.6'/%3E%3C/svg%3E">
<link rel="stylesheet" href="assets/app.css">
</head>
<body>
${MASTHEAD}
<main>
<div class="intro">
  <div class="wrap" style="max-width:660px">
    <p class="eyebrow">Payment received</p>
    <h1>Thank you. Your licence key is on its way.</h1>
    <p class="lede">Keys are issued by hand, so this is not instant — expect it within a few hours, to the email address you gave at checkout. If it has not arrived by tomorrow, it has gone astray rather than been forgotten, and one message sorts it out.</p>
    <div class="doc" style="margin:32px 0">
      <div class="doc-head"><h2>What happens next</h2></div>
      <div class="panel">
        <div class="panel-label"><span class="step">1</span><h3>The key arrives by email</h3></div>
        <p class="stat" style="margin:0">It looks like <code style="font-family:var(--mono);background:var(--paper-sunk);border:1px solid var(--rule);padding:2px 6px">SIQ-XXXXX-XXXXX-XXXXX</code>. Keep the email — it is the only copy.</p>
      </div>
      <div class="panel">
        <div class="panel-label"><span class="step">2</span><h3>Enter it once per browser</h3></div>
        <p class="stat" style="margin:0">Open the converter, choose <strong>Enter licence</strong> in the top right, and paste it in. It is stored in that browser only, so enter it again on any other machine you use. There is no limit on how many.</p>
      </div>
      <div class="panel">
        <div class="panel-label"><span class="step">3</span><h3>Every limit comes off</h3></div>
        <p class="stat" style="margin:0">Unlimited rows and pages, several statements in one pass, and every later version — with no renewal.</p>
      </div>
    </div>
    <p class="lede">Something wrong, or changed your mind inside 30 days? Write to <a data-support data-support-text href="#">support</a> and it is refunded, no explanation needed.</p>
    <p style="margin-top:26px"><a class="btn primary" href="index.html">Go to the converter</a></p>
  </div>
</div>
</main>
${FOOTER}
${DIALOG}
<script src="assets/app.js"></script>
</body>
</html>
`;
}

/* ---------- the hub ---------- */
function hub() {
  const groups = {};
  for (const b of banks) (groups[b.region] ||= []).push(b);
  const title = "Convert a bank statement to CSV — by institution";
  const desc = "Per-bank guides to turning a PDF statement into a spreadsheet, for US, UK and global institutions. Every conversion runs in your browser with nothing uploaded.";
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE}/banks.html">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%2317376A'/%3E%3Cpath d='M8 7h9l7 7v11H8z' fill='none' stroke='%23fff' stroke-width='1.6'/%3E%3Cpath d='M11 18h10M11 21.5h6' stroke='%23fff' stroke-width='1.6'/%3E%3C/svg%3E">
<link rel="stylesheet" href="assets/app.css">
</head>
<body>
${MASTHEAD}
<main>
<div class="intro">
  <div class="wrap">
    <nav class="crumb" aria-label="Breadcrumb"><a href="index.html">Statement / CSV</a> <span>/</span> <em>Banks</em></nav>
    <p class="eyebrow">By institution</p>
    <h1>Statements we have notes on</h1>
    <p class="lede" style="max-width:62ch">The converter is not written per bank — it reads the geometry of whatever page you give it, so an institution missing from this list still converts. These pages exist because each one prints something worth knowing about in advance.</p>
  </div>
</div>
<div class="wrap">
${Object.entries(groups).map(([region, list]) => `
  <section class="band" style="border-top:0;padding-top:34px">
    <p class="eyebrow">${esc(region)}</p>
    <ul class="related wide">
      ${list.map((b) => `<li><a href="${b.slug}-statement-to-csv.html">${esc(b.name)}<span>${esc(b.layout.columns.length)} columns · ${esc(KIND_WORD[b.kind] || "bank")}</span></a></li>`).join("\n      ")}
    </ul>
  </section>`).join("")}
  <p class="lede" style="padding-bottom:40px"><a href="index.html">Convert a statement now →</a></p>
</div>
</main>
${DISCLOSURES}
${FOOTER}
${DIALOG}
<script src="assets/app.js"></script>
</body>
</html>
`;
}

/* ---------- write everything ---------- */
const written = [];
for (const b of banks) {
  const file = `${b.slug}-statement-to-csv.html`;
  fs.writeFileSync(path.join(ROOT, file), page(b));
  written.push(file);
}
fs.writeFileSync(path.join(ROOT, "banks.html"), hub());
written.push("banks.html");
fs.writeFileSync(path.join(ROOT, "thanks.html"), thanks());
written.push("thanks.html");

const urls = ["index.html", "banks.html", ...banks.map((b) => `${b.slug}-statement-to-csv.html`)];
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(ROOT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${SITE}/${u}</loc><lastmod>${today}</lastmod><priority>${u === "index.html" ? "1.0" : "0.8"}</priority></url>`).join("\n") +
    `\n</urlset>\n`
);
fs.writeFileSync(path.join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`${written.length} pages + sitemap.xml + robots.txt`);
console.log(`canonical base: ${SITE}`);
if (SITE.includes("github.io")) {
  console.error(`\nNote: canonical URLs still point at GitHub Pages. Change SITE in this file before launch.`);
}
