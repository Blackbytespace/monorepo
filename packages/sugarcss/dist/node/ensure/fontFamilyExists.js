import { env } from '../sugarcss.js';
export default function fontFamilyExists(name) {
    if (!env.fonts.family[name]) {
        throw new Error(`Invalid font family: ${name}. Valid font families are: ${Object.keys(Object.keys(env.fonts.family)).join(', ')}`);
    }
    return true;
}
//# sourceMappingURL=fontFamilyExists.js.map