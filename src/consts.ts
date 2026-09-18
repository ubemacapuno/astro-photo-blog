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
  Laravel: "var(--laravel)",
  PHP: "var(--php)",
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
    name: "melnor-pi-bridge",
    description:
      "Self-hosted Raspberry Pi BLE-to-WiFi bridge for Bluetooth water timers. FastAPI + React for watering my trees on a schedule or on demand, from anywhere via Tailscale.",
    stars: 0,
    forks: 0,
    stack: ["Python", "TypeScript", "React"],
    url: "https://github.com/ubemacapuno/melnor-pi-bridge",
  },
  {
    name: "lettuce-eat",
    description:
      "Self-hosted Laravel food journal on a Raspberry Pi 4B + Tailscale for logging recipes, restaurants, and dishes.",
    stars: 0,
    forks: 0,
    stack: ["Laravel", "PHP", "Vue"],
    url: "https://github.com/ubemacapuno/svelte-step-bro",
  },
  {
    name: "svelte-step",
    description:
      "A simple STEP viewer for CAD users and 3D modelers, built with Svelte / TypeScript / Three.js / occt-import-js.",
    stars: 8,
    forks: 3,
    stack: ["Three.js", "Svelte", "TypeScript", "PostCSS"],
    url: "https://github.com/ubemacapuno/svelte-step-bro",
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
    name: "this-blog!",
    description:
      "This site you're currently on, utilizing Astro with Vue to show off my projects, photos, and thoughts.",
    stars: 0,
    forks: 0,
    stack: ["Astro", "Vue", "TailwindCSS"],
    url: "https://github.com/ubemacapuno/astro-photo-blog",
  },
];

// strip the time and timezone,
// then rehydrate the date as local midnight (prevents timezone discrepancies)
export const formatDate = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).toDateString();

// Short date for cards, e.g. "Mar 09, 2024"
export const formatDateShort = (date: Date) => {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
