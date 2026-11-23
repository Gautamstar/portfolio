---
name: Gautam Singh Portfolio
description: A working engineer's own site. A pinned identity column beside a stream of dated records, dark first, one amber.
colors:
  ground: "#141518"
  ink: "#e9e7e2"
  ink-2: "#8e8a83"
  rule: "#34353a"
  rule-soft: "#2a2b31"
  link: "#d2954a"
  link-rule: "#8a6230"
  live: "#d2954a"
  sel: "#3a2e1c"
  ground-light: "#f7f6f3"
  ink-light: "#17181b"
  ink-2-light: "#6b6861"
  rule-light: "#cfc9bc"
  rule-soft-light: "#e1ddd2"
  link-light: "#9a6418"
  link-rule-light: "#b57c30"
  live-light: "#9a6418"
  sel-light: "#f0e2cb"
typography:
  display:
    fontFamily: "Portfolio Serif, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "clamp(38px, 3.4vw, 46px)"
    fontWeight: 450
    lineHeight: 1.06
    letterSpacing: "-0.022em"
  title:
    fontFamily: "Portfolio Serif, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.28
    letterSpacing: "-0.012em"
  title-compact:
    fontFamily: "Portfolio Serif, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: 1.28
    letterSpacing: "-0.012em"
  lede:
    fontFamily: "Portfolio Serif, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
  body:
    fontFamily: "Portfolio Serif, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
    fontVariant: "proportional-nums lining-nums"
  gloss:
    fontFamily: "Portfolio Serif, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "18.5px"
    fontWeight: 400
    fontStyle: "italic"
    lineHeight: 1.62
  bullet:
    fontFamily: "Portfolio Serif, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.58
  seat:
    fontFamily: "Portfolio Serif, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.62
  kit-label:
    fontFamily: "Portfolio Serif, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "16.5px"
    fontWeight: 400
    lineHeight: 1.62
  label-mail:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Cascadia Mono, Menlo, Consolas, monospace"
    fontSize: "16px"
    fontWeight: 400
    letterSpacing: "-0.012em"
  label-cv:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Cascadia Mono, Menlo, Consolas, monospace"
    fontSize: "15px"
    fontWeight: 400
    letterSpacing: "-0.012em"
  label-lead:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Cascadia Mono, Menlo, Consolas, monospace"
    fontSize: "14.5px"
    fontWeight: 400
    letterSpacing: "-0.012em"
  label-mid:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Cascadia Mono, Menlo, Consolas, monospace"
    fontSize: "13.5px"
    fontWeight: 400
    letterSpacing: "-0.012em"
  rail:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Cascadia Mono, Menlo, Consolas, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "-0.01em"
    fontVariant: "tabular-nums lining-nums"
  stack:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Cascadia Mono, Menlo, Consolas, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: "-0.012em"
  jump:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Cascadia Mono, Menlo, Consolas, monospace"
    fontSize: "13px"
    fontWeight: 400
    letterSpacing: "0.03em"
    textTransform: "uppercase"
  label:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Cascadia Mono, Menlo, Consolas, monospace"
    fontSize: "13px"
    fontWeight: 400
    letterSpacing: "-0.01em"
  section-label:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Cascadia Mono, Menlo, Consolas, monospace"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.1em"
    textTransform: "uppercase"
  caption:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Cascadia Mono, Menlo, Consolas, monospace"
    fontSize: "12.5px"
    fontWeight: 400
    letterSpacing: "-0.01em"
    fontVariant: "tabular-nums lining-nums"
rounded:
  none: "0"
  focus: "1px"
  thumb: "6px"
spacing:
  mark-gap: "7px"
  row: "11px"
  jump-gap: "12px"
  kit-row: "13px"
  inline: "22px"
  pad: "26px"
  rail-gap: "28px"
  post: "34px"
  record: "44px"
  column-gap: "clamp(40px, 5vw, 78px)"
  head: "clamp(38px, 4.2vw, 58px)"
  section: "clamp(46px, 5.4vw, 68px)"
