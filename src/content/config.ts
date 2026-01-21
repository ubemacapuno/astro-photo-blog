import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

export const blogSchema = z.object({
  title: z.string(),
  pub_date: z.date(),
  photo_date: z.date().optional(),
  description: z.string(),
  type: z.enum(["photography", "dev"]),
  author: z.string(),
  image: z.object({
    url: z.string(),
    alt: z.string(),
  }),
  tags: z.array(z.string()),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/blog" }),
  schema: blogSchema,
});

export const collections = { blog };
