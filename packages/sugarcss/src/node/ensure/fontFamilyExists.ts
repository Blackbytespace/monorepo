import { env } from '../sugarcss.js';

export default function fontFamilyExists(name: string): boolean {
  if (!env.fonts.family[name]) {
    throw new Error(
      `Invalid font family: ${name}. Valid font families are: ${Object.keys(
        Object.keys(env.fonts.family),
      ).join(', ')}`,
    );
  }
  return true;
}
