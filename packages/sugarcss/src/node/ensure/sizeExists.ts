import { env } from '../sugarcss.js';

export default function sizeExists(name: string): boolean {
  if (!env.sizes[name]) {
    throw new Error(
      `Invalid easing: ${name}. Valid easings are: ${Object.keys(
        env.sizes,
      ).join(', ')}`,
    );
  }
  return true;
}
