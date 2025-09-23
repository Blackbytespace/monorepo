// @ts-nocheck

import { mergeDeep } from '@blackbyte/sugar/object';
import type { TConfig, TConfigDefineSettings } from './types.js';

process.blackbyteConfigDefaults = {};
process.blackbyteConfig = {};

export default function defineConfig(
  config: TConfig,
  settings?: TConfigDefineSettings,
): any {
  if (settings?.defaults) {
    process.blackbyteConfigDefaults = mergeDeep([
      process.blackbyteConfigDefaults,
      config,
    ]);
    return process.blackbyteConfigDefaults;
  } else {
    process.blackbyteConfig = mergeDeep([
      process.blackbyteConfig ?? {},
      config,
    ]);
    return process.blackbyteConfig;
  }
}
