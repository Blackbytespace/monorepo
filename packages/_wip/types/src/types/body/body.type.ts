import { type TButton } from '../button/button.type.js';

export type TBody = {
  suptitle?: string;
  title?: any;
  subtitle?: string;
  lead?: any;
  text?: any;
  buttons?: TButton[];
  spacer?: boolean;
  format?: boolean;
  rhythm?: boolean;
  titleLevelTag?: number;
  titleLevelDisplay?: number;
  id?: string;
  class?: string;
};
