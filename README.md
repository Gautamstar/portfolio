# Portfolio

Source for my personal website: **[gautamstar.github.io/portfolio](https://gautamstar.github.io/portfolio/)**

A single-page site for anyone screening me. It opens with what I do and whether I'm available, then walks through my projects (live and deployed work first, each linking to its code), my experience, the tools I use, and how to get in touch. The resume PDF is linked from the top nav and the contact section.

## How it's built

One `index.html`, around 46 KB, with every style in a single `<style>` block, plus two self-hosted font files and the resume PDF. No framework, no bundler, no build step, and no dependencies. GitHub Pages serves it straight off `main`, so pushing is deploying.

It stays a static file on purpose. The page has no state to manage and no data to fetch, so it keeps working without maintenance or version churn.

## Performance

100 on all four categories, on both the desktop and mobile presets, verified over repeated runs. Total blocking time is 0ms on desktop. What keeps it there:

- Two self-hosted fonts, Plus Jakarta Sans (variable, 400-800) and DM Mono, both latin-subset woff2 and both preloaded. Same origin, so there is no third-party connection to negotiate, and the preload lands them before first paint, which is what keeps layout shift at zero.
- All CSS inline in one `<style>` block, so no stylesheet request stands between the document and the first paint.
- One line of JavaScript, for the footer year. Everything else is HTML and CSS.
- An inline SVG favicon as a data URI, so there is no icon round trip.
- No image files. The whole theme is SVG data URIs and CSS gradients: stars are circles inside one tiled SVG per layer, and the field covers the whole site as one fixed layer that never repaints on scroll. A single four-point sparkle, defined once as a custom property, serves the list bullets, timeline markers and skill headings.
- The sky is inverted like a photographic plate: dark stars on white, the way survey plates and printed star atlases render them, with dot size standing in for magnitude. The Milky Way is carried by stippling, a rise in star density, because a grey wash on white reads as a smudge rather than a band.
- JSON-LD Person data, an explicit `lang`, and a meta description.

### Runtime cost is not the same thing

Lighthouse scores the load. It says nothing about what the page costs while it
sits there animating, and this page scored 100 on every category while making a
browser lag. Three things caused that, none of which any audit flags:

- **`backdrop-filter` on the sticky nav.** The bar never leaves the screen, so
  the browser re-sampled and re-blurred everything behind it on every scroll
  frame. This was the worst of the three and the blur was barely visible against
  a white page. Do not reintroduce it.
- **A mask over animated children.** Masking forces the subtree to be composited
  offscreen before it can be drawn, and because the stars drift continuously that
  pass re-ran every frame for as long as the tab was open. The same vignette
  painted as a plain white overlay looks identical and composites once.
- **Layers larger than they need to be, and more of them animating than
  necessary.** Each star layer was twice the viewport wide; viewport plus one
  tile gives the same seamless loop. Only one layer drifts now.

If the page ever feels heavy again, look for those three before anything else.

Re-check after any change:

```bash
npx lighthouse@12 http://localhost:8000/ --preset=desktop --view
```

## Running locally

Open `index.html` in a browser, or serve it so the paths behave exactly as they do in production:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Structure

Everything is in `index.html`, in source order:

| Section | Contents |
| :--- | :--- |
| `<style>` | Design tokens as CSS custom properties, then layout |
| Hero | Availability, pitch, resume and contact links, headline numbers |
| Projects | Cards for the live and featured work, then a grid of the rest |
| Experience | Roles on a timeline |
| Skills | Tools grouped by category |
| Education | Degree and certificates |
| Contact | Email, resume, LinkedIn, GitHub |

Adding a project is one card pointing at its repo.
