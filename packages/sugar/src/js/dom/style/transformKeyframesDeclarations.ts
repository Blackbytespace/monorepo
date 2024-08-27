import __parseKeyframeKey from '../../../shared/css/parse/parseKeyframeKey.js';
import __removeVendorPrefix from '../../../shared/css/rule/removeVendorPrefix.js';
import __camelCase from '../../../shared/string/camelCase.js';
import __getDefinedStyles from './getDefinedStyles.js';

/**
 * @name                transformKeyframesDeclarations
 * @namespace           js.dom.style
 * @type                Function
 * @platform            js
 * @status              beta
 *
 * Transforms KeyFrameRule to array of web animation compatible keyframes
 *
 * @param               {Object}            keyFrameRule                 KeyFrameRule to transform
 * @return              {Array}               Array of webanimation keyframes
 *
 * @snippet         __transformKeyframesDeclarations($1)
 *
 * @todo      tests
 *
 * @example  	js
 * import { __transformKeyframesDeclarations } from '@lotsof/sugar/dom';
 *
 * @see             https://github.com/marionebl/jogwheel/blob/master/source/library/transform-keyframe-declaration.js
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */

export type TTransformedKeyframeDeclaration = {
  percentage: number;
  offset: number;
  rules: Record<string, any>;
};

function normalizePropertyName(propertyName) {
  return __camelCase(__removeVendorPrefix(propertyName));
}

export default function transformKeyframeDeclaration(
  keyFrameRule,
): TTransformedKeyframeDeclaration[] {
  // Convert keyFrame.keyText to integers holding percentage of keyframe
  const percentages = __parseKeyframeKey(keyFrameRule.keyText);
  const style = __getDefinedStyles(keyFrameRule.style);

  // Normalize to unprefixed styles
  const normalizedStyles = Object.keys(style).reduce((result, propertyName) => {
    const name = normalizePropertyName(propertyName);
    result[name] = style[propertyName];
    return result;
  }, {});

  return percentages.map((percentage) => {
    return {
      percentage,
      // Convert percentage to fraction of 1 for webanimation compat
      offset: percentage / 100,
      // Mixin with extracted keyframe styling
      rules: normalizedStyles,
    };
  });
}
