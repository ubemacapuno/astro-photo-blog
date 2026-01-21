import type { z } from "astro/zod";
import type { blogSchema } from "./content/config";

// Infer the frontmatter type from the blog collection schema
export type BlogFrontmatter = z.infer<typeof blogSchema>;

// Post type derived from the collection entry
export type Post = {
  frontmatter: BlogFrontmatter;
  url: string;
};

export type CarouselImage = {
  src: string;
  alt: string;
};
