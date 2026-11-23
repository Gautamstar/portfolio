# Portfolio

Source for my personal website: **[gautamstar.github.io/portfolio](https://gautamstar.github.io/portfolio/)**

A single-page site for anyone screening me. A narrow column on the left holds my
name, my role, the resume, the ways to reach me and whether I'm available, and it
stays pinned to the top of the window while you scroll. The wide column on the
right runs through my projects (live work first, each linking to the code that
proves it), the rest of what I've shipped, my experience, the tools I use, my
education, and how to get in touch.

## How it's built

One `index.html` of 43 KB, about 12 KiB gzipped, with every style in a single
inline `<style>` block, plus three self-hosted font files and the resume PDF. No
framework, no bundler, no build step, no dependencies. GitHub Pages serves it
straight off `main`, so pushing is deploying and every internal link stays
relative.

It stays a static file on purpose. The page has no state to manage and no data
to fetch, so it keeps working without maintenance or version churn.

## The design

Two columns. A pinned identity column on the left, and a stream of dated records
on the right. Nothing on the page is a card: a project is a record, and every
record is a grid whose first column is a date rail, so the years line up down one
edge while the prose keeps a second edge of its own. The heading comes first in
the source and the rail is placed beside it, which means a phone reads the name
before the date without any reordering. Separation is 1px hairline rules, the
rail's left edge, and space.

The page is built dark and carries a light mode on the system setting: `:root`
holds the dark values and `@media (prefers-color-scheme: light)` overrides them.
The dark ground is a cold neutral grey-black under a near-white ink; the light
ground is a faintly warm off-white under a cold near-black. Secondary text is a
second real ink mixed from the same hue rather than the primary at reduced
opacity.

One amber is the only hue in the file, and it does exactly two jobs: it carries
every link and it marks what is live. A link's underline rests in a banked step
of that amber and, on hover, takes the full amber while thickening from 1px to
2px and rising slightly. The signature interaction is the jump list in the pinned
column: a 1px rule left of each link fills its reserved 44px slot and takes the
ink on hover and on keyboard focus, so the word beside it never moves. Live
status is a 6px filled square beside a mono word, drawn in CSS, the same mark and
size wherever it appears.

Two faces, divided by who wrote the words. **Source Serif 4** sets everything a
person wrote. **Geist Mono** sets everything a machine measured, plus the labels
a reader scans: years, latencies, file sizes, test counts, versions, stack names,
status. The section labels are mono, uppercase, tracked, and set *smaller* than
the body they introduce, so the record names and the sentences are the only
things on the page carrying weight. Figures are tabular in the mono columns and
proportional inside sentences, where a measured number stays in the serif at
weight 600.

The browser's own surfaces are themed from the same palette: selection, caret,
scrollbar, focus ring and underline offset. There are rules for
`prefers-reduced-motion` (both transitions removed), `forced-colors: active` (the
CSS marks painted in system colours), and print, which redefines the tokens to
black on white and prints each link's `href` after its text.

## Performance

100 on all four Lighthouse categories, on both the desktop and mobile presets,
measured against a server that gzips and sets a long cache lifetime, the way
GitHub Pages does. Mobile first contentful paint 0.8s, largest contentful paint
1.2s, speed index 0.8s, total blocking time 0ms, cumulative layout shift 0.
Total transfer 55 KiB.

What keeps it there:

- Three latin-subset woff2 fonts, all same origin: Source Serif 4 variable
  (weight 400-650, optical size instanced to 16, 21 KB), its italic as a single
  static instance (13 KB), and Geist Mono (6 KB). The roman and the mono are
  preloaded, since they set the first screen; the italic loads on demand.
  Pinning the optical size axis is most of the saving, since that axis carries
  the bulk of the serif's variation data.
- All CSS inline in one `<style>` block, so no stylesheet request stands between
  the document and the first paint.
- One line of JavaScript, for the footer year, plus the deferred tag for Cairn,
  my own analytics service. No content depends on a script running.
- An inline SVG favicon as a data URI, so there is no icon round trip.
- No image files at all, and no decorative layers: the page is type, rules and
  space, so there is nothing to composite.
- JSON-LD Person data, an explicit `lang`, and a meta description.

### Runtime cost is a separate constraint

Lighthouse scores the load. It says nothing about what a page costs while it
sits on screen, and an earlier version of this site scored 100 on every category
while making a browser lag. Three things caused it, none of which any audit
flags, and all three are off limits here:

- **`backdrop-filter` on the sticky bar.** The bar never leaves the screen, so
  the browser re-sampled and re-blurred everything behind it on every scroll
  frame.
- **A mask over animated children.** Masking forces the subtree to be composited
  offscreen before it can be drawn, so with anything moving inside it that pass
  re-runs every frame for as long as the tab is open.
- **Animated layers larger than the viewport plus one tile**, and more of them
  moving than the effect needs.

If the page ever feels heavy, look for those three first.

Re-check after any change, with a server that compresses, since
`python -m http.server` does not and that alone costs several mobile points:

```bash
npx lighthouse@12 http://localhost:8000/ --preset=desktop --view
```

## Running locally

Open `index.html` in a browser, or serve it so the paths behave exactly as they
do in production:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Structure

Everything is in `index.html`, in source order:

| Section | Contents |
| :--- | :--- |
| `<style>` | Palette, type and layout tokens as custom properties, dark on `:root` and light in a media query, then layout |
| Top bar | Hidden on wide screens; below 980px it carries the name, three section links and the resume |
| Identity column | Pinned: name, role, one jump link per section, resume, email, GitHub, LinkedIn, credential, availability |
| Opening sentence | One sentence at the top of the stream, on the prose left edge |
| Selected work | Five records: year and live status in the rail, name, one italic sentence, measured facts, stack, links |
| Also shipped | Six short records, same anatomy without the facts |
| Experience | Three roles, each with its years in the rail and what it produced |
| Tools | Six categories against their stacks, label on the rail edge, mono values right |
| Education | A degree and a certificate, same record anatomy |
| Contact | What I'm looking for, then email, resume, LinkedIn, GitHub |

Adding a project is one record pointing at its repository. A repository that is
private gets no link, because a 404 for a signed-out visitor costs more than the
project earns.

## Fonts

Source Serif 4 and Geist Mono, both under the SIL Open Font License 1.1. The
notices and the full licence text are in [FONT-LICENSE.txt](FONT-LICENSE.txt).

Source Serif 4 is licensed with the Reserved Font Name "Source", and clause 3 of
that licence forbids a modified copy from carrying a reserved name. A subset is
a modified copy, so the two serif files declare the family name `Portfolio
Serif`, which is the name the stylesheet asks for. Geist Mono carries no
reserved name, so its subset keeps its own.
