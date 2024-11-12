/**
 * @name            getCssRulesFromStylesheet
 * @namespace       js.dom.style
 * @type            Function
 * @platform        js
 * @status          beta
 *
 * Get all the CSSRules of the passed stylesheet
 *
 * @param       {CSSStyleSheet}     stylesheet      The stylesheet from which to get the CSSRules
 * @param   {Boolean}               [recursive=true]            Specify if you want to get rules from imported css or not
 * @return          {CSSRule[]}             Array of CSSRules
 *
 * @todo      tests
 *
 * @snippet         __getCssRulesFromStylesheet($1)
 *
 * @example  	js
 * import { __getCssRulesFromStylesheet } from '@lotsof/sugar/dom';
 * __getCssRulesFromStylesheet(myStylesheet);
 *
 * @see             https://github.com/marionebl/jogwheel/blob/master/source/library/get-css-rules.js
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __getCssRulesFromStylesheet(styleSheet: StyleSheet, recursive?: boolean): never[];
