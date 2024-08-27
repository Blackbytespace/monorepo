// @ts-nocheck

import { __get, __deepMerge } from '@lotsof/sugar/object';
import { __isPlainObject } from '@lotsof/sugar/is';

export default function getConfig(path?: string, def?: any): any {
  if (!process.lotsofConfig && !process.lotsofConfigDefaults) {
    throw new Error(
      'Config not loaded. Please call the loadConfig function before trying to get a config value',
    );
  }

  if (path) {
    const userConfig = __get(process.lotsofConfig ?? {}, path) ?? (def || {}),
      defaultConfig =
        __get(process.lotsofConfigDefaults ?? {}, path) ?? (def || {});
    if (__isPlainObject(userConfig) && __isPlainObject(defaultConfig)) {
      return __deepMerge(defaultConfig, userConfig);
    } else {
      return userConfig;
    }
  }

  return __deepMerge(
    process.lotsofConfigDefaults ?? {},
    process.lotsofConfig ?? {},
  );
}
