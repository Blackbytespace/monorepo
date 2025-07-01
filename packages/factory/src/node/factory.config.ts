import type { TComponentsSettings } from '@blackbyte/components';
import { __defineDefaultConfig, __getConfig } from '@blackbyte/config';
import { __dirname } from '@blackbyte/sugar/fs';
import __path from 'path';
import type { TFactoryConfig } from '../shared/factory.type.js';

const componentsConfig: TComponentsSettings = __getConfig().components.settings;

const config: TFactoryConfig = {
  components: componentsConfig,
  server: {
    hostname: '0.0.0.0',
    port: 5183,
    entrypoint: __path.resolve(__dirname(), '../../src/php/index.php'),
  },
  ui: {
    assets: {
      js: '//0.0.0.0:5184/src/js/index.ts',
      css: '//0.0.0.0:5184/src/css/index.css',
    },
  },
  project: {
    rootDir: process.cwd(),
    server: {
      protocol: 'http',
      hostname: '0.0.0.0',
      port: 5173,
    },
    assets: {
      js: 'src/js/index.ts',
      css: 'src/css/index.css',
    },
  },
};

__defineDefaultConfig({
  factory: config,
});

console.log(__getConfig());

export { config };
