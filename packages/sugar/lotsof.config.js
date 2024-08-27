import { __defineConfig } from '@lotsof/config';
import { __dirname } from '@lotsof/sugar/fs';

__defineConfig({
  docmap: {
    settings: {
      docblock: {
        settings: {
          //   renderMarkdown: true,
          //   renderMarkdownProps: ['description'],
        },
      },
    },
    build: {
      outDir: `${__dirname()}/../website-sugar/src/content/sugar`,
      outPath: (docmapObj, settings) => {
        return `${__dirname()}/../website-sugar/src/content/${docmapObj.id
          .replace('@lotsof.', '')
          .replace(/\./g, '/')}.mdx`;
      },
      mdx: true,
      json: false,
    },
  },
});
