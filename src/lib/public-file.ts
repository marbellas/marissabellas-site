import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Does a file exist in public/ at build time?
 *
 * Used for assets that are supplied out of band — the headshot, for one —
 * so a page can render a sensible fallback instead of a broken image.
 *
 * Anchored on process.cwd(), which is the project root during both
 * `astro dev` and `astro build`. Resolving against import.meta.url looks
 * equivalent but is not: pages and components are bundled differently, so
 * the same relative path resolved correctly from src/pages and silently
 * failed from src/components.
 */
export function hasPublicFile(relativePath: string): boolean {
  return existsSync(join(process.cwd(), 'public', relativePath));
}
