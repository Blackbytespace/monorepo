import type { BundledLanguage } from 'shiki';

export type TCodeTabsTab = {
  title: string;
  description?: string;
  code: string;
  language: BundledLanguage;
};

export type TCodeTabs = {
  tabs: TCodeTabsTab[];
};
