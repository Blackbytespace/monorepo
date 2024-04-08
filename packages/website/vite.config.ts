import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';

const colors = {};

export default {
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      visitor: {
        Declaration: {
          custom(v) {
            if (v.name.match(/^--s-color-/)) {
              const name = v.name.replace(/^--s-color-/, '');
              colors[name] = v.value[0]?.value ?? v.value[0];
            }
            console.log(v);
          },
        },
        Property: {
          //   unknown(v) {
          //     console.log(v);
          //   },
        },
        Rule: {
          unknown(v) {
            console.log(JSON.stringify(v, null, 2));
            console.log(v.toString());
            if (v.property === 'unparsed') {
              // Handle unparsed value, e.g. `var(--w)`
            } else {
              console.log(v);
              // Handle parsed value, e.g. `12px`
            }
          },
        },
        Function: {
          's-color': (value: any) => {
            const arg1 = value.arguments[0];
            switch (arg1.type) {
              case 'token':
                return {
                  raw: `var(--s-color-${arg1.value.value})`,
                };
                break;
            }
            if (!colors[value]) {
            }
            return { raw: 'rgb(253, 0, 0)' };
          },
        },
      },
      targets: browserslistToTargets(browserslist('>= 0.25%')),
    },
  },
  build: {
    cssMinify: 'lightningcss',
  },
};
