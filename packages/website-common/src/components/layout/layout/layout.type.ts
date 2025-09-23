import type { TLicense } from '../../generic/licence/license.type';
import type { TOg } from '../../generic/og/og.type';
import type { TRepository } from '../../generic/repository/repository.type';
import type { TPosthog } from '../../system/posthog/posthog.type';
import type { TWebsiteConfig } from '../../../types/websiteConfig.type';

export type TLayout = {
  pageTitle?: string;
  websiteConfig: TWebsiteConfig;
};
