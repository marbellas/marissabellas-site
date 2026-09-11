import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeSidenotes from './src/lib/rehype-sidenotes.mjs';

export default defineConfig({
  // Change this to your real domain before you deploy.
  // It is used for the RSS feed, the sitemap, and canonical URLs.
  site: 'https://marissabellas.com',
  integrations: [sitemap()],

  // Unpublishing a post stops the build emitting its page, but Cloudflare
  // Pages kept serving the orphaned HTML from an older deployment — it was
  // still answering 200 with stale markup days later, while being absent
  // from the sitemap, the feed and the index. A later deploy did not evict
  // it, because a deployment only replaces paths it actually contains.
  //
  // Claiming the path again is what fixes it: this emits a real file there,
  // so the current deployment owns the route and the stale one is replaced.
  // Anyone holding the old link lands on the guide instead of a dead page.
  redirects: {
    '/writing/agent-365-and-the-posture-gap/': '/writing/',
  },
  markdown: {
    // Dual themes. defaultColor: false stops Shiki inlining either one,
    // so both live in CSS variables and global.css picks per theme.
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      defaultColor: false,
    },
    // Footnotes become margin notes beside the line that cites them,
    // instead of a pile at the bottom the reader has to jump to.
    rehypePlugins: [rehypeSidenotes],
  },
});
