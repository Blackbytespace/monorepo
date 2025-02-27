import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

/**
 * @name            s-zindex
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * This function allows you to generate a z-index value from the registered z-indexes in the config.
 *
 * @param       {String}        name             The z-index name you want to get from the config
 * @param       {Number}        [offset=0]       An offset to apply to the z-index value
 * @return     {Css}                             The generated css
 *
 * @example         css
 * :root {
 *    --s-zindex-header: 100;
 *    --s-zindex-chatbot: 200;
 * }
 *
 * .my-element {
 *    z-index: s-zindex(header); // 200
 *    z-index: s-zindex(chatbot); // 200
 *    z-index: s-zindex(header, -1); // 199
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function zindex(value: any, settings: TSugarCssSettings): any {
  const args = {
    ...__parseArgs(value.arguments, ['name', 'offset'], {
      separator: ['white-space', 'comma'],
    }),
  };
  return {
    raw: `calc(var(--s-zindex-${args.values.name}) + ${
      args.values.offset ?? 0
    } )`,
  };
}
