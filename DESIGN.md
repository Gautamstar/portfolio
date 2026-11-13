---
name: Gautam Singh Portfolio
description: A working engineer's own site. One column of type on warm paper white, where the only ornament is the information.
colors:
  paper: "#fcfbf8"
  ink: "#1b1915"
  ink-2: "#6b6356"
  rule: "#d6d1c4"
  rule-soft: "#e9e5db"
  link: "#1a4a76"
  link-rule: "#7496b4"
  live: "#2c6642"
  sel: "#dbe5ee"
  paper-dark: "#15140f"
  ink-dark: "#eeebe3"
  ink-2-dark: "#a39b89"
  rule-dark: "#35322a"
  rule-soft-dark: "#26241e"
  link-dark: "#93b9d8"
  link-rule-dark: "#55697d"
  live-dark: "#74b68d"
  sel-dark: "#2a3a47"
typography:
  display:
    fontFamily: "Newsreader, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "clamp(40px, 7.4vw, 59px)"
    fontWeight: 450
    lineHeight: 1.04
    letterSpacing: "-0.022em"
  headline:
    fontFamily: "Newsreader, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "30px"
    fontWeight: 500
    lineHeight: 1.16
    letterSpacing: "-0.016em"
  title:
    fontFamily: "Newsreader, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "21px"
    fontWeight: 500
    lineHeight: 1.26
    letterSpacing: "-0.012em"
  title-compact:
    fontFamily: "Newsreader, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "18.5px"
    fontWeight: 500
    lineHeight: 1.26
    letterSpacing: "-0.012em"
  lede:
    fontFamily: "Newsreader, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
  body:
    fontFamily: "Newsreader, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
    fontVariant: "proportional-nums lining-nums"
  gloss:
    fontFamily: "Newsreader, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "19px"
    fontWeight: 400
    fontStyle: "italic"
    lineHeight: 1.62
  bullet:
    fontFamily: "Newsreader, Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.58
  label-lead:
    fontFamily: "DM Mono, ui-monospace, SF Mono, Cascadia Mono, Menlo, Consolas, monospace"
    fontSize: "14.5px"
    fontWeight: 400
    letterSpacing: "-0.012em"
  label-mid:
    fontFamily: "DM Mono, ui-monospace, SF Mono, Cascadia Mono, Menlo, Consolas, monospace"
    fontSize: "13.5px"
    fontWeight: 400
    letterSpacing: "-0.012em"
  label:
    fontFamily: "DM Mono, ui-monospace, SF Mono, Cascadia Mono, Menlo, Consolas, monospace"
    fontSize: "13px"
    fontWeight: 400
    letterSpacing: "-0.01em"
    fontVariant: "tabular-nums lining-nums"
  caption:
    fontFamily: "DM Mono, ui-monospace, SF Mono, Cascadia Mono, Menlo, Consolas, monospace"
    fontSize: "12.5px"
    fontWeight: 400
    letterSpacing: "-0.01em"
    fontVariant: "tabular-nums lining-nums"
rounded:
  none: "0"
  hairline: "1px"
  thumb: "6px"
spacing:
  mark-gap: "7px"
  row: "13px"
  inline: "20px"
  gutter: "26px"
  column-gap: "34px"
  record: "46px"
  section: "clamp(52px, 7vw, 86px)"
components:
  link:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
  link-hover:
    textColor: "{colors.link}"
  nav-link:
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
  nav-link-resume:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  record-title:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
  record-meta:
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
  status-mark:
    backgroundColor: "{colors.live}"
    size: "6px"
    rounded: "{rounded.none}"
  bullet-mark:
    backgroundColor: "{colors.ink-2}"
    size: "5px"
    rounded: "{rounded.none}"
  facts-figure:
    textColor: "{colors.ink}"
    typography: "{typography.label-mid}"
  stack-token:
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
  skip-link:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    padding: "10px 16px"
    rounded: "{rounded.none}"
---

# Design System: Gautam Singh Portfolio

## Overview

**Creative North Star: "The Reference Entry"**

This is a working engineer's own site, set the way a well-made reference book
sets an entry. A project is a record rather than a card: its name, its status,
its year, one italic line of what it is, then the measured facts, then the
stack, then the link to the repository that proves it. Nothing on the page is
boxed. Structure is carried entirely by 1px hairline rules and the space
between things, so the page has no containers to decorate and no surfaces to
tint. Authority comes from density and precision.

