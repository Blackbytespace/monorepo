import type { TLink } from '../link/link.type.js';
export type TButton = {
    type?: 'solid' | 'outline' | 'text';
    link?: TLink;
    id?: string;
    class?: string;
    attrs?: Record<string, any>;
};
