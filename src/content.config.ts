// Import the glob loader (to find markdown files)
import { glob } from "astro/loaders";
// Import utilities from `astro:content` (to define collection)
import { defineCollection } from "astro:content";
// Import Zod (schema validation library)
import { z } from "astro/zod";
// Define a `loader` and `schema` for each collection
const blog = defineCollection({
    // "Find all .md files in ./src/content, but skip any that start with an underscore."
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/content" }),
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      author: z.string(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }),
      tags: z.array(z.string())
    })
});
// Export a single `collections` object to register your collection(s) with Astro so it knows it exists when you call getCollection('blog') later.
export const collections = { blog };