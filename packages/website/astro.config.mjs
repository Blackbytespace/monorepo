import mdx from '@astrojs/mdx';
import { sugarize } from '@blackbyte/sugarcss';
import { defineConfig } from 'astro/config';
import __shikiBlackbyteTheme from './src/shikijs/blackbyte.theme.json';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
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
