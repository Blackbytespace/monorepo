import __config from './config.js';
import { __deepMerge } from '@lotsof/sugar/object';

export default function defineConfig(config: any): any {
  process.lotsofConfig = __deepMerge(process.lotsofConfig ?? {}, config);
  return process.lotsofConfig;
}
