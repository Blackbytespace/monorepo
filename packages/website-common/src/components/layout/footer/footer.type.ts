import type { TLicense } from '../../generic/licence/license.type';
import type { TRepository } from '../../generic/repository/repository.type';

export type TFooter = {
  title: string;
  version: string;
  license: TLicense;
  repository: TRepository;
};
