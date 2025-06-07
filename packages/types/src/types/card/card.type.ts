import { TBody } from '../body/body.type.js';
import { TImage } from '../image/image.type.js';

export type TCard = {
  body: TBody;
  image?: TImage;
  id?: string;
  class?: string;
  attrs?: Record<string, any>;
};
