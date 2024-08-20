import __BaseType from '../base/base.type.js';
import __LinkType from '../link/link.type.js';
export type TButtonProps = {
    style?: 'solid' | 'outline' | 'text';
    class?: string;
    link?: __LinkType;
};
export default class __ButtonType extends __BaseType {
    static styles: string[];
    protected style: 'solid' | 'outline' | 'text';
    protected class?: string;
    protected link: __Link;
    constructor(props?: TButtonProps);
    toDomElement(): HTMLElement;
}
