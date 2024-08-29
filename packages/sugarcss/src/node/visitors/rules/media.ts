import { env } from '../../sugarcss.js';
import { TSugarCssSettings } from '../../sugarcss.types.js';

/**
 * @name            s-media
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This function allows you to define media queries easily with these features:
 *
 * - Define your own media queries like so: --s-media-desktop: 1024px 9999px;
 * - Use defined media queries easily
 * - Support for `dark` and `light` media queries
 *
 * Support for operators like:
 *
 * - `lt-...`: lower than
 * - `lte-...`: lower than or equal
 * - `gt-...`: greater than
 * - `gte-...`: greater than or equal
 * - `e-...`: equal
 * - `dark`: dark mode
 * - `light`: light mode
 *
 * @param      {String}        query              The query to parse
 * @return     {Css}                              The generated css
 *
 * @snippet       @media $1;
 * \@media $1 {
 *    $2
 * }
 *
 * @example         css
 * :root {
 *    --s-media-phone: 0 767px;
 *    --s-media-tablet: 768px 1023px;
 *    --s-media-desktop: 1024px 9999px;
 * }
 *
 * .my-element {
 *    \@media phone { ... }
 *    \@media lt-desktop { ... }
 *    \@media e-tablet { ... }
 *    \@media dark { ... }
 *    \@media gt-phone { ... }
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */

export default function media(v: any, settings: TSugarCssSettings): any {
  for (let mediaQuery of v.value.query.mediaQueries) {
    const possibleMedias: string[] = [];
    ['lt-', 'lte-', 'e-', 'gt-', 'gte-', ''].forEach((operator) => {
      for (let [media, mediaArgs] of Object.entries(env.medias)) {
        possibleMedias.push(`${operator}${media}`);
      }
    });

    if (possibleMedias.includes(mediaQuery.mediaType)) {
      // parse the media
      let operator = '',
        media = '';

      const parts = mediaQuery.mediaType.split('-');
      if (parts.length === 1) {
        media = parts[0];
      } else {
        (operator = parts[0]), (media = parts.slice(1).join('-'));
      }

      // make sure the requested media exists
      if (!env.medias[media]) {
        throw new Error(
          `Media ${media} does not exist. Please define it like so:\n- --media-${media}: 0 768px;`,
        );
      }

      const mediaArgs = env.medias[media];
      let query = '';

      switch (operator) {
        case 'lt':
          query = `(max-width: ${mediaArgs.min ?? 0}px)`;
          break;
        case 'lte':
          query = `(max-width: ${mediaArgs.max}px)`;
          break;
        case 'e':
          query = `(min-width: ${mediaArgs.min}px) and (max-width: ${mediaArgs.max}px)`;
          break;
        case 'gt':
          query = `(min-width: ${mediaArgs.max ?? 0}px)`;
          break;
        case 'gte':
          query = `(min-width: ${mediaArgs.min}px)`;
          break;
        default:
          if (settings.mobileFirst) {
            if (mediaArgs.min) {
              query += query ? ' and ' : '';
              query += `(min-width: ${mediaArgs.min}px)`;
            }
          } else {
            if (mediaArgs.max) {
              query += query ? ' and ' : '';
              query += `(max-width: ${mediaArgs.max}px)`;
            }
          }
          break;
      }

      // set the new media
      mediaQuery.mediaType = query;
    } else if (
      ['dark', 'light'].includes(
        mediaQuery.condition?.value?.name ?? mediaQuery.mediaType,
      )
    ) {
      const theme = mediaQuery.condition?.value?.name ?? mediaQuery.mediaType;
      return [
        {
          type: 'style',
          value: {
            selectors: [
              [
                {
                  type: 'type',
                  name: 'body',
                },
                {
                  type: 'class',
                  name: `-${theme}`,
                },
                {
                  type: 'combinator',
                  value: 'descendant',
                },
                {
                  type: 'nesting',
                },
              ],
            ],
            declarations: {
              importantDeclarations: [],
              declarations: [],
            },
            rules: v.value.rules.map((rule) => {
              return rule;
            }),
            loc: {
              source_index: 2,
              line: 98,
              column: 5,
            },
          },
        },
      ];
    }
  }

  return v;
}
