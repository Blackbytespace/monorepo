export type TPuppetConfig = {
  settings: TPuppetSettings;
  screenshot: TPuppetScreenshotSettings;
};

export type TPuppetSettingsViewport = {
  width: number;
  height: number;
};

export type TPuppetSettings = {
  vw: number;
  vh: number;
};

export type TPuppetScreenshotSettings = {
  url?: string;
  name: string;
  outDir?: string;
  vw: number;
  vh: number;
  width?: number;
  height?: number;
  selector?: string;
  themeFiles?: string;
};

export type TPuppetScreenshotScreenshot = {
  url: string;
  name: string;
  outPath: string;
  selector?: string;
  classes?: string[];
  keepClasses?: string[];
  clear?: boolean;
  vw?: number;
  vh?: number;
};
