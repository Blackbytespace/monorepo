import { sugarize } from '@lotsof/sugarcss';

export default {
  css: {
    transformer: 'lightningcss',
    lightningcss: sugarize({
      minify: false,
    }),
  },
  build: {
    cssMinify: false,
  },
};
