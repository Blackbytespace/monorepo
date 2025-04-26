import { faker } from '@faker-js/faker';
import { __pickRandom } from '@lotsof/sugar/array';
import { __deepMerge } from '@lotsof/sugar/object';
import type { TLink } from './link.type.js';

export default function __linkTypeMock(props: Partial<TLink> = {}): TLink {
  return __deepMerge([
    {
      href: faker.internet.url(),
      text: faker.lorem.words({ min: 1, max: 3 }),
      title: faker.number.int(1)
        ? faker.lorem.words({ min: 1, max: 5 })
        : undefined,
      target: __pickRandom(['_self', '_blank', '_parent', '_top']),
      rel: __pickRandom(['noopener', 'noreferrer', 'noopener noreferrer']),
      ariaLabel: faker.lorem.words({ min: 1, max: 5 }),
    },
    props,
  ]);
}
