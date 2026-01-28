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

export type TechStack =
  | "TypeScript"
  | "JavaScript"
  | "React"
  | "Svelte"
  | "Vue"
  | "Astro"
  | "TailwindCSS"
  | "PostCSS"
  | "MongoDB"
  | "Python"
  | "CSS"
  | "Three.js"
  | "PocketBase"
  | "Vite";

export type GitHubCard = {
  name: string;
  description: string;
  stars: number;
  forks: number;
  stack: TechStack[];
  url: string;
  image?: string;
  image_alt?: string;
};
