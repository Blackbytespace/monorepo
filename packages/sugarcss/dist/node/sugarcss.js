import __colorDeclaration from './visitors/declarations/color.js';
import __containerDeclaration from './visitors/declarations/container.js';
import __easeDeclaration from './visitors/declarations/ease.js';
import __fontDeclaration from './visitors/declarations/font.js';
import __fontFamilyDeclaration from './visitors/declarations/fontFamily.js';
import __gridDeclaration from './visitors/declarations/grid.js';
import __mediaDeclaration from './visitors/declarations/media.js';
import __radiusDeclaration from './visitors/declarations/radius.js';
import __settingDeclaration from './visitors/declarations/setting.js';
import __shadeDeclaration from './visitors/declarations/shade.js';
import __sizeDeclaration from './visitors/declarations/size.js';
import __sizesDeclaration from './visitors/declarations/sizes.js';
import __spaceDeclaration from './visitors/declarations/space.js';
import __spacesDeclaration from './visitors/declarations/spaces.js';
import __transitionDeclaration from './visitors/declarations/transition.js';
import __typoDeclaration from './visitors/declarations/typo.js';
import __colorFunction from './visitors/functions/color.js';
import __containerFunction from './visitors/functions/container.js';
import __easeFunction from './visitors/functions/ease.js';
import __fontFunction from './visitors/functions/font.js';
import __fontFamilyFunction from './visitors/functions/fontFamily.js';
import __radiusFunction from './visitors/functions/radius.js';
import __scalableFunction from './visitors/functions/scalable.js';
import __sizeFunction from './visitors/functions/size.js';
import __spaceFunction from './visitors/functions/space.js';
import __transitionFunction from './visitors/functions/transition.js';
import __containerRule from './visitors/rules/container.js';
import __fitRule from './visitors/rules/fit.js';
import __fontRule from './visitors/rules/font.js';
import __gridRule from './visitors/rules/grid.js';
import __mapColorRule from './visitors/rules/mapColor.js';
import __mediaRule from './visitors/rules/media.js';
import __radiusRule from './visitors/rules/radius.js';
import __scaleRule from './visitors/rules/scale.js';
import __scrollbarRule from './visitors/rules/scrollbar.js';
import __transitionRule from './visitors/rules/transition.js';
import __typoRule from './visitors/rules/typo.js';
import browserslist from 'browserslist';
import { browserslistToTargets, composeVisitors, } from 'lightningcss';
import { __parseHtml } from '@lotsof/sugar/console';
export const env = {
    remFactor: 0.0625,
    functions: {},
    rules: {},
    settings: {
        verbose: true,
        mobileFirst: false,
        scalable: ['padding'],
    },
    colors: {},
    shades: {},
    easingFunctions: {
        linear: '1',
        inSin: '1 - cos((t * pi) / 2)',
        outSin: 'sin((t * pi) / 2)',
        inOutSin: '((cos(pi * t) - 1) / 2) * -1',
        inQuad: 't * t',
        outQuad: 't * (2 - t)',
        inCubic: '1 - pow(1 - t, 3)',
        outCubic: '4 * t * t * t',
        inQuart: 'pow(t, 4)',
        outQuart: '1 - pow(1 - t, 4)',
        inQuint: 'pow(t, 5)',
        outQuint: '1 - pow(1 - t, 5)',
        inExpo: 'pow(2, 10 * (t - 1))',
        outExpo: '1 - pow(2, -10 * t)',
    },
    easings: {},
    transitions: {},
    medias: {},
    grids: {},
    containers: {},
    spaces: {
        easing: 'linear',
        min: 0,
        max: 100,
    },
    sizes: {
        easing: 'linear',
        min: 0,
        max: 100,
    },
    radiuses: {},
    fonts: {
        family: {},
        fonts: {},
    },
};
const nativeConsoleLog = console.log;
console.log = (...args) => {
    args.forEach((arg) => {
        if (typeof arg === 'string') {
            arg = __parseHtml(arg);
        }
        nativeConsoleLog(arg);
    });
};
export function sugarize(ligningcss, settings) {
    var _a, _b;
    const visitor = [sugarcss(settings)];
    if (ligningcss === null || ligningcss === void 0 ? void 0 : ligningcss.visitor) {
        visitor.push(ligningcss.visitor);
    }
    return {
        customAtRules: Object.assign(Object.assign({}, ((_a = ligningcss === null || ligningcss === void 0 ? void 0 : ligningcss.customAtRules) !== null && _a !== void 0 ? _a : {})), { mixin: {
                prelude: '<custom-ident>',
                body: 'style-block',
            }, include: {
                prelude: '<custom-ident>',
            } }),
        visitor: composeVisitors(visitor),
        targets: (_b = ligningcss === null || ligningcss === void 0 ? void 0 : ligningcss.targets) !== null && _b !== void 0 ? _b : browserslistToTargets(browserslist('>= 0.25%')),
    };
}
export default function sugarcss(settings = {}) {
    const finalSettings = Object.assign(Object.assign({}, env.settings), settings);
    env.settings = finalSettings;
    env.functions[`s-color`] = __colorFunction;
    env.functions[`s-font-family`] = __fontFamilyFunction;
    env.functions[`s-scalable`] = __scalableFunction;
    env.functions[`s-size`] = __sizeFunction;
    env.functions[`s-space`] = __spaceFunction;
    env.functions[`s-font`] = __fontFunction;
    env.functions[`s-transition`] = __transitionFunction;
    env.functions[`s-radius`] = __radiusFunction;
    env.functions['s-container'] = __containerFunction;
    env.functions['s-ease'] = __easeFunction;
    env.rules['s-scrollbar'] = __scrollbarRule;
    env.rules['s-transition'] = __transitionRule;
    env.rules['s-radius'] = __radiusRule;
    env.rules['s-font'] = __fontRule;
    env.rules['s-typo'] = __typoRule;
    env.rules['s-fit'] = __fitRule;
    env.rules['s-map-color'] = __mapColorRule;
    env.rules['s-container'] = __containerRule;
    env.rules['s-grid'] = __gridRule;
    env.rules['s-scale'] = __scaleRule;
    let mixins = new Map();
    const visitors = {
        Function: {
            [`s-color`](v) {
                return __colorFunction(v, finalSettings);
            },
            [`s-scalable`](v) {
                return __scalableFunction(v, finalSettings);
            },
            [`s-space`](v) {
                return __spaceFunction(v, finalSettings);
            },
            [`s-size`](v) {
                return __sizeFunction(v, finalSettings);
            },
            [`s-font-family`](v) {
                return __fontFamilyFunction(v, finalSettings);
            },
            [`s-font`](v) {
                return __fontFunction(v, finalSettings);
            },
            [`s-transition`](v) {
                return __transitionFunction(v, finalSettings);
            },
            [`s-radius`](v) {
                return __radiusFunction(v, finalSettings);
            },
            ['s-container'](v) {
                return __containerFunction(v, finalSettings);
            },
            ['s-ease'](v) {
                return __easeFunction(v, finalSettings);
            },
        },
        Declaration: {
            custom(v) {
                if (v.name === 'custom') {
                    console.log(JSON.stringify(v, null, 4));
                }
                switch (true) {
                    case v.name.startsWith(`--s-color-`) &&
                        v.name.match(/\-(h|s|l|a|o)$/) === null:
                        return __colorDeclaration(v, finalSettings);
                    case v.name.startsWith(`--s-shade-`):
                        return __shadeDeclaration(v, finalSettings);
                    case v.name.startsWith(`--s-media-`):
                        return __mediaDeclaration(v, finalSettings);
                    case v.name.startsWith(`--s-ease-`):
                        return __easeDeclaration(v, finalSettings);
                    case v.name.startsWith(`--s-space-`):
                        return __spaceDeclaration(v, finalSettings);
                    case v.name === '--s-spaces':
                        return __spacesDeclaration(v, finalSettings);
                    case v.name.startsWith('--s-size-'):
                        return __sizeDeclaration(v, finalSettings);
                    case v.name === '--s-sizes':
                        return __sizesDeclaration(v, finalSettings);
                    case v.name.startsWith(`--s-setting-`):
                        return __settingDeclaration(v, finalSettings);
                    case v.name.startsWith(`--s-typo-`):
                        return __typoDeclaration(v, finalSettings);
                    case v.name.startsWith(`--s-font-`) &&
                        !v.name.startsWith(`--s-font-family-`):
                        return __fontDeclaration(v, finalSettings);
                    case v.name.startsWith(`--s-font-family-`):
                        return __fontFamilyDeclaration(v, finalSettings);
                    case v.name.startsWith(`--s-transition-`):
                        return __transitionDeclaration(v, finalSettings);
                    case v.name.startsWith(`--s-radius-`):
                        return __radiusDeclaration(v, finalSettings);
                    case v.name.startsWith(`--s-container-`):
                        return __containerDeclaration(v, finalSettings);
                    case v.name.startsWith(`--s-grid-`):
                        return __gridDeclaration(v, finalSettings);
                }
            },
        },
        Rule: {
            unknown(rule) {
                try {
                    switch (true) {
                        case rule.name === `s-scrollbar`:
                            return __scrollbarRule(rule, finalSettings);
                        case rule.name === `s-transition`:
                            return __transitionRule(rule, finalSettings);
                        case rule.name === `s-radius`:
                            return __radiusRule(rule, finalSettings);
                        case rule.name === `s-typo`:
                            return __typoRule(rule, finalSettings);
                        case rule.name === `s-font`:
                            return __fontRule(rule, finalSettings);
                        case rule.name === `s-fit`:
                            return __fitRule(rule, finalSettings);
                        case rule.name === `s-container`:
                            return __containerRule(rule, finalSettings);
                        case rule.name === 's-map-color':
                            return __mapColorRule(rule, finalSettings);
                        case rule.name === `s-grid`:
                            return __gridRule(rule, finalSettings);
                        case rule.name === 's-scale':
                            return __scaleRule(rule, finalSettings);
                    }
                }
                catch (e) {
                    console.error(e);
                }
            },
            custom: {
                mixin(rule) {
                    if (rule.prelude.value === 'log') {
                        console.log(JSON.stringify(rule, null, 2));
                    }
                    mixins.set(rule.prelude.value, rule.body.value);
                    return [];
                },
                include(rule) {
                    let ast = mixins.get(rule.prelude.value), newAst = [];
                    if (!ast) {
                        throw new Error(`Mixin ${rule.prelude.value} not found`);
                    }
                    // apply
                    ast.forEach((rule) => {
                        var _a;
                        if (rule.type === 'unknown' && env.rules[(_a = rule.value) === null || _a === void 0 ? void 0 : _a.name]) {
                            const newRuleAst = env.rules[rule.value.name](rule.value);
                            newAst = [...newAst, ...newRuleAst];
                        }
                        else {
                            newAst.push(rule);
                        }
                    });
                    return newAst;
                },
            },
            media(rule) {
                return __mediaRule(rule, finalSettings);
            },
        },
    };
    return visitors;
}
//# sourceMappingURL=sugarcss.js.map