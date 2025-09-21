import { sugarize } from '@blackbyte/sugarcss';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    // port: 5184,
  },
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
        assetFileNames: `carpenter.build.[ext]`,
      },
    },
  },
});
