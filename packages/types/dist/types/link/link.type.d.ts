import __BaseType from '../base/base.type.js';
export interface ILinkProps {
    href?: string;
    text?: string;
    title?: string;
    target?: '_blank' | '_self';
    class?: string;
    noopener?: boolean;
    noreferrer?: boolean;
    ariaLabel?: string;
}
export default class __LinkType extends __BaseType {
    protected href?: string;
    protected text?: string;
    protected title?: string;
    protected target: '_blank' | '_self';
    protected class?: string;
    protected noopener?: boolean;
    protected noreferrer?: boolean;
    protected ariaLabel?: string;
    constructor(props?: ILinkProps);
    toDomElement(): HTMLElement;
    rel(): string;
}
