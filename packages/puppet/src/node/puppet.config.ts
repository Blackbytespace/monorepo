import { __defineDefaultConfig } from '@lotsof/config';
import type { TPuppetConfig } from './puppet.type.js';

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

__defineDefaultConfig({
  puppet: config,
});
export { config };
