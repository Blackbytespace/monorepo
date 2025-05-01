import { faker } from '@faker-js/faker';
import { __pickRandom } from '@lotsof/sugar/array';
import { __deepMerge } from '@lotsof/sugar/object';
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