import { __defineConfig } from '@blackbyte/config';
import { __dirname } from '@blackbyte/sugar/fs';

__defineConfig({
  components: {
    settings: {
      defaults: {
        engine: 'html',
      },
    },
  },
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
