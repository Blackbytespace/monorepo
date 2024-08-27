import { env } from '../sugarcss.js';
export default function containerExists(name) {
    if (!env.containers[name]) {
        throw new Error(`The requested "${name}" container is not available. Here's the registered ones: ${Object.keys(env.containers).join(',')}`);
    }
    return true;
}
//# sourceMappingURL=conotainerExists.js.map