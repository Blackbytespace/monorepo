import { sugarize } from '@lotsof/sugarcss';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5184,
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: sugarize({}),
  },
});
