import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../config';
import { getDateParts } from '../utils/dateFormat';

export async function GET(context) {
  const posts = await getCollection('posts');

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) =>
    b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: sortedPosts.map((post) => {
      const { year, month, day } = getDateParts(post.data.date);
      const postUrl = `${year}/${month}/${day}/${post.slug}/`;

      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.body.split('<!-- more -->')[0] || post.body.substring(0, 200),
        link: postUrl,
      };
    }),
  });
}
