/**
 * @name            iframeAutoSize
 * @namespace       js.dom.iframe
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * This function allows you to resize an iframe to fit its content.
 *
 * @param           {HTMLElement}           obj           The iframe element to resize
 * @param           {TIFrameAutoSizeSettings}           [settings={}]           Some settings to configure your iframe auto size
 *
 * @setting        {Boolean}         [width=true]         Specify if you want to resize the width of the iframe
 * @setting        {Boolean}         [height=true]        Specify if you want to resize the height of the iframe
 *
 * @snippet         __iframeAutoSize($1)
 * __iframeAutoSize($1, $2);
 *
 * @todo      tests
 *
 * @example  	js
 * import { __iframeAutoSize } from '@lotsof/sugar/dom';
 * __iframeAutoSize($1, $2);
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __iframeAutoSize($iframe, settings) {
    var _a;
    const finalSettings = Object.assign({ width: true, height: true }, settings);
    function _resize() {
        var _a, _b;
        if (finalSettings.width) {
            let contentWidth = 0;
            const $childs = (_a = $iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document.body.children;
            for (let [i, $child] of Object.entries($childs !== null && $childs !== void 0 ? $childs : [])) {
                if ($child.clientWidth > contentWidth) {
                    contentWidth += $child.clientWidth;
                }
            }
            $iframe.style.width = contentWidth + 2 + 'px';
        }
        if (finalSettings.height) {
            let contentHeight = 0;
            const $childs = (_b = $iframe.contentWindow) === null || _b === void 0 ? void 0 : _b.document.body.children;
            for (let [i, $child] of Object.entries($childs !== null && $childs !== void 0 ? $childs : [])) {
                contentHeight += $child.clientHeight;
            }
            $iframe.style.height = contentHeight + 2 + 'px';
        }
    }
    $iframe.addEventListener('load', _resize);
    (_a = $iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.addEventListener('resize', _resize);
}
//# sourceMappingURL=iframeAutoSize.js.map