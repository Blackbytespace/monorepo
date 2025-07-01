// @ts-nocheck

import { __deepMerge } from '@blackbyte/sugar/object';
import type { TConfig, TConfigDefineSettings } from './types.js';

process.blackbyteConfigDefaults = {};
process.blackbyteConfig = {};

export default function defineConfig(
  config: TConfig,
  settings?: TConfigDefineSettings,
): any {
  if (settings?.defaults) {
    process.blackbyteConfigDefaults = __deepMerge([
      process.blackbyteConfigDefaults,
      config,
    ]);
    return process.blackbyteConfigDefaults;
  } else {
    process.blackbyteConfig = __deepMerge([
      process.blackbyteConfig ?? {},
      config,
    ]);
    return process.blackbyteConfig;
  }
}
