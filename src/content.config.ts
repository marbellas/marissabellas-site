import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    // One sentence that states the argument, not a teaser. Shows in the
    // index, the RSS feed, and search results.
    standfirst: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    kind: z.enum(['essay', 'note', 'talk']).default('essay'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
