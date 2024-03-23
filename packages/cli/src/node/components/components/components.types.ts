export interface IComponentSourceMetas {
  name: string;
}

export interface IComponentSource extends IComponentSourceMetas {
  metas(): IComponentSourceMetas;
  list(args: IComponentListArgs): IComponentList;
}

export interface ISourceSettings {
  localDir?: string;
}

export interface IGitSourceSettings extends ISourceSettings {}

export interface IComponent {
  name: string;
}

export interface IComponentPackage {
  name: string;
  path: string;
}

export interface IComponentList {
  source: IComponentSourceMetas;
  components: Record<string, IComponent>;
}

export interface IComponentListArgs {}
