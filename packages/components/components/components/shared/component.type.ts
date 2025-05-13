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
  json: any;
  files: string[];
  engines: 'vue' | 'react' | 'blade' | 'twig';
  mocks: string[];
  schema?: any;
  values?: any;
  savedValues?: any;
};
