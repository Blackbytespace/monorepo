import type { TPuppetScreenshotSettings, TPuppetSettings } from './puppet.type.js';
export default class Puppet {
    settings: TPuppetSettings;
    private _browser;
    private _page;
    constructor(settings?: Partial<TPuppetSettings>);
    private _screenshot;
    screenshot(settings?: TPuppetScreenshotSettings): Promise<void>;
}
