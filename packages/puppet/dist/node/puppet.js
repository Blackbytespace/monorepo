var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __getConfig } from '@lotsof/config';
import { __readJsonSync } from '@lotsof/sugar/fs';
import { __deepMerge } from '@lotsof/sugar/object';
import * as __glob from 'glob';
import __puppeteer from 'puppeteer';
import __fs from 'fs';
import __path from 'path';
import { __generateThemeClassesCombinations } from '@lotsof/theme';
export default class Puppet {
    constructor(settings) {
        var _a;
        this._browser = null;
        this._page = null;
        this.settings = Object.assign(Object.assign({}, ((_a = __getConfig('puppet.settings')) !== null && _a !== void 0 ? _a : {})), (settings !== null && settings !== void 0 ? settings : {}));
    }
    _screenshot(screenshot) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // make sure we have a browser and page
            if (!this._browser || !this._page) {
                throw new Error('Browser and page not initialized');
            }
            // Navigate the page to a URL
            if (this._page.url() !== screenshot.url) {
                yield this._page.goto(screenshot.url);
            }
            // check if we have a selector to take a screenshot of
            // a particular element in the loaded page
            if (screenshot.selector) {
                const $element = yield this._page.waitForSelector(screenshot.selector);
                if (screenshot.classes) {
                    yield this._page.evaluate((selector, themeClasses, keepClasses) => {
                        var _a;
                        const $elm = document.querySelector(selector);
                        const classes = (_a = $elm === null || $elm === void 0 ? void 0 : $elm.className.split(' ')) !== null && _a !== void 0 ? _a : [];
                        for (let [i, cls] of classes.entries()) {
                            if (cls.startsWith('-') && !(keepClasses === null || keepClasses === void 0 ? void 0 : keepClasses.includes(cls))) {
                                $elm === null || $elm === void 0 ? void 0 : $elm.classList.remove(cls);
                            }
                        }
                        const newThemeClasses = themeClasses.map((c) => `-${c}`);
                        $elm === null || $elm === void 0 ? void 0 : $elm.classList.add(...newThemeClasses);
                    }, screenshot.selector, screenshot.classes, (_a = screenshot.keepClasses) !== null && _a !== void 0 ? _a : []);
                }
                const outDirPath = __path.dirname(screenshot.outPath);
                if (!__fs.existsSync(outDirPath)) {
                    __fs.mkdirSync(outDirPath, { recursive: true });
                }
                yield ($element === null || $element === void 0 ? void 0 : $element.screenshot({
                    path: screenshot.outPath,
                }));
            }
            else {
                const outDirPath = __path.dirname(screenshot.outPath);
                if (!__fs.existsSync(outDirPath)) {
                    __fs.mkdirSync(outDirPath, { recursive: true });
                }
                // Take a screenshot of the full page
                yield this._page.screenshot({
                    path: screenshot.outPath,
                });
            }
        });
    }
    screenshot(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const finalSettings = __deepMerge(Object.assign({ name: `screenshot-${Date.now()}`, vw: this.settings.vw, vh: this.settings.vh }, (settings !== null && settings !== void 0 ? settings : {})));
            const screenshots = [];
            // chewck if we have a theme file to load
            if (finalSettings.themeFiles) {
                const themeFiles = __glob.sync(finalSettings.themeFiles);
                for (let [i, themeFilePath] of themeFiles.entries()) {
                    const themeFileJson = __readJsonSync(themeFilePath);
                    if (!((_a = themeFileJson.previews) === null || _a === void 0 ? void 0 : _a.generate)) {
                        continue;
                    }
                    const themeClasses = __generateThemeClassesCombinations(themeFileJson);
                    for (let [j, cls] of themeClasses.entries()) {
                        const screenshotName = ((_c = (_b = themeFileJson.previews.generate) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : `${finalSettings.name}`)
                            .replace(/\%theme/g, cls.split(' ').sort().join('-'))
                            .replace(/\.\./gm, '.')
                            .toLowerCase();
                        // compute the output path
                        const outPath = `${(_e = (_d = themeFileJson.previews.generate.outDir) !== null && _d !== void 0 ? _d : finalSettings.outDir) !== null && _e !== void 0 ? _e : '~/screenshots'}/${screenshotName}`
                            .replace('~', process.cwd())
                            .replace(/\%name/g, themeFileJson.name);
                        screenshots.push({
                            url: (_f = themeFileJson.previews.generate.url) !== null && _f !== void 0 ? _f : settings === null || settings === void 0 ? void 0 : settings.url,
                            name: screenshotName,
                            outPath,
                            selector: themeFileJson.previews.generate.selector,
                            classes: cls.split(' '),
                            keepClasses: (_g = themeFileJson.previews.generate.keepClasses) !== null && _g !== void 0 ? _g : [],
                            vw: finalSettings.vw,
                            vh: finalSettings.vh,
                        });
                    }
                }
            }
            else {
                const screenshotName = ((_h = finalSettings.name) !== null && _h !== void 0 ? _h : 'screen').toLowerCase();
                // compute the output path
                const outPath = `${(_j = finalSettings.outDir) !== null && _j !== void 0 ? _j : '~/screenshots'}/${screenshotName}`
                    .replace('~', process.cwd())
                    .replace(/\%name/g, finalSettings.name);
                screenshots.push({
                    url: (_k = settings === null || settings === void 0 ? void 0 : settings.url) !== null && _k !== void 0 ? _k : 'https://lotsof.dev',
                    name: finalSettings.name,
                    outPath,
                    selector: finalSettings.selector,
                    vw: finalSettings.vw,
                    vh: finalSettings.vh,
                });
            }
            // Launch the browser and open a new blank page
            this._browser = yield __puppeteer.launch();
            this._page = yield this._browser.newPage();
            // Set screen size
            yield this._page.setViewport({
                width: finalSettings.vw,
                height: finalSettings.vh,
            });
            for (let [i, screenshot] of screenshots.entries()) {
                yield this._screenshot(screenshot);
            }
            yield this._browser.close();
        });
    }
}
//# sourceMappingURL=puppet.js.map