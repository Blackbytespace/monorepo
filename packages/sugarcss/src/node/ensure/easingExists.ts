import { env } from '../sugarcss.js';

export default function easingExists(name: string): boolean {
  if (!env.easings[name]) {
    throw new Error(
      `The requested "${name}" easing is not available. Here's the registered ones: ${Object.keys(
        env.easings,
      ).join(',')}`,
    );
  }
  return true;
}
