import type { TPuppetConfig } from './puppet.type.js';

import { __defineConfig } from '@lotsof/config';

const config: TPuppetConfig = {
  settings: {
    vw: 1600,
    vh: 900,
  },
  screenshot: {
    name: 'screenshot-%theme.png',
    vw: 1600,
    vh: 900,
    width: 1600,
    height: 900,
  },
};

__defineConfig(
  {
    puppet: config,
  },
  {
    defaults: true,
  },
);
export default config;
