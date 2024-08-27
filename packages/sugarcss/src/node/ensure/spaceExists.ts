import { env } from '../sugarcss.js';

export default function spaceExists(name: string): boolean {
  if (!env.spaces[name]) {
    throw new Error(
      `Invalid easing: ${name}. Valid easings are: ${Object.keys(
        env.spaces,
      ).join(', ')}`,
    );
  }
  return true;
}
