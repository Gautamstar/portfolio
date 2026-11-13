---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

Scope: index.html, the whole single-page site. Visitor mode: Persuade.

Audience: a recruiter or technical screener, laptop, bright office, thirty to
ninety seconds, deciding whether to open the resume or leave. A second audience
is engineers who open the repositories to judge the code. Action: email or
resume download. Proof: three live apps, measured production numbers, public
repositories. Constraints: one static file, no build, no raster images, 100
Lighthouse on four categories, two private repos that must carry no GitHub
button.

Build path: code-led, forced by PRODUCT.md rather than chosen. A comp-led build
ships raster plates; this page is constrained to SVG and CSS decoration only,
so the comp round cannot produce a shippable asset here. The user selected a
rendered text comp of the first viewport during the direction round, and that
comp is the critique reference.

## Direction contract

PINNED BY USER, and it is the standing exit taken deliberately: the category
convention played straight at full fidelity, after four themed worlds were built
and rejected (a volvelle, a pixel RPG, an illuminated manuscript, a sideways
book). The named craft bar is simonwillison.net, overreacted.io and danluu.com.
Light ground with a dark mode on the system setting, chosen from the use scene:
a bright office on a laptop.

THESIS: This is a working engineer's own site. One column of type on warm paper
white, where the only ornament is the information. A project is a record, not a
card: its name, its status, its year, one sentence of what it is, then the
measured facts, then the stack, then the link to the repository that proves it.
The page refuses the entire generated-portfolio vocabulary, which is the thing
the user rejected four times under four different costumes: no cards of equal
weight, no hero with two buttons, no eyebrow labels, no gradient anything, no
glass, no pills, no emoji, no indigo. Authority comes from density and
precision, the way it does on a well-set page of a reference book.

OWN-WORLD: Two faces and no third. Newsreader, a text serif with a true italic
and optical sizes, carries every sentence. DM Mono carries the fields a reader
scans down a column rather than reads: status, years and dates, stack names, and
the proof links. The split is by role, not by subject, so a measured figure
inside a sentence stays in the serif; monospace never appears as a costume for
"technical" and never sets prose. Nothing on the page is boxed:
structure is hairline rules at 1px and the space between things. Ink is
near-black on a warm off-white, with a single diluted ink for secondary text
mixed from the same hue rather than grayed. One ink blue, spent only on link
underlines. Live status is a 6px filled square beside a mono word, drawn in CSS,
never a coloured pill. Numbers are tabular wherever they stand in a column, and
the browser's own surfaces, selection, caret, scrollbar, focus ring and
underline offset, are themed from the same palette.

STORY: The visitor reads the name, the role and three lines, and knows within
one screen that this person ships measured work. They believe it because every
figure sits beside a link to the repository it came from. They act by taking the
email or the resume, both of which are reachable from the first screen and from
the nav at every scroll position.

FIRST VIEWPORT: Flush left, no centring anywhere. The name at display size in
Newsreader, the role on one line under it, then a paragraph of three lines held
at 68 characters. Under that, a single line of four text links, underlined, with
the resume first. Then a hairline rule, and under it the four record figures in
mono as a two-by-two table, label left and figure set out to the right of its
own column, so the figures stand in two aligned columns. Label before figure,
not figure above label: the stacked figure is the hero-metric template the craft
floor refuses, and these are records rather than headline numbers. No boxes and
no accent. The first project record begins above the fold on a laptop, so
the visitor sees the structure of the page without scrolling.

RAISE: the two faces divide by role, not by subject. Mono carries status,
dates, stack names and the proof links, the fields a reader scans down a column.
A measured figure inside a sentence stays in the reading face, set at 600, and
takes the sentence's own proportional figures; tabular spacing belongs to the
mono columns, where digits have to line up.
RAISE: a project's measured facts carry the unit and the before-and-after, not a
rounded headline number.
RAISE: no element on the page has a background colour except the page itself and
the dark-mode ground; separation is carried by rules and space alone.
RAISE: the secondary ink is mixed from the primary, so the page holds two real
inks and no opacity-derived grey.
RAISE: the browser's own chrome is themed, because a page that leaves the
default focus ring and the default selection blue was assembled rather than
built.

FORM: The engineer's personal site, plain and typographic. Taken as the standing
exit rather than dealt by the roll, against the three named reference sites.

FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, and DESIGN.md.
