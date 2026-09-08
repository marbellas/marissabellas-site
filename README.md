# marissabellas.com

An Astro site. Markdown in, static HTML out. No database, no CMS, no monthly bill.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

Node 18.20 or newer.

## Publish a piece

Add a markdown file to `src/content/writing/`. The filename becomes the URL, so
`agent-365-and-the-posture-gap.md` is served at `/writing/agent-365-and-the-posture-gap/`.
Pick the filename carefully — changing it later breaks inbound links.

```markdown
---
title: "Agent 365 and the posture gap"
standfirst: "One sentence stating the argument, not teasing it."
published: 2026-09-08
kind: essay          # essay | note | talk
tags: ["agent governance", "cspm"]
draft: false         # true keeps it out of the build entirely
---

Body goes here.
```

`standfirst` does triple duty: the index listing, the RSS description, and the
meta description Google shows. Write it as a claim.

Commit, push, and the site redeploys. That's the whole workflow.

## Before you go live

1. **Set your domain.** `site:` in `astro.config.mjs`, and the sitemap URL in
   `public/robots.txt`. RSS links and canonical tags are generated from it.
2. **Wire the subscribe form.** `src/components/Subscribe.astro` has a placeholder
   Buttondown URL. Create the list, paste the real action URL. Until you do, the
   form posts nowhere.
3. **Fill in the links.** LinkedIn and email are placeholders in
   `src/components/SiteFooter.astro`, `about.astro`, and `work.astro`.
4. **Delete the sample content.** `scoping-agent-permissions.md` and
   `draft-example.md` exist to show the layouts working.

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
  content/writing/           your posts, as markdown
  layouts/Base.astro         html shell, meta tags, fonts
  layouts/Entry.astro        article page
  components/                header, footer, subscribe, entry list
  pages/
    index.astro              hero + five most recent pieces
    writing/index.astro      full archive
    writing/[...slug].astro  renders each markdown file
    about.astro
    work.astro               talks, projects, contact
    rss.xml.js               feed
    404.astro
  styles/global.css          the entire design system, ~500 lines
public/robots.txt
```

## Design notes

Two type layers, and the split carries meaning: everything editorial is set in
Spectral, everything belonging to the machine layer — nav, dates, tags, code — is
IBM Plex Mono. Amber (`#b26a00`) is the only accent, used at the density of a
"review required" flag rather than a brand color. Change any of it in the token
block at the top of `global.css`; nothing downstream hardcodes a color.

One animation on the page: the hero lines stagger in on load, and it's disabled
under `prefers-reduced-motion`. Resist adding more.
