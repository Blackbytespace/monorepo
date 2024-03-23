import type {
  IComponentList,
  IComponentListArgs,
} from '../components.types.js';
import ComponentSource from '../Source.js';

export default class GitSource extends ComponentSource {
  name = 'Git';
  private _repositoryUrl: string;

  constructor(name: string, repositoryUrl: string) {
    super(name);
    this._repositoryUrl = repositoryUrl;
    console.log('init');
  }

  list(args: IComponentListArgs): IComponentList {
    console.log('List', args);
    return {
      source: this.metas,
      components: {},
    };
  }
}
