import mdx from '@astrojs/mdx';
import { sugarize } from '@blackbyte/sugarcss';
import { defineConfig } from 'astro/config';
import __shikiBlackbyteTheme from './src/shikijs/blackbyte.theme.json';

import sitemap from '@astrojs/sitemap';

import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://sugarcss.blackbyte.space',
  integrations: [
    mdx(),
    sitemap({
      lastmod: new Date(),
    }),
    compress({
      CSS: true,
      HTML: false,
      Image: true,
      JavaScript: true,
      SVG: true,
    }),
  ],
  devToolbar: {
    enabled: false,
  },
  vite: {
    resolve: {
      // preserveSymlinks: true,
    },
    css: {
      transformer: 'lightningcss',
      lightningcss: sugarize({}),
    },
    build: {
      cssMinify: false,
    },
  },
  markdown: {
    syntaxHighlight: 'shiki',
    shikTConfig: {
      theme: __shikiBlackbyteTheme,
      langs: [],
      wrap: true,
      transformers: [],
    },
  },
});
