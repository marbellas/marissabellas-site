import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Change this to your real domain before you deploy.
  // It is used for the RSS feed, the sitemap, and canonical URLs.
  site: 'https://marissabellas.com',
  integrations: [sitemap()],
  markdown: {
    // Dual themes. defaultColor: false stops Shiki inlining either one,
    // so both live in CSS variables and global.css picks per theme.
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      defaultColor: false,
    },
  },
});