components:
  link:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
  link-hover:
    textColor: "{colors.link}"
  section-label:
    textColor: "{colors.ink-2}"
    typography: "{typography.section-label}"
  jump-link:
    textColor: "{colors.ink-2}"
    typography: "{typography.jump}"
  jump-link-hover:
    textColor: "{colors.ink}"
  jump-rule:
    backgroundColor: "{colors.rule}"
    width: "44px"
    height: "1px"
    rounded: "{rounded.none}"
  jump-rule-hover:
    backgroundColor: "{colors.ink}"
  record-title:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
  record-rail:
    textColor: "{colors.ink-2}"
    typography: "{typography.rail}"
  live-mark:
    backgroundColor: "{colors.live}"
    size: "6px"
    rounded: "{rounded.none}"
  bullet-mark:
    backgroundColor: "{colors.ink-2}"
    size: "5px"
    rounded: "{rounded.none}"
  stack-token:
    textColor: "{colors.ink-2}"
    typography: "{typography.stack}"
  proof-link:
    textColor: "{colors.ink}"
    typography: "{typography.label-mid}"
  cv-link:
    textColor: "{colors.ink}"
    typography: "{typography.label-cv}"
  nav-link:
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
  nav-link-resume:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  skip-link:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    typography: "{typography.label}"
    padding: "10px 16px"
    rounded: "{rounded.none}"
---

# Design System: Gautam Singh Portfolio

## Overview

**Creative North Star: "The Pinned Register"**

This is a working engineer's own site, set as a register that stays open at the
identity page. A narrow column on the left holds the name, the role, one jump
link per section, the resume, the three ways to reach him and the availability
line, and it is pinned to the top of the viewport so it is on screen at every
scroll position. The wide column on the right is a stream of records in dated
rows. Every row opens with its year standing in a rail at the left edge, so a
reader scanning for when can run a finger down one column while the prose keeps
a second left edge of its own from the top of the page to the bottom.

The material is a cold neutral grey-black ground under a near-white ink, and
the page carries a light mode on the system setting where the ground warms
slightly and the ink inverts. Both inks in each scheme are mixed from the same
cold hue, so the secondary ink sits inside the primary's family as a second real
ink. One amber is the only hue in the file, and it does exactly two jobs: it
carries every link and it marks what is live. Nothing is boxed. Structure is
carried by two weights of 1px hairline, the rail's own left edge, and space, so
the page has no containers to decorate and no surfaces to tint.

Two faces divide the page by role. Source Serif 4, a text serif with a true
italic, sets every sentence a person wrote. Geist Mono sets the fields a reader scans down
a column instead of reading: status, years and dates, stack names, proof links,
and the section labels themselves. The type scale is inverted at the section
label: a label is 12.5px tracked mono standing over 17px and 18px prose, so the
record names and the sentences are the only things on the page carrying weight.
The craft bar is set by three named reference sites, simonwillison.net,
overreacted.io and danluu.com. The page refuses the generated-portfolio
vocabulary outright, because that vocabulary is the thing this site was rebuilt
four times to escape: equal-weight rounded cards with soft shadows, gradients,
glass, saturated pill badges, emoji icons and an indigo-to-violet accent are all
out, and so is any costume or theme, since the look is earned from type, measure
and real data.

**Key Characteristics:**

- Two columns inside a 75.5rem shell: a pinned identity column and a stream of records
- Every record is a grid whose first column is a date rail, with the heading first in source order
- Dark is the base scheme and light is the media-query override
- Two faces split by role, with no third face anywhere
- Separation by 1px hairline, the rail's left edge, and space, with no boxes and no shadows
- Two real inks mixed in one cold hue family per scheme, with no grey and no opacity
- One amber doing two jobs, every link and every live mark
- Section labels in mono, uppercase and tracked, smaller than the body they introduce
- Square corners everywhere, and marks drawn as 1px rules and 5px and 6px CSS squares
- Tabular figures in the mono columns, proportional figures inside sentences
- Browser chrome themed from the same palette: selection, scrollbar, focus ring

## Colors

Two inks on one ground, one amber, and two weights of hairline, declared twice:
the dark set on `:root` and the light set inside
`@media (prefers-color-scheme: light)`, keyed in the frontmatter with a
`-light` suffix. `color-scheme: dark light` on `:root` names dark first, so the
browser's own form controls and scrollbars follow the page rather than the other
way round.

