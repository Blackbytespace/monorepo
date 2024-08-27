import __isInViewport from '../../is/isInViewport.js';
import __isVisible from '../../is/isVisible.js';
import __closestNotVisibleElement from './closestNotVisibleElement.js';
export default function __querySelector(selector, settings = {}) {
    // extend settings
    const finalSettings = Object.assign({ visible: null, inViewport: null, rootNode: document.body }, settings);
    // grab the element into the dom
    const $elm = finalSettings.rootNode.querySelector(selector);
    // if no element, stop here
    if (!$elm)
        return;
    // check finalSettings
    if (finalSettings.visible === false) {
        if (__isVisible($elm) || __closestNotVisibleElement($elm))
            return;
    }
    else if (finalSettings.visible === true) {
        if (!__isVisible($elm) || !__closestNotVisibleElement($elm))
            return;
    }
    if (finalSettings.inViewport === false) {
        if (__isInViewport($elm))
            return;
    }
    else if (finalSettings.inViewport === true) {
        if (!__isInViewport($elm))
            return;
    }
    // return the element
    return $elm;
}
//# sourceMappingURL=querySelector.js.map