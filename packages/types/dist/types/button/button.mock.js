import { __pickRandom } from '@blackbyte/sugar/array';
import { __deepMerge } from '@blackbyte/sugar/object';
import { faker } from '@faker-js/faker';
import __linkMock from '../link/link.mock.js';
export default function __buttonMock(props = {}) {
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
//# sourceMappingURL=button.mock.js.map