### Primary

- **Signal Amber** (`link`, `live`): the only hue in the file, and the two
  tokens hold the same value in each scheme. It carries a link's text colour on
  hover, the hover underline, the focus-visible outline at 2px with a 3px
  offset, the 6px live square in a record's rail, the 6px square beside the
  availability line and the word "Open to work." itself. Measured at 7.1:1
  against the dark ground and 4.6:1 against the light one.
- **Banked Amber** (`link-rule`): the resting underline colour, a darker and
  less saturated step of the same hue that reads as a hairline under the word
  rather than as a coloured line. It becomes the full amber on hover. Measured
  at 3.4:1 on the dark ground and 3.3:1 on the light one, so a link is found by
  eye even though its text takes the ink of the prose around it; the two
  structural hairlines sit below that, at roughly 1.5:1 and 1.3:1, which is how
  an underline reads as a link and a rule reads as structure.

### Neutral

- **Cold Grey-Black Ground** (`ground`): the page ground, a cold neutral at hue
  271 in OKLCH. In light mode it is a faintly warm off-white at hue 91, so the
  page is not a glaring white under office light. Both values are also published
  to the browser as scheme-matched `theme-color` meta tags.
- **Near-White Ink** (`ink`): all primary text, headings, the italic gloss, and
  the mono fields a reader must read exactly, such as the proof links, the
  resume line and the email. 14.8:1 on the dark ground, 16.4:1 on the light one.
  It also paints the skip link's background and the jump rule at full extension.
- **Diluted Ink** (`ink-2`): secondary text, mixed inside the same cold hue
  family so it is a second real ink rather than a grey or an opacity. It carries
  the role line, the date rail, the section labels, the jump links at rest, the
  action links, the credential, the availability sentence, stack names, kit
  labels, the employer line, the footer, the bullet mark and the scrollbar thumb
  on hover. 5.3:1 on the dark ground, 5.1:1 on the light one, which is the
  page's contrast floor for text.
- **Hairline** (`rule`): the stronger 1px rule, used where a rule opens a block
  rather than divides two peers: under a section label, above the availability
  block in the pinned column, above the contact row, and as the `/` separator
  between stack names and the resting scrollbar thumb.
- **Soft Hairline** (`rule-soft`): the quieter 1px rule, used for every
  separation between peers: under the running head, between sections, between
  records, between posts, between short records, between kit rows.
- **Selection Wash** (`sel`): the themed `::selection` background, a dim step of
  the amber hue that holds ink at 10.7:1 on dark and 13.9:1 on light.

### Named Rules

**The Two Inks Rule.** Each scheme holds exactly two inks and one ground. The
secondary ink is a mixed value in the same cold hue family as the primary, so no
text colour is ever produced with `opacity`, a `color-mix` against grey, or a
neutral grey hex. Audit test: grep the stylesheet for `opacity` and for any text
colour outside the nine declared tokens; both return nothing.

**The One Amber, Two Jobs Rule.** The amber carries links and it marks what is
live. Those are its only two jobs. A heading in amber, an amber fill behind a
block, an amber border, or an amber figure inside a sentence each add a third
job and are out.

**The No Ground Rule.** No element carries a background colour. The exceptions
are the page ground itself, the opaque running head painted in that same ground,
the CSS-drawn marks (the 6px live squares, the 5px bullet square, the 1px jump
rule and the scrollbar thumb), and the skip link while it has focus. Separation
everywhere else is a hairline and space.

**The Dark-First Rule.** The dark values are the declarations on `:root` and the
light values are the override inside `prefers-color-scheme: light`. A new token
is authored dark first and given its light counterpart in the same commit, so
the two sets never drift apart.

## Typography

**Display Font:** Source Serif 4 (with Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif)
**Body Font:** Source Serif 4, the same face at the same optical size
**Label/Mono Font:** Geist Mono (with ui-monospace, SF Mono, Cascadia Mono, Menlo, Consolas, monospace)

