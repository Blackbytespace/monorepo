import type { TComponentsConfig } from '@blackbyte/components';
import type { TDocmapConfig } from '@blackbyte/docmap';
import type { TFactoryConfig } from '@blackbyte/factory';
import type { TPuppetConfig } from '@blackbyte/puppet';

export type TConfigDefineSettings = {
  defaults: boolean;
};

export type TConfig = {
  components?: TComponentsConfig;
  docmap?: TDocmapConfig;
  factory?: TFactoryConfig;
  puppet?: TPuppetConfig;
};
