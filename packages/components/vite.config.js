import { sugarize } from '@blackbyte/sugarcss';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  server: {
    cors: true,
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: sugarize({}),
  },
});
