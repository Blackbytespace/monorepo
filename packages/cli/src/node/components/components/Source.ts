import type {
  IComponentList,
  IComponentListArgs,
  IComponentSourceMetas,
} from './components.types.js';

export default abstract class ComponentSource {
  name: string = 'Unimplementedsource';

  constructor(name: string) {
    this.name = name;
  }

  get metas(): IComponentSourceMetas {
    return {
      name: this.name,
    };
  }
  list(args: IComponentListArgs): IComponentList {
    return {
      source: {
        name: 'Error',
      },
      components: {},
    };
  }
}
