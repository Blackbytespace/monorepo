import { faker } from '@faker-js/faker';
import { __pickSome } from '@lotsof/sugar/array';
import { __deepMerge } from '@lotsof/sugar/object';
import __buttonMock from '../button/button.mock.js';
import type { TBody } from './body.type.js';

export default function __bodyMock(props: Partial<TBody> = {}): TBody {
  const buttons = __pickSome(
    [__buttonMock(), __buttonMock(), __buttonMock()],
    0,
    3,
  );

  return __deepMerge([
    {
      suptitle: faker.number.int(1)
        ? faker.lorem.words({ min: 1, max: 3 })
        : undefined,
      title: faker.lorem.words({ min: 1, max: 5 }),
      headingLevel: {
        tag: faker.number.int({
          min: 1,
          max: 6,
        }),
        display: faker.number.int({
          min: 1,
          max: 6,
        }),
      },
      subtitle: faker.number.int(1)
        ? faker.lorem.words({ min: 1, max: 3 })
        : undefined,
      lead: faker.number.int(1)
        ? faker.lorem.words({ min: 1, max: 20 })
        : undefined,
      text: faker.number.int(1)
        ? faker.lorem.words({ min: 1, max: 20 })
        : undefined,
      buttons: props.buttons ?? buttons,
      format: faker.datatype.boolean(),
      rhythm: faker.datatype.boolean(),
      typoClasses: faker.datatype.boolean(),
      id: faker.lorem.slug(),
      class: faker.lorem.slug(),
    },
    props,
  ]);
}
