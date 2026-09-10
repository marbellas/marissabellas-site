import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: ({ image }) =>
    z.object({
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

      // Hero image. Used on the homepage featured card and, once social
      // previews land, as the per-post Open Graph override. Processed by
      // Astro's image pipeline, so give it a path relative to this file.
      image: image().optional(),

      // At most one piece should carry this. The homepage falls back to
      // the newest published piece when nothing is flagged.
      featured: z.boolean().default(false),

      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { writing };
