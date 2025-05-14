import { __defineDefaultConfig } from '@lotsof/config';
import { __packageRootDir } from '@lotsof/sugar/package';
import { homedir as __homedir } from 'os';
const config = {
    settings: {
        libraryRootDir: `${__homedir()}/.lotsof/components`,
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