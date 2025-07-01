import { sugarize } from '@blackbyte/sugarcss';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5184,
  },
  plugins: [vue()],
  css: {
    transformer: 'lightningcss',
    lightningcss: sugarize({}),
  },
  build: {
    outDir: 'src/css/output',
    rollupOptions: {
      treeshake: true,
      output: {
        entryFileNames: `index.js`,
        chunkFileNames: `index-chunk.js`,
        assetFileNames: `factory.build.[ext]`,
      },
    },
  },
});
