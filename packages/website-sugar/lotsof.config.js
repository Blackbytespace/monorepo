import { __defineConfig } from '@lotsof/config';
import { __dirname } from '@lotsof/sugar/fs';

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
