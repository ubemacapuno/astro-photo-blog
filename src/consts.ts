import type { GitHubCard, TechStack } from "./types";

export const SITE_URL = "https://coreydamocles.com";

/** CSS variable for language pill colors. Keys match TechStack; fallback used for unmapped. */
export const languageColors: Partial<Record<TechStack, string>> = {
  TypeScript: "var(--typescript)",
  JavaScript: "var(--javascript)",
  React: "var(--react)",
  Svelte: "var(--svelte)",
  Vue: "var(--vue)",
  Astro: "var(--astro)",
  TailwindCSS: "var(--tailwindcss)",
  PostCSS: "var(--postcss)",
  MongoDB: "var(--mongodb)",
  Python: "var(--python)",
  CSS: "var(--css)",
  "Three.js": "var(--threejs)",
  PocketBase: "var(--pocketbase)",
  Vite: "var(--vite)",
};

export const projects: GitHubCard[] = [
  {
    name: "this-blog!",
    description:
      "This site you're currently on, utilizing Astro with Vue to show off my projects, photos, and thoughts.",
    stars: 0,
    forks: 0,
    stack: ["Astro", "Vue", "TailwindCSS"],
    url: "https://github.com/ubemacapuno/astro-photo-blog",
  },
  {
    name: "open-ai-playground",
    description:
      "Playground repo of features utilizing OpenAI API, including a ticketing system and engineering drawing analyzer.",
    stars: 1,
    forks: 0,
    stack: ["Svelte", "PocketBase", "TailwindCSS"],
    url: "https://github.com/ubemacapuno/open-ai-playground",
  },
  {
    name: "svelte-step",
    description:
      "A simple STEP viewer for CAD users and 3D modelers, built with Svelte / TypeScript / Three.js / occt-import-js.",
    stars: 6,
    forks: 3,
    stack: ["Three.js", "Svelte", "TypeScript", "PostCSS"],
    url: "https://github.com/ubemacapuno/svelte-step-bro",
  },
  {
    name: "foodie-blog-sveltekit",
    description:
      "A recipe hub utilizing SvelteKit, MongoDB, AuthJS, & OpenAI API for a seamless, ad-free culinary app. Designed for simple recipe management.",
    stars: 0,
    forks: 0,
    stack: ["TypeScript", "Svelte", "MongoDB", "TailwindCSS"],
    url: "https://github.com/ubemacapuno/foodie-blog-sveltekit",
  },
  {
    name: "pokemon-pi-dashboard",
    description:
      "Pokémon weather UI dashboard to display on my Raspberry Pi. Powered by React, Vite, and OpenWeather API ⚡️.",
    stars: 0,
    forks: 0,
    stack: ["React", "Vite"],
    url: "https://github.com/ubemacapuno/pokemon-pi-dashboard?tab=readme-ov-file",
  },
  {
    name: "chrono-core",
    description:
      "ChronoCore is a Python + React + TypeScript tool for real-time monitoring of GPU, CPU, and RAM, using WebSockets for live updates, displayed on a Raspberry Pi.",
    stars: 0,
    forks: 0,
    stack: ["Python", "React", "TypeScript"],
    url: "https://github.com/ubemacapuno/chrono-core",
  },
];

// strip the time and timezone,
// then rehydrate the date as local midnight (prevents timezone discrepancies)
export const formatDate = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).toDateString();
