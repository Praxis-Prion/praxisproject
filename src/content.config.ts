// Import the glob loader (to find markdown files)
import { glob } from "astro/loaders";
// Import utilities from `astro:content` (to define collection)
import { defineCollection } from "astro:content";
// Import Zod (schema validation library)
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: image(),
      alt: z.string()
    }).optional(),
    tags: z.array(z.string()),
    theme: z.string().optional()
  })
});

export const collections = { blog };