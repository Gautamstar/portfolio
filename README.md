# Portfolio

My personal site: projects, experience, skills, and contact, aimed at someone screening candidates.

**Live:** https://gautamstar.github.io/portfolio/

## Stack

One `index.html`, about 41 KB, with the CSS in a single `<style>` block. No framework, no bundler, no build step, and no dependencies. GitHub Pages serves it straight off `main`, so a push is a deploy. `GautamSingh_Resume.pdf` sits beside it and is linked from the nav and the contact block.

That's a deliberate choice rather than a shortcut. A static personal site has no state to manage and no data to fetch, so a build pipeline would add moving parts without buying anything. It also means the page keeps working untouched for years, which is not true of a site pinned to a framework version.

## Performance

Scores 100 on all four Lighthouse categories, on both the desktop and mobile presets.

The things that get it there are worth preserving when editing:

- **No webfonts.** A system font stack means nothing blocks the first paint and nothing shifts when a font swaps in.
- **All CSS inline** in one `<style>` block, so the page renders from a single request.
- **One line of JavaScript**, which fills in the footer year. Everything else is HTML and CSS.
- **Inline SVG favicon** as a data URI, so there is no icon round trip.
- **No images at all.** Every decorative surface is a CSS gradient.
- Person structured data as JSON-LD, an explicit `lang`, and a meta description.

Re-check after changes:

```bash
npx lighthouse@12 http://localhost:8000/ --preset=desktop --view
```

## Two things not to undo

**The scroll entrance is pure CSS.** It uses `animation-timeline: view()` with the base state visible, so the animation is additive. An earlier version used an IntersectionObserver that set `opacity: 0` up front, which left the entire page blank below the hero whenever the observer did not fire. Do not reintroduce a JavaScript-driven reveal.

**Gradients under text also carry a solid `background-color`.** Contrast checkers cannot measure a gradient, so they walk up to the parent and can read transparent. That is how the nav Resume button once ended up with a slate label on a blue background at a 1.13:1 ratio.

## Running locally

Open `index.html` in a browser. Nothing to install.

If you want the paths to behave exactly as they do in production:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Editing

Everything lives in `index.html`, in source order:

| Section | What's in it |
| :--- | :--- |
| `<style>` | Design tokens as CSS custom properties at the top, then layout |
| Hero | Availability, pitch, resume and contact buttons, headline numbers |
| Projects | Cards for the live and featured work, then a grid of the rest |
| Experience | Roles on a timeline |
| Skills | Technologies grouped by category |
| Education | Degree and certificates on a timeline |
| Contact | Email, resume, LinkedIn, GitHub |

Adding a project means adding one card and pointing it at the repo.

**Check that repo links resolve while signed out before publishing.** Private repos 404 for visitors, which is why the EDA Web Service card links only to its deployment.
