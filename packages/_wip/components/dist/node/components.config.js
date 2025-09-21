import { __defineDefaultConfig } from '@blackbyte/config';
import { __packageRootDir } from '@blackbyte/sugar/package';
import { homedir as __homedir } from 'os';
const config = {
    settings: {
        libraryRootDir: `${__homedir()}/.blackbyte/components`,
        rootDir: `${__packageRootDir()}/components`,
        defaults: {
            engine: ['blade'],
        },
    },
};
__defineDefaultConfig({
    components: config,
});
export { config };
//# sourceMappingURL=components.config.js.map