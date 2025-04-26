import { __deepMerge } from '@lotsof/sugar/object';
import { __bodyMock } from '../_exports.js';
import __imageMock from '../image/image.mock.js';
import { TCard } from './card.type.js';

export default function __cardMock(props: Partial<TCard> = {}): TCard {
  return __deepMerge([
    {
      image: __imageMock(),
      body: __bodyMock(),
    },
    props,
  ]);
}
