export type TComponentsComponentObject = {
  id?: string;
  path: string;
  relPath: string;
  shortName: string;
  name: string;
  organization?: string;
  type: string;
  description?: string;
  version: string;
  json: TComponentsComponentJson;
  files: string[];
  engines: 'vue' | 'react' | 'blade' | 'twig';
  mocks: string[];
  schema?: any;
  values?: any;
  savedValues?: any;
};

export type TComponentsComponentJson = {
  id: string;
  name: string;
  version: string;
  type: string;
  description?: string;
  files: string[];
};

export type TComponentsConfig = {
  settings: TComponentsSettings;
};

export type TComponentsSettings = {
  libraryRootDir: string;
  rootDir: string;
  defaults: TComponentDefaults;
};

export type TComponentDefaults = {
  engine?: string | string[];
};
