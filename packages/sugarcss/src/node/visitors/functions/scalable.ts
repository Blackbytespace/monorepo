import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

export default function scalable(value: any, settings: TSugarCssSettings): any {
  const args = __parseArgs(value.arguments);

  const result = {
    raw: '',
  };

  for (let [key, value] of Object.entries(args.values)) {
    result.raw += `calc(${value} + var(--scale, 1))`;
  }

  return result;
}
