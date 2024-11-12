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
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TTransformedKeyframeDeclaration = {
    percentage: number;
    offset: number;
    rules: Record<string, any>;
};
export default function transformKeyframeDeclaration(keyFrameRule: any): TTransformedKeyframeDeclaration[];
