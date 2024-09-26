import type { TComponentsConfig } from '@lotsof/components';
import type { TDocmapConfig } from '@lotsof/docmap';
import type { TFactoryConfig } from '@lotsof/factory';
import type { TPuppetConfig } from '@lotsof/puppet';
export type TConfigDefineSettings = {
    defaults: boolean;
};
export type TConfig = {
    components?: TComponentsConfig;
    docmap?: TDocmapConfig;
    factory?: TFactoryConfig;
    puppet?: TPuppetConfig;
};
