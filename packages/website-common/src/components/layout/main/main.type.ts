import { type TLayout } from '../layout/layout.type';
import type { TWebsiteConfig } from '../../../types/websiteConfig.type';

export type TMain = TLayout & {
  header?: boolean;
  websiteConfig: TWebsiteConfig;
  footer?: boolean;
};
