import { type TButton } from '../button/button.type.js';
export type TBodyHeadingLevel = {
    tag: number;
    display: number;
};
export type TBody = {
    suptitle?: string;
    title?: any;
    headingLevel?: TBodyHeadingLevel;
    subtitle?: string;
    lead?: any;
    text?: any;
    spacer?: boolean;
    buttons?: TButton[];
    format?: boolean;
    rhythm?: boolean;
    id?: string;
    class?: string;
    attrs?: Record<string, any>;
};
