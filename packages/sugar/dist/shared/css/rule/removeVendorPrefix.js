/**
 * @name            removeVendorPrefix
 * @namespace       js.css.rule
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * Remove vendor prefixes from CSSPropertyNames
 *
 * @param           {string}            propertyName             prefixed property name
 * @return          {string}              unprefixed property name
 *
 * @todo      tests
 *
 * @snippet         __removeVendorPrefix($1)
 *
 * @example  	js
 * import { __removeVendorPrefix } from '@lotsof/sugar/css';
 * __removeVendorPrefix('moz-something'); // 'something'
 *
 * @see            https://github.com/marionebl/jogwheel/blob/master/source/library/remove-vendor-prefix.js
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
const prefixes = ['ms', 'webkit', 'moz', 'o'];
export default function __removeVendorPrefix(propertyName = '') {
    const fragments = propertyName.split('-');
    if (prefixes.indexOf(fragments[1]) > -1) {
        return fragments.slice(2).join('-');
    }
    return propertyName;
}
//# sourceMappingURL=removeVendorPrefix.js.map