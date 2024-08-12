import { IComponentsSettings } from '@lotsof/components';

export interface IFactoryServerConfig {
  hostname: string;
  port: number;
  entrypoint: string;
  assets: Record<string, string>;
}

export interface IFactoryConfig {
  components: IComponentsSettings;
  server: IFactoryServerConfig;
}
