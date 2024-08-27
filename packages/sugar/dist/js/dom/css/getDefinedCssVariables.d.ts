/**
 * Get all custom properties on a page
 * @return array<array[string, string]>
 * ex; [["--color-accent", "#b9f500"], ["--color-text", "#252525"], ...]
 */
declare const getCSSCustomPropIndex: (doc: Document, win?: Window) => Array<[string, string]>;
export default getCSSCustomPropIndex;
