// praxisproject/src/scripts/articleData.ts
import { getCollection } from "astro:content";

// Fetches all posts from the "blog" content collection and sorts them
// newest-first by publication date. Used anywhere we need a full post list.
export async function getAllPosts() {
  return (await getCollection("blog")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

// Fetches all posts and counts how many times each tag appears across them.
// Returns a plain object like { "typescript": 5, "css": 2, ... }
export async function getTagCounts() {
  const allPosts = await getCollection("blog");
  return allPosts
    .flatMap((post) => post.data.tags)   // flatten all tag arrays into one list
    .reduce(
      (acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;  // increment count, defaulting to 0
        return acc;
      },
      {} as Record<string, number>
    );
}

// Takes the tag counts object and returns it as a sorted array of [tag, count]
// pairs — highest count first, then alphabetically for ties.
// e.g. [["typescript", 5], ["css", 2], ["astro", 2], ...]
export function getSortedTags(tagCounts: Record<string, number>) {
  return Object.entries(tagCounts).sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
  );
}

// Maps a post count to a visual tier used by TagCloud when showTiers is true.
// lg = popular tag (4+ posts), md = moderate (2-3), sm = rare (1).
export function getTagTier(count: number): "sm" | "md" | "lg" {
  if (count >= 4) return "lg";
  if (count >= 2) return "md";
  return "sm";
}