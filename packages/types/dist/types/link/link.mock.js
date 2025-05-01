import { faker } from '@faker-js/faker';
import { __pickRandom } from '@lotsof/sugar/array';
import { __deepMerge } from '@lotsof/sugar/object';
export default function __linkTypeMock(props = {}) {
    return __deepMerge([
        {
            href: faker.internet.url(),
            text: faker.lorem.words({ min: 1, max: 3 }),
            title: faker.number.int(1)
                ? faker.lorem.words({ min: 1, max: 3 })
                : undefined,
            target: __pickRandom(['_self', '_blank', '_parent', '_top']),
            rel: __pickRandom(['noopener', 'noreferrer', 'noopener noreferrer']),
            ariaLabel: faker.lorem.words({ min: 1, max: 3 }),
        },
        props,
    ]);
}
//# sourceMappingURL=link.mock.js.map