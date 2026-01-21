import type { z } from "astro/zod";
import type { blogSchema } from "./content/config";

export type BlogFrontmatter = z.infer<typeof blogSchema>;

export type Post = {
  frontmatter: BlogFrontmatter;
  url: string;
};

export type CarouselImage = {
  src: string;
  alt: string;
};
