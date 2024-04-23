import { __get } from '@lotsof/sugar/object';
import __config from './config.js';

export default function getConfig(path?: string, def?: any): any {
  if (!process.lotsofConfig) {
    throw new Error(
      'Config not loaded. Please call the loadConfig function before trying to get a config value',
    );
  }

  if (path) {
    return __get(process.lotsofConfig ?? {}, path) ?? def;
  }
  return process.lotsofConfig ?? {};
}
