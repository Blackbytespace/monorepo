// @ts-nocheck
/**
 * @name                getDefinedCssVariables
 * @namespace           js.dom.css
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * This function allows you to get all the defined css variables in the page.
 *
 * @param       {HTMLElement}           [$elm=document.body]        The element from which to get data
 *
 * @snippet         __getDefinedCssVariables(document.body)
 *
 * @example         js
 * import { __getDefinedCssVariables } from '@lotsof/sugar/dom';
 * const data = __getDefinedCssVariables();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
const isSameDomain = (styleSheet) => {
    return true;
    // Internal style blocks won't have an href value
    if (!styleSheet.href) {
        return true;
    }
    return styleSheet.href.startsWith(window.location.origin);
};
/*
     Determine if the given rule is a CSSStyleRule
     See: https://developer.mozilla.org/en-US/docs/Web/API/CSSRule#Type_constants
  */
const isStyleRule = (rule) => rule.type === CSSRule.STYLE_RULE;
/**
 * Get all custom properties on a page
 * @return array<array[string, string]>
 * ex; [["--color-accent", "#b9f500"], ["--color-text", "#252525"], ...]
 */
const getCSSCustomPropIndex = (doc, win = window) => {
    const cssVariables = [];
    const style = win.getComputedStyle(doc.body);
    // Convert styleSheets to an array and filter out any stylesheets not on this domain
    const styleSheets = Array.from(doc.styleSheets).filter(isSameDomain);
    styleSheets.forEach((sheet) => {
        // Convert cssRules to an array and filter to only include style rules
        const cssRules = Array.from(sheet.cssRules).filter(isStyleRule);
        cssRules.forEach((rule) => {
            const style = rule.style;
            for (let i = 0; i < style.length; i++) {
                const propName = style[i].trim();
                if (propName.startsWith('--')) {
                    const propValue = style.getPropertyValue(propName).trim();
                    cssVariables.push([propName, propValue]);
                }
            }
        });
    });
    return cssVariables;
};
export default getCSSCustomPropIndex;
//# sourceMappingURL=getDefinedCssVariables.js.map