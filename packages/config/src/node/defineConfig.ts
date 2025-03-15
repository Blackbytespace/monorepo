// @ts-nocheck

import { __deepMerge } from '@lotsof/sugar/object';
import type { TConfig, TConfigDefineSettings } from './types.js';

export default function defineConfig(
  config: TConfig,
  settings?: TConfigDefineSettings,
): any {
  if (settings?.defaults) {
    process.lotsofConfigDefaults = __deepMerge([
      process.lotsofConfigDefaults ?? {},
      config,
    ]);
    return process.lotsofConfigDefaults;
  } else {
    process.lotsofConfig = __deepMerge([process.lotsofConfig ?? {}, config]);
    return process.lotsofConfig;
  }
}