**Character:** Source Serif 4 is a text serif with a true italic, self-hosted as
a variable roman with the weight axis open from 400 to 650 and the optical-size
axis instanced to 16, plus a static italic declared at weight 400. It is a
reading face used at display size rather than a display face, which is why the
name at 46px carries the same voice as a bullet at 17px. Geist Mono is
self-hosted as a single instance at weight 400, so the mono has exactly one
weight and holds its own against the serif at 13px without ever bolding.

The serif ships under the family name `Portfolio Serif`, and the stylesheet asks
for that name. Source Serif 4 is licensed with the Reserved Font Name "Source",
which a modified copy may not carry, and a subset is a modified copy, so the
files are renamed rather than the licence bent. Any new rule that names the
serif names `Portfolio Serif`, not the foundry name.

### Hierarchy

- **Display** (450, `clamp(38px, 3.4vw, 46px)`, 1.06, -0.022em): the name, once,
  at the top of the pinned column. Below 980px, where the column becomes the
  opening block, it runs `clamp(38px, 7.4vw, 52px)`.
- **Section Label** (400 mono, 12.5px, 0.1em, uppercase, diluted ink): the name
  of a section, standing over the records inside it with 11px beneath it, a
  stronger hairline under that, and 26px of space before the first record.
- **Title** (500, 20px, 1.28, -0.012em): a record's name, a role, or a degree,
  usually wrapped in a link to the thing itself.
- **Title Compact** (500, 18px): the same role inside a short record.
- **Lede** (400, 19px, 1.62): the role line in the pinned column and the page's
  one opening sentence, the only places where the serif runs above body size.
  The opening sentence drops to 18.5px below 980px.
- **Body** (400, 18px, 1.62, proportional lining figures; 17.5px below 680px):
  all prose. Paragraphs are held at 68ch, and the record columns at 40rem.
- **Gloss** (400 italic, 18.5px, full ink, 38rem): one line under a record name
  saying what the thing is. The true italic is doing the work of a subtitle
  style.
- **Bullet** (400, 17px, 1.58): the measured facts under a record, each marked
  with a 5px square at 21px of indent, 11px apart.
- **Seat** (400, 17px, diluted ink): the employer, place and term under a role.
- **Kit Label** (400, 16.5px, diluted ink): a tool category, and the single
  paragraph inside a short record.
- **Label Mail** (400 mono, 16px): the email address in the contact row, the
  largest the mono gets.
- **Label CV** (400 mono, 15px): the resume line in the pinned column, standing
  alone so a thirty-second reader can reach it from any scroll position.
- **Label Lead** (400 mono, 14.5px): the contact row.
- **Label Mid** (400 mono, 13.5px): proof links, the action links, the
  availability line.
- **Rail** (400 mono, 13px, 1.6, tabular lining figures): the dates and the live
  mark in a record's date rail.
- **Stack** (400 mono, 13px, 1.8): a record's stack run and a kit row's values
  (the latter at 1.85).
- **Jump** (400 mono, 13px, 0.03em, uppercase): the jump list in the pinned
  column.
- **Label** (400 mono, 13px): the running head's nav, the credential, the skip
  link. The nav drops to 12.5px below 440px.
- **Caption** (400 mono, 12.5px, tabular lining figures): the footer.

### Named Rules

**The Two Faces Rule.** Source Serif 4 sets everything a person wrote. Geist
Mono sets everything a machine measured, plus the labels a reader scans: status, years and
dates, latencies, sizes, counts, versions, stack names, proof links and section
labels. Neither face does the other's job, so the mono never sets a sentence and
never appears as a costume for "technical".

**The Inverted Label Rule.** A section label is smaller than the body it
introduces, 12.5px mono against 17px and 18px serif. The label is the section's
own name standing over a list of differently-named records, and it is set in
diluted ink with a hairline under it so it reads as a tab on a register rather
than as a headline.

**The No Kicker Rule.** A mono line never sits above a heading. The heading
comes first in source order inside every record and the rail is grid-placed into
the first column beside it, so the single-column fold at 680px puts the name
before the date without a reordering rule.

**The Figure-in-Sentence Rule.** A measured figure inside a sentence stays in
the serif at weight 600 and takes the sentence's own proportional lining
figures. Tabular lining figures belong to the mono columns, where digits have to
line up under each other. Audit test: every `tabular-nums` declaration sits on a
mono selector.

