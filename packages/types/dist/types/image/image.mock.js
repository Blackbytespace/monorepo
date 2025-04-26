import { faker } from '@faker-js/faker';
import { __deepMerge } from '@lotsof/sugar/object';
export default function __imageMock(props = {}) {
    return __deepMerge([
        {
            src: faker.image.url(),
            alt: faker.lorem.words({ min: 1, max: 5 }),
            title: faker.lorem.words({ min: 1, max: 5 }),
        },
        props,
    ]);
}
//# sourceMappingURL=image.mock.js.map