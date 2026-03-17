// @ts-check
import { defineConfig } from 'astro/config';
import pagefind from "astro-pagefind";
import mdx from "@astrojs/mdx";

// https://astro.build/config

export default defineConfig({
  vite: {
    server: {
      allowedHosts: ['dev.praxisproject.dev']
    }
  },
  integrations: [pagefind(), mdx()],
});