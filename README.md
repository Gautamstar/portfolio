# Portfolio

My personal site: about, selected projects, experience, and contact.

**Live:** https://gautamstar.github.io/portfolio/

## Stack

One `index.html`, about 28 KB, with the CSS in a single `<style>` block and the behavior in a single `<script>` block. No framework, no bundler, no build step, and no dependencies beyond a Google Fonts preconnect. GitHub Pages serves it straight off `main`, so a push is a deploy.

That's a deliberate choice rather than a shortcut. A static personal site has no state to manage and no data to fetch, so a build pipeline would add moving parts without buying anything. It also means the page keeps working untouched for years, which is not true of a site pinned to a framework version.

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
| About | Summary, skills grouped by category |
| Projects | Cards linking to each repo and any live deployment |
| Experience | Roles and education |
| Contact | Email, GitHub, LinkedIn |
| `<script>` | Nav behavior and scroll interactions |

Project cards link out to individual repos, so adding a project means adding one card and pointing it at the repo.
