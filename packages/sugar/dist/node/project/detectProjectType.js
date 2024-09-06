import __fs from 'fs';
import __packageRootDir from '../package/packageRootDir.js';
export default function detectProjectType(cwd = process.cwd()) {
    var _a, _b, _c, _d, _e;
    let packageJson = {}, composerJson = {};
    const packageRootDir = __packageRootDir(cwd);
    try {
        packageJson = JSON.parse(__fs.readFileSync(`${packageRootDir}/package.json`, 'utf8').toString());
    }
    catch (e) { }
    try {
        composerJson = JSON.parse(__fs.readFileSync(`${packageRootDir}/composer.json`, 'utf8').toString());
    }
    catch (e) { }
    // detecting the package type laravel
    if ((_a = composerJson.require) === null || _a === void 0 ? void 0 : _a['laravel/framework']) {
        const version = composerJson.require['laravel/framework'].replace(/\^/, '');
        return {
            type: 'laravel',
            version,
            rawVersion: composerJson.require['laravel/framework'],
            major: parseInt(version.split('.')[0]),
            minor: parseInt(version.split('.')[1]),
            fix: parseInt(version.split('.')[2]),
        };
    }
    // detecting the package type next
    if (__fs.existsSync(`${packageRootDir}/next.config.js`) ||
        __fs.existsSync(`${packageRootDir}/next.config.mjs`) ||
        __fs.existsSync(`${packageRootDir}/next.config.ts`)) {
        const version = (_b = packageJson.dependencies) === null || _b === void 0 ? void 0 : _b.next.replace(/\^/, '');
        return {
            type: 'next',
            version,
            rawVersion: packageJson.dependencies.next,
            major: parseInt(version.split('.')[0]),
            minor: parseInt(version.split('.')[1]),
            fix: parseInt(version.split('.')[2]),
        };
    }
    // detecting the package type nuxt
    if (__fs.existsSync(`${packageRootDir}/nuxt.config.js`) ||
        __fs.existsSync(`${packageRootDir}/nuxt.config.mjs`) ||
        __fs.existsSync(`${packageRootDir}/nuxt.config.ts`)) {
        const version = packageJson.dependencies.nuxt.replace(/\^/, '');
        return {
            type: 'nuxt',
            version,
            rawVersion: packageJson.dependencies.nuxt,
            major: parseInt(version.split('.')[0]),
            minor: parseInt(version.split('.')[1]),
            fix: parseInt(version.split('.')[2]),
        };
    }
    // detecting the package type svelte
    if (__fs.existsSync(`${packageRootDir}/svelte.config.js`) ||
        __fs.existsSync(`${packageRootDir}/svelte.config.mjs`) ||
        __fs.existsSync(`${packageRootDir}/svelte.config.ts`)) {
        const version = (_c = packageJson.dependencies) === null || _c === void 0 ? void 0 : _c['@sveltejs/kit'].replace(/\^/, '');
        return {
            type: 'sveltekit',
            version,
            rawVersion: packageJson.dependencies['@sveltejs/kit'],
            major: parseInt(version.split('.')[0]),
            minor: parseInt(version.split('.')[1]),
            fix: parseInt(version.split('.')[2]),
        };
    }
    // detecting the package type astro
    if (__fs.existsSync(`${packageRootDir}/astro.config.js`) ||
        __fs.existsSync(`${packageRootDir}/astro.config.mjs`) ||
        __fs.existsSync(`${packageRootDir}/astro.config.ts`)) {
        const version = (_d = packageJson.dependencies) === null || _d === void 0 ? void 0 : _d.astro.replace(/\^/, '');
        return {
            type: 'astro',
            version,
            rawVersion: packageJson.dependencies.astro,
            major: parseInt(version.split('.')[0]),
            minor: parseInt(version.split('.')[1]),
            fix: parseInt(version.split('.')[2]),
        };
    }
    // detecting the package type remix
    if ((_e = packageJson.dependencies) === null || _e === void 0 ? void 0 : _e['@remix-run/serve']) {
        const version = packageJson.dependencies['@remix-run/serve'].replace(/\^/, '');
        return {
            type: 'remix',
            version,
            rawVersion: packageJson.dependencies['@remix-run/serve'],
            major: parseInt(version.split('.')[0]),
            minor: parseInt(version.split('.')[1]),
            fix: parseInt(version.split('.')[2]),
        };
    }
    return {
        type: 'unknown',
        version: '1.0.0',
        rawVersion: '1.0.0',
        major: 1,
        minor: 0,
        fix: 0,
    };
}
//# sourceMappingURL=detectProjectType.js.map