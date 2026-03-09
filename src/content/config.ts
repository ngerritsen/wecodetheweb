import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    id: z.number().optional(), // Critical for Disqus comment continuity
  }),
});

export const collections = {
  posts: postsCollection,
};
