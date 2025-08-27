import type { TWebsiteConfig } from '@blackbyte/website-common';

export default {
  title: 'Sugar',
  description: 'High quality toolkit for web development',
  install: 'npm i @blackbyte/sugar',
  getStarted: {
    url: '/#get-started',
  },
  welcome: {
    title: 'Sugar',
    description:
      'The toolkit that you missed...<br />...like <span class="color-accent">a sugar in your coffee!</span>',
  },
  license: {
    name: 'MIT',
    url: 'https://github.com/blackbytespace/monorepo/blob/main/packages/sugar/LICENSE.md',
  },
  repository: {
    name: 'Blackbyte Sugar',
    url: 'https://github.com/blackbytespace/monorepo',
  },
  og: {
    imageUrl: 'https://cdn.blackbyte.space/img/blackbyte-sugar-og.png',
  },
  menu: [
    {
      type: 'group',
      label: 'Documentation',
      items: [
        {
          id: 'install',
          label: 'Get started',
          description: 'Quick start using @blackbyte/sugar',
          value: 'install',
          slug: '/',
          preventSet: true,
        },
        {
          id: 'changelog',
          label: 'Changelog',
          description: "What's new in @blackbyte/sugar",
          value: 'changelog',
          slug: '/changelog',
          preventSet: true,
        },
        {
          id: 'issues',
          label: 'Declare an issue',
          description: 'Report a bug or request a feature',
          value: 'issue',
          url: 'https://github.com/blackbytespace/monorepo/issues',
          preventSet: true,
        },
        {
          id: 'repository',
          label: 'GitHub repository',
          description: 'Browse the source code on GitHub',
          value: 'repository',
          url: 'https://github.com/blackbytespace/monorepo/issues',
          preventSet: true,
        },
        {
          id: 'license',
          label: 'License',
          description: 'View the license information',
          value: 'license',
          url: 'https://github.com/blackbytespace/monorepo/blob/main/packages/sugar/LICENSE.md',
          preventSet: true,
        },
      ],
    },
  ],
} as TWebsiteConfig;