The material is warm paper white under near-black ink, with a dark ground on
the system setting. The craft bar is set by three named reference sites,
simonwillison.net, overreacted.io and danluu.com: plain, typographic, and
unmistakably built by the person whose work it describes. The page refuses the
generated-portfolio vocabulary outright, because that vocabulary is the thing
this site was rebuilt four times to escape. Equal-weight rounded cards with
soft shadows, gradients, glass, saturated pill badges, emoji icons and an
indigo-to-violet accent are all out, and so is any costume or theme: the look
is earned from type, measure and real data.

Two faces divide the page by role rather than by subject. Newsreader, a text
serif with a true italic, sets every sentence. DM Mono sets the fields a reader
scans down a column instead of reading: status, years and dates, stack names
and proof links. One colour event exists, a single ink blue on link underlines.
One thing on the page moves, a link's underline under the cursor.

**Key Characteristics:**

- One column, flush left, held at 44rem with a 26px gutter
- Two faces split by role, with no third face anywhere
- Separation by 1px hairline and space, with no boxes and no shadows
- Two real inks mixed in one warm hue family, with no grey and no opacity
- A single ink blue, spent on link underlines, link hover and the focus ring
- Square corners everywhere, and marks drawn as 5px and 6px CSS squares
- Tabular figures in the mono columns, proportional figures inside sentences
- Browser chrome themed from the same palette: selection, scrollbar, focus ring

## Colors

Two inks on a warm paper, one ink blue for links, one ink green for live
status, and two weights of hairline. Every value has a dark-ground counterpart
keyed with a `-dark` suffix, selected by `prefers-color-scheme` on `:root`.

### Primary

- **Ink Blue** (`link`): the page's only colour event. It carries link
  underlines on hover, the link's own text colour on hover, and the
  focus-visible outline at 2px with a 3px offset. It appears on nothing else:
  no heading, no fill, no mark. Measured at 8.9:1 against paper in both
  schemes.
- **Diluted Ink Blue** (`link-rule`): the resting underline colour, a tint of
  the ink blue that reads as a hairline under the word rather than as a
  coloured line. It thickens to the full ink blue on hover. Measured at 3.0:1
  against paper and 3.3:1 on the dark ground, so a link is found by eye even
  though its text is the same ink as the prose around it; the two structural
  hairlines sit well below that, at 1.5:1 and 1.2:1, which is how an underline
  reads as a link and a rule reads as structure.

### Secondary

- **Ink Green** (`live`): the live-status ink, used on the 6px status square
  and the mono word beside it. It is the only other hue on the page and it
  appears only where a deployment is actually running. Measured at 6.6:1 on
  paper, 7.7:1 on the dark ground.

### Neutral

- **Warm Paper White** (`paper`): the page ground, a warm off-white at hue 91
  in OKLCH rather than a neutral white. In dark mode it becomes a warm
  near-black at hue 98.
- **Warm Near-Black Ink** (`ink`): all primary text, headings and the mono
  fields a reader must read exactly, such as the record figures and the proof
  links. 17:1 on paper.
