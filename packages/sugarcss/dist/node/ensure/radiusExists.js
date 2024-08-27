import { env } from '../sugarcss.js';
export default function radiusExists(name) {
    if (!env.radiuses[name]) {
        throw new Error(`The requested "${name}" radius is not available. Here's the registered ones: ${Object.keys(env.radiuses).join(',')}`);
    }
    return true;
}
//# sourceMappingURL=radiusExists.js.map