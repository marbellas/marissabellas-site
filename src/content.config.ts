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

    // The guide is organized by what the reader came for, not by length.
    //
    //   field-note  a situation from a real engagement, composited
    //   pattern     the practice distilled out of repeated field notes
    //   postmortem  something that went wrong — mine or a customer's
    //   signal      what's coming, and what it breaks
    kind: z.enum(['field-note', 'pattern', 'postmortem', 'signal']).default('field-note'),

    // Set true on anything drawn from real engagements. Renders the
    // composite-and-synthetic disclosure at the top of the piece.
    composite: z.boolean().default(false),

    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
