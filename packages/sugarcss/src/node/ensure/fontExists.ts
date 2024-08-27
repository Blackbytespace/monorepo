import { env } from '../sugarcss.js';

export default function fontExists(name: string): boolean {
  if (!env.fonts.fonts[name]) {
    throw new Error(
      `The requested "${name}" font is not available. Here's the registered ones: ${Object.keys(
        env.fonts.fonts,
      ).join(',')}`,
    );
  }
  return true;
}
