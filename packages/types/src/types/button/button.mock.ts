import type { TButtonProps } from './button.type.js';
import __ButtonType from './button.type.js';

import __linkMock from '../link/link.mock.js';

import { __pickRandom } from '@lotsof/sugar/array';

export default function __buttonMock(props: TButtonProps = {}): __ButtonType {
  return new __ButtonType({
    style: __pickRandom(['solid', 'outline', 'text']),
    link: __linkMock(),
    ...props,
  });
}