## Layout

Two columns inside one shell. `.shell` is a grid capped at `75.5rem`, centred
with a 26px gutter, `align-items: start`, with the identity column at
`clamp(15rem, 21vw, 19rem)` against `minmax(0, 1fr)` and
`clamp(40px, 5vw, 78px)` between them. The identity column is `position: sticky`
at `top: 0` and falls back to `position: static` under
`@media (max-height: 700px)`, where it would otherwise be taller than the window
and clip itself.

Inside the stream, every record, post and short record is its own grid:
`clamp(4.75rem, 6vw, 7rem)` of date rail against `minmax(0, 1fr)` of prose, 28px
apart. The heading is first in source order and every child is placed into
column 2; the rail alone is placed at `1 / 1 / span 40 / span 1` with
`align-self: start`, so it stands at the top of the row however many rows the
record grows to. That gives the page two left edges: the rail's, which the
section labels also sit on, and the prose's, which the opening sentence and the
contact paragraph pick up with `margin-left: calc(var(--rail) + var(--rail-gap))`
so they line up with every record's prose.

Vertical rhythm is one section token, `clamp(46px, 5.4vw, 68px)`, applied as the
top padding of every section, with a soft hairline between consecutive sections.
The identity column and the opening sentence both open on
`clamp(38px, 4.2vw, 58px)`. Inside a section the rhythm steps down: 44px below a
full record and 40px above the next, 34px and 32px for a post, 22px above and
below a short record, 13px for a kit row, 11px between bullets. Horizontal gaps
run 7px between a mark and its word, 12px between the jump rule and its word,
18px to 26px between inline mono links, and 21px of bullet indent.

Measures are set per role rather than globally: 68ch for a plain paragraph,
40rem for the opening sentence and every record's prose and bullet list, 38rem
for the italic gloss, 34ch for the role line in the pinned column, 72ch for a
mono stack run, and no cap on a row of links or a date rail.

`html` carries `scroll-behavior: smooth` and `scroll-padding-top: 28px`, which
becomes 74px below 980px where the running head appears.

Three width breakpoints, all narrowing rather than rearranging, plus one height
breakpoint. At 979px the grid collapses to a single block, the identity column
becomes the opening block at `max-width: 44rem` with its jump list hidden, the
stream and the footer cap at 44rem, and the running head appears to carry the
sections the pinned column no longer holds. At 680px the body drops to 17.5px,
the gutter to 20px, every record grid becomes a block with its rail folded back
under the name as an inline wrapping row, the kit rows collapse to one column,
and the prose indents reset to zero. At 440px the wordmark leaves the running
head and the four nav destinations spread across its full width.

### Named Rules

**The Two Left Edges Rule.** The page has exactly two left edges: the rail's,
shared by the date rails and the section labels, and the prose's, shared by every
sentence, heading, bullet and mono row in the stream. A block that sits outside a
record grid, such as the opening sentence or the contact paragraph, is pushed to
the prose edge with `calc(var(--rail) + var(--rail-gap))`. Centre nothing, ever.

**The Scan Column Rule.** A field a reader scans down the page rather than reads
belongs in mono and belongs in the rail, aligned with the same field in the rows
above and below it.

**The Heading-First Rule.** The heading is the first child of every record and
the rail is grid-placed beside it. Source order is the reading order, so the
single-column fold needs no `order` property and no second markup path.

## Elevation & Depth

The page is flat. There is no `box-shadow` anywhere in the stylesheet, no
`filter`, no `backdrop-filter`, and no tonal layering: every element sits on the
same ground. Depth is carried by two weights of 1px hairline, by the rail's own
left edge, by white space, and by the weight and size of the type. The sticky
elements are the identity column, which sits in the page ground and overlaps
nothing, and the running head below 980px, which resolves its overlap with an
opaque background and a soft hairline rather than with a shadow or a blur,
because a bar pinned to the viewport must not re-sample what scrolls beneath it.

### Named Rules

**The Hairline Rule.** Depth has exactly two values, `rule` and `rule-soft`,
both at 1px. Use the stronger one where a rule opens a block, and the soft one
between peers. A third weight, a shadow or a tinted panel is a new material and
is out.

