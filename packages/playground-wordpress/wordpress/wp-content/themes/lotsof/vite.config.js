import { sugarize } from '@lotsof/sugarcss';
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    transformer: 'lightningcss',
    lightningcss: sugarize({}),
  },
});
