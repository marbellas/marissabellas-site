import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const entries = (await getCollection('writing', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.published.valueOf() - a.data.published.valueOf()
  );

  return rss({
    title: 'Marissa Bellas',
    description: 'Writing on AI agent governance, identity, and cloud security posture.',
    site: context.site,
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.standfirst,
      pubDate: entry.data.published,
      categories: entry.data.tags,
      link: `/writing/${entry.id}/`,
    })),
  });
}
