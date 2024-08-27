import { env } from '../sugarcss.js';

export default function colorExists(name: string): boolean {
  if (!env.colors[name]) {
    throw new Error(
      `The requested "${name}" color is not available. Here's the registered ones: ${Object.keys(
        env.colors,
      ).join(',')}`,
    );
  }
  return true;
}
