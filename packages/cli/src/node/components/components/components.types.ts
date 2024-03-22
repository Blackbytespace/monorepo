export interface IComponent {
  name: string;
}

export interface IComponentPackage {
  name: string;
  path: string;
}

export interface IComponentList {
  packages: Record<string, IComponentPackage>;
  components: Record<string, IComponent>;
}

export interface IComponentListArgs {}
