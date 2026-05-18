// @ts-nocheck

import { isPlainObject } from '@blackbyte/sugar/is';
import { mergeDeep, get } from '@blackbyte/sugar/object';

export default function getConfig(path?: string, def?: any): any {
  if (!process.blackbyteConfig && !process.blackbyteConfigDefaults) {
    throw new Error(
      'Config not loaded. Please call the loadConfig function before trying to get a config value',
    );
  }

  if (path) {
    const userConfig = get(process.blackbyteConfig ?? {}, path) ?? (def || {}),
      defaultConfig =
        get(process.blackbyteConfigDefaults ?? {}, path) ?? (def || {});
    if (isPlainObject(userConfig) && isPlainObject(defaultConfig)) {
      return mergeDeep([defaultConfig, userConfig]);
    } else {
      return userConfig;
    }
  }

  const config = mergeDeep([
    process.blackbyteConfigDefaults ?? {},
    process.blackbyteConfig ?? {},
  ]);
  return config;
}
