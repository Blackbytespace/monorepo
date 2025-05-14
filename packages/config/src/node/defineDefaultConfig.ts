import __defineConfig from './defineConfig.js';

export default function defineDefaultConfig(config) {
  return __defineConfig(config, {
    defaults: true,
  });
}
