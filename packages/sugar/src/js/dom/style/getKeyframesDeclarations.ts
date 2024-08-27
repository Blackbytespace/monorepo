import __getCssDeclarations from './getCssDeclarations.js';

/**
 * @name            getKeyframesDeclarations
 * @namespace       js.dom.style
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Get all the keyframes declarations from the passed rules
 *
 * @param       {string}            animationName        CSS animationName to search KeyFrameRule declarations for
 * @param       {array}              rules               Array of CSSRules to search
 * @return      {CSSKeyframeRule}              Array of matching KeyFrameRules
 *
 * @todo      tests
 *
 * @snippet         __getKeyframesDeclarations($1)
 *
 * @example  	js
 * import { __getKeyframesDeclarations } from '@lotsof/sugar/dom';
 * __getKeyframesDeclarations('myCoolAnimation', [myCoolCssRules]);
 *
 * @see             https://github.com/marionebl/jogwheel/blob/master/source/library/get-keyframe-declarations.js
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function getKeyframesDeclarations(
  animationName,
  rules,
): CSSKeyframeRule[] {
  const keyframesNames: string[] = [];
  return __getCssDeclarations('keyframes', rules, (rule) => {
    if (keyframesNames.includes(rule.name)) return false;
    keyframesNames.push(rule.name);
    return rule.name === animationName;
  });
}
