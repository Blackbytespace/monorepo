import type { TWelcome } from '../../sections/welcome/welcome.type';
import type { TLicense } from '../licence/license.type';
import type { TOg } from '../og/og.type';
import type { TRepository } from '../repository/repository.type';

export type TWebsiteConfig = {
  posthog?: {
    projectApiKey: string;
  };
  title: string;
  description: string;
  install: string;
  getStarted: {
    url: string;
  };
  version: string;
  welcome: {
    title: string;
    description: string;
    withLove: string;
  };
  license: TLicense;
  repository: TRepository;
  og: TOg;
  menu?: any[];
};
