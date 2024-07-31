import __Link from './link.type.js';
import { __pickRandom } from '@lotsof/sugar/array';
import { faker } from '@faker-js/faker';
export default function __linkMock(props = {}) {
    return new __Link(Object.assign({ href: faker.internet.url(), text: faker.lorem.words({ min: 1, max: 3 }), title: faker.number.int(1)
            ? faker.lorem.words({ min: 1, max: 5 })
            : undefined, target: __pickRandom(['_self', '_blank']), noopener: faker.number.int(1) ? true : false, noreferrer: faker.number.int(1) ? true : false, ariaLabel: faker.lorem.words({ min: 1, max: 5 }) }, props));
}
//# sourceMappingURL=link.mock.js.map