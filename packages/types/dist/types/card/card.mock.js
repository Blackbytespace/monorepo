import { __deepMerge } from '@lotsof/sugar/object';
import { __bodyMock } from '../_exports.js';
import __imageMock from '../image/image.mock.js';
export default function __cardMock(props = {}) {
    return __deepMerge([
        {
            image: __imageMock(),
            body: __bodyMock(),
        },
        props,
    ]);
}
//# sourceMappingURL=card.mock.js.map