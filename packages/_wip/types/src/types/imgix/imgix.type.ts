export type TImgix = {
  ar?: string;
  auto?: boolean | string | string[];
  blur?: number;
  crop?:
    | 'bottom'
    | 'edges'
    | 'entropy'
    | 'faces'
    | 'focalpoint'
    | 'left'
    | 'right'
    | 'top';
  dpi?: number;
  dpr?: number;
  fit?:
    | 'clamp'
    | 'clip'
    | 'crop'
    | 'facearea'
    | 'fill'
    | 'fillmax'
    | 'max'
    | 'min'
    | 'scale';
  fm?:
    | 'avif'
    | 'blurhash'
    | 'gif'
    | 'jp2'
    | 'jpg'
    | 'json'
    | 'jxr'
    | 'mp4'
    | 'pjpg'
    | 'png'
    | 'png8'
    | 'png32'
    | 'webm'
    | 'webp'
    | 'auto';
  fpDebug?: boolean;
  fpX?: number;
  fpY?: number;
  h?: number;
  lossless?: boolean;
  minH?: number;
  minW?: number;
  q?: number;
  w?: number;
};
