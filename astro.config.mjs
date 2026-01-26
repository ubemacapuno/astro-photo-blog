// @ts-check
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), mdx(), icon()],
  prefetch: true,

  vite: {
    plugins: [tailwindcss()],
  },
  output: "static",
  adapter: cloudflare(),
});
