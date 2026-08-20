import { defineCollection, z } from 'astro:content'
import { glob } from "astro/loaders"

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/articles" }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    excerpt: z.string(),
    tags: z.array(z.string()),
    date: z.coerce.date(),
    // Optional; feeds dateModified in JSON-LD and article:modified_time.
    updatedDate: z.coerce.date().optional(),
  })
})

export const collections = { articles }
