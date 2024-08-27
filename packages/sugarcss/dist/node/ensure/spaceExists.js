import { env } from '../sugarcss.js';
export default function spaceExists(name) {
    if (!env.spaces[name]) {
        throw new Error(`Invalid easing: ${name}. Valid easings are: ${Object.keys(env.spaces).join(', ')}`);
    }
    return true;
}
//# sourceMappingURL=spaceExists.js.map