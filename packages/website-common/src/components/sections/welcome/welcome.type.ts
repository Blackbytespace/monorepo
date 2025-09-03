import type { TRepository } from '../../_exports';

export type TWelcome = {
  title: string;
  description: string;
  install: string;
  repository: TRepository;
  getStarted: {
    url: string;
  };
};
