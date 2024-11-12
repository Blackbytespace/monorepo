/**
 * @name                stylesheetToString
 * @namespace           js.css
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * This function take a StyleSheet instance and convert it to a simple string
 *
 * @todo        tests
 *
 * @param       {StyleSheet|StyleSheetList}        stalesheet      The StyleSheet instance to convert
 * @return      {String}                            The css string
 *
 * @snippet         __stylesheetToString($1)
 *
 * @example         js
 * import { __stylesheetToString } from '@lotsof/sugar/dom';
 * __stylesheetToString(document.stylesheets); // => body { ... }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __stylesheetToString(
// @ts-ignore
stylesheet) {
    let stack = [];
    if (!(stylesheet instanceof StyleSheetList)) {
        if (!Array.isArray(stylesheet))
            stack.push(stylesheet);
    }
    else {
        Object.keys(stylesheet).forEach((k) => {
            stack.push(stylesheet[k]);
        });
    }
    let str = ``;
    stack.forEach((style) => {
        str += style.cssRules
            ? Array.from(style.cssRules)
                .map((rule) => { var _a; return (_a = rule.cssText) !== null && _a !== void 0 ? _a : ''; })
                .join('\n')
            : '';
    });
    return str;
}
//# sourceMappingURL=stylesheetToString.js.map