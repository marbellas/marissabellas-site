import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Change this to your real domain before you deploy.
  // It is used for the RSS feed, the sitemap, and canonical URLs.
  site: 'https://marissabellas.com',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-light' },
  },
});
