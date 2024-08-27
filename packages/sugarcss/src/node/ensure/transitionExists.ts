import { env } from '../sugarcss.js';

export default function transitionExists(name: string): boolean {
  if (!env.transitions[name]) {
    throw new Error(
      `The requested "${name}" transition does not exists. Here's the available ones: ${Object.keys(
        env.transitions,
      ).join(',')}`,
    );
  }
  return true;
}