**The Opaque Bar Rule.** Nothing pinned to the viewport may blur or tint what
scrolls under it. The running head is painted in the page ground at full
opacity, and the pinned identity column carries no ground of its own.

## Shapes

Square corners everywhere. The only radii in the stylesheet are 1px on the
focus ring, so the outline follows the glyph edge cleanly, and 6px on the
`::-webkit-scrollbar-thumb`, which is browser chrome rather than page content.
The inline SVG favicon's rect carries `rx="2"`.

The form vocabulary is four marks and nothing else: the 1px horizontal rule, the
44px 1px vertical-centred rule left of a jump link, the small filled square (6px
for live status, 5px for a bullet), and the 1px underline under a link, with the
`/` between stack names drawn as a pseudo-element in hairline colour. All of them
are type-scale marks rather than illustrations, drawn in CSS with no raster image
anywhere on the page: the favicon is an inline SVG data URI and it is the only
graphic.

### Named Rules

**The Square Rule.** Content corners are square. A radius belongs only to
browser chrome or to a focus ring that has to sit tight against a glyph.

## Components

### Links

- **Shape:** no box, no padding, no radius. A link is a word with a rule under it.
- **Resting:** text colour inherited from its context, underline in banked amber
  at 1px with a 0.18em offset.
- **Hover:** text colour and underline both become the full amber, the underline
  thickens to 2px, and the offset closes to 0.13em over 140ms on
  `cubic-bezier(0.2, 0.7, 0.3, 1)`. This is the page's authored moment and it is
  used on every link rather than on a chosen few.
- **Focus:** a 2px amber outline at 3px offset, with a 1px radius, set globally
  on `:focus-visible`.
- **Reduced motion:** the transition is removed, so the hover state arrives
  instantly at full value.
- **Variants:** links in prose and in a record head inherit the ink around them;
  nav links, footer links, jump links and the action row take diluted ink; proof
  links, the resume lines and the contact row take full ink so a row of mono
  destinations reads as primary.

### Jump List (signature component)

The page's signature interaction, and the one element that is always on screen.

- **Style:** a vertical flex column in the pinned identity column, one link per
  section, mono at 13px tracked 0.03em and uppercased, in diluted ink with no
  underline, 8px apart, with 12px between a link's rule and its word.
- **Rule:** a `::before` 44px wide and 1px tall in hairline colour, which
  occupies its full slot from the start and is held at `scaleX(0.4545)` from
  `transform-origin: left center`, so it reads as 20px at rest and the word
  beside it never moves.
- **Hover and focus:** the rule scales to `scaleX(1)` and takes the full ink
  while the word takes the full ink, over 180ms on
  `cubic-bezier(0.2, 0.7, 0.3, 1)`. `:hover` and `:focus-visible` carry
  identical treatment, so a keyboard reader gets the same gesture as a mouse
  reader.
- **Reduced motion:** the transition is removed and the rule snaps between its
  two lengths.
- **Forced colours:** the rule is painted `CanvasText` with
  `forced-color-adjust: none`, and `Highlight` on hover and focus.
- **Narrow:** hidden below 980px, where the running head carries the sections
  instead, and hidden in print.

### Project Record (signature component)

The page's central pattern, and the reason there are no cards.

- **Grid:** `clamp(4.75rem, 6vw, 7rem)` of rail against `minmax(0, 1fr)` of
  prose, 28px apart, with the heading first in source and everything but the rail
  placed in column 2.
- **Rail:** mono at 13px with tabular lining figures in diluted ink, offset
  `0.3em` from the top so it sits on the heading's baseline. It carries an
  optional `Live` line, set in amber with a 6px amber square 7px to its left,
  then the year on its own line. Two terms at one employer stand as two lines in
  the same rail.
- **Head:** the name as an `h3` at 20px, usually wrapped in a link to the thing
  itself.
- **Gloss:** one italic line in full ink at 18.5px, held at 38rem, saying what
  the thing is.
- **Facts:** an unstyled list held at 40rem where each item is marked by a 5px
  diluted-ink square at 21px of indent, 11px apart, each carrying a unit and a
  before-and-after rather than a rounded headline number, with the figures set in
  the serif at 600.