- **Diluted Ink** (`ink-2`): secondary text, mixed from the primary ink toward
  the paper inside the same warm hue family (hue 80 against the ink's 85), so
  it is a second real ink rather than a grey or an opacity. It carries the role
  line, the italic gloss, stack names, dates, nav links, the availability
  sentence, the footer and the bullet mark. 5.7:1 on paper, 6.7:1 on the dark
  ground.
- **Hairline** (`rule`): the stronger 1px rule, used where a rule opens a block
  of data rather than divides two records: above the record figures, above the
  contact line, and as the `/` separator between stack names and the scrollbar
  thumb.
- **Soft Hairline** (`rule-soft`): the quieter 1px rule, used for every
  separation between peers: under the running head, between sections, between
  records, between posts, between kit rows.
- **Selection Wash** (`sel`): the themed `::selection` background, a pale tint
  of the ink blue's hue that holds ink at 13.8:1 on light and 9.8:1 on dark.

### Named Rules

**The Two Inks Rule.** The page holds exactly two inks and one paper per
scheme. The secondary ink is a mixed value in the same warm hue family as the
primary, so no text colour is ever produced with `opacity`, `color-mix` against
grey, or a neutral grey hex. Audit test: grep the stylesheet for `opacity` and
for any text colour outside the nine declared tokens; both should return
nothing.

**The One Blue Rule.** The ink blue is spent on link underlines, link hover
text and the focus ring. Any other use, including a heading, a fill, a mark or
a border, is a new colour event and is out.

**The No Ground Rule.** No element carries a background colour. The three
exceptions are the page ground itself, the small CSS-drawn marks (the 6px
status square, the 5px bullet square and the scrollbar thumb), and the skip
link while it has focus. Separation everywhere else is a hairline and space.

## Typography

**Display Font:** Newsreader (with Iowan Old Style, Palatino Linotype, Palatino, Georgia, serif)
**Body Font:** Newsreader, the same face at the same optical size
**Label/Mono Font:** DM Mono (with ui-monospace, SF Mono, Cascadia Mono, Menlo, Consolas, monospace)

**Character:** Newsreader is a text serif with a true italic, self-hosted as a
variable roman with the weight axis open from 350 to 650 and the optical-size
axis instanced to 16, plus a static 16pt italic. It is a reading face used at
display size rather than a display face, which is why the name at 59px carries
the same voice as a bullet at 17px. DM Mono is self-hosted as the Medium cut
mapped to `font-weight: 400`, so the mono has exactly one weight and holds its
own against the serif at 13px without ever bolding.

### Hierarchy

- **Display** (450, `clamp(40px, 7.4vw, 59px)`, 1.04, -0.022em, balanced wrap):
  the name, once, at the top of the page.
- **Headline** (500, 30px, 1.16, -0.016em): section titles, with 28px beneath.
- **Title** (500, 21px, 1.26, -0.012em): a record's name, usually wrapped in a
  link to the thing itself.
- **Title Compact** (500, 18.5px): the same role inside a short record.
- **Lede** (400, 19px, 1.62): the opening paragraph and the contact paragraph,
  the only places where the serif runs above body size.
- **Body** (400, 18px, 1.62, proportional lining figures; 17.5px below 680px):
  all prose. Paragraphs are held at 68ch.
- **Gloss** (400 italic, 19px, diluted ink, 58ch): one line under a record name
  saying what the thing is. The true italic is doing the work of a subtitle
  style.
- **Bullet** (400, 17px, 1.58): the measured facts under a record, each marked
  with a 5px square at 21px of indent.
- **Label Lead** (400 mono, 14.5px, -0.012em): the first-screen action links
  and the contact line, the largest the mono gets.
- **Label Mid** (400 mono, 13.5px): proof links, record figures, the
  availability line.
- **Label** (400 mono, 13px, tabular lining figures): nav, record status and
  year, dates, stack names, kit values.
- **Caption** (400 mono, 12.5px): the footer.

### Named Rules

**The Two Faces Rule.** Newsreader sets everything a person wrote. DM Mono sets
everything a machine measured: status, years and dates, latencies, sizes,
counts, versions, stack names and proof links. Neither face ever does the
other's job, so the mono never sets a sentence and never appears as a costume
for "technical".

**The Figure-in-Sentence Rule.** A measured figure inside a sentence stays in
the serif at weight 600 and takes the sentence's own proportional lining
figures. Tabular lining figures belong to the mono columns, where digits have
to line up under each other. Audit test: any `tabular-nums` declaration should
sit on a mono selector.

**The No Kicker Rule.** A mono line never sits above a heading. Where a record
head stacks at narrow widths, the name stays first and the status drops beneath
it, because a mono line set above a title is an eyebrow and this page does not
use them.

## Layout

One column, `44rem` wide, centred in the viewport with a 26px gutter, so every
line of type starts at the same left edge from the top of the page to the
bottom. Nothing is centred inside that column. The only right-aligned element
is a date column in the experience and education entries, set out to the right
of the head with `justify-content: space-between`.

Vertical rhythm is one section token, `clamp(52px, 7vw, 86px)`, applied as the
top padding of every section, with a soft hairline between consecutive
sections. Inside a section the rhythm steps down: 46px below a full record and
42px above the next one, 36px and 34px for an experience post, 22px for a short
record, 13px for a kit row. Horizontal gaps run 7px between a mark and its
word, 20px to 26px between inline links, and 34px between the two columns of
record figures.

Measures are set per role rather than globally: 68ch for prose and bullets,
62ch for the availability line, 58ch for the italic gloss, 56ch for the
closing paragraph, 72ch for a mono stack run, and no cap on a row of links.

The running head is sticky, opaque, and 1px-ruled at its lower edge, with
`scroll-padding-top: 76px` on `html` so an anchor never lands under it.

Two breakpoints, both narrowing rather than rearranging. At 680px the body
drops to 17.5px, the gutter to 20px, the record figures and the kit rows
collapse to one column, and every two-part head stacks with the name first. At
440px the wordmark leaves the running head and the four nav destinations spread
across its full width. A print stylesheet drops the running head and the skip
link, sets 11pt black on white, and keeps each record, post and short record
from breaking across pages.

### Named Rules

**The One Left Edge Rule.** Every line on the page starts at the same left
edge. Set a date or a status out to the right of the column when it has to
align with its peers; centre nothing, ever.

**The Scan Column Rule.** A field a reader scans down the page rather than
reads belongs in mono and belongs in a column of its own, aligned with the
same field in the records above and below it.

## Elevation & Depth

The page is flat. There is no `box-shadow` anywhere in the stylesheet, no
`filter`, no `backdrop-filter`, and no tonal layering: every element sits on
the same paper. Depth is carried by two weights of 1px hairline, by white
space, and by the weight and size of the type. The sticky running head is the
one element that overlaps content, and it resolves that overlap with an opaque
background and a soft hairline rather than with a shadow or a blur, because a
bar pinned to the viewport must not re-sample what scrolls beneath it.

### Named Rules

**The Hairline Rule.** Depth has exactly two values, `rule` and `rule-soft`,
both at 1px. Use the stronger one where a rule opens a block of data, and the
soft one between peers. A third weight, a shadow or a tinted panel is a new
material and is out.

**The Opaque Bar Rule.** Nothing pinned to the viewport may blur or tint what
scrolls under it. The sticky head is painted in the page ground at full
opacity.

## Shapes

Square corners everywhere. The only radii in the stylesheet are 1px on the
focus ring, so the outline follows the glyph edge cleanly, 6px on the
`::-webkit-scrollbar-thumb`, which is browser chrome rather than page content,
and 2px on the SVG favicon's rect.

The form vocabulary is four shapes and nothing else: the 1px horizontal rule,
the small filled square (6px for live status, 5px for a bullet), the 1px
underline under a link, and the `/` glyph drawn as a pseudo-element in hairline
colour between stack names. All four are type-scale marks rather than
illustrations, drawn in CSS with no raster image anywhere on the page: the
favicon is an inline SVG data URI and it is the only graphic.

### Named Rules

**The Square Rule.** Content corners are square. A radius belongs only to
browser chrome or to a focus ring that has to sit tight against a glyph.

## Components

### Links

- **Shape:** no box, no padding, no radius. A link is a word with a rule under it.
- **Resting:** text colour inherited from its context, underline in diluted ink
  blue at 1px with a 0.18em offset.
- **Hover:** text colour and underline both become the full ink blue, the
  underline thickens to 2px, and the offset closes to 0.13em over 140ms on
  `cubic-bezier(0.2, 0.7, 0.3, 1)`. This is the only animation on the page and
  it is used on every link rather than on a chosen few.
- **Focus:** a 2px ink-blue outline at 3px offset, with a 1px radius.
- **Reduced motion:** the thickness and offset are frozen at their resting
  values and only the colour transitions, over 140ms linear.
- **Variants:** links in prose inherit body ink; nav links and footer links
  take diluted ink; action, proof and contact links take full ink so a row of
  mono destinations reads as primary.

### Navigation

- **Style:** a sticky running head holding the wordmark in Newsreader at 17px
  on the left and four mono links at 13px on the right, baseline-aligned,
  separated by 20px, on an opaque paper ground with a soft hairline beneath.
- **States:** nav links rest in diluted ink and go ink blue on hover. The
  Resume link sits in full ink so the usual exit is the heaviest word in the
  bar.
- **Mobile:** below 440px the wordmark is hidden and the four destinations
  spread across the bar's full width at 12.5px.

### Project Record (signature component)

The page's central pattern, and the reason there are no cards.

- **Head:** the name as an `h3` link on the left, and a mono meta line on the
  right carrying an optional live square plus the word `Live`, then the year.
  Both sit on one baseline with the meta set out to the right edge of the
  column, the way an entry sits in a table of contents.
- **Gloss:** one italic line in diluted ink at 58ch saying what the thing is.
- **Facts:** an unstyled list where each item is marked by a 5px diluted-ink
  square at 21px of indent, held at 68ch, each carrying a unit and a
  before-and-after rather than a rounded headline number, with the figures set
  in the serif at 600.
- **Stack:** a mono run of names at 13px in diluted ink, each name
  `white-space: nowrap`, joined by a `/` pseudo-element in hairline colour.
- **Proofs:** a mono row of links at 13.5px in full ink, 22px apart.
- **Separation:** 46px of space below, a soft hairline and 42px above the next
  record. No border, no background, no radius, no padding box.
- **Short variant:** the same anatomy at a third of the height, with an 18.5px
  name, one paragraph in place of the list, no proof row, and 22px of padding
  between a soft hairline above and below.

### Record Figures

- **Style:** a definition list as a two-by-two grid, opened by a stronger
  hairline, in mono at 13.5px, with 34px between columns and 7px between rows.
- **Rule:** label on the left in diluted ink, figure set out to the right of
  its own column in full ink with tabular lining figures, so the four figures
  stand in two aligned columns. Label before figure, never a figure stacked
  above its label, which is the hero-metric template this page refuses.
- **Mobile:** one column below 680px.

### Availability Line

- **Style:** a sentence in mono at 13.5px in diluted ink, held at 62ch, with a
  7px filled square in ink green as a `::before` and the words "Open to work."
  in ink green at weight 400.
- **Rule:** status is a line of text with a mark beside it. A coloured pill, a
  badge or a chip is out of the vocabulary.

### Experience Post

- **Style:** the role as an `h3` on the left with the employer in 17px diluted
  ink beneath it, and the date range on the right in mono at 13px with tabular
  figures, each range on its own line.
- **Alignment:** the head does not wrap (`flex-wrap: nowrap`) and the left
  block takes `min-width: 0`, so a long employer line wraps inside the head
  rather than pushing the dates out of their column.
- **Two terms:** a second date range carries the word "and" from a
  `::before` on the second span, so it cannot be read as the tail of the first.
- **Mobile:** the head stacks name-first and the dates go inline and left
  aligned, with the "and" picking up surrounding spaces.

### Kit Rows

- **Style:** a definition list where each row is a two-column grid, an 11.5rem
  serif label at 16.5px in diluted ink and a mono value run at 13px, opened by
  a soft hairline, with 13px of padding above and below.
- **Values:** the same nowrap-plus-slash construction as a record's stack line.
- **Mobile:** one column below 680px.

### Skip Link

- **Style:** parked at `left: -9999px`, and on focus it lands at the top left
  in mono at 13px, paper on ink, with 10px by 16px of padding and square
  corners. It is the one inverted element on the page and it only exists while
  focused.

## Do's and Don'ts

### Do:

- **Do** keep one column at 44rem with a 26px gutter, and start every line at
  the same left edge.
- **Do** carry separation with a 1px hairline (`rule` where a rule opens a data
  block, `rule-soft` between peers) and with space.
- **Do** split the two faces by role: Newsreader for anything a person wrote,
  DM Mono for anything a machine measured.
- **Do** set a measured figure inside a sentence in the serif at 600 with
  proportional lining figures, and reserve tabular lining figures for the mono
  columns.
- **Do** hold prose at 68ch, the italic gloss at 58ch, and the availability
  line at 62ch.
- **Do** write status as a mono word with a small filled square beside it, 6px
  in a record head and 7px beside the availability line.
- **Do** spend the ink blue only on link underlines, link hover text and the
  focus ring.
- **Do** draw every mark in CSS or inline SVG, and theme the browser's own
  surfaces (selection, scrollbar, caret, focus ring, underline offset) from the
  same palette.
- **Do** set a date or a status out to the right of its head so it aligns with
  the same field in the entries above and below.
- **Do** carry the unit and the before-and-after in a measured fact, and put a
  link to the thing that proves it in the same record.
- **Do** keep the page complete with no JavaScript and with motion disabled.

### Don't:

- **Don't** put a background colour on any element. The page ground, the small
  CSS squares, the scrollbar thumb and the focused skip link are the whole
  list.
- **Don't** box a record. No card, no panel, no border on four sides, no
  padding box, no radius on content.
- **Don't** add a `box-shadow`, a `filter`, a `backdrop-filter` or a tinted
  layer anywhere, and never blur what scrolls under the sticky head.
- **Don't** introduce a third face, and never set prose in the mono or a label
  column in the serif.
- **Don't** bold the mono. The self-hosted file is one weight and there is no
  second cut to switch to.
- **Don't** put a mono line above a heading. Kickers and eyebrow labels are out.
- **Don't** stack a figure above its label as a metric tile, and don't round a
  measured number into a headline.
- **Don't** derive a text colour with `opacity` or a neutral grey. Mix a new ink
  in the same warm hue family or use one of the two that exist.
- **Don't** use a pill, a chip, a badge or a tag for status, a stack name or a
  year.
- **Don't** use a gradient, glass, a blurred blob, an emoji as an icon, a glyph
  icon font, or an indigo-to-violet accent. This page was rebuilt four times to
  get out of that vocabulary.
- **Don't** add a costume. A volvelle, a pixel grid, an illuminated border and a
  sideways book were each built and rejected; the look is earned from type,
  measure and real data.
- **Don't** ship a raster image. Decoration is CSS and inline SVG only.
- **Don't** centre anything, and don't open with a hero carrying two buttons.
- **Don't** animate anything but a link's underline, and keep that frozen under
  `prefers-reduced-motion`.
- **Don't** let any text drop below WCAG AA on either ground; the current floor
  is the diluted ink at 5.7:1 on paper.
