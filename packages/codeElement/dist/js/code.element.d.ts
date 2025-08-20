import __LitElement from '@blackbyte/lit-element';
import { PropertyValues } from 'lit';
import '../../src/css/code.element.css';
/**
 * @name                CodeElement
 * @as                  Code Element
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/codeElement.types.ts
 * @platform            html
 * @status              beta
 *
 * Simple code element that allows you to display code snippets with syntax highlighting
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @import          import { CodeElement } from '@blackbyte/code-element';
 *
 * @snippet         CodeElement($1)
 *
 * @install           shell
 * npm i @blackbyte/code-element
 *
 * @install           js
 * import CodeElement from '@blackbyte/code-element';
 * CodeElement.define();
 *
 * @example         html            Simple example
 * <s-code language="javascript">
 *   console.log('Hello World');
 * </s-code>
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default class CodeElement extends __LitElement {
    language: string;
    filename: string;
    theme: string;
    header: boolean;
    copyIcon: string;
    private code;
    private $code;
    constructor();
    copyCode(): void;
    connectedCallback(): void;
    firstUpdated(_changedProperties: PropertyValues): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
