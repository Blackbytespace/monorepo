import type { TLicense } from '../../generic/licence/license.type';
import type { TOg } from '../../generic/og/og.type';
import type { TRepository } from '../../generic/repository/repository.type';

export type TLayout = {
  title: string;
  description: string;
  pageTitle: string;
  version: string;
  license: TLicense;
  repository: TRepository;
  og: TOg;
};
