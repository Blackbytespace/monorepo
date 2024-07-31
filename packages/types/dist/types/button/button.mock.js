import __Button from './button.type.js';
import __linkMock from '../link/link.mock.js';
import { __pickRandom } from '@lotsof/sugar/array';
export default function __buttonMock(props = {}) {
    return new __Button(Object.assign({ style: __pickRandom(['solid', 'outline', 'text']), link: __linkMock() }, props));
}
//# sourceMappingURL=button.mock.js.map