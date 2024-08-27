// @ts-ignore
export default function sugarcss(settings?: TSugarCssSettings): any;

export type TSugarCssRadius = {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
  ast: any;
};

export type TSugarCssEnv = {
  functions: Record<string, Function>;
  rules: Record<string, Function>;
  settings: TSugarCssSettings;
  colors: Record<string, any>;
  shades: Record<string, TSugarCssShade>;
  easingFunctions: Record<string, string>;
  easings: Record<string, TSugarCssEasing>;
  transitions: Record<string, TSugarCssTransition>;
  medias: Record<string, TSugarCssMedia>;
  grids: Record<string, TSugarCssGrid>;
  spaces: TSugarCssSpace;
  sizes: TSugarCssSize;
  containers: Record<string, TSugarCssContainer>;
  radiuses: Record<string, TSugarCssRadius>;
  fonts: TSugarCssFonts;
};

export type TSugarCssGrid = {
  layout: string;
  gap: number;
  ast: any;
};

export type TSugarCssTransition = {
  property: string;
  duration: string;
  easing: string;
  delay: string;
  behavior: string;
  ast: any;
};

export type TSugarCssContainer = {
  minWidth: number;
  maxWIdth: number;
  sidePadding: number;
};

export type TSugarCssFontsFont = {
  family: string;
  size: number;
  lineHeight: number;
  weight: string | number;
  style: string;
  variant: string;
  stretch: string | number;
};

export type TSugarCssSettings = {
  verbose: boolean;
  mobileFirst: boolean;
  scalable: string[];
};

export type TSugarCssFonts = {
  family: Record<string, string[]>;
  fonts: Record<string, TSugarCssFontsFont>;
};

export type TSugarCssSpace = {
  easing: string;
  min: number;
  max: number;
};

export type TSugarCssSize = {
  easing: string;
  min: number;
  max: number;
};

export type TSugarCssShade = {
  darken?: number;
  lighten?: number;
  saturate?: number;
  desaturate?: number;
  spin?: number;
  alpha?: number;
};

export type TSugarCssMedia = {
  min?: number;
  max?: number;
};

export type TSugarCssEasing = {
  function: string;
};