- **Stack:** a mono run of names at 13px in diluted ink, each name
  `white-space: nowrap`, with a `/` plus a non-breaking space carried on the
  `::before` of the following name so a line can never end on a separator.
- **Proofs:** a mono row of links at 13.5px in full ink, 22px apart.
- **Separation:** 44px of space below, a soft hairline and 40px above the next
  record. No border on four sides, no background, no radius, no padding box.
- **Short variant:** the same grid at a third of the height, with an 18px name,
  one 16.5px paragraph in place of the list, no proof row, and 22px of padding
  between soft hairlines.

### Pinned Identity Column

- **Style:** `position: sticky` at `top: 0`, `clamp(15rem, 21vw, 19rem)` wide,
  opening on `clamp(38px, 4.2vw, 58px)` of padding and closing on 30px, with no
  ground and no border of its own.
- **Contents, in order:** the name at display size; the role line at 19px in
  diluted ink held to 34ch; the jump list; the resume on its own line in mono at
  15px in full ink; the email, GitHub and LinkedIn row in mono at 13.5px in
  diluted ink; then a block opened by a stronger hairline carrying the credential
  at 13px and the availability line.
- **Fallbacks:** static under `@media (max-height: 700px)`, and below 980px it
  becomes the opening block at `max-width: 44rem` with its jump list hidden and
  its paragraphs held at 64ch.

### Availability Line

- **Style:** a sentence in mono at 13.5px in diluted ink with a 6px filled amber
  square as a `::before`, offset `translateY(-1px)` to sit on the baseline, and
  the words "Open to work." in amber at weight 400.
- **Rule:** status is a line of text with a mark beside it. A coloured pill, a
  badge or a chip is out of the vocabulary.
- **Print:** hidden, along with the running head, the skip link and the jump
  list.

### Running Head

- **Style:** `display: none` on wide viewports and `display: block` below 980px.
  Sticky and opaque, painted in the page ground with a soft hairline beneath, it
  holds the wordmark in the serif at 17px on the left and four mono links at
  13px on the right, baseline-aligned, 20px apart, inside the same 75.5rem shell
  and 26px gutter as the page.
- **States:** nav links rest in diluted ink and go amber on hover. The Resume
  link sits in full ink so the usual exit is the heaviest word in the bar.
- **Mobile:** below 440px the wordmark is hidden and the four destinations spread
  across the bar's full width at 12.5px.

### Experience Post

- **Style:** the same rail grid as a record. The role as an `h3` at 20px, the
  employer, place and term beneath it at 17px in diluted ink, the years in the
  rail in mono with tabular figures, then the measured facts as bullets.
- **Separation:** 34px below, a soft hairline and 32px above the next post.

### Kit Rows

- **Style:** a definition list where each row is a two-column grid on the same
  rail measure and 28px gap as a record, a 16.5px serif label in diluted ink
  against a mono value run at 13px, opened by a soft hairline, with 13px of
  padding above and below.
- **Values:** the same nowrap-plus-slash construction as a record's stack line.
- **Mobile:** one column below 680px.

### Contact Row

- **Style:** the page's exit. A mono row opened by a stronger hairline at 18px of
  padding, 14.5px in full ink with 26px between destinations, the email set to
  16px so it reads first. It sits on the prose left edge with the closing
  paragraph above it at 18px.

### Skip Link

- **Style:** parked at `left: -9999px`, and on focus it lands at the top left in
  mono at 13px, ground on ink, with 10px by 16px of padding and square corners.
  It is the one inverted element on the page and it only exists while focused.

### Print Sheet

- **Style:** the print stylesheet redefines the tokens rather than overriding
  rules one by one: white ground, black ink, `#444` secondary, `#999` and `#c4c4c4`
  hairlines, and black for both the link and the live mark, so the one hue leaves
  the page on paper.
- **Behaviour:** the running head, the skip link, the jump list and the
  availability line are hidden; the shell and every record grid become blocks;
  body sets 11pt; sections take 20pt of lead and every section, record, post and
  short record carries `break-inside: avoid`; and the proof, contact, action and
  resume links print their `href` after the text at 8.5pt in `#555`.

