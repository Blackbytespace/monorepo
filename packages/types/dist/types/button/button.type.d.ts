import __Base from '../base/base.type.js';
import __Link from '../link/link.type.js';
export interface IButtonProps {
    style?: 'solid' | 'outline' | 'text';
    class?: string;
    link?: __Link;
}
export default class __Button extends __Base {
    static styles: string[];
    protected style: 'solid' | 'outline' | 'text';
    protected class?: string;
    protected link: __Link;
    constructor(props?: IButtonProps);
    toDomElement(): HTMLElement;
}
