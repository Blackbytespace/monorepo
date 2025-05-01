import { faker } from '@faker-js/faker';
import { __pickRandom } from '@lotsof/sugar/array';
import { __deepMerge } from '@lotsof/sugar/object';
import __linkMock from '../link/link.mock.js';
import type { TButton } from './button.type.js';

export default function __buttonMock(props: Partial<TButton> = {}): TButton {
  return __deepMerge([
    {
      type: __pickRandom(['solid', 'outline', 'text']),
      link: __linkMock(),
      id: faker.lorem.slug(),
      class: faker.lorem.slug(),
    },
    props,
  ]);
}
