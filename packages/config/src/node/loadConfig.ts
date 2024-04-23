import __fs from 'fs';
import { __packageRootDir } from '@lotsof/sugar/package';
import __defineConfig from './defineConfig.js';
import __getConfig from './getConfig.js';

export default async function loadConfig(
  path?: string,
  def: any,
): Promise<any> {
  const possibleFiles: string[] = [
    // `${__packageRootDir()}/lotsof.config.ts`,
    `${__packageRootDir()}/lotsof.config.js`,
    `${__packageRootDir()}/lotsof.config.json`,
  ];

  let configFilePath = '';

  for (let i = 0; i < possibleFiles.length; i++) {
    const file = possibleFiles[i];
    if (__fs.existsSync(file)) {
      configFilePath = file;
      break;
    }

    if (!configFilePath) {
      return process.lotsofConfig ?? {};
    }
  }

  // read the config file
  const config = await import(configFilePath).then((mod) => mod.default);

  // set the new config
  __defineConfig(config);

  // return the wanted config
  return __getConfig(path, def);
}
