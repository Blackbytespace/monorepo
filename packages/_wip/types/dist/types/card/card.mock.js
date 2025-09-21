import { __deepMerge } from '@blackbyte/sugar/object';
import { __bodyMock } from '../_exports.js';
import __imageMock from '../image/image.mock.js';
export default function __cardMock(props = {}) {
    return __deepMerge([
        {
            id: `card-${Math.round(Math.random() * 9999)}`,
            image: __imageMock(),
            body: __bodyMock(),
        },
        props,
    ]);
}
//# sourceMappingURL=card.mock.js.map