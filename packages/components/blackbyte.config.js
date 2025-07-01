import { __defineConfig } from '@blackbyte/config';
import { __dirname } from '@blackbyte/sugar/fs';

__defineConfig({
  docmap: {
    build: {
      outDir: `${__dirname()}/../website-components/src/content/components`,
      outPath: (docmapObj, settings) => {
        return `${__dirname()}/../website-components/src/content/${docmapObj.id
          .replace('@blackbyte.', '')
          .replace(/\./g, '/')}.mdx`;
      },
      mdx: true,
      json: false,
    },
  },
});
