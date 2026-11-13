# Portfolio

Source for my personal website: **[gautamstar.github.io/portfolio](https://gautamstar.github.io/portfolio/)**

A single-page site for anyone screening me. It opens with what I do and whether
I'm available, then runs through my projects (live work first, each linking to
the code that proves it), my experience, the tools I use, my education, and how
to get in touch. The resume PDF is linked from the top bar and from the contact
section.

## How it's built

One `index.html` of 40 KB, 12 KB over the wire, with every style in a single
`<style>` block, plus three self-hosted font files and the resume PDF. No
framework, no bundler, no build step, no dependencies. GitHub Pages serves it
straight off `main`, so pushing is deploying and every internal link stays
relative.

It stays a static file on purpose. The page has no state to manage and no data
to fetch, so it keeps working without maintenance or version churn.

## The design

One column of type on warm paper white, with a dark mode on the system setting.
Nothing on the page is a card: a project is a record, the way an entry sits in a
table of contents. Its name and status sit on one line, then one italic sentence
of what it is, then the measured facts, then the stack, then the link to the
repository. Separation is hairline rules and space.

Two faces, divided by who wrote the words. **Newsreader** sets everything a
person wrote. **DM Mono** sets everything a machine measured: years, latencies,
file sizes, test counts, versions, stack names, status. Monospace never sets
prose and never appears as decoration for "technical".

Ink is near-black on a warm off-white. Secondary text is a second real ink mixed
from the same hue rather than the primary at reduced opacity. One ink blue is
spent only on link underlines, and the only moving part on the page is that
underline: on hover it thickens from 1px to 2px, rises slightly, and takes the
blue. Live status is a 6px filled square beside a mono word, drawn in CSS.
Figures are tabular everywhere; body prose uses old-style figures.

The browser's own surfaces are themed from the same palette: selection, caret,
scrollbar, focus ring and underline offset.

## Performance

100 on all four Lighthouse categories, on both the desktop and mobile presets,
measured against a server that gzips and sets a long cache lifetime, the way
GitHub Pages does. Mobile first contentful paint 0.8s, largest contentful paint
1.2s, total blocking time 0ms, cumulative layout shift 0. Total transfer 73 KiB.

What keeps it there:

- Three latin-subset woff2 fonts, all same origin: Newsreader variable (weight
  350-650, optical size instanced to 16, 30 KB), its italic as a single static
  instance (14 KB), and DM Mono (15 KB). The roman and the mono are preloaded,
  since they set the first screen; the italic loads on demand. Pinning the
  optical size axis is most of the saving, since that axis carries the bulk of
  Newsreader's variation data.
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
| `<style>` | Palette and type tokens as custom properties, then layout |
| Top bar | Name, section links, resume |
| Intro | Name, role, three-line lede, contact links, availability, four figures |
| Selected work | Five records: status, name, one sentence, measured facts, stack, links |
| Also shipped | Six short records, same anatomy without the facts |
| Experience | Three roles, each with its dates and what it produced |
| Tools | Categories against their stacks, label left, mono right |
| Education | Degree and certificate, same record anatomy |
| Contact | What I'm looking for, then email, resume, LinkedIn, GitHub |

Adding a project is one record pointing at its repository. A repository that is
private gets no link, because a 404 for a signed-out visitor costs more than the
project earns.

## Fonts

Newsreader and DM Mono, both under the SIL Open Font License 1.1. The notices
and the full licence text are in [FONT-LICENSE.txt](FONT-LICENSE.txt).