## Do's and Don'ts

### Do:

- **Do** keep the two-column shell at 75.5rem with a 26px gutter, the identity
  column at `clamp(15rem, 21vw, 19rem)` and the stream at `minmax(0, 1fr)`.
- **Do** build every row as a rail grid, `clamp(4.75rem, 6vw, 7rem)` against
  `minmax(0, 1fr)` with a 28px gap, and put the heading first in source order.
- **Do** push any block that sits outside a record grid onto the prose left edge
  with `calc(var(--rail) + var(--rail-gap))`.
- **Do** author the dark values on `:root` and give every new token its light
  counterpart inside `prefers-color-scheme: light` in the same change.
- **Do** carry separation with a 1px hairline (`rule` where a rule opens a block,
  `rule-soft` between peers) and with space.
- **Do** split the two faces by role: Source Serif 4 for anything a person
  wrote, Geist Mono for anything a machine measured and for the labels a reader
  scans.
- **Do** set a section label in mono at 12.5px tracked 0.1em and uppercased, in
  diluted ink, smaller than the body it introduces.
- **Do** set a measured figure inside a sentence in the serif at 600 with
  proportional lining figures, and reserve tabular lining figures for the rail
  and the footer.
- **Do** hold a plain paragraph at 68ch, a record's prose at 40rem, the italic
  gloss at 38rem, and the role line at 34ch.
- **Do** write status as a mono word with a 6px filled amber square beside it,
  the same mark and the same size in a record's rail and beside the availability
  line.
- **Do** spend the amber on links and on live marks, and on nothing else.
- **Do** give `:hover` and `:focus-visible` identical treatment on the jump list,
  and reserve a transform for a slot whose length is already occupied, so no word
  on the page moves.
- **Do** draw every mark in CSS or inline SVG, and theme the browser's own
  surfaces (selection, scrollbar, caret, focus ring, underline offset) from the
  same palette.
- **Do** keep the page complete with no JavaScript, with motion disabled, under
  forced colours, and on paper.

### Don't:

- **Don't** put a background colour on any element. The page ground, the opaque
  running head, the CSS marks, the scrollbar thumb and the focused skip link are
  the whole list.
- **Don't** box a record. No card, no panel, no border on four sides, no padding
  box, no radius on content.
- **Don't** add a `box-shadow`, a `filter`, a `backdrop-filter` or a tinted layer
  anywhere, and never blur what scrolls under the running head.
- **Don't** give the amber a third job. A heading, a fill, a border or a figure in
  amber is out.
- **Don't** introduce a third face, and never set prose in the mono or a scanned
  label in the serif.
- **Don't** bold the mono. The self-hosted file is one weight and there is no
  second cut to switch to.
- **Don't** put a mono line above a heading, and don't reorder a record so the
  rail comes first in the source.
- **Don't** set a section label larger than or equal to the body beneath it.
- **Don't** stack a figure above its label as a metric tile, and don't round a
  measured number into a headline.
- **Don't** derive a text colour with `opacity` or a neutral grey. Mix a new ink
  in the same cold hue family or use one of the two that exist.
- **Don't** use a pill, a chip, a badge or a tag for status, a stack name or a
  year.
- **Don't** animate a property that moves a word. The jump rule scales inside a
  slot it already fills, and the link underline changes colour, thickness and
  offset within its own line box.
- **Don't** use a gradient, glass, a blurred blob, an emoji as an icon, a glyph
  icon font, or an indigo-to-violet accent. This page was rebuilt four times to
  get out of that vocabulary.
- **Don't** add a costume. A volvelle, a pixel grid, an illuminated border and a
  sideways book were each built and rejected; the look is earned from type,
  measure and real data.
- **Don't** ship a raster image. Decoration is CSS and inline SVG only.
- **Don't** centre anything, and don't open with a hero carrying two buttons.
- **Don't** let the pinned column stay sticky on a short window; it goes static
  under `@media (max-height: 700px)` so it cannot clip itself.
- **Don't** let any text drop below WCAG AA on either ground; the current floor is
  the diluted ink at 5.1:1 on the light ground.
