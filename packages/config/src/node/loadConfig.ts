// @ts-nocheck

// import '@blackbyte/components';
// import '@blackbyte/factory';
// import '@blackbyte/puppet';
import { packageRootDir } from '@blackbyte/sugar/package';
import fs from 'fs';
import defineConfig from './defineConfig.js';
import getConfig from './getConfig.js';

export default async function loadConfig(
  path?: string,
  def?: any,
): Promise<any> {
  const possibleFiles: string[] = [
    `${packageRootDir()}/blackbyte.config.ts`,
    `${packageRootDir()}/blackbyte.config.js`,
    `${packageRootDir()}/blackbyte.config.json`,
  ];

  let configFilePath = '';

  for (let i = 0; i < possibleFiles.length; i++) {
    const file = possibleFiles[i];
    if (fs.existsSync(file)) {
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
    defineConfig(config);
  }

  // return the wanted config
  return getConfig(path, def);
}
