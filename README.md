# marissabellas.com

A field guide to security and AI. Astro site — markdown in, static HTML out.
No database, no CMS, no monthly bill.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

Node 18.20 or newer. This machine runs Node 24 LTS from `~/.local/lib/node`.

## How the guide is organized

The site is a guide, not a feed. Pieces are filed by what the reader came for,
not by when they were written. Four sections, defined once in
`src/lib/kinds.ts` and enforced by the schema in `src/content.config.ts`:

| `kind` | What belongs here |
| --- | --- |
| `field-note` | A situation from a real deployment — what happened, what it cost, what you'd do differently |
| `pattern` | The practice distilled out of seeing the same failure repeatedly |
| `postmortem` | Something that went wrong. Yours first, customers' second |
| `signal` | What's arriving next, and which assumption it breaks |

To rename a section or reword its blurb, edit `src/lib/kinds.ts` — the
homepage, the guide index, and every byline read from it.

## Publish a piece

Add a markdown file to `src/content/writing/`. The filename becomes the URL, so
`agent-365-and-the-posture-gap.md` is served at `/writing/agent-365-and-the-posture-gap/`.
Pick the filename carefully — changing it later breaks inbound links.

```markdown
---
title: "Agent 365 and the posture gap"
standfirst: "One sentence stating the argument, not teasing it."
published: 2026-09-08
kind: signal         # field-note | pattern | postmortem | signal
tags: ["agent governance", "identity"]
composite: false     # true renders the composite/NDA disclosure at the top
draft: false         # true keeps it out of the build entirely
---

Body goes here.
```

`standfirst` does triple duty: the index listing, the RSS description, and the
meta description Google shows. Write it as a claim.

Commit, push, and the site redeploys. That's the whole workflow.

### Writing about real customers

Set `composite: true` on anything drawn from real engagements. It renders a
standing disclosure above the piece — details recombined across engagements,
numbers synthesized, identifying specifics changed — and links to the fuller
explanation on `/about/#on-customer-stories`.

The convention is a named fictional composite rather than vague anonymization.
"A large customer in a regulated industry" tells the reader nothing; the State
of Zava lets the specifics stay sharp while the client stays unidentifiable.
Reuse Zava as the recurring setting where a story needs one.

### Markdown gotcha

These are `.md` files, not `.mdx`. JSX comment syntax `{/* like this */}` is
**not** a comment here — it renders as visible text on the page. Use an HTML
comment instead:

```markdown
<!-- TODO: screenshot goes here -->
```

## Before you go live

1. ~~**Set your domain.**~~ Done — `site:` in `astro.config.mjs` and the
   sitemap URL in `public/robots.txt` both point at `marissabellas.com`.
2. **Wire the subscribe form.** `src/components/Subscribe.astro` still has a
   placeholder Buttondown URL (`YOUR_USERNAME`). Create the list, paste the real
   action URL. Until you do, the form posts nowhere.
3. **Fill in the links.** LinkedIn is still `your-handle` in
   `src/components/SiteFooter.astro`. `about.astro` has marked `SLOT:` comments
   where the biographical specifics go.
4. **Sample content.** `scoping-agent-permissions.md` is `draft: true` — the
   title is worth keeping as a seed, but it's off the live site. `draft-example.md`
   exists only to demonstrate that drafts are excluded; delete it whenever.

## Deploy on Cloudflare Pages

Push to GitHub, then in the Cloudflare dashboard: Workers & Pages → Create →
Pages → connect your repo.

- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: Astro

Add the custom domain under the project's Custom domains tab. If the domain is
registered with Cloudflare, DNS is automatic; otherwise point a CNAME at the
`pages.dev` hostname they give you. TLS is issued for you.

Vercel and Netlify work identically with the same build settings.

## What's in here

```
src/
  content.config.ts          schema for the writing collection
  lib/kinds.ts               the four guide sections, labels and blurbs
  content/writing/           your posts, as markdown
  layouts/Base.astro         html shell, meta tags, fonts
  layouts/Entry.astro        article page, incl. composite disclosure
  components/                header, footer, subscribe, entry list
  pages/
    index.astro              hero + four guide entry points + recent
    writing/index.astro      the guide, grouped into its four sections
    writing/[...slug].astro  renders each markdown file
    about.astro
    work.astro               invitations, projects, talks, contact
    rss.xml.js               feed
    404.astro
  styles/global.css          the entire design system, ~640 lines
public/robots.txt
```

## Design notes

Two type layers, and the split carries meaning: everything editorial is set in
Spectral, everything belonging to the machine layer — nav, dates, counts, tags,
code — is IBM Plex Mono. Slate blue (`--accent: #4f6d8c`) is the only accent,
used at the density of a "review required" flag rather than a brand color.
Change any of it in the token block at the top of `global.css`; nothing
downstream hardcodes a color.

One animation on the page: the hero lines stagger in on load, and it's disabled
under `prefers-reduced-motion`. Resist adding more.
