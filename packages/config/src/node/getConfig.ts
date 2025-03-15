// @ts-nocheck

import { __isPlainObject } from '@lotsof/sugar/is';
import { __deepMerge, __get } from '@lotsof/sugar/object';

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
      return __deepMerge([defaultConfig, userConfig]);
    } else {
      return userConfig;
    }
  }

  const config = __deepMerge([
    process.lotsofConfigDefaults ?? {},
    process.lotsofConfig ?? {},
  ]);
  return config;
}
