# The per-institution pages

18 landing pages plus a hub, generated from `banks.json` by `build-pages.mjs`.
They exist to catch searches like *convert chase statement to csv*, which is a
low-competition query with obvious commercial intent, and they are the only
traffic source here that compounds.

```bash
node tools/build-pages.mjs      # regenerates every page, the hub, sitemap, robots
```

Shared chrome is sliced out of `index.html` at build time, so editing the
homepage masthead, converter, pricing table or disclosures updates all 19 pages
on the next build. The generated HTML is committed — the site stays static with
no build step at serve time.

## Before you publish: three things to do

**1. Set the canonical domain.** `SITE` at the top of `build-pages.mjs` still
points at GitHub Pages. Change it to your real domain and rebuild, or every page
will tell Google the canonical version lives somewhere else. The build prints a
warning while it is still wrong.

**2. Verify the claims you can check.** The layout descriptions are archetypes —
what these statements most commonly print — and every page tells the reader that
step 2 shows what was actually found in their own file, so being approximately
right is not harmful. Two fields are worth a real check against a current
statement, because they are stated as fact:

- `getpdf` — the navigation path to download a PDF. Banks reorganise these
  menus constantly. Keep the wording general enough to survive a redesign.
- `native` — what the institution offers as a direct download. These are written
  as the general pattern (limited recent window, PDFs go back further) which
  holds almost everywhere, but if you know a specific limit, say it — a concrete
  number is worth more than a hedge.

Check the ones you actually bank with first. Publish the rest as they are; the
statements are hedged, not invented.

**3. Submit the sitemap.** Google Search Console, then Bing Webmaster Tools.
Both are free and take ten minutes. Without this you are waiting to be
discovered rather than asking to be indexed.

## The duplicate-content problem, honestly

Google penalises doorway pages — near-identical pages differing only by a swapped
keyword. That is the exact shape this technique can take, so it is worth knowing
where these pages actually sit.

Measured across the 18 pages: mean pairwise 6-gram similarity is **0.48**, worst
pair 0.55 (HSBC and Lloyds, both UK banks with the same column layout). Each page
runs about 1,080 words, of which roughly half is genuinely institution-specific:
the column table, the worked output example, three quirks, the download route,
and one bank-specific question.

That is defensible rather than comfortable. The shared half is mostly the
converter interface and the disclosures, which is functional content rather than
spun text — a tool that works on every page is not the same thing as a doorway.
But do not add more banks by copying an entry and changing the name. **A new
entry earns its page by having three real quirks and a real worked example.** If
you cannot write those, the institution does not need a page; the converter
handles it anyway and the hub can mention it in a sentence.

Two things to watch once live, in Search Console:

- **Pages indexed vs submitted.** If a chunk of them sit in "Crawled — currently
  not indexed", Google has judged them thin. Deepen the weakest before adding
  any more.
- **Which pages get impressions.** Expect this to be lopsided. Put the effort
  into the three or four that show traction rather than spreading it evenly.

## Adding an institution

Append to `banks.json` and rebuild. The required fields:

| Field | What it needs to be |
| :--- | :--- |
| `slug` | URL segment; the page becomes `<slug>-statement-to-csv.html` |
| `layout` | Columns as printed, plus date and number format |
| `expect` | What the converter should auto-detect, and what to double-check |
| `quirks` | **Three**, each a real thing that trips up a naive conversion |
| `sample` | Three rows of realistic output in that institution's exact format |
| `native` | What their own download offers, and where it stops |
| `getpdf` | How to get the PDF, worded to survive a UI redesign |

The `sample` rows should use merchants and amounts that fit the region — a UK
statement showing US merchants reads as generated, because it is.
