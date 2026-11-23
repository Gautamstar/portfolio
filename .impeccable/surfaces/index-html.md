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

Build path: code-led, forced by the absence of image generation on this machine
and by PRODUCT.md's ban on raster images. The direction round served layout
wireframes and palette chips; the user locked The Standing Column, the pick
card, over the dealt Measurement Sheet and a competitive Departures Board.

## Direction contract

THESIS: The identity never leaves the screen while the evidence scrolls past it
in dated rows. A narrow pinned column on the left holds who this person is and
the two things a screener wants from it, the resume and the email; the wide
column on the right is a stream of records, each one opening with its date in
its own rail. The page refuses the arrangement it replaces as much as the
generated-portfolio vocabulary: no centred single column that puts the name
above an empty screen, no stat row at the top, no cards of equal weight, no
hero with two buttons, no eyebrow above a heading, no gradient, no glass, no
pills, no emoji. The structural claim is evidence-led: across eleven engineer
sites read live for this round, six of them new grads hired at Shopify, Meta,
Lyft, TD and GitHub, the one shape they share is a dated rail at the left edge
of every row, and the page adopts it.

OWN-WORLD: The pinned register, unchanged and user-pinned. Two faces and no
third. Source Serif 4 carries every sentence; Geist Mono carries the fields a reader
scans down a column rather than reads: status, dates, stack names, proof links,
and the section labels. The page is built dark and carries a light mode on the system
setting: a cold neutral grey-black ground with two inks mixed from the same
cold hue, and one amber as the only hue on the page, doing two jobs and no
others, every link and every live mark. Nothing is boxed: structure is hairline rules at 1px, the rail's own
left edge, and space. Live status is a 6px filled square beside a mono word,
drawn in CSS, the same mark and the same size wherever it appears. The scale inverts
against what this page shipped before: a section label is now smaller than the
body it introduces, 12.5px tracked mono against 17px prose, so the record names
and the sentences are the only things on the page carrying weight. A section
label is the section's own name standing above a list of differently-named
records, not an eyebrow on the heading beneath it; no label and heading ever
share a block.

STORY: The visitor reads the name, the role and one sentence, and the resume and
the email are a click away before they scroll at all. They scroll the right
column and every row answers when, what, and what changed, with the repository
link beside the figure it produced. They act from the pinned column, which is
still there whatever row they stopped on.

FIRST VIEWPORT: Two columns, flush left, nothing centred. The left column is
roughly a quarter of the measure: the name at display size in the serif, the
role beneath it held to about 34 characters a line, then one jump link per
section in mono, then the resume on its own line, then email, GitHub and
LinkedIn, then the credential and the availability line with its square. It is
sticky from the top and falls back to scrolling with the page on any window
under 700px tall, where it would otherwise clip. The right column opens on the
page's one opening sentence, then the SELECTED WORK label and the first record: FitFileSize, its year and Live
status standing in the left rail of its own row, the italic sentence of what it
is, and the first measured lines under it. No figure row, no boxes, no accent.

FORM: The Standing Column, the pick card, locked by the user over the roll.
Seed key ed1f5977, scope direction, mode persuade, assigned index 4 of seven
grounded candidates; the assigned Measurement Sheet and four declined catalog
challengers are the spent hand.

RAISE: the date rail is the page's alignment rule. One left edge for the labels
and the rails, a second for every sentence, held from the top of the page to the
bottom across records, roles, education and the tool table alike.
RAISE: the section label is smaller than the body it introduces, which is the
inversion six hired-engineer sites share and no template performs.
RAISE: the resume is a first-class line of its own inside the pinned column,
not the fourth of four equal links, because it is the one destination a
thirty-second reader wants and it is now reachable at every scroll position.
RAISE: the two faces divide by role, not by subject. A measured figure inside a
sentence stays in the reading face at 600 and takes the sentence's own
proportional figures; tabular spacing belongs to the mono columns.
RAISE: no element has a background colour except the page itself and the dark
ground; separation is rules, the rail, and space.
RAISE: the signature interaction is the pinned column's jump list: a 1px rule
left of each link grows from 20px to 44px and takes the ink on hover and on
keyboard focus, the same gesture as the link underline that is the page's one
authored moment, applied to the one element always on screen.
RAISE: the browser's own chrome is themed, selection, caret, scrollbar, focus
ring and underline offset, because a page that leaves the default focus ring
was assembled rather than built.
RAISE: the footer links the repository this page is built from, which is free
proof for an engineering reader and costs one line.

FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, DESIGN.md, and every shipping raster carrying its
provenance.
