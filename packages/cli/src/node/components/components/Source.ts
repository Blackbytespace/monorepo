import type {
  IComponentList,
  IComponentListArgs,
  IComponentSourceMetas,
  ISourceSettings,
} from './components.types.js';

import { globSync as __globSync } from 'glob';

import { __readJsonSync } from '@lotsof/sugar/fs';

export default abstract class ComponentSource {
  public id: string = '';
  public name: string = 'Unimplementedsource';
  public settings: ISourceSettings = {};

  public get localDir(): string {
    return `${this.settings.localDir}/${this.id}`;
  }

  constructor(name: string, settings: ISourceSettings = {}) {
    this.name = name;
    this.settings = {
      ...settings,
    };
  }

  get metas(): IComponentSourceMetas {
    return {
      name: this.name,
    };
  }
  async update(args?: IComponentListArgs): Promise<IComponentList> {
    return {
      source: {
        name: 'Error',
      },
      components: {},
    };
  }

  listComponents(): any {
    // reading the "lotsof.json" file
    const lotsofJson = __readJsonSync(`${this.localDir}/lotsof.json`);

    let folders = ['src/components/*'];
    // check if we have the "components.folders" settings
    if (lotsofJson.components?.folders) {
      folders = lotsofJson.components.folders;
    }

    // list components
    for (let [i, path] of folders.entries()) {
      const components = __globSync(path, {
        cwd: this.localDir,
      });
      console.log(components);
    }

    console.log(folders);
  }
}
