import browserslist from 'browserslist';
import { browserslistToTargets, composeVisitors } from 'lightningcss';

import __sugarcss from '@lotsof/sugarcss';

export default {
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      visitor: composeVisitors([__sugarcss()]),
      targets: browserslistToTargets(browserslist('>= 0.25%')),
    },
  },
  build: {
    cssMinify: 'lightningcss',
  },
};
