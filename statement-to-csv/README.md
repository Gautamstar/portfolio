# Statement to CSV

A browser-only converter that turns PDF bank and brokerage statements into CSV.
No server, no upload, no account — the parsing happens in the visitor's own tab.

That constraint is the product. Every paid competitor in this niche
(DocuClipper, MoneyThumb, ProperConvert, the various "bank2csv" sites) asks you
to upload a document that lists every purchase you made last month. A tool that
demonstrably cannot see your statement is a different offer, not a cheaper one.

It also means hosting costs nothing and scales to any traffic, so the thing
cannot lose money while it waits to find customers.

---

## What's here

| Path | What it is |
| :--- | :--- |
| `index.html` | The homepage — pitch, converter, pricing, disclosures. |
| `assets/` | `app.css` and `app.js`: the whole product, shared by every page. |
| `*-statement-to-csv.html` | 18 generated per-institution landing pages. |
| `banks.html` | The hub linking them, plus `sitemap.xml` and `robots.txt`. |
| `vendor/` | pdf.js 3.11.174, self-hosted (Apache-2.0, licence included). |
| `fonts/` | Source Serif 4, Public Sans and IBM Plex Mono, latin subset (OFL). |
| `tools/genkey.mjs` | Issues and verifies licence keys. This is how you fulfil a sale. |
| `tools/build-pages.mjs` | Regenerates the landing pages from `tools/banks.json`. |
| `tools/README-seo.md` | **Read before publishing the landing pages.** |

The landing pages are generated, not hand-written:

```bash
node tools/build-pages.mjs
```

Shared chrome is sliced out of `index.html` at build time, so editing the
homepage updates all 19 pages on the next build. Commit the generated HTML — the
site itself stays static with nothing to build at serve time. `SITE` at the top
of that script still points at GitHub Pages; change it to your domain before
launch or every canonical tag points at the wrong place.

Every asset is served from your own origin. The page makes **no third-party
request at all**, which is what lets the FAQ invite people to open their network
panel and check — a Google Fonts request in that panel would undercut the one
claim the product is sold on.

## The design, and why it looks like this

Someone is being asked to hand over a document listing every purchase they made
last month. The page has to earn that in the first two seconds, so it borrows
the visual language of institutional finance rather than of a SaaS landing page:
a serif display face with a formal masthead and a single brass rule, hairline
dividers instead of floating cards, tabular figures throughout, numbered steps,
and a disclosures band set as fine print.

Two rules held while building it, and worth holding as you edit:

- **The accent is navy, not green.** Green and red are reserved for credit and
  debit. A brand accent that collides with semantic colour makes a ledger harder
  to read, which is the one thing this page cannot afford.
- **No invented trust signals.** There are no certification badges, no security
  seals, no customer counts, no testimonials. Everything asserted on the page is
  either verifiable by the visitor (open the network panel) or is a promise you
  personally control (the refund window). Financial buyers check, and one
  fabricated badge costs more than every sale it wins. The disclosures band
  states the real limitations — scans need OCR, output needs reconciling — which
  is what actual institutions do, and it reads as more credible than a badge.

---

## How the parser works

Statements have no common format, so it reads geometry rather than templates.

1. **Rows.** pdf.js gives every text run an `(x, y)`. Runs sharing a baseline
   (within 3.2 units) become a row; runs whose boxes nearly touch merge into a
   cell, so `Mar` `15` becomes one token.
2. **Transaction rows.** A row qualifies if one of its first three cells parses
   as a date *and* it holds at least one amount. Headers, addresses and
   marketing lines fail this and drop out on their own — which is why repeated
   page headers cost nothing on a 40-page statement.
3. **Money columns.** Every amount's *right* edge is collected across the whole
   document and clustered in one dimension (gap > 22 units splits a cluster).
   Statements right-align numbers, so these clusters are the actual columns.
   A cluster needs at least two members to count, which discards stray figures
   in the body text.
4. **Roles.** One column → Amount. Two → Amount, Balance. Three → Debit, Credit,
   Balance. The guess is shown with sample values and the user corrects it —
   that correction step is what makes unusual layouts work at all.
5. **Wrapped lines.** A row with no date that starts inside the description
   column *and* sits within ~2.2 line-heights of the row above is a continuation
   and gets appended. Footers fail both tests, which keeps
   `Member FDIC. Questions? Call...` out of your last transaction.
6. **Number format.** `1,234.56` vs `1.234,56` is decided once per document by
   majority vote, and drives the date-order default too.

Verified end to end against generated statements in three shapes: a US chequing
statement with Withdrawals/Deposits/Balance, a credit card with one Amount
column and wrapped descriptions, a three-page statement whose header and footer
repeat on every page (41/41 rows, no furniture), and a German statement in
`1.234,56` / `DD.MM.YYYY` (auto-detected, correctly normalised).

**Known limits, state them honestly on the site:**

- Scanned statements have no text layer. Nothing to extract; the error message
  says to OCR first. Do not pretend otherwise — a refund request over this
  costs more than the sale.
- Password-protected PDFs must be unlocked first.
- Statements that put transactions in prose rather than dated rows won't parse.
- Layouts with a genuinely ambiguous single column of mixed debits and credits
  need the sign flip toggle.

---

## Deploying

It is static files. Committing to `main` publishes it, since GitHub Pages
already serves this repository:

