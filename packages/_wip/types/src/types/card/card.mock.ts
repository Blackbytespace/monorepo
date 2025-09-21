import { __deepMerge } from '@blackbyte/sugar/object';
import { __bodyMock } from '../_exports.js';
import __imageMock from '../image/image.mock.js';
import { TCard } from './card.type.js';

export default function __cardMock(props: Partial<TCard> = {}): TCard {
  return __deepMerge([
    {
      id: `card-${Math.round(Math.random() * 9999)}`,
      image: __imageMock(),
      body: __bodyMock(),
    },
    props,
  ]);
}
