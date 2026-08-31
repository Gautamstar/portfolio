# Moving to your own domain

Short version: yes, buy one, roughly $10–15 a year. But read the catch first,
because it changes where the product has to live.

## The catch: GitHub Pages gives one domain per repository

This product currently sits in a subdirectory of your portfolio repo, served at
`gautamstar.github.io/portfolio/statement-to-csv/`.

A custom domain on GitHub Pages attaches to a **whole repository**, and it serves
that repository's *root*. So if you point `yourdomain.com` at the `portfolio`
repo, you get:

```
yourdomain.com/                        → your portfolio homepage
yourdomain.com/statement-to-csv/       → the product
```

Which is not what you want, and it also means your portfolio and your product
share an identity. Two things you would rather keep separate: recruiters looking
at one, customers buying the other.

**So: move this directory into its own repository before you point a domain at
it.** Then everything lands where the URLs already assume:

```
yourdomain.com/                             → the converter
yourdomain.com/chase-statement-to-csv.html  → the Chase landing page
yourdomain.com/thanks.html                  → after purchase
```

No file has to change for that — every internal link in this project is already
relative, and the landing pages are flat at the root. It is a copy, a new repo,
and a `SITE` edit.

## Buying one

| Registrar | Why |
| :--- | :--- |
| **Cloudflare Registrar** | Sells at wholesale cost with no markup and no renewal surprises. Requires moving DNS to Cloudflare, which is free and better anyway. |
| **Porkbun** | Cheap, honest pricing, good interface, includes WHOIS privacy. |
| **Namecheap** | Fine. Watch the second-year renewal price. |

Avoid registrars that advertise a $1 first year — the renewal is where they make
it back, and moving a domain later is a chore.

Get **WHOIS privacy** (free at all three above). Without it your home address is
in a public database, which matters more than usual when you are selling a
financial tool to strangers.

### Choosing the name

`statementtocsv.com` is taken, as are most of the obvious literal ones. That is
normal and not worth grieving — an exact-match domain is worth far less for
ranking than it was ten years ago, and Google does not need your keyword in the
domain to rank you for it. Your 18 landing pages do that work.

What actually matters: short, spellable aloud, and not confusable. A `.com` you
have to spell out is worse than a `.co` you do not. Do not buy a hyphenated
domain or a deliberate misspelling — both leak trust for a product asking to see
bank statements.

## Pointing it at GitHub Pages

At your DNS provider, for the apex domain, create four `A` records pointing at:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

and the four `AAAA` records GitHub documents alongside them, if you want IPv6.
For `www`, one `CNAME` to `<username>.github.io`.

Then in the repository: Settings → Pages → Custom domain, enter the domain, and
tick **Enforce HTTPS** once the certificate is issued (it takes a few minutes to
an hour). GitHub writes a `CNAME` file into the repo root — leave it there,
it is what tells Pages which domain to answer for.

Always verify these against GitHub's current Pages documentation before relying
on them; the addresses have been stable for years but they are GitHub's to
change.

## Then update the site

One value, one rebuild:

```bash
# tools/build-pages.mjs
const SITE = "https://yourdomain.com";
```

```bash
node tools/build-pages.mjs
node tools/preflight.mjs      # confirms the homepage agrees with the new base
```

The preflight check will fail loudly if `index.html`'s canonical still points at
the old address, which is the mistake that quietly costs you the rankings you
were trying to gain.

## Is it required for a first sale?

No. You can sell from the GitHub Pages URL today, and if getting a domain would
delay you by a week, sell first.

But it is cheap and it is leverage. You are asking a stranger to hand a document
listing every purchase they made last month to a page, and then to pay $29. A URL
reading `someone.github.io/portfolio/statement-to-csv/` says side project; a real
domain says product. For twelve dollars, buy it before the Show HN — that is the
day the URL is seen by the most people who have never heard of you.
