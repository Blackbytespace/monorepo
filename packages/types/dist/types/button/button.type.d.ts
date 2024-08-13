import __BaseType from '../base/base.type.js';
export interface IButtonProps {
    style?: 'solid' | 'outline' | 'text';
    class?: string;
    link?: __Link;
}
export default class __ButtonType extends __BaseType {
    static styles: string[];
    protected style: 'solid' | 'outline' | 'text';
    protected class?: string;
    protected link: __Link;
    constructor(props?: IButtonProps);
    toDomElement(): HTMLElement;
}
