import type { CollectionEntry } from 'astro:content';

export function getRelatedPosts(
  currentPost: CollectionEntry<'posts'>,
  allPosts: CollectionEntry<'posts'>[],
  limit: number = 3
): CollectionEntry<'posts'>[] {
  const currentTags = currentPost.data.tags || [];

  // Get all posts that share at least one tag (excluding current post)
  const relatedPosts = allPosts.filter(post => {
    if (post.id === currentPost.id) return false;
    const postTags = post.data.tags || [];
    return postTags.some(tag => currentTags.includes(tag));
  });

  // Score posts by number of shared tags
  const scoredPosts = relatedPosts.map(post => {
    const postTags = post.data.tags || [];
    const sharedTagCount = postTags.filter(tag => currentTags.includes(tag)).length;
    return { post, score: sharedTagCount };
  });

  // Sort by score (descending) and return top N
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}
