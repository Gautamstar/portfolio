# Portfolio

Source for my personal website: **[gautamstar.github.io/portfolio](https://gautamstar.github.io/portfolio/)**

A single-page site for anyone screening me. It opens with what I do and whether I'm available, then walks through my projects (live and deployed work first, each linking to its code), my experience, the tools I use, and how to get in touch. The resume PDF is linked from the top nav and the contact section.

## How it's built

One `index.html`, around 41 KB, with every style in a single `<style>` block. No framework, no bundler, no build step, and no dependencies. GitHub Pages serves it straight off `main`, so pushing is deploying.

It stays a static file on purpose. The page has no state to manage and no data to fetch, so it renders from one request and keeps working without maintenance or version churn.

## Performance

100 on all four Lighthouse categories, on both the desktop and mobile presets. What keeps it there:

- A system font stack instead of webfonts, so nothing blocks the first paint or shifts layout.
- All CSS inline in one `<style>` block, so the page renders from a single request.
- One line of JavaScript, for the footer year. Everything else is HTML and CSS.
- An inline SVG favicon as a data URI, so there is no icon round trip.
- No images. Every decorative surface is a CSS gradient.
- JSON-LD Person data, an explicit `lang`, and a meta description.

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
