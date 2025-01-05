import { env } from '../../sugarcss.js';
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
 * - Support for "color schema" media queries like `cs-...` that will target elements inside the `cs-...` class
 * - Support for "theme" media queries like `theme-...` that will target elements inside the `theme-...` class
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
 * - 'theme-...': theme
 * - `cs-...`: color schema
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
 *    \@media theme-half-life { ... }
 *    \@media theme-moon { ... }
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function media(v, settings) {
    var _a, _b, _c, _d, _e;
    for (let mediaQuery of v.value.query.mediaQueries) {
        const possibleMedias = [];
        ['lt-', 'lte-', 'e-', 'gt-', 'gte-', ''].forEach((operator) => {
            for (let [media, mediaArgs] of Object.entries(env.medias)) {
                possibleMedias.push(`${operator}${media}`);
            }
        });
        const mediaStr = (_c = (_b = (_a = mediaQuery.condition) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : mediaQuery.mediaType;
        if (possibleMedias.includes(mediaQuery.mediaType)) {
            // parse the media
            let operator = '', media = '';
            const parts = mediaQuery.mediaType.split('-');
            if (parts.length === 1) {
                media = parts[0];
            }
            else {
                (operator = parts[0]), (media = parts.slice(1).join('-'));
            }
            // make sure the requested media exists
            if (!env.medias[media]) {
                throw new Error(`Media ${media} does not exist. Please define it like so:\n- --media-${media}: 0 768px;`);
            }
            const mediaArgs = env.medias[media];
            let query = '';
            switch (operator) {
                case 'lt':
                    query = `(max-width: ${(_d = mediaArgs.min) !== null && _d !== void 0 ? _d : 0}px)`;
                    break;
                case 'lte':
                    query = `(max-width: ${mediaArgs.max}px)`;
                    break;
                case 'e':
                    query = `(min-width: ${mediaArgs.min}px) and (max-width: ${mediaArgs.max}px)`;
                    break;
                case 'gt':
                    query = `(min-width: ${(_e = mediaArgs.max) !== null && _e !== void 0 ? _e : 0}px)`;
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
                    }
                    else {
                        if (mediaArgs.max) {
                            query += query ? ' and ' : '';
                            query += `(max-width: ${mediaArgs.max}px)`;
                        }
                    }
                    break;
            }
            // set the new media
            mediaQuery.mediaType = query;
        }
        else if (mediaStr.startsWith('theme-') || mediaStr.startsWith('theme-')) {
            return [
                {
                    type: 'style',
                    value: {
                        selectors: [
                            [
                                {
                                    type: 'class',
                                    name: mediaStr,
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
        else if (mediaStr.startsWith('cs-') || mediaStr.startsWith('theme-')) {
            return [
                {
                    type: 'style',
                    value: {
                        selectors: [
                            [
                                {
                                    type: 'class',
                                    name: mediaStr,
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
        else if (['dark', 'light'].includes(mediaStr)) {
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
                                    name: `-${mediaStr}`,
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
//# sourceMappingURL=media.js.map