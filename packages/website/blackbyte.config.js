import { __defineConfig } from '@blackbyte/config';
import { __dirname } from '@blackbyte/sugar/fs';

__defineConfig({
  docmap: {
    settings: {
      docblock: {
        settings: {
          renderMarkdown: true,
        },
      },
    },
    build: {
      outPath: null,
      outDir: `${__dirname()}/content/doc`,
      mdx: true,
      json: false,
    },
  },
});
