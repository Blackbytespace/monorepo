import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';
import { sugarize } from '@blackbyte/sugarcss';
import compress from 'astro-compress';
import { defineConfig } from 'astro/config';
import { createLogger } from 'vite';
import __shikiBlackbyteTheme from './src/shikijs/blackbyte.theme.json';

const logger = createLogger();
const loggerWarn = logger.warn;
logger.warn = (msg, options) => {
  // Ignore empty CSS files warning
  if (msg.includes('vite:css')) return;
  loggerWarn(msg, options);
};

// https://astro.build/config
export default defineConfig({
  site: 'https://sugar.blackbyte.space',
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
    vue(),
  ],
  vite: {
    customLogger: logger,
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
