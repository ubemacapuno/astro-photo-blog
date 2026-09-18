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

  markdown: {
    shikiConfig: {
      theme: "synthwave-84",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  output: "static",
  compressHTML: false,
  // Nothing here uses Astro.session. Left enabled, the Cloudflare adapter
  // injects a `SESSION` KV binding with no id, so `wrangler versions upload`
  // tries to create the namespace on every deploy and fails once it exists
  // (Cloudflare API error 10014).
  session: false,
  adapter: cloudflare({ imageService: "compile" }),
});
