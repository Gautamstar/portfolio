# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters, technical screeners and hiring managers evaluating Gautam Singh for
junior or new-grad software engineering roles in Guelph, Kitchener-Waterloo,
Toronto, or remote. They arrive from a resume, a LinkedIn profile, or an
application, usually on a laptop in an office, and give the page between thirty
and ninety seconds before deciding whether to read the resume PDF or move on.
A smaller second audience is engineers who open the repositories to judge the
code.

## Product Purpose

A single-page site that gets Gautam screened in and contacted. Success is a
recruiter leaving with his email, his resume, or a repository open, and with a
specific reason to remember him.

## Positioning

The work is shipped, measured and publicly verifiable, which a portfolio of
course projects cannot truthfully copy. Three applications are live right now,
one of them on its own domain with a package published to npm and listed in the
official Model Context Protocol registry. The performance numbers on the page
were measured on production and are reproducible from the repositories, not
estimated.

## Operating Context

The visitor scans rather than reads: headline, availability, then project names,
then numbers. They open links in new tabs and judge a dead link harshly. Two of
the linked repositories are private and must never carry a GitHub button,
because it returns 404 for anyone signed out. The resume PDF is the usual exit,
reached from the nav and from the contact section.

## Capabilities and Constraints

- One static `index.html` with all CSS in a single inline `<style>` block, plus
  self-hosted woff2 fonts and the resume PDF. No framework, no bundler, no build
  step, no dependencies.
- GitHub Pages serves it from `main` at the `/portfolio` subpath, so every
  internal link must stay relative and pushing to `main` is deploying.
- One line of JavaScript, for the footer year. No content may depend on a
  script running.
- Scores 100 on all four Lighthouse categories on both the desktop and mobile
  presets; this is a hard floor, verified per change.
- Runtime cost is a separate constraint from Lighthouse and has been violated
  before: no `backdrop-filter` on the sticky nav, no mask over an animated
  subtree, and animating layers no larger than the viewport plus one tile.
- No raster images. Decoration is SVG data URIs and CSS.

## Brand Commitments

Name: Gautam Singh. The register is pinned by the user: a working engineer's
personal site, plain and typographic, at the craft level of simonwillison.net,
overreacted.io and danluu.com. Light ground with a dark mode on the system
setting. The site must not read as generated, which rules out the whole
vocabulary those pages share: a geometric sans at every size, equal-weight
rounded cards with soft shadows, gradient text or borders, glassmorphism,
saturated pill badges, emoji as icons, blurred background blobs, and an
indigo-to-violet accent. Four themed treatments were built and rejected before
this one, a volvelle, a pixel RPG, an illuminated manuscript and a sideways
book, so a costume of any kind is out: the page earns its look from type,
measure and real data rather than from a theme.

Cairn, his own analytics service, is the page's tracker and that tag stays.
The resume PDF stays linked from the nav and the contact section. Voice is plain
and concrete; no em dashes, no trailing negative fragments.

## Evidence on Hand

Real, verified project content: measured latencies, test counts, file sizes,
production before-and-after timings, repository and deployment links all checked
signed out on 2026-10-07. No photography of the user, no client logos, no
testimonials, no metrics beyond those in the repositories. Future work must not
invent any of these.

## Product Principles

- Lead with what shipped and what it measured, in that order.
- Every claim on the page must be checkable from a link on the page.
- A link that 404s for a signed-out visitor costs more than the project it
  points to earns.
- Decoration must survive a Lighthouse run and an hour of idle scrolling.
- The page must remain readable and complete with no JavaScript and with motion
  disabled.

## Accessibility & Inclusion

WCAG AA contrast on all text, including over decorative layers, which audits
cannot see and must be checked by eye. `prefers-reduced-motion` disables the
drift and the entrance. Full keyboard operability with a visible focus style and
a skip link.
