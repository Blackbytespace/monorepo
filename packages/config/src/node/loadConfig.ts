// @ts-nocheck

import '@blackbyte/components';
import '@blackbyte/factory';
import '@blackbyte/puppet';
import { __packageRootDir } from '@blackbyte/sugar/package';
import __fs from 'fs';
import __defineConfig from './defineConfig.js';
import __getConfig from './getConfig.js';

export default async function loadConfig(
  path?: string,
  def?: any,
): Promise<any> {
  const possibleFiles: string[] = [
    // `${__packageRootDir()}/blackbyte.config.ts`,
    `${__packageRootDir()}/blackbyte.config.js`,
    `${__packageRootDir()}/blackbyte.config.json`,
  ];

  let configFilePath = '';

  for (let i = 0; i < possibleFiles.length; i++) {
    const file = possibleFiles[i];
    if (__fs.existsSync(file)) {
      configFilePath = file;
      break;
    }

    if (!configFilePath) {
      return process.blackbyteConfig ?? {};
    }
  }

  // read the config file
  const config = await import(configFilePath).then((mod) => mod.default);

  if (config) {
    // set the new config
    __defineConfig(config);
  }

  // return the wanted config
  return __getConfig(path, def);
}
