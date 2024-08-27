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

export type TIFrameAutoSizeSettings = {
  width?: boolean;
  height?: boolean;
};

export default function __iframeAutoSize(
  $iframe: HTMLIFrameElement,
  settings?: TIFrameAutoSizeSettings,
): void {
  const finalSettings: TIFrameAutoSizeSettings = {
    width: true,
    height: true,
    ...settings,
  };

  function _resize(): void {
    if (finalSettings.width) {
      let contentWidth = 0;
      const $childs = $iframe.contentWindow?.document.body.children;
      for (let [i, $child] of Object.entries($childs ?? [])) {
        if ($child.clientWidth > contentWidth) {
          contentWidth += $child.clientWidth;
        }
      }
      $iframe.style.width = contentWidth + 2 + 'px';
    }
    if (finalSettings.height) {
      let contentHeight = 0;
      const $childs = $iframe.contentWindow?.document.body.children;
      for (let [i, $child] of Object.entries($childs ?? [])) {
        contentHeight += $child.clientHeight;
      }
      $iframe.style.height = contentHeight + 2 + 'px';
    }
  }

  $iframe.addEventListener('load', _resize);
  $iframe.contentWindow?.addEventListener('resize', _resize);
}
