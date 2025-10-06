import type { BundledLanguage } from 'shiki';

export type TCode = {
  language: BundledLanguage;
  filename?: string;
  code: string;
  header?: boolean;
};
