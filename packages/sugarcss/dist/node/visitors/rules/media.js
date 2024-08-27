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
export default function media(v, settings) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    for (let mediaQuery of v.value.query.mediaQueries) {
        const possibleMedias = [];
        ['lt-', 'lte-', 'e-', 'gt-', 'gte-', ''].forEach((operator) => {
            for (let [media, mediaArgs] of Object.entries(env.medias)) {
                possibleMedias.push(`${operator}${media}`);
            }
        });
        if (['dark', 'light'].includes((_c = (_b = (_a = mediaQuery.condition) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : mediaQuery.mediaType)) {
            switch ((_f = (_e = (_d = mediaQuery.condition) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.name) !== null && _f !== void 0 ? _f : mediaQuery.mediaType) {
                case 'dark':
                    mediaQuery.mediaType = '(prefers-color-scheme: dark)';
                    // mediaQuery.mediaType = 'screen';
                    break;
                case 'light':
                    mediaQuery.mediaType = '(prefers-color-scheme: light)';
                    // mediaQuery.mediaType = 'screen';
                    break;
            }
            mediaQuery.condition = null;
        }
        else if (possibleMedias.includes(mediaQuery.mediaType)) {
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
                    query = `(max-width: ${(_g = mediaArgs.min) !== null && _g !== void 0 ? _g : 0}px)`;
                    break;
                case 'lte':
                    query = `(max-width: ${mediaArgs.max}px)`;
                    break;
                case 'e':
                    query = `(min-width: ${mediaArgs.min}px) and (max-width: ${mediaArgs.max}px)`;
                    break;
                case 'gt':
                    query = `(min-width: ${(_h = mediaArgs.max) !== null && _h !== void 0 ? _h : 0}px)`;
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
    }
    // console.log(JSON.stringify(v, null, 2));
    // return v;
    const ast = [
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
                            name: '-dark',
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
                    // if (rule.value.selectors.length) {
                    //   rule.value.selectors[0].unshift({
                    //     type: 'combinator',
                    //     value: 'descendant',
                    //   });
                    // }
                    // rule.value.selectors[0].unshift({
                    //   type: 'combinator',
                    //   value: 'descendant',
                    // });
                    // rule.value.selectors[0].unshift({
                    //   type: 'nesting',
                    // });
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
    // console.log(JSON.stringify(ast, null, 2));
    return ast;
    return v;
}
//# sourceMappingURL=media.js.map