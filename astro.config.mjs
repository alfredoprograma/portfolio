// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://alfredoprograma.dev',
  integrations: [
    sitemap({
      // /en/* are 308 redirect stubs from the bilingual era; keep them
      // reachable for link equity but never advertise them as canonical.
      filter: (page) => !page.includes('/en/'),
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
      langAlias: {
        Dockerfile: 'docker',
      },
      transformers: [
        {
          // Shiki writes the theme background/colour as an inline style on
          // <pre>, which would beat the stylesheet. Drop it so global.css owns
          // the code block chrome, and move the scroll container (and its
          // keyboard focus) onto <code> so the language bar stays put.
          pre(node) {
            delete node.properties.style;
            delete node.properties.tabindex;
          },
          code(node) {
            node.properties.tabindex = '0';
          },
        },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
