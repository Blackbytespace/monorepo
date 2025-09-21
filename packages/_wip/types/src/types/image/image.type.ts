import type { TImgix } from '../imgix/imgix.type.js';

export type TImage = {
  src?: string;
  alt?: string;
  title?: string;
  srcset?: string | string[];
  sizes?: string | string[];
  lazy?: boolean;
  width?: number;
  height?: number;
  priority?: 'low' | 'auto' | 'high';
  imgix?: TImgix;
  focalPoint?: {
    x?: number;
    y?: number;
  };
  id?: string;
  class?: string;
  attrs?: Record<string, any>;
};
