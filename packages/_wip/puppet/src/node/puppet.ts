import type {
  TPuppetScreenshotScreenshot,
  TPuppetScreenshotSettings,
  TPuppetSettings,
} from './puppet.type.js';

import { __getConfig } from '@blackbyte/config';
import { __readJsonSync } from '@blackbyte/sugar/fs';
import * as __glob from 'glob';
import __puppeteer from 'puppeteer';

import __fs from 'fs';
import __path from 'path';

import { __generateThemeClassesCombinations } from '@blackbyte/theme';

export default class Puppet {
  public settings: TPuppetSettings;

  private _browser: __puppeteer.Browser | null = null;
  private _page: __puppeteer.Page | null = null;

  constructor(settings?: Partial<TPuppetSettings>) {
    this.settings = {
      ...(__getConfig('puppet.settings') ?? {}),
      ...(settings ?? {}),
    };
  }

  private async _screenshot(screenshot: TPuppetScreenshotScreenshot) {
    // make sure we have a browser and page
    if (!this._browser || !this._page) {
      throw new Error('Browser and page not initialized');
    }

    // Navigate the page to a URL
    if (this._page.url() !== screenshot.url) {
      await this._page.goto(screenshot.url);
    }

    // check if we have a selector to take a screenshot of
    // a particular element in the loaded page
    if (screenshot.selector) {
      const $element = await this._page.waitForSelector(screenshot.selector);

      if (screenshot.classes) {
        await this._page.evaluate(
          (selector: string, themeClasses: string[], keepClasses: string[]) => {
            const $elm = document.querySelector(selector);
            const classes = $elm?.className.split(' ') ?? [];
            for (let [i, cls] of classes.entries()) {
              if (cls.startsWith('-') && !keepClasses?.includes(cls)) {
                $elm?.classList.remove(cls);
              }
            }
            const newThemeClasses = themeClasses.map((c) => `-${c}`);
            $elm?.classList.add(...newThemeClasses);
          },
          screenshot.selector,
          screenshot.classes,
          screenshot.keepClasses ?? [],
        );
      }

      const outDirPath = __path.dirname(screenshot.outPath);
      if (!__fs.existsSync(outDirPath)) {
        __fs.mkdirSync(outDirPath, { recursive: true });
      }

      await $element?.screenshot({
        path: screenshot.outPath,
      });
    } else {
      const outDirPath = __path.dirname(screenshot.outPath);
      if (!__fs.existsSync(outDirPath)) {
        __fs.mkdirSync(outDirPath, { recursive: true });
      }

      // Take a screenshot of the full page
      await this._page.screenshot({
        path: screenshot.outPath,
      });
    }
  }

  public async screenshot(settings?: TPuppetScreenshotSettings): Promise<void> {
    const finalSettings: TPuppetScreenshotSettings = {
      name: `screenshot-${Date.now()}`,
      vw: this.settings.vw,
      vh: this.settings.vh,
      ...(settings ?? {}),
    };

    const screenshots: TPuppetScreenshotScreenshot[] = [];

    // chewck if we have a theme file to load
    if (finalSettings.themeFiles) {
      const themeFiles = __glob.sync(finalSettings.themeFiles);

      for (let [i, themeFilePath] of themeFiles.entries()) {
        const themeFileJson = __readJsonSync(themeFilePath);
        if (!themeFileJson.previews?.generate) {
          continue;
        }
        const themeClasses = __generateThemeClassesCombinations(themeFileJson);

        for (let [j, cls] of themeClasses.entries()) {
          const screenshotName = (
            themeFileJson.previews.generate?.name ?? `${finalSettings.name}`
          )
            .replace(/\%theme/g, cls.split(' ').sort().join('-'))
            .replace(/\.\./gm, '.')
            .toLowerCase();

          // compute the output path
          const outPath = `${
            themeFileJson.previews.generate.outDir ??
            finalSettings.outDir ??
            '~/screenshots'
          }/${screenshotName}`
            .replace('~', process.cwd())
            .replace(/\%name/g, themeFileJson.name);

          screenshots.push({
            url: themeFileJson.previews.generate.url ?? settings?.url,
            name: screenshotName,
            outPath,
            selector: themeFileJson.previews.generate.selector,
            classes: cls.split(' '),
            keepClasses: themeFileJson.previews.generate.keepClasses ?? [],
            vw: finalSettings.vw,
            vh: finalSettings.vh,
          });
        }
      }
    } else {
      const screenshotName = (finalSettings.name ?? 'screen').toLowerCase();

      // compute the output path
      const outPath = `${
        finalSettings.outDir ?? '~/screenshots'
      }/${screenshotName}`
        .replace('~', process.cwd())
        .replace(/\%name/g, finalSettings.name);

      screenshots.push({
        url: settings?.url ?? 'https://blackbyte.space',
        name: finalSettings.name,
        outPath,
        selector: finalSettings.selector,
        vw: finalSettings.vw,
        vh: finalSettings.vh,
      });
    }

    // Launch the browser and open a new blank page
    this._browser = await __puppeteer.launch();
    this._page = await this._browser.newPage();

    // Set screen size
    await this._page.setViewport({
      width: finalSettings.vw,
      height: finalSettings.vh,
    });

    for (let [i, screenshot] of screenshots.entries()) {
      await this._screenshot(screenshot);
    }

    await this._browser.close();
  }
}
