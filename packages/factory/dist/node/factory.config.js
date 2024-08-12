import { __defineConfig } from '@lotsof/config';
import { __getConfig } from '@lotsof/config';
import { __dirname } from '@lotsof/sugar/fs';
import __path from 'path';
const componentsConfig = __getConfig().components.settings;
const config = {
    components: componentsConfig,
    server: {
        hostname: '0.0.0.0',
        port: 5183,
        entrypoint: __path.resolve(__dirname(), '../../src/php/index.php'),
        assets: {
            js: '//localhost:5183/src/js/index.ts',
            css: '//localhost:5183/src/css/index.css',
        },
    },
};
__defineConfig({
    factory: config,
}, {
    defaults: true,
});
export default config;
//# sourceMappingURL=factory.config.js.map