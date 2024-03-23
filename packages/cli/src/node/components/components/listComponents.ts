import { __packageRootDir } from '@lotsof/sugar/path';
import { globSync as __globSync } from 'glob';
import type { IComponentList, IComponentListArgs } from './components.types.js';

export default function listComponents(
  args: IComponentListArgs = {},
): IComponentList {
  // search for "lotsof.json" files
  const lotsofFiles = __globSync(
    `${__packageRootDir()}/node_modules/**/lotsof.json`,
  );

  console.log(lotsofFiles);

  return {
    packages: {},
    components: {},
  };
}
