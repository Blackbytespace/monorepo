// @ts-nocheck

import { __isPlainObject } from '@blackbyte/sugar/is';
import { __deepMerge, __get } from '@blackbyte/sugar/object';

export default function getConfig(path?: string, def?: any): any {
  if (!process.blackbyteConfig && !process.blackbyteConfigDefaults) {
    throw new Error(
      'Config not loaded. Please call the loadConfig function before trying to get a config value',
    );
  }

  if (path) {
    const userConfig =
        __get(process.blackbyteConfig ?? {}, path) ?? (def || {}),
      defaultConfig =
        __get(process.blackbyteConfigDefaults ?? {}, path) ?? (def || {});
    if (__isPlainObject(userConfig) && __isPlainObject(defaultConfig)) {
      return __deepMerge([defaultConfig, userConfig]);
    } else {
      return userConfig;
    }
  }

  const config = __deepMerge([
    process.blackbyteConfigDefaults ?? {},
    process.blackbyteConfig ?? {},
  ]);
  return config;
}
