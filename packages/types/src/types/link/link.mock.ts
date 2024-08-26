import type { TLink } from './link.type.js';
import __LinkType from './link.type.js';

import { __pickRandom } from '@lotsof/sugar/array';

import { faker } from '@faker-js/faker';

export default function __linkTypeMock(props: TLink = {}): __LinkType {
  return new __LinkType({
    href: faker.internet.url(),
    text: faker.lorem.words({ min: 1, max: 3 }),
    title: faker.number.int(1)
      ? faker.lorem.words({ min: 1, max: 5 })
      : undefined,
    target: __pickRandom(['_self', '_blank']),
    noopener: faker.number.int(1) ? true : false,
    noreferrer: faker.number.int(1) ? true : false,
    ariaLabel: faker.lorem.words({ min: 1, max: 5 }),
    ...props,
  });
}
