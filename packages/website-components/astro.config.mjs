import mdx from '@astrojs/mdx';
import { sugarize } from '@lotsof/sugarcss';
import { defineConfig } from 'astro/config';
import __shikiLotsofTheme from './src/shikijs/lotsof.theme.json';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  vite: {
    resolve: {
      // preserveSymlinks: true,
    },
    css: {
      transformer: 'lightningcss',
      lightningcss: sugarize({
        minify: false,
      }),
    },
    build: {
      cssMinify: false,
    },
  },
  markdown: {
    syntaxHighlight: 'shiki',
    shikTConfig: {
      theme: __shikiLotsofTheme,
      langs: [],
      wrap: true,
      transformers: [],
    },
  },
});
