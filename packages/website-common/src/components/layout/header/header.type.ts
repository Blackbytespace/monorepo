import type { TLicense } from '../../generic/licence/license.type';
import type { TRepository } from '../../generic/repository/repository.type';

export type THeader = {
  title: string;
  repository: TRepository;
  license: TLicense;
  version: string;
  menu: any[];
};
