import { __defineConfig } from '@blackbyte/config';
import { __dirname } from '@blackbyte/sugar/fs';

__defineConfig({
  docmap: {
    settings: {
      docblock: {
        settings: {
          renderMarkdown: true,
          renderMarkdownProps: ['description'],
        },
      },
    },
    build: {
      outDir: `${__dirname()}/../website-sugarcss/src/content/sugarcss`,
      outPath: (docmapObj, settings) => {
        return `${__dirname()}/../website-sugarcss/src/content/${docmapObj.id
          .replace('@blackbyte.', '')
          .replace(/\./g, '/')}.mdx`;
      },
      mdx: true,
      json: false,
    },
  },
});
