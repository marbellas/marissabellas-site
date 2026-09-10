/**
 * Generate the default Open Graph card at public/og-default.png.
 *
 *   node scripts/make-og.mjs
 *
 * Run it again after changing the site's colours or tagline. The output is
 * committed, so the build itself has no dependency on this script.
 *
 * Fonts are deliberately generic families rather than Spectral and IBM Plex
 * Mono: this renders through resvg, which only sees fonts installed on the
 * machine, and a missing family silently falls back to something worse than
 * a well-chosen stack.
 */

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const W = 1200;
const H = 630;

// Straight from the :root block in global.css.
const GROUND = '#0d1214';
const INK = '#dfe7ea';
const INK_SOFT = '#8b9ba2';
const ACCENT = '#e0a33f';
const RULE = '#222d32';

const CHANNELS = ['#5cb8d1', '#7cc27a', '#e07a5f', '#a99bf5'];

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${GROUND}"/>

  <!-- The masthead mark, as on the site. -->
  <rect x="80" y="72" width="18" height="18" fill="${ACCENT}"/>
  <rect x="98" y="90" width="18" height="18" fill="${ACCENT}"/>
  <text x="132" y="93" font-family="Menlo, monospace" font-size="24"
        letter-spacing="2" fill="${INK}">MARISSA BELLAS</text>

  <line x1="80" y1="150" x2="${W - 80}" y2="150" stroke="${RULE}" stroke-width="1"/>

  <text x="80" y="286" font-family="Georgia, serif" font-size="86" font-weight="bold"
        fill="${INK}">Deployed it. Sold it.</text>
  <text x="80" y="386" font-family="Georgia, serif" font-size="86" font-weight="bold"
        fill="${ACCENT}">Now I answer for it.</text>

  <text x="80" y="452" font-family="Georgia, serif" font-size="30" fill="${INK_SOFT}">
    A field guide to security and AI.
  </text>

  <line x1="80" y1="516" x2="${W - 80}" y2="516" stroke="${RULE}" stroke-width="1"/>

  <!-- The four guide channels, in their own colours. -->
  ${['field notes', 'patterns', 'postmortems', 'signals']
    .map((label, i) => {
      const x = 80 + i * 268;
      return `
    <circle cx="${x + 5}" cy="${561}" r="5" fill="${CHANNELS[i]}"/>
    <text x="${x + 22}" y="${568}" font-family="Menlo, monospace" font-size="21"
          fill="${INK_SOFT}">${label}</text>`;
    })
    .join('')}
</svg>`;

await mkdir(new URL('../public/', import.meta.url), { recursive: true });

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(new URL('../public/og-default.png', import.meta.url).pathname);

const meta = await sharp(new URL('../public/og-default.png', import.meta.url).pathname).metadata();
console.log(`public/og-default.png — ${meta.width}x${meta.height}, ${meta.size} bytes`);
