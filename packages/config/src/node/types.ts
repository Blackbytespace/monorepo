import type { TComponentsConfig } from '@lotsof/components';
import type { TDocmapConfig } from '@lotsof/docmap';
import type { TFactoryConfig } from '@lotsof/factory';

export type TConfigDefineSettings = {
  defaults: boolean;
};

export type TConfig = {
  components?: TComponentsConfig;
  docmap?: TDocmapConfig;
  factory?: TFactoryConfig;
};