```
https://gautamstar.github.io/portfolio/statement-to-csv/
```

That is fine for launch. Before spending on traffic, move it to its own domain —
a tool living under `/portfolio/` reads as a side project, and a side project is
hard to charge $29 for. Buy a domain, point it at Pages, and update the
`canonical` and `og:` tags in `index.html`.

To run it locally:

```bash
python -m http.server 8000    # then open http://localhost:8000/statement-to-csv/
```

It must be served over HTTP, not opened as a `file://` path — the pdf.js worker
won't load otherwise.

---

## Turning it on: taking money

Two edits and you can sell. Both are at the top of the script block in
`index.html`, under `CONFIG`.

### 1. Checkout

Create a **Stripe Payment Link** (Stripe dashboard → Payment links → one-off,
$29). No server and no API key is involved; Stripe hosts the checkout page. Paste
the URL:

```js
buyUrl: "https://buy.stripe.com/your_real_link"
```

Gumroad or Lemon Squeezy work identically and handle EU VAT for you, at a higher
cut. If you expect European buyers, that trade is usually worth it — VAT on
digital goods is owed based on the buyer's country, not yours, from the first
sale.

### 2. Licence salt

`CONFIG.salt` in `index.html` and `SALT` in `tools/genkey.mjs` must match. Change
it once, now, to something only you know — then never again, because changing it
invalidates every key you have already sold.

### 3. Fulfilling a sale

```bash
node tools/genkey.mjs --for buyer@example.com
# 2026-08-31,buyer@example.com,SIQ-4KQ7M-91TDR-8W2FE
```

Append that line to a `licences.csv` you keep locally and email the key. Set
Stripe to notify you on payment; at early volume, replying by hand within the
hour is a competitive advantage, not a burden. Automate only once it hurts —
Stripe → Zapier → email template covers it without writing a server.

To check a key a customer says is broken:

```bash
node tools/genkey.mjs --check SIQ-4KQ7M-91TDR-8W2FE
```

### What the licence check actually is

It is a checksum validated in the browser, and anyone who reads the page source
can mint keys. That is deliberate: a server-side check needs a server, which
breaks the "nothing leaves your device" promise that is the entire reason to buy
this instead of a competitor.

At $29, deterrence is the right level. The people who would crack it were never
going to pay, and the bookkeepers who are your actual market will not. Revisit
only if you find keys posted publicly — then move validation to a Cloudflare
Worker that checks a key list, and keep the PDF parsing local so the promise
still holds.

---

## The part I cannot do for you

The product is finished. It is worth roughly nothing until people find it, and
that half is entirely distribution. Be clear-eyed: most tools like this earn $0
because they are built and then not launched.

### Who actually buys

Not the person converting one statement for a mortgage application — they will
use the free tier and leave, and that is fine. The buyer is someone who does this
**repeatedly**:

- bookkeepers and small accounting practices at month-end close
- landlords reconciling several rental accounts
- people rebuilding a year of books for a tax filing or an audit
- anyone whose bank charges for CSV export or only offers 90 days of history

Write for them. "Close the month faster" sells; "PDF parser" does not.

### First 30 days, in order

1. **Buy a domain and move it there.** Everything below points at it.
2. **Post where the buyers already complain.** r/Bookkeeping, r/Accounting,
   r/QuickBooks, r/smallbusiness, r/personalfinance. Do not drop a link — answer
   a real "how do I get my statements into Excel" thread, mention that you built
   a free tool that runs locally, link it. One genuinely helpful answer a day for
   two weeks beats any launch post.
3. **Hacker News, Show HN.** The privacy architecture is the story: "Show HN:
   Bank statement to CSV that runs entirely in your browser." Post Tuesday to
   Thursday, early morning US Pacific, and stay in the comments all day. This is
   your single highest-variance day — it either does nothing or sends 10k
   visitors.
4. **Product Hunt**, same angle, a week after HN.
5. **The per-institution pages are already built** — 18 of them, covering US, UK
   and global institutions. They are the only durable traffic source here. Set
   the canonical domain, submit the sitemap to Search Console and Bing, then read
   `tools/README-seo.md`, which covers the two fields worth verifying and the
   duplicate-content risk this technique carries. Add more only when you can
   write three real quirks for the institution.

### Honest numbers

Conversion on a free tool like this runs about 1–3% of visitors who successfully
convert a file. Roughly:

| Monthly visitors | Convert a file | Buy at 2% | Revenue |
| ---: | ---: | ---: | ---: |
| 300 | ~120 | 2 | ~$58 |
| 1,000 | ~400 | 8 | ~$230 |
| 5,000 | ~2,000 | 40 | ~$1,160 |

Reaching 1,000 organic visitors a month takes three to six months of the
per-bank pages, assuming they rank. A good HN day can do that in an afternoon
once, which is why you should have Stripe live *before* you post.

None of this is passive. The build is done; the work that remains is the work
that decides whether it earns.

### The obvious next move, once anything sells

$29 one-time to a bookkeeping firm that converts 200 statements a month is
mispriced, badly. If sales come mostly from firms rather than individuals, add a
**Firm** tier at $199 — same product, plus batch and saved per-bank column
setups — and let the $29 tier stay as the on-ramp. Do not do this before you
have evidence about who is actually buying.

---

## Licence

pdf.js is Apache-2.0 (`vendor/pdf.js-LICENSE.txt`). The rest is yours.
